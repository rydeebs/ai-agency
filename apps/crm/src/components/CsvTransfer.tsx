import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Button, Panel, Select } from "./ui";
import { downloadCsv, parseCsv, type CsvRow } from "../lib/csv";
import { OUTREACH_SEGMENTS } from "../lib/segments";

type Entity = "companies" | "contacts";

export function CsvTransfer({ entity }: { entity: Entity }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [filename, setFilename] = useState("");
  const [message, setMessage] = useState("");
  const [segment, setSegment] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const companyExport = useQuery(api.imports.exportCompanies, open && entity === "companies" ? {} : "skip");
  const contactExport = useQuery(api.imports.exportContacts, open && entity === "contacts" ? {} : "skip");
  const importCompanies = useMutation(api.imports.importCompanies);
  const importContacts = useMutation(api.imports.importContacts);

  const exportRows = entity === "companies" ? companyExport : contactExport;
  const close = () => { setOpen(false); setRows([]); setMessage(""); setFilename(""); };
  const handleFile = async (file: File) => {
    setFilename(file.name);
    setRows(parseCsv(await file.text()));
    setMessage("");
  };
  const importFile = async () => {
    if (!rows.length) return;
    setMessage("Importing…");
    try {
      const result = entity === "companies"
        ? await importCompanies({ segment: segment || undefined, rows: rows.map((row) => ({ name: row.name ?? "", domain: row.domain || undefined, industry: row.industry || undefined, description: row.description || undefined })) })
        : await importContacts({ rows: rows.map((row) => ({ name: row.name ?? "", email: row.email || undefined, phone: row.phone || undefined, title: row.title || undefined, company: row.company || undefined, company_domain: row.company_domain || undefined })) });
      setMessage(`${result.imported} imported, ${result.skipped} duplicates skipped${result.errors.length ? `. ${result.errors.length} rows need attention.` : "."}`);
      setRows([]);
      if (result.errors.length) setMessage(`${result.imported} imported, ${result.skipped} duplicates skipped. ${result.errors.slice(0, 3).join(" ")}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Import failed");
    }
  };
  const template = entity === "companies"
    ? [{ name: "Acme Inc", domain: "acme.com", industry: "Technology", description: "" }]
    : [{ name: "Jane Doe", email: "jane@acme.com", phone: "", title: "Founder", company: "Acme Inc", company_domain: "acme.com" }];

  return <>
    <div className="flex gap-2">
      <Button onClick={() => setOpen(true)}>Import CSV</Button>
      <Button onClick={() => exportRows && downloadCsv(`${entity}.csv`, exportRows)}>Export CSV</Button>
    </div>
    {open ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <Panel className="w-full max-w-xl p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div><h2 className="text-lg font-semibold text-white">Import {entity}</h2><p className="mt-1 text-sm text-neutral-500">Upload a CSV. Existing records are skipped safely.</p></div>
          <button className="text-neutral-500 hover:text-white" onClick={close} aria-label="Close">×</button>
        </div>
        <div className="rounded-md border border-dashed border-edge p-5 text-center">
          <input ref={inputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => e.target.files?.[0] && void handleFile(e.target.files[0])} />
          <Button variant="primary" onClick={() => inputRef.current?.click()}>Choose CSV file</Button>
          <p className="mt-2 text-xs text-neutral-500">{filename || "CSV files up to 1,000 rows"}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <span>Required column: <code className="text-neutral-300">name</code></span>
          <button className="text-accent hover:underline" onClick={() => downloadCsv(`${entity}-template.csv`, template)}>Download template</button>
        </div>
        {entity === "companies" ? <div className="mt-4"><Select ariaLabel="Outreach segment" value={segment} onChange={setSegment} options={[{ value: "", label: "Select segment (optional)" }, ...OUTREACH_SEGMENTS]} /></div> : null}
        {rows.length ? <p className="mt-4 text-sm text-neutral-300">Preview: {rows.length} rows detected.</p> : null}
        {message ? <p className="mt-3 rounded-md bg-white/5 p-3 text-sm text-neutral-300">{message}</p> : null}
        <div className="mt-5 flex justify-end gap-2"><Button onClick={close}>Close</Button><Button variant="primary" disabled={!rows.length} onClick={() => void importFile()}>Import {rows.length ? `${rows.length} rows` : "CSV"}</Button></div>
      </Panel>
    </div> : null}
  </>;
}
