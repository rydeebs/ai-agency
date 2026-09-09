"use client";

import { useState, FormEvent } from "react";
import type { LeadFormContent, Vertical } from "./types";

interface Props {
  content: LeadFormContent;
  vertical: Vertical;
}

export function LeadFormSection({ content, vertical }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
      vertical: formData.get("vertical"),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#EFEFEF",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: "80px",
      }}
    >
      <div className="grid-bg-light" />

      <div
        style={{
          padding: "clamp(64px, 12vw, 128px) clamp(20px, 5vw, 60px)",
          maxWidth: "1440px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          className="lead-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(32px, 6vw, 60px)",
            alignItems: "start",
          }}
        >
          <div style={{ maxWidth: "600px" }}>
            <span
              style={{
                fontSize: "clamp(10px, 2vw, 12px)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#5D616A",
                fontWeight: 600,
                display: "block",
                marginBottom: "clamp(12px, 2vw, 16px)",
              }}
            >
              {content.eyebrow}
            </span>
            <h2
              style={{
                fontSize: "clamp(36px, 8vw, 84px)",
                fontFamily: "var(--font-darker-grotesque)",
                fontWeight: 500,
                color: "#17181B",
                margin: "0 0 clamp(16px, 3vw, 24px) 0",
                lineHeight: 0.95,
                letterSpacing: "clamp(-0.5px, -0.02em, -1.7px)",
              }}
            >
              {content.headline}
            </h2>
            <p
              style={{
                fontSize: "clamp(14px, 3vw, 18px)",
                color: "#5D616A",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {content.description}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "clamp(12px, 3vw, 20px)",
              padding: "clamp(24px, 5vw, 40px)",
              border: "1px solid #E8E8E8",
            }}
          >
            {status === "success" ? (
              <div
                style={{
                  padding: "clamp(40px, 8vw, 64px) clamp(16px, 4vw, 32px)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#D3F463",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    margin: "0 auto 24px",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontSize: "clamp(22px, 4vw, 28px)",
                    fontFamily: "var(--font-darker-grotesque)",
                    fontWeight: 500,
                    color: "#17181B",
                    margin: "0 0 12px 0",
                  }}
                >
                  Message sent
                </h3>
                <p
                  style={{
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    color: "#5D616A",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {content.successMessage}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <input type="hidden" name="vertical" value={vertical} />

                <div>
                  <label htmlFor="name" style={labelStyle}>
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="company" style={labelStyle}>
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>
                    What are you trying to solve?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "120px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  />
                </div>

                {status === "error" && (
                  <p
                    style={{
                      color: "#DC2626",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    backgroundColor: "#17181B",
                    color: "white",
                    borderRadius: "8px",
                    padding: "clamp(14px, 3vw, 18px) clamp(20px, 4vw, 32px)",
                    width: "100%",
                    fontSize: "clamp(15px, 3vw, 18px)",
                    fontWeight: 700,
                    textAlign: "center",
                    border: "none",
                    cursor: status === "submitting" ? "wait" : "pointer",
                    opacity: status === "submitting" ? 0.7 : 1,
                    transition: "opacity 0.2s ease",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    marginTop: "8px",
                  }}
                >
                  {status === "submitting" ? "Sending…" : content.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .lead-form-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#17181B",
  marginBottom: "6px",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #E0E0E0",
  borderRadius: "8px",
  fontSize: "15px",
  color: "#17181B",
  backgroundColor: "#FAFAFA",
  fontFamily: "var(--font-dm-sans), sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, background-color 0.2s ease",
};
