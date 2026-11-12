"use client";

import { useEffect, useState } from "react";

export const ROTATION_SLIDE_MS = 350;
export const ROTATION_EASING = "cubic-bezier(0.32, 0, 0.67, 0)";

/**
 * Drives a vertical "slide, hard stop, hold" rotation over `count` items.
 * Render the items followed by a copy of the first one; `index` can reach
 * `count` (the copy), after which it snaps back to 0 without a transition so
 * the loop is seamless. `animate` says whether the current move should slide.
 */
export function useSteppedRotation(count: number, holdMs = 1800) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onCopy = index === count;
    const delay = onCopy ? ROTATION_SLIDE_MS : animate ? ROTATION_SLIDE_MS + holdMs : holdMs;
    const timer = setTimeout(() => {
      if (onCopy) {
        setAnimate(false);
        setIndex(0);
        return;
      }
      setAnimate(!reduce);
      setIndex(index + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [index, animate, count, holdMs]);

  const transition = animate ? `transform ${ROTATION_SLIDE_MS}ms ${ROTATION_EASING}` : "none";
  return { index, transition };
}
