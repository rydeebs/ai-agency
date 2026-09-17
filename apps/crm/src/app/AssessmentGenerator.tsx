import { useAction } from "convex/react";
import { toPng } from "html-to-image";
import { useMemo, useRef, useState } from "react";
import { api } from "../../convex/_generated/api";
import type { AssessmentReport } from "../../convex/assessmentReport";
import { Button, Input, PageHeader, Panel } from "../components/ui";
import { AssessmentSlides } from "../features/assessment/AssessmentSlides";
import {
  assessmentPdfFilename,
  buildAssessmentPdf,
} from "../lib/assessmentPdf";

const ACCEPTED_EXTENSIONS = [".txt", ".md", ".vtt", ".srt"];
const MAX_UPLOAD_BYTES = 1_000_000;

function todayForInput(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function displayDate(value: string): string {
  if (!value) return "";
  const parsed = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "The assessment could not be generated. Please try again.";
}

export function AssessmentGenerator() {
  const generateAssessment = useAction(api.assessmentGenerator.generate);
  const deckRef = useRef<HTMLDivElement>(null);
  const [transcript, setTranscript] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [assessmentDate, setAssessmentDate] = useState(todayForInput);
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const transcriptCharacters = transcript.length;
  const canGenerate = transcript.trim().length >= 200 && !generating;
  const acceptedLabel = useMemo(() => ACCEPTED_EXTENSIONS.join(", "), []);

  const readTranscriptFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setError(`Use a text transcript in ${acceptedLabel} format.`);
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError("The transcript file must be smaller than 1 MB.");
      return;
    }
    const text = await file.text();
    setTranscript(text);
    setFileName(file.name);
    setReport(null);
  };

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setGenerating(true);
    setError(null);
    setReport(null);
    try {
      const result = await generateAssessment({
        transcript,
        clientName: clientName.trim() || undefined,
        businessType: businessType.trim() || undefined,
        assessmentDate: displayDate(assessmentDate) || undefined,
      });
      setReport(result);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!report || !deckRef.current) return;
    setExporting(true);
    setExportProgress(0);
    setError(null);
    try {
      await document.fonts.ready;
      const slides = Array.from(
        deckRef.current.querySelectorAll<HTMLElement>("[data-assessment-slide]"),
      );
      const images: Array<string> = [];
      for (const [index, slide] of slides.entries()) {
        images.push(
          await toPng(slide, {
            width: 960,
            height: 540,
            pixelRatio: 2,
            cacheBust: true,
          }),
        );
        setExportProgress(index + 1);
      }
      const bytes = await buildAssessmentPdf(images);
      const blob = new Blob([new Uint8Array(bytes).buffer], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = assessmentPdfFilename(report.clientName);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (caught) {
      setError(`PDF export failed: ${errorMessage(caught)}`);
    } finally {
      setExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <div className="mx-auto max-w-[1240px]">
      <PageHeader
        title="Assessment Generator"
        subtitle="Upload a call transcript, review the generated assessment, and download the branded PDF."
        action={
          report ? (
            <Button
              variant="primary"
              disabled={exporting}
              onClick={() => void handleDownloadPdf()}
            >
              {exporting
                ? `Rendering page ${exportProgress || 1} of 9…`
                : "Download PDF"}
            </Button>
          ) : undefined
        }
      />

      <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-4">
          <Panel className="p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-white">1. Add transcript</h2>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                Upload {acceptedLabel}, or paste the transcript below. The raw
                transcript is sent to your selected AI provider but is not saved
                by this generator.
              </p>
            </div>
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-edge-strong bg-ink px-3 py-3 text-sm text-neutral-400 transition-colors hover:border-accent hover:text-white">
              <span className="truncate">{fileName ?? "Choose transcript file"}</span>
              <span className="shrink-0 rounded bg-raised px-2 py-1 text-xs text-neutral-300">
                Browse
              </span>
              <input
                className="sr-only"
                type="file"
                accept={ACCEPTED_EXTENSIONS.join(",")}
                onChange={(event) => void readTranscriptFile(event.target.files?.[0])}
              />
            </label>
            <div className="my-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-neutral-600">
              <span className="h-px flex-1 bg-edge" />
              or paste
              <span className="h-px flex-1 bg-edge" />
            </div>
            <textarea
              value={transcript}
              onChange={(event) => {
                setTranscript(event.target.value);
                setFileName(null);
                setReport(null);
              }}
              placeholder="Paste the call transcript here…"
              className="h-56 w-full resize-y rounded-md border border-edge bg-ink px-3 py-2 text-sm leading-relaxed text-white placeholder:text-neutral-600 focus:border-accent focus:outline-none"
            />
            <p className="mt-2 text-right text-[11px] text-neutral-600">
              {transcriptCharacters.toLocaleString()} characters
            </p>
          </Panel>

          <Panel className="p-4">
            <h2 className="text-sm font-semibold text-white">2. Add context</h2>
            <p className="mt-1 text-xs text-neutral-500">
              Optional hints take precedence over transcript inference.
            </p>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs text-neutral-400">Client name</span>
                <Input
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  placeholder="Acme Services"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-neutral-400">Business type</span>
                <Input
                  value={businessType}
                  onChange={(event) => setBusinessType(event.target.value)}
                  placeholder="Residential HVAC"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-neutral-400">Assessment date</span>
                <Input
                  type="date"
                  value={assessmentDate}
                  onChange={(event) => setAssessmentDate(event.target.value)}
                />
              </label>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="primary"
                disabled={!canGenerate}
                onClick={() => void handleGenerate()}
              >
                {generating ? "Reviewing transcript…" : "Generate assessment"}
              </Button>
              {report ? (
                <Button variant="ghost" onClick={() => setReport(null)}>
                  Clear draft
                </Button>
              ) : null}
            </div>
            {!canGenerate && !generating && transcript.trim().length > 0 ? (
              <p className="mt-2 text-xs text-neutral-500">
                Add at least 200 characters of transcript text.
              </p>
            ) : null}
          </Panel>

          {error ? (
            <div className="rounded-md border border-red-500/50 bg-red-900/25 p-3 text-sm leading-relaxed text-red-400">
              {error}
            </div>
          ) : null}

          {report?.unknowns.length ? (
            <Panel className="p-4">
              <h2 className="text-sm font-semibold text-white">Review before sending</h2>
              <p className="mt-1 text-xs text-neutral-500">
                The transcript did not establish these details.
              </p>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-neutral-300">
                {report.unknowns.map((unknown, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{unknown}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}
        </div>

        <Panel className="min-w-0 overflow-hidden bg-raised/30">
          <div className="flex items-center justify-between border-b border-edge px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Report preview</h2>
              <p className="mt-0.5 text-xs text-neutral-500">
                Nine 16:9 pages · scroll horizontally to inspect full size
              </p>
            </div>
          </div>
          <div className="min-h-[560px] overflow-auto p-5">
            {report ? (
              <AssessmentSlides ref={deckRef} report={report} />
            ) : (
              <div className="flex min-h-[500px] items-center justify-center">
                <div className="max-w-sm text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl border border-edge bg-panel text-2xl text-neutral-500">
                    9
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">
                    Your assessment will appear here
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Add a transcript and generate the draft. Nothing is emailed
                    automatically.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
