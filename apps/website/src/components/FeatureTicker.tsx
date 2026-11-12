"use client";

import { useSteppedRotation } from "./useSteppedRotation";

const ROW_PX = 32;

interface FeatureTickerProps {
  features: string[];
  /** How long each line stays put before sliding to the next. */
  holdMs?: number;
}

/**
 * Vertical feature ticker with a ✦ marker: each line slides up into a hard
 * stop, holds for `holdMs`, then slides to the next.
 */
export function FeatureTicker({ features, holdMs = 1800 }: FeatureTickerProps) {
  const { index, transition } = useSteppedRotation(features.length, holdMs);
  const rows = features.length ? [...features, features[0]] : [];

  return (
    <div className="feature-ticker">
      <div
        className="feature-ticker-track"
        aria-hidden="true"
        style={{ transform: `translateY(-${index * ROW_PX}px)`, transition }}
      >
        {rows.map((feature, i) => (
          <div className="feature-ticker-row" key={i}>
            <span className="feature-ticker-star">✦</span>
            <span className="feature-ticker-text">{feature}</span>
          </div>
        ))}
      </div>
      <p className="sr-only">{features.join(", ")}</p>
    </div>
  );
}
