import { v } from "convex/values";
import { writeMutation } from "./model/functions";
import { entityDefaults } from "./tableSettings";

const clean = (value: string | undefined) => {
  const text = value?.trim();
  return text ? text : undefined;
};

const nameKey = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

const nameFromEmail = (email: string) => {
  const localPart = email.split("@", 1)[0]?.replace(/[._-]+/g, " ").trim();
  if (!localPart) return email;
  return localPart.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const domainKey = (value: string | undefined) => {
  const text = clean(value)?.toLowerCase();
  if (!text) return undefined;
  return text.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
};

const numberValue = (value: string | undefined) => {
  const parsed = Number(value?.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const importRows = writeMutation({
  args: {
    rows: v.array(v.object({
      name: v.string(), name_for_emails: v.optional(v.string()), category: v.optional(v.string()), type: v.optional(v.string()),
      phone: v.optional(v.string()), website: v.optional(v.string()), website_clean: v.optional(v.string()), website_final: v.optional(v.string()),
      address: v.optional(v.string()), street: v.optional(v.string()), city: v.optional(v.string()), state: v.optional(v.string()), postal_code: v.optional(v.string()),
      full_name: v.optional(v.string()), email: v.optional(v.string()), contact_phone: v.optional(v.string()), rating: v.optional(v.string()), reviews: v.optional(v.string()), reviews_link: v.optional(v.string()),
    })),
    segment: v.optional(v.string()),
  },
  returns: v.object({ companiesImported: v.number(), contactsImported: v.number(), companiesSkipped: v.number(), contactsSkipped: v.number(), errors: v.array(v.string()) }),
  handler: async (ctx, args) => {
    if (args.rows.length > 5000) throw new Error("Import up to 5,000 Outscraper rows at a time");
    const companyDefaults = await entityDefaults(ctx, "company");
    const contactDefaults = await entityDefaults(ctx, "contact");
    const companies = await ctx.db.query("companies").collect();
    const contacts = await ctx.db.query("contacts").collect();
    const byDomain = new Map<string, (typeof companies)[number]>();
    const byName = new Map<string, (typeof companies)[number]>();
    for (const company of companies) {
      const domain = domainKey(company.domain);
      if (domain) byDomain.set(domain, company);
      byName.set(company.name.trim().toLowerCase(), company);
    }
    const emails = new Set(contacts.map((contact) => contact.email?.trim().toLowerCase()).filter((email): email is string => !!email));
    const contactNames = new Set(
      contacts
        .filter((contact) => contact.companyId)
        .map((contact) => `${contact.companyId}:${nameKey(contact.name)}`),
    );
    let companiesImported = 0; let contactsImported = 0; let companiesSkipped = 0; let contactsSkipped = 0;
    const errors: string[] = [];
    for (let index = 0; index < args.rows.length; index += 1) {
      const row = args.rows[index];
      const name = row.name.trim();
      if (!name) { errors.push(`Row ${index + 2}: company name is required`); continue; }
      const domain = domainKey(row.website_final ?? row.website_clean ?? row.website);
      let company = (domain ? byDomain.get(domain) : undefined) ?? byName.get(name.toLowerCase());
      if (!company) {
        const companyId = await ctx.db.insert("companies", {
          name, segment: clean(args.segment), domain, phone: clean(row.phone), address: clean(row.address ?? row.street), city: clean(row.city), state: clean(row.state), postalCode: clean(row.postal_code),
          rating: numberValue(row.rating), reviews: numberValue(row.reviews), reviewsLink: clean(row.reviews_link), industry: clean(row.category) ?? companyDefaults.industry,
          ownerId: companyDefaults.ownerId, enrichmentStatus: "NONE", lastActivityAt: Date.now(),
        });
        const created = await ctx.db.get("companies", companyId);
        if (!created) throw new Error("Company could not be created");
        company = created;
        companiesImported += 1; byName.set(name.toLowerCase(), company); if (domain) byDomain.set(domain, company);
      } else companiesSkipped += 1;
      const email = clean(row.email)?.toLowerCase();
      const contactName = clean(row.full_name) ?? (email ? nameFromEmail(email) : undefined);
      if (!contactName) continue;
      const contactKey = `${company._id}:${nameKey(contactName)}`;
      if ((email && emails.has(email)) || contactNames.has(contactKey)) { contactsSkipped += 1; continue; }
      await ctx.db.insert("contacts", { name: contactName, email, phone: clean(row.contact_phone), title: clean(row.type), companyId: company._id, ownerId: contactDefaults.ownerId, lastActivityAt: Date.now() });
      contactsImported += 1; contactNames.add(contactKey); if (email) emails.add(email);
    }
    return { companiesImported, contactsImported, companiesSkipped, contactsSkipped, errors };
  },
});
