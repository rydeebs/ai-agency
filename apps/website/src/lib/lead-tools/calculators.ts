import type {
  BenchmarkMetrics,
  ResultFinding,
  ToolAnswers,
  ToolResult,
  ToolSlug,
} from "./types";

const bookingUrl = "https://calendar.app.google/fvAx1yvcih4jMp346";

const numberValue = (answers: ToolAnswers, key: string): number => {
  const value = answers[key];
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const ratioValue = (answers: ToolAnswers, key: string): number =>
  Math.min(1, Math.max(0, numberValue(answers, key)));

const percentValue = (answers: ToolAnswers, key: string): number =>
  Math.min(1, Math.max(0, numberValue(answers, key) / 100));

const yesValue = (answers: ToolAnswers, key: string): number =>
  answers[key] === true || answers[key] === "true" ? 1 : 0;

const clampScore = (value: number): number =>
  Math.round(Math.min(100, Math.max(0, value)));

const currency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));

const range = (low: number, high: number): string =>
  `${currency(low)}–${currency(high)}`;

function maturityBand(score: number): string {
  if (score < 40) return "Exposed";
  if (score < 60) return "Reactive";
  if (score < 80) return "Controlled";
  return "Transferable";
}

function calculateRevenueLeak(answers: ToolAnswers): ToolResult {
  const categoryScores = [
    {
      title: "Lead capture",
      score:
        (ratioValue(answers, "missedCallHandling") * 0.55 +
          ratioValue(answers, "afterHoursCoverage") * 0.45) *
        100,
      description:
        "Missed and after-hours inquiries need an immediate acknowledgment, a destination, and a named follow-up owner.",
    },
    {
      title: "Response speed",
      score: ratioValue(answers, "responseTime") * 100,
      description:
        "Response time should be measured from the first inquiry to the first meaningful human contact.",
    },
    {
      title: "Estimate follow-up",
      score: ratioValue(answers, "followUpCadence") * 100,
      description:
        "Every open estimate needs a repeatable cadence, stop rules, and a dated next action.",
    },
    {
      title: "Opportunity ownership",
      score:
        (ratioValue(answers, "opportunityOwnership") * 0.65 +
          ratioValue(answers, "ownerIndependence") * 0.35) *
        100,
      description:
        "Opportunities should move because the system assigns the work—not because the owner remembers it.",
    },
    {
      title: "System visibility",
      score:
        (ratioValue(answers, "crmCompleteness") * 0.65 +
          ratioValue(answers, "sourceTracking") * 0.35) *
        100,
      description:
        "Current statuses, lead sources, and next steps make revenue leakage visible before jobs disappear.",
    },
  ];
  const score = clampScore(
    categoryScores.reduce((sum, category) => sum + category.score, 0) /
      categoryScores.length,
  );
  const leaks = [...categoryScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map<ResultFinding>((category) => ({
      title: category.title,
      description: category.description,
      status: category.score >= 75 ? "pass" : "warning",
    }));

  const monthlyLeads = numberValue(answers, "monthlyLeads");
  const averageJobValue = numberValue(answers, "averageJobValue");
  const captureGap = 1 - ratioValue(answers, "missedCallHandling");
  const speedGap = 1 - ratioValue(answers, "responseTime");
  const openEstimateValue = numberValue(answers, "openEstimateValue");
  const followUpGap = 1 - ratioValue(answers, "followUpCadence");
  const captureOpportunity =
    monthlyLeads * averageJobValue * (captureGap * 0.035 + speedGap * 0.015);
  const estimateOpportunity = openEstimateValue * followUpGap;
  const monthlyLow = captureOpportunity * 0.45 + estimateOpportunity * 0.015;
  const monthlyHigh = captureOpportunity * 0.9 + estimateOpportunity * 0.05;
  const band = maturityBand(score);

  return {
    toolSlug: "revenue-leak-scorecard",
    preview: {
      label: "Revenue-system score",
      value: `${score}/100`,
      context: `${band} maturity band`,
    },
    headline: `Your revenue system is ${band.toLowerCase()}.`,
    summary:
      score >= 80
        ? "The core process appears repeatable without constant owner intervention. The remaining opportunity is tighter measurement and optimization."
        : "The inputs point to existing demand that may be losing momentum between first contact, estimate, and booked job.",
    metrics: [
      { label: "Overall score", value: `${score}/100` },
      { label: "Maturity band", value: band },
      {
        label: "Modeled monthly opportunity",
        value: range(monthlyLow, monthlyHigh),
        detail: "Conservative range, not guaranteed recovery",
      },
      {
        label: "Modeled annual opportunity",
        value: range(monthlyLow * 12, monthlyHigh * 12),
        detail: "Assumes similar monthly volume",
      },
    ],
    findings: leaks,
    nextAction: `Start with ${leaks[0]?.title.toLowerCase() ?? "the lowest-scoring workflow"}: document the handoff, assign one owner, and measure it weekly for 30 days.`,
    disclaimer:
      "This directional model uses your inputs and conservative scenario assumptions. It is not a promise of recovered revenue or financial advice.",
    benchmarkMetrics: {
      missedCallRecovery: clampScore(ratioValue(answers, "missedCallHandling") * 100),
      responseTime: clampScore(ratioValue(answers, "responseTime") * 100),
      estimateFollowUp: clampScore(ratioValue(answers, "followUpCadence") * 100),
      crmCompleteness: clampScore(ratioValue(answers, "crmCompleteness") * 100),
      afterHoursCoverage: clampScore(ratioValue(answers, "afterHoursCoverage") * 100),
      ownerIndependence: clampScore(ratioValue(answers, "ownerIndependence") * 100),
    },
  };
}

function calculateMissedCalls(answers: ToolAnswers): ToolResult {
  const calls = numberValue(answers, "callsPerMonth");
  const missed = percentValue(answers, "missedCallPercentage");
  const opportunities = percentValue(answers, "salesOpportunityPercentage");
  const booking = percentValue(answers, "bookingRate");
  const jobValue = numberValue(answers, "averageJobValue");
  const [marginLow, marginHigh] = String(answers.grossMarginRange ?? "25-35")
    .split("-")
    .map((value) => Number(value) / 100);
  const middle = calls * missed * opportunities * booking * jobValue;
  const low =
    calls * Math.max(0, missed * 0.8) * Math.max(0, opportunities * 0.85) *
    Math.max(0, booking * 0.85) * jobValue;
  const high =
    calls * Math.min(1, missed * 1.2) * Math.min(1, opportunities * 1.1) *
    Math.min(1, booking * 1.15) * jobValue;

  return {
    toolSlug: "missed-call-calculator",
    preview: {
      label: "Monthly revenue potentially exposed",
      value: range(low, high),
      context: `${Math.round(calls * missed)} estimated missed calls per month`,
    },
    headline: `${range(low, high)} in monthly revenue may be exposed.`,
    summary:
      "This is scenario modeling—not expected recovered revenue. It estimates the booked-job value attached to missed qualified calls if they behaved like answered qualified calls.",
    metrics: [
      { label: "Low scenario / month", value: currency(low) },
      { label: "Middle scenario / month", value: currency(middle) },
      { label: "High scenario / month", value: currency(high) },
      { label: "Annual range", value: range(low * 12, high * 12) },
      {
        label: "Gross-profit exposure / month",
        value: range(low * marginLow, high * marginHigh),
        detail: `Using the selected ${Math.round(marginLow * 100)}%–${Math.round(marginHigh * 100)}% margin range`,
      },
    ],
    findings: [
      {
        title: "Missed-call rate",
        description:
          "A 10% change in the missed-call assumption changes every scenario by roughly 10%. Pull a phone-system report before making an investment decision.",
        status: "warning",
      },
      {
        title: "Qualified-call share",
        description:
          "Separate sales opportunities from customers, vendors, spam, and recruiting calls; this assumption often creates the widest uncertainty.",
        status: "warning",
      },
      {
        title: "Job value and booking rate",
        description:
          "Use realized averages from booked work, not the largest ticket or a hoped-for close rate.",
        status: "warning",
      },
    ],
    nextAction:
      "Pull 30 days of call logs, sample the missed calls, and tag which were genuine opportunities. That replaces the two most sensitive assumptions with observed data.",
    disclaimer:
      "Potentially exposed revenue is not guaranteed recovery. The low, middle, and high cases vary the most uncertain conversion assumptions around the values you supplied.",
    benchmarkMetrics: {},
  };
}

function calculateEstimateGap(answers: ToolAnswers): ToolResult {
  const estimatesPerMonth = numberValue(answers, "estimatesPerMonth");
  const estimateSize = numberValue(answers, "averageEstimateSize");
  const closeRate = percentValue(answers, "currentCloseRate");
  const open7 = numberValue(answers, "open7To13");
  const open14 = numberValue(answers, "open14To29");
  const open30 = numberValue(answers, "open30Plus");
  const followUp = ratioValue(answers, "followUpCount");
  const ownership = yesValue(answers, "ownerAndNextAction");
  const agedTotal = open7 + open14 + open30;
  const backlogRatio = estimatesPerMonth > 0 ? agedTotal / estimatesPerMonth : 0;
  const backlogHealth = Math.max(0, 1 - Math.min(1, backlogRatio / 1.5));
  const score = clampScore(
    (followUp * 0.5 + ownership * 0.3 + backlogHealth * 0.2) * 100,
  );
  const weightedOpenValue = estimateSize * (open7 * 1 + open14 * 0.8 + open30 * 0.55);
  const processGap = Math.max(0.2, 1 - (followUp * 0.7 + ownership * 0.3));
  const low = weightedOpenValue * (0.02 + processGap * 0.015);
  const high = weightedOpenValue * (0.045 + processGap * 0.045);
  const findings: ResultFinding[] = [
    {
      title: "Follow-up cadence",
      description:
        followUp >= 0.65
          ? "Your stated cadence is a solid base; confirm it is completed and measured, not merely scheduled."
          : "One or no proactive follow-ups leaves buyer timing and unanswered questions unmanaged.",
      status: followUp >= 0.65 ? "pass" : "warning",
    },
    {
      title: "Owner and next action",
      description:
        ownership === 1
          ? "Every estimate has the two fields needed to keep work from becoming invisible."
          : "An estimate without one owner and a dated next action is easy to lose in a shared queue.",
      status: ownership === 1 ? "pass" : "warning",
    },
    {
      title: "Aged estimate load",
      description: `${Math.round(agedTotal)} estimates are at least seven days old; ${Math.round(open30)} have been open for 30 days or more.`,
      status: backlogRatio <= 0.5 ? "pass" : "warning",
    },
  ];

  return {
    toolSlug: "estimate-follow-up-gap",
    preview: {
      label: "Follow-up maturity score",
      value: `${score}/100`,
      context: `${Math.round(agedTotal)} estimates are at least 7 days old`,
    },
    headline: `${range(low, high)} may be worth testing in your current estimate pipeline.`,
    summary:
      "The recovery range applies modest incremental close-rate scenarios to age-weighted open estimate value. Older estimates are discounted because not every open quote is still viable.",
    metrics: [
      { label: "Follow-up maturity", value: `${score}/100` },
      { label: "Open estimate face value", value: currency(agedTotal * estimateSize) },
      { label: "Modeled recovery opportunity", value: range(low, high) },
      { label: "Current monthly booked value", value: currency(estimatesPerMonth * estimateSize * closeRate) },
    ],
    findings,
    nextAction:
      ownership === 0
        ? "Assign one owner and a dated next action to every open estimate, beginning with the 7–29 day queue."
        : "Run a 30-day follow-up test on the 7–29 day queue and compare incremental closes with your current baseline.",
    disclaimer:
      "This model discounts older estimates and applies a conservative incremental close-rate range. It does not assume every open estimate is recoverable.",
    benchmarkMetrics: {
      estimateFollowUp: score,
    },
  };
}

function calculateSellerIndependence(answers: ToolAnswers): ToolResult {
  const categories = [
    ["Missed-call recovery", "missedCallRecovery"],
    ["Estimate follow-up", "estimateFollowUp"],
    ["After-hours routing", "afterHoursRouting"],
    ["CRM ownership", "crmOwnership"],
    ["Process documentation", "processDocumentation"],
    ["Access documentation", "credentialDocumentation"],
    ["Exception handling", "exceptionHandling"],
    ["Management reporting", "managementReporting"],
  ] as const;
  const scored = categories.map(([title, key]) => ({
    title,
    value: ratioValue(answers, key),
  }));
  const valueFor = (key: string): number => ratioValue(answers, key);
  const operationalIndependence =
    valueFor("missedCallRecovery") * 0.15 +
    valueFor("estimateFollowUp") * 0.18 +
    valueFor("afterHoursRouting") * 0.12 +
    valueFor("crmOwnership") * 0.18 +
    valueFor("exceptionHandling") * 0.2 +
    valueFor("managementReporting") * 0.17;
  const transferability = clampScore(
    (operationalIndependence * 0.65 +
      valueFor("processDocumentation") * 0.2 +
      valueFor("credentialDocumentation") * 0.15) *
      100,
  );
  const ownerDependence = 100 - clampScore(operationalIndependence * 100);
  const risks = [...scored]
    .sort((a, b) => a.value - b.value)
    .slice(0, 3)
    .map<ResultFinding>((item) => ({
      title: item.title,
      description: `${item.title} currently appears ${item.value >= 0.7 ? "mostly repeatable" : "dependent on informal knowledge or owner intervention"}.`,
      status: item.value >= 0.7 ? "pass" : "warning",
    }));

  const benchmarkMetrics: BenchmarkMetrics = {
    missedCallRecovery: clampScore(ratioValue(answers, "missedCallRecovery") * 100),
    estimateFollowUp: clampScore(ratioValue(answers, "estimateFollowUp") * 100),
    crmCompleteness: clampScore(ratioValue(answers, "crmOwnership") * 100),
    afterHoursCoverage: clampScore(ratioValue(answers, "afterHoursRouting") * 100),
    ownerIndependence: clampScore(operationalIndependence * 100),
  };

  return {
    toolSlug: "seller-independence-check",
    preview: {
      label: "Owner-dependence score",
      value: `${ownerDependence}/100`,
      context: "Lower is better",
    },
    headline:
      ownerDependence <= 25
        ? "Your revenue process appears substantially transferable."
        : "Key parts of the revenue process still appear owner-dependent.",
    summary:
      "Transferability improves when the team can see, own, and resolve routine revenue work from documented systems without waiting for the owner.",
    metrics: [
      {
        label: "Owner-dependence score",
        value: `${ownerDependence}/100`,
        detail: "Lower is better",
      },
      {
        label: "Revenue transferability score",
        value: `${transferability}/100`,
        detail: "Higher is better",
      },
    ],
    findings: risks,
    nextAction: `Choose one recurring exception inside ${risks[0]?.title.toLowerCase() ?? "the lowest-scoring area"}, document the decision rule, assign a non-owner decision maker, and review the outcome weekly.`,
    disclaimer:
      "This operational check is not a valuation, diligence report, legal opinion, or assurance that a business can operate without its owner.",
    benchmarkMetrics,
  };
}

export function calculateToolResult(
  slug: Exclude<ToolSlug, "website-revenue-audit">,
  answers: ToolAnswers,
): ToolResult {
  switch (slug) {
    case "revenue-leak-scorecard":
      return calculateRevenueLeak(answers);
    case "missed-call-calculator":
      return calculateMissedCalls(answers);
    case "estimate-follow-up-gap":
      return calculateEstimateGap(answers);
    case "seller-independence-check":
      return calculateSellerIndependence(answers);
  }
}

export function buildResultEmail(result: ToolResult, company: string): {
  subject: string;
  body: string;
} {
  const metrics = result.metrics
    .map((metric) => `• ${metric.label}: ${metric.value}${metric.detail ? ` (${metric.detail})` : ""}`)
    .join("\n");
  const findings = result.findings
    .map((finding, index) => `${index + 1}. ${finding.title}\n${finding.description}`)
    .join("\n\n");

  return {
    subject: `${company}: your NewRevGen assessment results`,
    body: [
      `Here are the results for ${company}.`,
      result.headline,
      result.summary,
      "RESULTS",
      metrics,
      "WHAT TO LOOK AT NEXT",
      findings,
      `Recommended next action: ${result.nextAction}`,
      `If you want to walk through the result with NewRevGen, book a time: ${bookingUrl}`,
      result.disclaimer,
      "NewRevGen · AI revenue systems for contractors and service businesses",
    ].join("\n\n"),
  };
}
