"use node";

import { generateText, Output } from "ai";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import {
  languageModelFor,
  missingKeyMessage,
  providerConfigured,
  type AiProvider,
} from "./ai";
import {
  assessmentReportSchema,
  assessmentReportValidator,
  buildAssessmentPrompt,
  MAX_TRANSCRIPT_CHARACTERS,
  normalizeTranscript,
} from "./assessmentReport";

export const generate = action({
  args: {
    transcript: v.string(),
    clientName: v.optional(v.string()),
    businessType: v.optional(v.string()),
    assessmentDate: v.optional(v.string()),
  },
  returns: assessmentReportValidator,
  handler: async (ctx, args) => {
    const transcript = normalizeTranscript(args.transcript);
    if (transcript.length < 200) {
      throw new Error("The transcript is too short to create an assessment.");
    }
    if (transcript.length > MAX_TRANSCRIPT_CHARACTERS) {
      throw new Error(
        `The transcript exceeds the ${MAX_TRANSCRIPT_CHARACTERS.toLocaleString()} character limit.`,
      );
    }

    const settings: { provider: AiProvider } = await ctx.runQuery(
      internal.assessmentGeneratorData.loadSettings,
      {},
    );
    if (!providerConfigured(settings.provider)) {
      throw new Error(missingKeyMessage(settings.provider));
    }

    const result = await generateText({
      model: languageModelFor(settings.provider),
      output: Output.object({
        schema: assessmentReportSchema,
        name: "newrevgen_ai_tools_assessment",
        description:
          "A complete nine-page NewRevGen AI tools assessment grounded in a call transcript.",
      }),
      system: [
        "You are NewRevGen's assessment analyst.",
        "You convert discovery-call evidence into concise, practical automation recommendations for small and midsize businesses.",
        "Accuracy is more important than filling every field. Distinguish observed facts from recommendations.",
      ].join(" "),
      prompt: buildAssessmentPrompt({
        transcript,
        clientName: args.clientName,
        businessType: args.businessType,
        assessmentDate: args.assessmentDate,
      }),
      temperature: 0.2,
      maxOutputTokens: 6_000,
      maxRetries: 2,
      providerOptions:
        settings.provider === "openai" ? { openai: { store: false } } : undefined,
    });

    return result.output;
  },
});
