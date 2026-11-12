"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceStatus = "idle" | "connecting" | "live" | "ended";

const MAX_SECONDS = 360;
const HANGUP_AFTER_GOODBYE_MS = 3500;

interface RealtimeEvent {
  type: string;
  item_id?: string;
  transcript?: string;
  response?: { output?: Array<{ type: string; name?: string; call_id?: string; arguments?: string }> };
  error?: { message?: string };
}

export interface VoiceCallHandlers {
  /** Adds a transcript bubble; returns its id so it can be updated. */
  addTurn: (role: "user" | "assistant", content: string) => string;
  updateTurn: (id: string, content: string) => void;
  removeTurn: (id: string) => void;
  /** Plain-text transcript of the whole conversation so far. */
  getTranscript: () => string;
  isSaved: () => boolean;
  onSaved: () => void;
  onNotice: (message: string) => void;
}

/**
 * Browser side of the voice intake: opens an OpenAI Realtime WebRTC call with
 * a short-lived secret from /api/intake/voice-session, streams transcripts
 * into the chat thread, and posts the agent's notes to /api/intake/voice-notes.
 */
export function useVoiceCall(handlers: VoiceCallHandlers) {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [seconds, setSeconds] = useState(0);
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingRef = useRef<Record<string, string>>({});
  const notesSentRef = useRef(false);
  const levelRef = useRef<HTMLSpanElement | null>(null);

  const send = useCallback((payload: unknown) => {
    const dc = dcRef.current;
    if (dc?.readyState === "open") dc.send(JSON.stringify(payload));
  }, []);

  const teardown = useCallback(() => {
    try {
      dcRef.current?.close();
      pcRef.current?.getSenders().forEach((s) => s.track?.stop());
      pcRef.current?.close();
    } catch {
      /* already closed */
    }
    micRef.current?.getTracks().forEach((t) => t.stop());
    if (audioRef.current) audioRef.current.srcObject = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (tickRef.current) clearInterval(tickRef.current);
    void audioCtxRef.current?.close().catch(() => undefined);
    pcRef.current = dcRef.current = micRef.current = audioCtxRef.current = null;
    rafRef.current = tickRef.current = null;
    if (levelRef.current) levelRef.current.style.transform = "scale(1)";
  }, []);

  const hangUp = useCallback(() => {
    const wasLive = Boolean(pcRef.current);
    teardown();
    setStatus(wasLive ? "ended" : "idle");
    if (!wasLive) return;
    const h = handlersRef.current;
    // If they talked but never left contact details, still send the notes.
    const transcript = h.getTranscript();
    if (!h.isSaved() && !notesSentRef.current && /^Visitor:/m.test(transcript)) {
      notesSentRef.current = true;
      void fetch("/api/intake/voice-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
        keepalive: true,
      }).catch(() => undefined);
    }
  }, [teardown]);

  const runTools = useCallback(
    async (output: NonNullable<RealtimeEvent["response"]>["output"]) => {
      const calls = (output ?? []).filter((item) => item.type === "function_call");
      if (!calls.length) return;
      let ending = false;
      for (const call of calls) {
        let result: Record<string, unknown> = { error: "unknown tool" };
        if (call.name === "end_call") {
          ending = true;
          result = { ok: true };
        } else if (call.name === "save_request") {
          let args: unknown = {};
          try {
            args = JSON.parse(call.arguments || "{}");
          } catch {
            /* invalid JSON handled by the server's validation */
          }
          const h = handlersRef.current;
          try {
            const response = await fetch("/api/intake/voice-notes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ intake: args, transcript: h.getTranscript(), update: h.isSaved() }),
            });
            const data = (await response.json().catch(() => ({}))) as { saved?: boolean; problem?: string };
            result = data.problem ? { saved: false, problem: data.problem } : { saved: Boolean(data.saved) };
            if (data.saved) {
              notesSentRef.current = true;
              h.onSaved();
            }
          } catch {
            result = { saved: false };
          }
        }
        send({
          type: "conversation.item.create",
          item: { type: "function_call_output", call_id: call.call_id, output: JSON.stringify(result) },
        });
      }
      if (ending) {
        setTimeout(() => hangUp(), HANGUP_AFTER_GOODBYE_MS);
      } else {
        send({ type: "response.create" });
      }
    },
    [send, hangUp],
  );

  const onEvent = useCallback(
    (event: RealtimeEvent) => {
      const h = handlersRef.current;
      switch (event.type) {
        case "input_audio_buffer.committed":
          if (event.item_id) pendingRef.current[event.item_id] = h.addTurn("user", "…");
          break;
        case "conversation.item.input_audio_transcription.completed": {
          const text = (event.transcript ?? "").trim();
          const id = event.item_id ? pendingRef.current[event.item_id] : undefined;
          if (id) {
            if (text) h.updateTurn(id, text);
            else h.removeTurn(id);
          } else if (text) {
            h.addTurn("user", text);
          }
          break;
        }
        case "response.output_audio_transcript.done":
          if (event.transcript?.trim()) h.addTurn("assistant", event.transcript.trim());
          break;
        case "response.done":
          void runTools(event.response?.output);
          break;
        case "error":
          console.warn("[voice] realtime error", event.error?.message);
          break;
      }
    },
    [runTools],
  );

  const start = useCallback(async () => {
    if (pcRef.current) return;
    setStatus("connecting");
    setSeconds(0);
    notesSentRef.current = false;
    const h = handlersRef.current;
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("This browser can't use the microphone here.");

      let answer: string | null = null;
      for (let attempt = 0; attempt < 3 && !answer; attempt += 1) {
        if (attempt) await new Promise((r) => setTimeout(r, 700 * attempt));
        const session = await fetch("/api/intake/voice-session", { method: "POST" });
        const { value, error } = (await session.json().catch(() => ({}))) as { value?: string; error?: string };
        if (!value) {
          if (session.status !== 503 || attempt === 2) throw new Error(error || "Couldn't start the call.");
          if (error?.startsWith("Voice isn't available")) throw new Error(error);
          continue;
        }
        // Ask for the mic only once the voice line is confirmed available.
        if (!micRef.current) {
          micRef.current = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true },
          });
        }
        const mic = micRef.current;
        pcRef.current?.close();
        const pc = new RTCPeerConnection();
        pcRef.current = pc;
        if (!audioRef.current) audioRef.current = new Audio();
        audioRef.current.autoplay = true;
        pc.ontrack = (e) => {
          if (audioRef.current) audioRef.current.srcObject = e.streams[0];
        };
        pc.addTrack(mic.getTracks()[0], mic);
        const dc = pc.createDataChannel("oai-events");
        dcRef.current = dc;
        dc.onmessage = (e) => {
          try {
            onEvent(JSON.parse(e.data as string) as RealtimeEvent);
          } catch {
            /* ignore malformed events */
          }
        };
        dc.onopen = () => send({ type: "response.create" });
        await pc.setLocalDescription(await pc.createOffer());
        const sdp = await fetch("https://api.openai.com/v1/realtime/calls", {
          method: "POST",
          body: pc.localDescription?.sdp,
          headers: { Authorization: `Bearer ${value}`, "Content-Type": "application/sdp" },
        });
        if (sdp.ok) answer = await sdp.text();
        else if (attempt === 2) throw new Error("The line is busy for a moment. Please try again.");
      }
      if (!answer || !pcRef.current) throw new Error("Couldn't start the call.");
      await pcRef.current.setRemoteDescription({ type: "answer", sdp: answer });

      setStatus("live");
      const startedAt = Date.now();
      tickRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        setSeconds(elapsed);
        if (elapsed >= MAX_SECONDS) hangUp();
      }, 500);

      // Mic level → scale the pulsing dot so people can see they're heard.
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      if (micRef.current) ctx.createMediaStreamSource(micRef.current).connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        analyser.getByteFrequencyData(buf);
        const avg = buf.reduce((a, b) => a + b, 0) / buf.length / 255;
        if (levelRef.current) levelRef.current.style.transform = `scale(${1 + Math.min(1.6, avg * 4)})`;
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (error) {
      teardown();
      setStatus("idle");
      const message =
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Microphone access was blocked. Allow it in your browser, or just type instead."
          : error instanceof Error
            ? error.message
            : "Couldn't start the call.";
      h.onNotice(message);
    }
  }, [hangUp, onEvent, send, teardown]);

  useEffect(() => () => teardown(), [teardown]);

  return { status, seconds, start, hangUp, levelRef, maxSeconds: MAX_SECONDS };
}
