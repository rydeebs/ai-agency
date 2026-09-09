import { useAction, useMutation, useQuery } from "convex/react";
import { Fragment, useState } from "react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button, Input, PageHeader, Panel, Select } from "../components/ui";

export function Outreach() {
  const campaigns = useQuery(api.outreach.list) ?? [];
  const filterOptions = useQuery(api.companies.filterOptions);
  const companies = useQuery(api.companies.names) ?? [];
  const [selected, setSelected] = useState<Id<"outreachCampaigns"> | null>(null);
  const [showNew, setShowNew] = useState(false);
  const detail = useQuery(api.outreach.get, selected ? { campaignId: selected } : "skip");
  const create = useMutation(api.outreach.create);
  const populate = useMutation(api.outreach.populate);
  const generate = useAction(api.outreach.generate);
  const sendNow = useAction(api.outreach.sendRecipientNow);
  const approve = useMutation(api.outreach.approve);
  const regenerateDrafts = useMutation(api.outreach.regenerateDrafts);
  const activate = useMutation(api.outreach.activate);
  const removeBatch = useMutation(api.outreach.removeBatch);
  const stop = useMutation(api.outreach.stop);
  const resetRecipient = useMutation(api.outreach.resetRecipientForGeneration);
  const [working, setWorking] = useState("");
  const [notice, setNotice] = useState("");
  const [expanded, setExpanded] = useState<Id<"outreachRecipients"> | null>(null);
  const [bucket, setBucket] = useState("all");

  const deleteCampaign = async (campaignId: Id<"outreachCampaigns">, name: string) => {
    if (!window.confirm(`Delete campaign “${name}” and all of its drafts and scheduled steps?`)) return;
    await run("Deleting campaign…", async () => {
      while (true) {
        const result = await removeBatch({ campaignId, limit: 500 });
        if (result.done) break;
      }
      if (selected === campaignId) setSelected(null);
      return "Campaign deleted";
    });
  };

  const createCampaign = async (values: { name: string; search: string; randomSelection: boolean; segment: string; industry: string; companyId: string; dailyLimit: string; followUpDays: string; instructions: string }) => {
    setWorking("Creating campaign…");
    const id = await create({ name: values.name, search: values.search || undefined, randomSelection: values.randomSelection, segment: values.segment || undefined, industry: values.industry || undefined, companyId: values.companyId ? values.companyId as Id<"companies"> : undefined, dailyLimit: Math.max(1, Number(values.dailyLimit) || 25), followUpDays: values.followUpDays.split(",").map((value) => Number(value.trim())).filter((value) => Number.isFinite(value) && value > 0), instructions: values.instructions });
    let offset = 0;
    while (true) {
      const result = await populate({ campaignId: id, offset, limit: 500 });
      offset = result.nextOffset;
      if (result.done) break;
      setWorking(`Selecting contacts… ${offset}`);
    }
    setSelected(id);
    setShowNew(false);
    setWorking("");
  };

  const run = async (label: string, task: () => Promise<string | void>) => { setWorking(label); setNotice(""); try { const result = await task(); if (result) setNotice(result); } catch (error) { setNotice(error instanceof Error ? error.message : "The operation failed"); } finally { setWorking(""); } };

  const bucketDefinitions = [
    { id: "all", label: "All", matches: () => true },
    { id: "needs-draft", label: "Not drafted", matches: (row: typeof detail extends null ? never : NonNullable<typeof detail>["recipients"][number]) => ["PENDING", "GENERATING"].includes(row.status) && row.step === 0 },
    { id: "drafted", label: "Drafted", matches: (row: NonNullable<typeof detail>["recipients"][number]) => row.status === "DRAFT" },
    { id: "approved", label: "Approved / ready", matches: (row: NonNullable<typeof detail>["recipients"][number]) => row.status === "APPROVED" },
    { id: "follow-ups", label: "Pending follow-ups", matches: (row: NonNullable<typeof detail>["recipients"][number]) => row.status === "PENDING" && row.step > 0 },
    { id: "sent", label: "Sent", matches: (row: NonNullable<typeof detail>["recipients"][number]) => row.status === "SENT" },
    { id: "failed", label: "Failed / bounced", matches: (row: NonNullable<typeof detail>["recipients"][number]) => row.status === "FAILED" },
    { id: "stopped", label: "Stopped / opted out", matches: (row: NonNullable<typeof detail>["recipients"][number]) => row.status === "STOPPED" },
  ];
  const selectedBucket = bucketDefinitions.find((item) => item.id === bucket) ?? bucketDefinitions[0];
  const visibleRecipients = detail ? detail.recipients.filter(selectedBucket.matches).slice(0, 100) : [];

  return <div className="mx-auto max-w-6xl">
    <PageHeader title="Outreach" subtitle="Generate, review, approve, and pace personalized Gmail sequences." action={<Button variant="primary" onClick={() => setShowNew(true)}>New campaign</Button>} />
    {showNew ? <NewCampaignForm companies={companies} segments={filterOptions?.segments ?? []} industries={filterOptions?.industries ?? []} onCancel={() => setShowNew(false)} onCreate={(values) => void createCampaign(values)} /> : null}
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <Panel className="p-3">
        <h2 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">Campaigns</h2>
        {campaigns.map((campaign) => <button key={campaign._id} onClick={() => setSelected(campaign._id)} className={`group mb-1 flex w-full items-start justify-between rounded-md p-3 text-left ${selected === campaign._id ? "bg-raised" : "hover:bg-white/5"}`}><span><span className="block text-sm text-white">{campaign.name}</span><span className="mt-1 block text-xs text-neutral-500">{campaign.recipientCount.toLocaleString()} contacts · {campaign.status.toLowerCase()}</span></span><span title="Delete campaign" onClick={(event) => { event.stopPropagation(); void deleteCampaign(campaign._id, campaign.name); }} className="ml-2 rounded px-1 text-xs text-neutral-600 opacity-0 transition-opacity hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100">×</span></button>)}
        {!campaigns.length ? <p className="px-2 py-5 text-sm text-neutral-500">Create a campaign to begin.</p> : null}
      </Panel>
      <Panel className="min-h-[420px] p-5">
        {!detail ? <div className="flex h-full items-center justify-center text-sm text-neutral-500">Select a campaign.</div> : <>
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-semibold text-white">{detail.campaign.name}</h2><p className="mt-1 text-xs text-neutral-500">{detail.recipients.length.toLocaleString()} loaded for review · daily limit {detail.campaign.dailyLimit}{detail.campaign.randomSelection ? " · random companies" : ""}</p></div><div className="flex flex-wrap gap-2"><Button onClick={() => void run("Generating drafts…", async () => { const result = await generate({ campaignId: detail.campaign._id, limit: 20 }); return result.message ?? `Generated ${result.generated} drafts${result.remaining ? ` · ${result.remaining} still pending` : ""}`; })}>Generate drafts</Button><Button onClick={() => void run("Regenerating existing drafts…", async () => { const reset = await regenerateDrafts({ campaignId: detail.campaign._id }); let remaining = reset; let generated = 0; while (remaining > 0) { const result = await generate({ campaignId: detail.campaign._id, limit: 20 }); generated += result.generated; if (result.generated === 0) break; remaining = result.remaining; } return `Regenerated ${generated} drafts${remaining ? ` · ${remaining} still pending` : ""}`; })}>Regenerate drafts</Button><Button onClick={() => void run("Approving drafts…", async () => { const count = await approve({ campaignId: detail.campaign._id, allDrafts: true }); return count ? `Approved ${count} drafts` : "No drafts are ready to approve yet"; })}>Approve all drafts</Button><Button variant="primary" onClick={() => void run("Activating…", async () => { await activate({ campaignId: detail.campaign._id }); return "Campaign activated; Gmail will send within the next queue cycle"; })}>Activate sending</Button></div></div>
          {working ? <p className="mt-4 rounded-md bg-white/5 p-3 text-sm text-accent">{working}</p> : null}
          {notice ? <p className="mt-4 rounded-md bg-white/5 p-3 text-sm text-neutral-300">{notice}</p> : null}
          <div className="mt-5 flex flex-wrap gap-2">{bucketDefinitions.map((item) => <button key={item.id} onClick={() => setBucket(item.id)} className={`rounded-md px-3 py-2 text-xs ${bucket === item.id ? "bg-accent text-black" : "bg-white/5 text-neutral-400 hover:text-white"}`}>{item.label} ({detail.recipients.filter(item.matches).length})</button>)}</div>
          <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-edge text-xs text-neutral-500"><th className="px-2 py-2">Contact</th><th className="px-2 py-2">Company</th><th className="px-2 py-2">Status</th><th className="px-2 py-2">Subject</th><th className="px-2 py-2" /></tr></thead><tbody>{visibleRecipients.map((row) => <Fragment key={row._id}><tr onClick={() => setExpanded(expanded === row._id ? null : row._id)} className="cursor-pointer border-b border-edge/60 align-top hover:bg-white/[0.03]"><td className="px-2 py-3 text-white">{row.contact?.name}<div className="text-xs text-neutral-500">{row.contact?.title} · {row.contact?.email}</div></td><td className="px-2 py-3 text-neutral-400">{row.company?.name}</td><td className="px-2 py-3 text-xs text-neutral-400">{row.status.toLowerCase()}</td><td className="max-w-[420px] px-2 py-3 text-neutral-400">{row.subject ?? "Not generated"}</td><td className="px-2 py-3"><div className="flex flex-wrap gap-1">{row.status !== "STOPPED" && row.status !== "SENT" ? <Button onClick={() => void run("Regenerating message…", async () => { await resetRecipient({ recipientId: row._id }); const result = await generate({ campaignId: detail.campaign._id, recipientId: row._id, limit: 1 }); return result.generated ? "Message regenerated" : "Message could not be regenerated"; })}>Regenerate</Button> : null}{["DRAFT", "APPROVED"].includes(row.status) && row.subject && row.body ? <Button onClick={() => void run("Sending email…", async () => sendNow({ recipientId: row._id }))}>Send now</Button> : null}{row.status !== "STOPPED" && row.status !== "SENT" ? <Button onClick={() => void stop({ recipientId: row._id, reason: "Manually opted out" })}>Stop</Button> : expanded === row._id ? "▴" : "▾"}</div></td></tr>{expanded === row._id ? <tr className="border-b border-edge bg-white/[0.02]"><td colSpan={5} className="px-4 py-4"><div className="mb-2 text-xs uppercase tracking-wide text-neutral-500">Step {row.step + 1} · {row.status.toLowerCase()}</div><div className="font-medium text-white">{row.subject ?? "Draft not generated"}</div><div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-neutral-300">{row.body ?? "Generate a draft to preview the full email."}</div>{row.scheduledAt ? <div className="mt-3 text-xs text-neutral-500">Scheduled: {new Date(row.scheduledAt).toLocaleString()}</div> : null}</td></tr> : null}</Fragment>)}</tbody></table></div>
        </>}
      </Panel>
    </div>
  </div>;
}

