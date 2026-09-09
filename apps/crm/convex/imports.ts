import { v } from "convex/values";
import { authedQuery, writeMutation } from "./model/functions";
import { entityDefaults } from "./tableSettings";

const clean = (value: string | undefined) => {
  const text = value?.trim();
  return text ? text : undefined;
};

const domainKey = (value: string | undefined) => {
  const text = clean(value)?.toLowerCase();
  if (!text) return undefined;
  return text.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
};

export const exportCompanies = authedQuery({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("companies").withIndex("by_name").collect();
    return rows.map((row) => ({
      name: row.name,
      segment: row.segment ?? "",
      domain: row.domain ?? "",
      industry: row.industry ?? "",
      description: row.description ?? "",
    }));
  },
});

export const exportContacts = authedQuery({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("contacts").order("asc").collect();
    const result = [];
    for (const row of rows) {
      const company = row.companyId ? await ctx.db.get("companies", row.companyId) : null;
      result.push({
        name: row.name,
        email: row.email ?? "",
        phone: row.phone ?? "",
        title: row.title ?? "",
        company: company?.name ?? "",
        company_domain: company?.domain ?? "",
      });
    }
    return result;
  },
});

export const importCompanies = writeMutation({
  args: {
    segment: v.optional(v.string()),
    rows: v.array(v.object({
      name: v.string(),
      domain: v.optional(v.string()),
      segment: v.optional(v.string()),
      industry: v.optional(v.string()),
      description: v.optional(v.string()),
    })),
  },
  returns: v.object({ imported: v.number(), skipped: v.number(), errors: v.array(v.string()) }),
  handler: async (ctx, args) => {
    if (args.rows.length > 1000) throw new Error("Import up to 1,000 companies at a time");
    const defaults = await entityDefaults(ctx, "company");
    const existing = await ctx.db.query("companies").collect();
    const domains = new Set(existing.map((row) => domainKey(row.domain)).filter(Boolean));
    const names = new Set(existing.map((row) => row.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];
    for (let index = 0; index < args.rows.length; index += 1) {
      const row = args.rows[index];
      const name = row.name.trim();
      const domain = domainKey(row.domain);
      if (!name) { errors.push(`Row ${index + 2}: company name is required`); continue; }
      if ((domain && domains.has(domain)) || names.has(name.toLowerCase())) { skipped += 1; continue; }
      await ctx.db.insert("companies", {
        name,
        segment: clean(args.segment ?? row.segment),
        domain,
        industry: clean(row.industry) ?? defaults.industry,
        description: clean(row.description),
        ownerId: defaults.ownerId,
        enrichmentStatus: "NONE",
        lastActivityAt: Date.now(),
      });
      imported += 1;
      names.add(name.toLowerCase());
      if (domain) domains.add(domain);
    }
    return { imported, skipped, errors };
  },
});

export const importContacts = writeMutation({
  args: {
    rows: v.array(v.object({
      name: v.string(),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      title: v.optional(v.string()),
      company: v.optional(v.string()),
      company_domain: v.optional(v.string()),
    })),
  },
  returns: v.object({ imported: v.number(), skipped: v.number(), errors: v.array(v.string()) }),
  handler: async (ctx, args) => {
    if (args.rows.length > 1000) throw new Error("Import up to 1,000 contacts at a time");
    const defaults = await entityDefaults(ctx, "contact");
    const companies = await ctx.db.query("companies").collect();
    const byDomain = new Map<string, (typeof companies)[number]>();
    const byName = new Map<string, (typeof companies)[number]>();
    for (const company of companies) {
      const domain = domainKey(company.domain);
      if (domain) byDomain.set(domain, company);
      byName.set(company.name.trim().toLowerCase(), company);
    }
    const emails = new Set((await ctx.db.query("contacts").collect()).map((row) => row.email?.trim().toLowerCase()).filter(Boolean));
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];
    for (let index = 0; index < args.rows.length; index += 1) {
      const row = args.rows[index];
      const name = row.name.trim();
      const email = clean(row.email)?.toLowerCase();
      if (!name) { errors.push(`Row ${index + 2}: contact name is required`); continue; }
      if (email && emails.has(email)) { skipped += 1; continue; }
      const companyDomain = domainKey(row.company_domain);
      const company = (companyDomain ? byDomain.get(companyDomain) : undefined) ?? byName.get(clean(row.company)?.toLowerCase() ?? "");
      const hasCompanyReference = !!clean(row.company) || !!domainKey(row.company_domain);
      if (hasCompanyReference && !company) {
        errors.push(`Row ${index + 2}: company could not be matched`);
        continue;
      }
      await ctx.db.insert("contacts", {
        name,
        email,
        phone: clean(row.phone),
        title: clean(row.title),
        companyId: company?._id,
        ownerId: defaults.ownerId,
        lastActivityAt: Date.now(),
      });
      imported += 1;
      if (email) emails.add(email);
    }
    return { imported, skipped, errors };
  },
});
