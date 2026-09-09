"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { calculateToolResult } from "@/lib/lead-tools/calculators";
import type {
  AnswerValue,
  LeadIdentity,
  ToolAnswers,
  ToolDefinition,
  ToolQuestion,
  ToolResult,
} from "@/lib/lead-tools/types";
import { LeadGate } from "./LeadGate";
import { ResultView } from "./ResultView";

interface AssessmentExperienceProps {
  tool: ToolDefinition;
  gateMode: "preview" | "email-only";
}

export function AssessmentExperience({ tool, gateMode }: AssessmentExperienceProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ToolAnswers>({});
  const [phase, setPhase] = useState<"questions" | "gate" | "result" | "emailed">("questions");
  const [serverResult, setServerResult] = useState<ToolResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const localResult = useMemo(
    () => calculateToolResult(tool.slug, answers),
    [answers, tool.slug],
  );
  const question = tool.questions[step];
  const progress = phase === "questions" ? ((step + 1) / tool.questions.length) * 100 : 100;

  function setAnswer(value: AnswerValue) {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question || answers[question.id] === undefined || answers[question.id] === "") return;
    if (step === tool.questions.length - 1) {
      setPhase("gate");
    } else {
      setStep((current) => current + 1);
    }
  }

  async function submit(identity: LeadIdentity, honeypot: string) {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/tools/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: tool.slug,
          answers,
          ...identity,
          website_confirm: honeypot,
        }),
      });
      const body: unknown = await response.json();
      if (!response.ok || !body || typeof body !== "object" || !("result" in body)) {
        const message =
          body && typeof body === "object" && "error" in body && typeof body.error === "string"
            ? body.error
            : "We couldn’t deliver the report. Please try again.";
        throw new Error(message);
      }
      const result = body.result as ToolResult;
      setServerResult(result);
      setPhase(gateMode === "email-only" ? "emailed" : "result");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1120px] px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      {phase === "questions" ? (
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-medium leading-[0.98] text-white sm:text-5xl">{tool.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">{tool.description}</p>
        </div>
      ) : null}
      <div className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
        <span>{phase === "questions" ? `Question ${step + 1} of ${tool.questions.length}` : "Assessment complete"}</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-cp-lime transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <span>{tool.timeEstimate}</span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-cp-body-bg">
        {phase === "questions" && question ? (
          <form key={question.id} onSubmit={advance} className="min-h-[520px] p-6 sm:p-10 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cp-text">{tool.eyebrow}</p>
            <fieldset className="mt-10 max-w-3xl">
              <legend className="font-heading text-4xl font-medium leading-[1.02] text-cp-dark sm:text-5xl">
                {question.label}
              </legend>
              {question.help ? <p className="mt-4 max-w-2xl leading-7 text-cp-text">{question.help}</p> : null}
              <QuestionInput question={question} value={answers[question.id]} onChange={setAnswer} />
            </fieldset>
            <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-6">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-cp-text hover:text-cp-dark disabled:invisible"
              >
                <ArrowLeft aria-hidden="true" className="size-4" /> Back
              </button>
              <button
                type="submit"
                disabled={answers[question.id] === undefined || answers[question.id] === ""}
                className="inline-flex items-center gap-2 rounded-lg bg-cp-dark px-5 py-3 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-35"
              >
                {step === tool.questions.length - 1 ? "See my result" : "Continue"}
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </form>
        ) : null}

        {phase === "gate" ? (
          <div className="p-6 sm:p-10 lg:p-14">
            <LeadGate
              preview={gateMode === "preview" ? localResult.preview : undefined}
              submitting={submitting}
              error={error}
              onSubmit={submit}
            />
          </div>
        ) : null}

        {phase === "result" && serverResult ? (
          <div className="p-6 sm:p-10 lg:p-14">
            <ResultView result={serverResult} />
          </div>
        ) : null}

        {phase === "emailed" ? (
          <div className="flex min-h-[480px] flex-col items-center justify-center p-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-cp-lime text-cp-dark">
              <Check aria-hidden="true" className="size-7" />
            </span>
            <h2 className="mt-6 text-4xl font-medium">Your report is on its way.</h2>
            <p className="mt-3 max-w-md leading-7 text-cp-text">
              Check your work inbox for the complete result. Delivery can take a minute or two.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: ToolQuestion;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}) {
  if (question.type === "number") {
    return (
      <label className="mt-8 flex max-w-md items-center overflow-hidden rounded-xl border border-black/15 bg-white focus-within:border-cp-dark focus-within:ring-2 focus-within:ring-cp-lime">
        {question.prefix ? <span className="pl-5 text-xl font-semibold text-cp-text">{question.prefix}</span> : null}
        <input
          autoFocus
          required
          inputMode="decimal"
          type="number"
          min={question.min}
          max={question.max}
          step={question.step}
          value={typeof value === "number" ? value : ""}
          placeholder={question.placeholder}
          onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
          className="h-16 min-w-0 flex-1 bg-transparent px-4 font-heading text-3xl font-semibold text-cp-dark outline-none placeholder:text-black/20"
        />
        {question.suffix ? <span className="pr-5 text-sm font-semibold text-cp-text">{question.suffix}</span> : null}
      </label>
    );
  }

  if (question.type === "boolean") {
    return (
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ].map((option) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`flex min-h-16 items-center justify-between rounded-xl border px-5 text-left font-semibold transition ${
              value === option.value ? "border-cp-dark bg-cp-dark text-white" : "border-black/15 bg-white text-cp-dark hover:border-black/40"
            }`}
          >
            {option.label}
            {value === option.value ? <Check aria-hidden="true" className="size-5 text-cp-lime" /> : null}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-3">
      {question.options?.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`flex min-h-14 items-center justify-between rounded-xl border px-5 text-left font-semibold transition ${
            value === option.value ? "border-cp-dark bg-cp-dark text-white" : "border-black/15 bg-white text-cp-dark hover:border-black/40"
          }`}
        >
          {option.label}
          {value === option.value ? <Check aria-hidden="true" className="size-5 text-cp-lime" /> : null}
        </button>
      ))}
    </div>
  );
}
