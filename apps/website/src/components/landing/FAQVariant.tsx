"use client";

import { useState } from "react";
import type { FAQContent } from "./types";

interface Props {
  content: FAQContent;
  helperHref?: string;
}

export function FAQVariant({ content, helperHref = "#contact" }: Props) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="section_faq"
      style={{
        backgroundColor: "#EFEFEF",
        position: "relative",
        overflow: "hidden",
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
          className="faq-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(32px, 6vw, 80px)",
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
                fontSize: "clamp(14px, 2.5vw, 16px)",
                color: "#5D616A",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {content.helperText}{" "}
              <a
                href={helperHref}
                style={{
                  color: "#17181B",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                {content.helperLinkLabel}
              </a>{" "}
              right now.
            </p>
          </div>

          <div>
            {content.items.map((faq, index) => (
              <div
                key={faq.q}
                style={{
                  borderBottom: "1px solid #DEDEDE",
                  padding: "clamp(16px, 3vw, 24px) 0",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: 0,
                    textAlign: "left",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(15px, 3vw, 18px)",
                      fontWeight: 600,
                      color: "#17181B",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      width: "clamp(28px, 5vw, 32px)",
                      height: "clamp(28px, 5vw, 32px)",
                      borderRadius: "50%",
                      backgroundColor: "#D3F463",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "clamp(16px, 3vw, 20px)",
                      fontWeight: 400,
                      color: "#17181B",
                      flexShrink: 0,
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: openIndex === index ? "500px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(14px, 2.5vw, 16px)",
                      color: "#5D616A",
                      lineHeight: 1.7,
                      paddingTop: "12px",
                      margin: 0,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .faq-grid {
            display: grid !important;
            grid-template-columns: 45% 50% !important;
            gap: 80px !important;
            align-items: start !important;
          }
        }
      `}</style>
    </section>
  );
}
