import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import { parseCsv, type CsvRow } from "../lib/csv";
import { Button, Panel, Select } from "./ui";
import { OUTREACH_SEGMENTS } from "../lib/segments";

export function OutscraperImport() {
  const importRows = useMutation(api.outscraper.importRows);
  const inputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [segment, setSegment] = useState("");
  const choose = async (selected: File) => { setFile(selected.name); setRows(parseCsv(await selected.text())); setMessage(""); };
  const run = async () => {
    const mappedRows = rows.map((row) => ({
      name: row.name ?? "", name_for_emails: row.name_for_emails || undefined, category: row.category || undefined, type: row.type || undefined,
      phone: row.phone || undefined, website: row.website || undefined, website_clean: row.website_clean || undefined, website_final: row.website_final || undefined,
      address: row.address || undefined, street: row.street || undefined, city: row.city || undefined, state: row.state || undefined, postal_code: row.postal_code || undefined,
      full_name: row.full_name || undefined, email: row.email || undefined, contact_phone: row.contact_phone || undefined, rating: row.rating || undefined, reviews: row.reviews || undefined, reviews_link: row.reviews_link || undefined,
    }));
    // Keep each transaction comfortably below Convex's write/time limits.
    const batchSize = 500;
    const batches = Array.from({ length: Math.ceil(mappedRows.length / batchSize) }, (_, index) => mappedRows.slice(index * batchSize, (index + 1) * batchSize));
    let companiesImported = 0;
    let contactsImported = 0;
    let companiesSkipped = 0;
    let contactsSkipped = 0;
    const errors: string[] = [];
    const failedBatches: number[] = [];
    setMessage(`Importing batch 1 of ${batches.length}…`);
    for (let index = 0; index < batches.length; index += 1) {
      try {
        const result = await importRows({ segment: segment || undefined, rows: batches[index] });
        companiesImported += result.companiesImported;
        contactsImported += result.contactsImported;
        companiesSkipped += result.companiesSkipped;
        contactsSkipped += result.contactsSkipped;
        errors.push(...result.errors.map((error) => `Batch ${index + 1}: ${error}`));
      } catch (error) {
        failedBatches.push(index + 1);
        errors.push(`Batch ${index + 1} failed: ${error instanceof Error ? error.message : "Import failed"}`);
      }
      if (index + 1 < batches.length) setMessage(`Importing batch ${index + 2} of ${batches.length}…`);
    }
    const details = errors.length ? ` ${errors.slice(0, 5).join(" ")}${errors.length > 5 ? " More rows/batches need attention." : ""}` : "";
    const failed = failedBatches.length ? ` ${failedBatches.length} batch${failedBatches.length === 1 ? "" : "es"} failed (retry the source file to reprocess them).` : "";
    setMessage(`${companiesImported} companies and ${contactsImported} contacts imported. ${companiesSkipped + contactsSkipped} duplicates skipped${errors.length ? `. ${errors.length} rows/batches need attention.` : "."}${failed}${details}`);
    setRows([]);
  };
  return <>
    <Button onClick={() => setOpen(true)}>Import Outscraper CSV</Button>
    {open ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"><Panel className="w-full max-w-xl p-5 shadow-2xl">
      <div className="mb-4 flex items-start justify-between"><div><h2 className="text-lg font-semibold text-white">Import Outscraper CSV</h2><p className="mt-1 text-sm text-neutral-500">Creates companies and links contacts from one file.</p></div><button className="text-neutral-500 hover:text-white" onClick={() => setOpen(false)}>×</button></div>
      <input ref={inputRef} type="file" accept=".csv,.tsv,text/csv,text/tab-separated-values" className="hidden" onChange={(event) => event.target.files?.[0] && void choose(event.target.files[0])} />
      <div className="rounded-md border border-dashed border-edge p-5 text-center"><Button variant="primary" onClick={() => inputRef.current?.click()}>Choose Outscraper file</Button><p className="mt-2 text-xs text-neutral-500">{file || "CSV or tab-separated export; large files are processed in batches"}</p></div>
      <div className="mt-4"><Select ariaLabel="Outreach segment" value={segment} onChange={setSegment} options={[{ value: "", label: "Select segment (optional)" }, ...OUTREACH_SEGMENTS]} /></div>
      {rows.length ? <p className="mt-4 text-sm text-neutral-300">Preview: {rows.length} rows detected. Contacts with emails will be linked to their company.</p> : null}
      {message ? <p className="mt-3 rounded-md bg-white/5 p-3 text-sm text-neutral-300">{message}</p> : null}
      <div className="mt-5 flex justify-end gap-2"><Button onClick={() => setOpen(false)}>Close</Button><Button variant="primary" disabled={!rows.length} onClick={() => void run()}>Import {rows.length ? `${rows.length} rows` : "file"}</Button></div>
    </Panel></div> : null}
  </>;
}