function NewCampaignForm({ companies, segments, industries, onCancel, onCreate }: { companies: Array<{ _id: Id<"companies">; name: string }>; segments: string[]; industries: string[]; onCancel: () => void; onCreate: (values: { name: string; search: string; randomSelection: boolean; segment: string; industry: string; companyId: string; dailyLimit: string; followUpDays: string; instructions: string }) => void }) {
  const [name, setName] = useState("New outreach campaign"); const [search, setSearch] = useState(""); const [randomSelection, setRandomSelection] = useState(false);
  const [segment, setSegment] = useState(""); const [industry, setIndustry] = useState(""); const [companyId, setCompanyId] = useState(""); const [dailyLimit, setDailyLimit] = useState("25"); const [followUpDays, setFollowUpDays] = useState("3, 7"); const [instructions, setInstructions] = useState("Introduce NewRevGen and explain one specific way we could improve the company's operations with AI. Keep it concise, specific, and truthful.");
  return <Panel className="mb-4 p-5"><h2 className="text-sm font-semibold text-white">New campaign</h2><div className="mt-4 grid gap-3 sm:grid-cols-2"><Input placeholder="Campaign name" value={name} onChange={(e) => setName(e.target.value)} /><Input placeholder="Search contacts or companies (optional)" value={search} onChange={(e) => setSearch(e.target.value)} /><Select ariaLabel="Segment" value={segment} onChange={setSegment} options={[{ value: "", label: "All segments" }, ...segments.map((value) => ({ value, label: value }))]} /><Select ariaLabel="Industry" value={industry} onChange={setIndustry} options={[{ value: "", label: "All industries" }, ...industries.map((value) => ({ value, label: value }))]} /><Select ariaLabel="Company" value={companyId} onChange={setCompanyId} options={[{ value: "", label: "All companies" }, ...companies.map((company) => ({ value: company._id, label: company.name }))]} /><Input type="number" min="1" max="100" placeholder="Daily Gmail limit" value={dailyLimit} onChange={(e) => setDailyLimit(e.target.value)} /><Input placeholder="Follow-up days (e.g. 3, 7)" value={followUpDays} onChange={(e) => setFollowUpDays(e.target.value)} /><label className="flex items-center gap-2 text-sm text-neutral-300 sm:col-span-2"><input type="checkbox" checked={randomSelection} onChange={(e) => setRandomSelection(e.target.checked)} /> Select random companies up to the daily limit (one contact per company)</label><textarea className="min-h-28 rounded-md border border-edge bg-panel px-3 py-2 text-sm text-white sm:col-span-2" value={instructions} onChange={(e) => setInstructions(e.target.value)} /></div><div className="mt-4 flex justify-end gap-2"><Button onClick={onCancel}>Cancel</Button><Button variant="primary" onClick={() => onCreate({ name, search, randomSelection, segment, industry, companyId, dailyLimit, followUpDays, instructions })}>Create and select contacts</Button></div></Panel>;
}
