import { useAction, useQuery } from "convex/react";
import { Fragment, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Button, PageHeader, Panel } from "../components/ui";

const percent = (value: number) => `${(value * 100).toFixed(1)}%`;
type OpenedRow = { recipientId: string; contactName: string; contactEmail: string | null; companyName: string | null; subject: string; openedAt: number; openCount: number; repliedAt: number | null };

export function OutreachMetrics() {
  const metrics = useQuery(api.outreach.metrics);
  const scanBounces = useAction(api.outreach.scanBounces);
  const scanReplies = useAction(api.outreach.scanReplies);
  const [scanMessage, setScanMessage] = useState("");
  const [scanning, setScanning] = useState(false);
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);
  if (!metrics) return <div className="text-sm text-neutral-500">Loading outreach metrics…</div>;
  const cards = [
    ["Campaigns", metrics.totals.campaigns],
    ["Generated", metrics.totals.generated],
    ["Sent", metrics.totals.sent],
    ["Opens", metrics.totals.opens],
    ["Open rate", percent(metrics.totals.openRate)],
    ["Replies", metrics.totals.replies],
    ["Reply rate", percent(metrics.totals.replyRate)],
    ["Bounces", metrics.totals.bounces],
  ];
  const runBounceScan = async () => {
    if (scanning) return;
    setScanning(true);
    setScanMessage("");
    try {
      const result = await scanBounces();
      setScanMessage(`${result.message}. Searched ${result.searched} Gmail messages; found ${result.found} bounce${result.found === 1 ? "" : "s"}; deleted ${result.deleted} matching CRM contact${result.deleted === 1 ? "" : "s"}.`);
    } catch (error) {
      setScanMessage(error instanceof Error ? error.message : "Bounce scan failed");
    } finally {
      setScanning(false);
    }
  };
  const runReplyScan = async () => {
    if (scanning) return;
    setScanning(true);
    setScanMessage("");
    try {
      await scanReplies();
      setScanMessage("Gmail reply check completed.");
    } catch (error) {
      setScanMessage(error instanceof Error ? error.message : "Reply check failed");
    } finally {
      setScanning(false);
    }
  };
  return <div className="mx-auto max-w-6xl">
    <PageHeader title="Outreach Metrics" subtitle="Compare subject and body variants using sends, replies, opens, and Gmail delivery failures." action={<div className="flex gap-2"><Button type="button" disabled={scanning} onClick={() => void runReplyScan()}>{scanning ? "Checking Gmail…" : "Check replies"}</Button><Button type="button" disabled={scanning} onClick={() => void runBounceScan()}>{scanning ? "Checking Gmail…" : "Check bounces"}</Button></div>} />
    {scanMessage ? <p className="mb-4 rounded-md bg-white/5 p-3 text-sm text-neutral-300">{scanMessage}</p> : null}
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-8">{cards.map(([label, value]) => <Panel key={String(label)} className="p-4"><div className="text-xs uppercase tracking-wide text-neutral-500">{label}</div><div className="mt-2 text-2xl font-semibold text-white">{value}</div></Panel>)}</div>
    <Panel className="mt-5 overflow-x-auto p-5"><h2 className="text-sm font-semibold text-white">Variant performance</h2><p className="mt-1 text-xs text-neutral-500">Variants are assigned at generation time: 1A–1F are subject strategies and 2A–2F are body strategies. Click a row to see the individual non-bounced opens for that combination.</p><table className="mt-4 w-full text-left text-sm"><thead><tr className="border-b border-edge text-xs text-neutral-500"><th className="px-2 py-2">Subject</th><th className="px-2 py-2">Body</th><th className="px-2 py-2">Generated</th><th className="px-2 py-2">Sent</th><th className="px-2 py-2">Opened</th><th className="px-2 py-2">Open rate</th><th className="px-2 py-2">Replies</th><th className="px-2 py-2">Reply rate</th><th className="px-2 py-2">Bounces</th></tr></thead><tbody>{metrics.variants.map((row: { subjectVariant: string; bodyVariant: string; generated: number; sent: number; opens: number; openRate: number; replies: number; replyRate: number; bounces: number }) => { const key = `${row.subjectVariant}:${row.bodyVariant}`; const opened = metrics.opened.filter((item: { subjectVariant: string; bodyVariant: string }) => `${item.subjectVariant}:${item.bodyVariant}` === key) as OpenedRow[]; return <Fragment key={key}><tr className="cursor-pointer border-b border-edge/60 hover:bg-white/[0.03]" onClick={() => setExpandedVariant(expandedVariant === key ? null : key)}><td className="px-2 py-3 text-white"><span className="mr-2 text-neutral-500">{expandedVariant === key ? "▾" : "▸"}</span>{row.subjectVariant}</td><td className="px-2 py-3 text-white">{row.bodyVariant}</td><td className="px-2 py-3 text-neutral-400">{row.generated}</td><td className="px-2 py-3 text-neutral-400">{row.sent}</td><td className="px-2 py-3 text-neutral-400">{row.opens}</td><td className="px-2 py-3 text-accent">{percent(row.openRate)}</td><td className="px-2 py-3 text-neutral-400">{row.replies}</td><td className="px-2 py-3 text-accent">{percent(row.replyRate)}</td><td className="px-2 py-3 text-neutral-400">{row.bounces}</td></tr>{expandedVariant === key ? <tr className="border-b border-edge/60 bg-white/[0.02]"><td colSpan={9} className="px-5 py-3">{opened.length ? <table className="w-full text-left text-xs"><thead><tr className="border-b border-edge text-neutral-500"><th className="px-2 py-2">Contact</th><th className="px-2 py-2">Company</th><th className="px-2 py-2">Subject</th><th className="px-2 py-2">Opens</th><th className="px-2 py-2">First opened</th><th className="px-2 py-2">Reply</th></tr></thead><tbody>{opened.map((item) => <tr key={item.recipientId} className="border-b border-edge/40"><td className="px-2 py-2 text-white">{item.contactName}<div className="text-neutral-500">{item.contactEmail}</div></td><td className="px-2 py-2 text-neutral-300">{item.companyName ?? "—"}</td><td className="px-2 py-2 text-neutral-300">{item.subject}</td><td className="px-2 py-2 text-neutral-300">{item.openCount}</td><td className="px-2 py-2 text-neutral-400">{new Date(item.openedAt).toLocaleString()}</td><td className="px-2 py-2">{item.repliedAt ? <span className="text-accent">Replied · {new Date(item.repliedAt).toLocaleString()}</span> : <span className="text-neutral-500">No reply</span>}</td></tr>)}</tbody></table> : <span className="text-xs text-neutral-500">No non-bounced opens recorded for this combination.</span>}</td></tr> : null}</Fragment>; })}</tbody></table><p className="mt-4 text-xs text-neutral-500">Open rate is approximate: Gmail and other mail clients may block, cache, or prefetch tracking pixels. Replies and bounces remain more reliable signals.</p></Panel>
    <Panel className="mt-5 overflow-x-auto p-5"><h2 className="text-sm font-semibold text-white">Opened messages</h2><p className="mt-1 text-xs text-neutral-500">Only opens from recipients that are not marked as bounced are shown. Tracking pixels can still be prefetched by privacy systems, so treat opens as directional.</p><table className="mt-4 w-full text-left text-sm"><thead><tr className="border-b border-edge text-xs text-neutral-500"><th className="px-2 py-2">Contact</th><th className="px-2 py-2">Company</th><th className="px-2 py-2">Subject</th><th className="px-2 py-2">Variant</th><th className="px-2 py-2">Opened</th></tr></thead><tbody>{metrics.opened.map((row: { recipientId: string; contactName: string; contactEmail: string | null; companyName: string | null; subject: string; subjectVariant: string; bodyVariant: string; openedAt: number }) => <tr key={row.recipientId} className="border-b border-edge/60"><td className="px-2 py-3 text-white">{row.contactName}<div className="text-xs text-neutral-500">{row.contactEmail}</div></td><td className="px-2 py-3 text-neutral-400">{row.companyName ?? "—"}</td><td className="max-w-sm px-2 py-3 text-neutral-300">{row.subject}</td><td className="px-2 py-3 text-neutral-400">{row.subjectVariant} / {row.bodyVariant}</td><td className="px-2 py-3 text-neutral-400">{new Date(row.openedAt).toLocaleString()}</td></tr>)}</tbody></table>{metrics.opened.length === 0 ? <p className="mt-3 text-sm text-neutral-500">No non-bounced opens recorded yet.</p> : null}</Panel>
  </div>;
}
