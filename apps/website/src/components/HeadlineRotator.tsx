"use client";

import { useSteppedRotation } from "./useSteppedRotation";

const ROW_EM = 1.15;

interface HeadlineRotatorProps {
  words: string[];
  holdMs?: number;
}

/**
 * Inline word rotator for a headline. Sits on the text baseline, sizes to the
 * widest word, and clips with clip-path (not overflow) so the baseline still
 * lines up with the words before it.
 */
export function HeadlineRotator({ words, holdMs = 1800 }: HeadlineRotatorProps) {
  const { index, transition } = useSteppedRotation(words.length, holdMs);
  const rows = words.length ? [...words, words[0]] : [];

  return (
    <>
      <span className="headline-rotator" aria-hidden="true">
        <span
          className="headline-rotator-track"
          style={{ transform: `translateY(-${index * ROW_EM}em)`, transition }}
        >
          {rows.map((word, i) => (
            <span className="headline-rotator-word" key={i}>
              {word}
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </>
  );
}
