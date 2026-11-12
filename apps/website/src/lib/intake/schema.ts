export const intakeFocusAreas = [
  { value: "lead-response", label: "Lead response & routing" },
  { value: "quotes-follow-up", label: "Quotes, estimates & follow-up" },
  { value: "data-entry", label: "Copying data between systems" },
  { value: "inbox", label: "Inbox & customer emails" },
  { value: "reporting", label: "Pipeline & reporting visibility" },
  { value: "knowledge", label: "Documenting how work gets done" },
  { value: "research", label: "Research, lists & enrichment" },
  { value: "other", label: "Something else" },
] as const;

export const intakeTeamSizes = ["1–10", "11–50", "51–200", "200+"] as const;

export const intakeTimelines = [
  { value: "now", label: "As soon as possible" },
  { value: "quarter", label: "In the next 1–3 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export type IntakeFocusArea = (typeof intakeFocusAreas)[number]["value"];
export type IntakeTeamSize = (typeof intakeTeamSizes)[number];
export type IntakeTimeline = (typeof intakeTimelines)[number]["value"];

export interface IntakeSubmission {
  name: string;
  email: string;
  company: string;
  website?: string;
  teamSize?: IntakeTeamSize;
  timeline?: IntakeTimeline;
  focusAreas: IntakeFocusArea[];
  tools?: string;
  details: string;
}

export type IntakeParseResult =
  | { ok: true; value: IntakeSubmission }
  | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > max ? null : trimmed;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** Validates an untrusted intake payload from the public website form. */
export function parseIntake(input: unknown): IntakeParseResult {
  if (!isRecord(input)) return { ok: false, error: "Invalid submission." };

  const name = text(input.name, 120);
  if (!name || name.length < 2) return { ok: false, error: "Enter your name." };

  const email = text(input.email, 254)?.toLowerCase();
  if (!email || !emailPattern.test(email)) {
    return { ok: false, error: "Enter a valid work email." };
  }

  const company = text(input.company, 120);
  if (!company || company.length < 2) {
    return { ok: false, error: "Enter your company name." };
  }

  const website = text(input.website, 300);
  if (website === null) return { ok: false, error: "Check the website address." };

  const tools = text(input.tools, 500);
  if (tools === null) return { ok: false, error: "Shorten the list of tools." };

  const details = text(input.details, 4000);
  if (details === null) {
    return { ok: false, error: "Keep the description under 4,000 characters." };
  }
  if (details.length < 20) {
    return {
      ok: false,
      error: "Add a sentence or two about the workflow you want improved.",
    };
  }

  const teamSize = input.teamSize;
  if (
    teamSize !== undefined &&
    teamSize !== "" &&
    !intakeTeamSizes.includes(teamSize as IntakeTeamSize)
  ) {
    return { ok: false, error: "Choose a team size." };
  }

  const timeline = input.timeline;
  if (
    timeline !== undefined &&
    timeline !== "" &&
    !intakeTimelines.some((t) => t.value === timeline)
  ) {
    return { ok: false, error: "Choose a timeline." };
  }

  const rawFocus = input.focusAreas ?? [];
  if (!Array.isArray(rawFocus) || rawFocus.length > intakeFocusAreas.length) {
    return { ok: false, error: "Choose what you want improved." };
  }
  const focusAreas: IntakeFocusArea[] = [];
  for (const area of rawFocus) {
    if (!intakeFocusAreas.some((a) => a.value === area)) {
      return { ok: false, error: "Choose what you want improved." };
    }
    if (!focusAreas.includes(area as IntakeFocusArea)) {
      focusAreas.push(area as IntakeFocusArea);
    }
  }

  return {
    ok: true,
    value: {
      name,
      email,
      company,
      website: website || undefined,
      teamSize: teamSize ? (teamSize as IntakeTeamSize) : undefined,
      timeline: timeline ? (timeline as IntakeTimeline) : undefined,
      focusAreas,
      tools: tools || undefined,
      details,
    },
  };
}

/** Plain-text summary used for webhook delivery and the email fallback. */
export function formatIntake(intake: Partial<IntakeSubmission>): string {
  const focus = (intake.focusAreas ?? [])
    .map((value) => intakeFocusAreas.find((a) => a.value === value)?.label ?? value)
    .join(", ");
  const timeline = intakeTimelines.find((t) => t.value === intake.timeline)?.label;
  return [
    `Name: ${intake.name ?? ""}`,
    `Email: ${intake.email ?? ""}`,
    `Company: ${intake.company ?? ""}`,
    intake.website ? `Website: ${intake.website}` : null,
    intake.teamSize ? `Team size: ${intake.teamSize}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    focus ? `Wants improved: ${focus}` : null,
    intake.tools ? `Current tools: ${intake.tools}` : null,
    "",
    "What's happening today:",
    intake.details ?? "",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
