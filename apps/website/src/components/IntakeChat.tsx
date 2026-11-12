"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { INTAKE_GREETING } from "@/lib/intake/agent";
import { useVoiceCall } from "@/components/intake/useVoiceCall";

const contactEmail = "team@newrevgen.com";
const bookingUrl = "https://calendar.app.google/fvAx1yvcih4jMp346";

const starters = [
  "Leads slip through the cracks",
  "Quotes take forever to go out",
  "We copy data between tools all day",
  "Our inbox is chaos",
];


interface Turn {
  id: string;
  role: "user" | "assistant";
  content: string;
}

let turnCounter = 0;
function makeTurn(role: Turn["role"], content: string): Turn {
  turnCounter += 1;
  return { id: `t${turnCounter}`, role, content };
}

const PENDING = "…";

function formatClock(totalSeconds: number): string {
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

type Mode = "agent" | "simple";

function transcriptOf(turns: Turn[]): string {
  return turns
    .map((t) => `${t.role === "user" ? "Me" : "NewRevGen"}: ${t.content}`)
    .join("\n\n");
}

function mailtoHref(turns: Turn[]): string {
  const body = transcriptOf(turns.filter((t) => t.role === "user"));
  return `mailto:${contactEmail}?subject=${encodeURIComponent("What I'd like fixed")}&body=${encodeURIComponent(body)}`;
}

export function IntakeChat() {
  const [turns, setTurns] = useState<Turn[]>([
    { id: "greeting", role: "assistant", content: INTAKE_GREETING },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<Mode>("agent");
  const [saved, setSaved] = useState(false);
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [contactError, setContactError] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const turnsRef = useRef(turns);
  const savedRef = useRef(saved);
  useEffect(() => {
    turnsRef.current = turns;
    savedRef.current = saved;
  }, [turns, saved]);

  const voice = useVoiceCall({
    addTurn: (role, content) => {
      const turn = makeTurn(role, content);
      setTurns((prev) => [...prev, turn]);
      return turn.id;
    },
    updateTurn: (id, content) =>
      setTurns((prev) =>
        prev.map((t) => (t.id === id ? { ...t, content } : t)),
      ),
    removeTurn: (id) => setTurns((prev) => prev.filter((t) => t.id !== id)),
    getTranscript: () =>
      turnsRef.current
        .filter((t) => t.content !== PENDING)
        .map((t) => `${t.role === "user" ? "Visitor" : "Agent"}: ${t.content}`)
        .join("\n\n"),
    isSaved: () => savedRef.current,
    onSaved: () => setSaved(true),
    onNotice: (message) =>
      setTurns((prev) => [...prev, makeTurn("assistant", message)]),
  });
  const onCall = voice.status === "connecting" || voice.status === "live";

  const [voiceAvailable, setVoiceAvailable] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/intake/voice-session")
      .then((r) => r.json())
      .then((d: { available?: boolean }) => {
        if (!cancelled) setVoiceAvailable(Boolean(d.available));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const userTurns = turns.filter((t) => t.role === "user");
  const askForContact = mode === "simple" && userTurns.length > 0 && !saved;

  // Keep the newest message in view without scrolling the page itself.
  useEffect(() => {
    const node = threadRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [turns, busy, askForContact, saved]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy || onCall) return;
    const next: Turn[] = [...turns, makeTurn("user", content)];
    setTurns(next);
    setDraft("");

    if (mode === "simple") {
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/intake/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is static and known server-side, so only send the real exchange.
        body: JSON.stringify({
          messages: next
            .slice(1)
            .filter((t) => t.content !== PENDING)
            .map(({ role, content: text }) => ({ role, content: text })),
          saved,
        }),
      });
      const data: {
        reply?: string;
        saved?: boolean;
        deliveryFailed?: boolean;
        error?: string;
        fallback?: string;
      } = await response.json().catch(() => ({}));

      if (response.ok && data.reply) {
        setTurns((prev) => [
          ...prev,
          makeTurn("assistant", data.reply as string),
        ]);
        if (data.saved) setSaved(true);
        if (data.deliveryFailed) setShowEmailFallback(true);
        return;
      }
      if (data.fallback === "simple") {
        setMode("simple");
        setTurns((prev) => [
          ...prev,
          makeTurn(
            "assistant",
            "Got it — thanks for laying that out. Leave your details below and a person on our team will reply by email. Add more anytime.",
          ),
        ]);
        return;
      }
      setTurns((prev) => [
        ...prev,
        makeTurn(
          "assistant",
          data.error ??
            "Sorry, something went wrong on our end. Try again, or email us directly.",
        ),
      ]);
      setShowEmailFallback(true);
    } catch {
      setTurns((prev) => [
        ...prev,
        makeTurn(
          "assistant",
          "I couldn't reach the server. You can email this to us instead.",
        ),
      ]);
      setShowEmailFallback(true);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactError("");
    setBusy(true);
    const details = userTurns.map((t) => t.content).join("\n\n");
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          details:
            details.length >= 20
              ? details
              : `${details} (shared via the website chat box)`,
          focusAreas: [],
          transcript: transcriptOf(turns),
        }),
      });
      const data: { error?: string; fallback?: string } = await response
        .json()
        .catch(() => ({}));
      if (response.ok) {
        setSaved(true);
        setTurns((prev) => [
          ...prev,
          makeTurn(
            "assistant",
            `Thanks, ${contact.name.split(" ")[0] || "there"} — it's with the team. Expect a reply at ${contact.email}, usually within one business day.`,
          ),
        ]);
        return;
      }
      setContactError(data.error ?? "That didn't go through.");
      if (data.fallback === "email") setShowEmailFallback(true);
    } catch {
      setContactError("We couldn't reach the server.");
      setShowEmailFallback(true);
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void send(draft);
    }
  }

  return (
    <div id="intake" className="chat-card">
            <div className="chat-head">
              <div>
                <h2 className="chat-title">What&apos;s slowing you down?</h2>
                <span className="chat-status">
                  <span className="chat-dot" aria-hidden="true" />
                  {voice.status === "live"
                    ? `On a call · ${formatClock(voice.seconds)}`
                    : mode === "agent"
                      ? "AI assistant · a person follows up"
                      : "A person reads every message"}
                </span>
              </div>
            </div>

            {voiceAvailable && (
              <div className={`voice-panel${onCall ? " is-live" : ""}`}>
                <button
                  type="button"
                  className="voice-mic"
                  onClick={() => (onCall ? voice.hangUp() : void voice.start())}
                  disabled={voice.status === "connecting"}
                  aria-label={onCall ? "End the call" : "Start talking to NewRevGen"}
                >
                  <span className="voice-ring" aria-hidden="true" />
                  <span className="voice-ring voice-ring-2" aria-hidden="true" />
                  {onCall && voice.status === "live" ? (
                    <span className="voice-level" ref={voice.levelRef} aria-hidden="true" />
                  ) : (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                      <rect x="9" y="3" width="6" height="11" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                    </svg>
                  )}
                </button>
                <div className="voice-copy">
                  {voice.status === "connecting" ? (
                    <>
                      <strong>Connecting…</strong>
                      <span>Allow your microphone if your browser asks.</span>
                    </>
                  ) : voice.status === "live" ? (
                    <>
                      <strong>We&apos;re listening · {formatClock(voice.seconds)}</strong>
                      <span>Just talk. We&apos;re taking notes. Tap to hang up.</span>
                    </>
                  ) : (
                    <>
                      <strong>Rather talk it out?</strong>
                      <span>Tap the mic and tell us what&apos;s going on. We&apos;ll ask a few questions and take notes.</span>
                    </>
                  )}
                </div>
                {onCall && (
                  <button type="button" className="voice-end" onClick={() => voice.hangUp()}>
                    End
                  </button>
                )}
              </div>
            )}

            <div className="chat-thread" ref={threadRef} aria-live="polite">
              {turns.map((turn) => (
                <div
                  key={turn.id}
                  className={`chat-bubble ${turn.role === "user" ? "is-user" : "is-agent"}${turn.content === PENDING ? " is-pending" : ""}`}
                >
                  {turn.content}
                </div>
              ))}
              {busy && mode === "agent" && (
                <div
                  className="chat-bubble is-agent chat-typing"
                  aria-label="Typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
              )}

              {userTurns.length === 0 && !onCall && (
                <div className="chat-starters">
                  {starters.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      disabled={busy}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {askForContact && (
                <form className="chat-contact" onSubmit={submitContact}>
                  <input
                    aria-label="Your name"
                    placeholder="Your name"
                    required
                    minLength={2}
                    autoComplete="name"
                    value={contact.name}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                  />
                  <input
                    aria-label="Work email"
                    placeholder="Work email"
                    type="email"
                    required
                    autoComplete="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                  />
                  <input
                    aria-label="Company"
                    placeholder="Company"
                    required
                    minLength={2}
                    autoComplete="organization"
                    value={contact.company}
                    onChange={(e) =>
                      setContact({ ...contact, company: e.target.value })
                    }
                  />
                  <button type="submit" disabled={busy}>
                    {busy ? "Sending…" : "Send to the team"}
                  </button>
                  {contactError && <p className="chat-error">{contactError}</p>}
                </form>
              )}

              {saved && (
                <div className="chat-saved" role="status">
                  ✓ Sent to the team
                </div>
              )}

              {showEmailFallback && (
                <a className="chat-fallback" href={mailtoHref(turns)}>
                  Email this conversation to us instead →
                </a>
              )}
            </div>

            <form
              className="chat-composer"
              onSubmit={(e) => {
                e.preventDefault();
                void send(draft);
              }}
            >
              <label htmlFor="intake-message" className="sr-only">
                Your message
              </label>
              <textarea
                id="intake-message"
                ref={inputRef}
                rows={1}
                maxLength={4000}
                disabled={(mode === "simple" && saved) || onCall}
                placeholder={
                  onCall
                    ? "On a call — just talk, we're taking notes"
                    : mode === "simple" && saved
                      ? "Sent — email us to add anything else"
                      : userTurns.length
                        ? "Reply…"
                        : "Start venting…"
                }
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label="Send message"
              >
                ↑
              </button>
            </form>
            <p className="chat-footnote">
              Prefer a person? <a href={bookingUrl}>Book a call</a> or email{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Please don&apos;t share
              passwords or customer data here.
            </p>

      <style jsx>{`
        .chat-card {
          background: #17181b;
          border-radius: 16px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100%;
          min-height: 560px;
          box-sizing: border-box;
          scroll-margin-top: 24px;
        }
        .chat-title {
          margin: 0 0 4px;
          color: #fff;
          font-family: var(--font-darker-grotesque), sans-serif;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.01em;
        }
        .chat-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px 12px;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .chat-head strong {
          display: block;
          font-size: 15px;
          font-weight: 600;
        }
        .chat-head > div {
          flex: 1;
          min-width: 0;
        }
        .voice-panel {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 10px 8px 0;
          padding: 14px 16px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(211, 244, 99, 0.16), rgba(211, 244, 99, 0.04));
          border: 1px solid rgba(211, 244, 99, 0.35);
        }
        .voice-panel.is-live {
          background: linear-gradient(135deg, rgba(211, 244, 99, 0.24), rgba(211, 244, 99, 0.08));
          border-color: rgba(211, 244, 99, 0.6);
        }
        .voice-mic {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 0;
          background: #d3f463;
          color: #17181b;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 8px 24px -6px rgba(211, 244, 99, 0.6);
          transition: transform 0.15s ease;
        }
        .voice-mic:hover:not(:disabled) {
          transform: scale(1.06);
        }
        .voice-mic:focus-visible {
          outline: 3px solid #fff;
          outline-offset: 3px;
        }
        .voice-mic:disabled {
          cursor: wait;
        }
        .voice-mic svg {
          position: relative;
          z-index: 1;
        }
        .voice-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(211, 244, 99, 0.7);
          animation: voice-pulse 2.4s ease-out infinite;
          pointer-events: none;
        }
        .voice-ring-2 {
          animation-delay: 1.2s;
        }
        @keyframes voice-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .voice-level {
          position: relative;
          z-index: 1;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #17181b;
          transition: transform 80ms linear;
        }
        .voice-copy {
          flex: 1;
          min-width: 0;
          display: grid;
          gap: 3px;
        }
        .voice-copy strong {
          color: #fff;
          font-size: 17px;
          font-weight: 600;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .voice-copy span {
          color: rgba(255, 255, 255, 0.65);
          font-size: 13.5px;
          line-height: 1.45;
        }
        .voice-end {
          flex-shrink: 0;
          border: 0;
          border-radius: 999px;
          padding: 9px 16px;
          background: #ff7d84;
          color: #17181b;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          font-family: var(--font-dm-sans), sans-serif;
        }
        @media (prefers-reduced-motion: reduce) {
          .voice-ring {
            animation: none;
            opacity: 0;
          }
          .voice-mic {
            transition: none;
          }
        }
        .chat-bubble.is-pending {
          opacity: 0.55;
        }
        .chat-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.55);
        }
        .chat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d3f463;
          box-shadow: 0 0 8px rgba(211, 244, 99, 0.7);
        }
        .chat-thread {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overscroll-behavior: contain;
        }
        .chat-bubble {
          max-width: 85%;
          padding: 11px 15px;
          border-radius: 16px;
          font-size: 15px;
          line-height: 1.5;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .chat-bubble.is-agent {
          align-self: flex-start;
          background: #26272c;
          color: rgba(255, 255, 255, 0.92);
          border-bottom-left-radius: 4px;
        }
        .chat-bubble.is-user {
          align-self: flex-end;
          background: #d3f463;
          color: #17181b;
          border-bottom-right-radius: 4px;
        }
        .chat-typing {
          display: inline-flex;
          gap: 4px;
          padding: 14px 16px;
        }
        .chat-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          animation: chat-blink 1.2s infinite ease-in-out;
        }
        .chat-typing span:nth-child(2) {
          animation-delay: 0.15s;
        }
        .chat-typing span:nth-child(3) {
          animation-delay: 0.3s;
        }
        @keyframes chat-blink {
          0%,
          80%,
          100% {
            opacity: 0.25;
          }
          40% {
            opacity: 1;
          }
        }
        .chat-starters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
          padding-top: 8px;
        }
        .chat-starters button {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.85);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13.5px;
          font-family: var(--font-dm-sans), sans-serif;
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            color 0.15s ease;
        }
        .chat-starters button:hover {
          border-color: #d3f463;
          color: #d3f463;
        }
        .chat-contact {
          display: grid;
          gap: 8px;
          padding: 12px;
          border-radius: 14px;
          background: #1f2024;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .chat-contact input {
          background: #17181b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 10px 12px;
          color: #fff;
          font-size: 15px;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .chat-contact input:focus {
          outline: none;
          border-color: #d3f463;
        }
        .chat-contact button {
          background: #d3f463;
          color: #17181b;
          border: 0;
          border-radius: 8px;
          padding: 11px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .chat-error {
          margin: 0;
          color: #ff9b9b;
          font-size: 13px;
        }
        .chat-saved {
          align-self: center;
          font-size: 12.5px;
          color: #d3f463;
          border: 1px solid rgba(211, 244, 99, 0.35);
          border-radius: 999px;
          padding: 4px 12px;
        }
        .chat-fallback {
          align-self: flex-start;
          font-size: 14px;
          font-weight: 600;
          color: #d3f463;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .chat-composer {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          margin: 0 6px;
          padding: 8px 8px 8px 16px;
          background: #26272c;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: border-color 0.15s ease;
        }
        .chat-composer:focus-within {
          border-color: rgba(211, 244, 99, 0.6);
        }
        .chat-composer textarea {
          flex: 1;
          min-width: 0;
          resize: none;
          field-sizing: content;
          max-height: 160px;
          min-height: 24px;
          background: transparent;
          border: 0;
          outline: none;
          color: #fff;
          font-size: 16px;
          line-height: 1.5;
          padding: 6px 0;
          font-family: var(--font-dm-sans), sans-serif;
        }
        .chat-composer textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .chat-composer button {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 10px;
          border: 0;
          background: #d3f463;
          color: #17181b;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }
        .chat-composer button:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .chat-footnote {
          margin: 8px 12px 10px;
          font-size: 11.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
        }
        .chat-footnote a {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-typing span {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
