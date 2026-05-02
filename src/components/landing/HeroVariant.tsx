"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { ClientLogoBanner } from "../ClientLogoBanner";
import type { HeroContent } from "./types";

interface GridHighlight {
  id: number;
  type: "horizontal" | "vertical";
  position: number;
  direction: 1 | -1;
}

function GridHighlights() {
  const [highlights, setHighlights] = useState<GridHighlight[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const addHighlight = () => {
      const type: "horizontal" | "vertical" =
        Math.random() > 0.5 ? "horizontal" : "vertical";
      const gridSize = 80;
      const maxLines = type === "horizontal" ? 10 : 16;
      const lineIndex = Math.floor(Math.random() * maxLines);
      const position = lineIndex * gridSize;
      const direction: 1 | -1 = Math.random() > 0.5 ? 1 : -1;

      const newHighlight: GridHighlight = {
        id: idCounter++,
        type,
        position,
        direction,
      };

      setHighlights((prev) => [...prev, newHighlight]);
      setTimeout(() => {
        setHighlights((prev) => prev.filter((h) => h.id !== newHighlight.id));
      }, 2000);
    };

    addHighlight();
    const interval = setInterval(addHighlight, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          style={{
            position: "absolute",
            ...(highlight.type === "horizontal"
              ? {
                  top: highlight.position,
                  left: highlight.direction === 1 ? "-100%" : "100%",
                  width: "200px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(211, 244, 99, 0.6), transparent)",
                  animation: `gridLineHorizontal${
                    highlight.direction === 1 ? "" : "Reverse"
                  } 2s linear forwards`,
                }
              : {
                  left: highlight.position,
                  top: highlight.direction === 1 ? "-100%" : "100%",
                  width: "1px",
                  height: "200px",
                  background:
                    "linear-gradient(180deg, transparent, rgba(211, 244, 99, 0.6), transparent)",
                  animation: `gridLineVertical${
                    highlight.direction === 1 ? "" : "Reverse"
                  } 2s linear forwards`,
                }),
          }}
        />
      ))}
    </div>
  );
}

interface Props {
  content: HeroContent;
}

export function HeroVariant({ content }: Props) {
  return (
    <>
      <section
        className="hero-section"
        style={{
          height: "780px",
          overflow: "hidden",
          position: "relative",
          padding: "clamp(8px, 2vw, 16px)",
          backgroundColor: "#EFEFEF",
        }}
      >
        <div
          style={{
            backgroundColor: "#17181B",
            borderRadius: "12px",
            position: "relative",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <div className="grid-bg-dark" />
          <GridHighlights />
          <Navbar />

          <div
            className="hero-content"
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              height: "100%",
              padding: "0 clamp(20px, 5vw, 60px)",
              paddingTop: "clamp(100px, 15vw, 120px)",
              paddingBottom: "clamp(32px, 5vw, 48px)",
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }} />

            <div
              style={{
                maxWidth: "640px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h1
                style={{
                  fontFamily:
                    'var(--font-darker-grotesque), "Darker Grotesque", sans-serif',
                  fontSize: "clamp(40px, 10vw, 96px)",
                  fontWeight: 500,
                  color: "white",
                  lineHeight: 1,
                  letterSpacing: "clamp(-1px, -0.02em, -2px)",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                {content.headlineLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
                <span style={{ color: "#D3F463" }}>{content.highlightLine}</span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 18px)",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  marginTop: "clamp(16px, 3vw, 24px)",
                  marginBottom: "0",
                  maxWidth: "500px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                {content.subheadline}
              </p>

              <div
                style={{
                  height: "28px",
                  overflow: "hidden",
                  margin: "clamp(20px, 4vw, 32px) 0",
                }}
              >
                <div style={{ animation: "ticker-scroll 4s linear infinite" }}>
                  {[...content.features, ...content.features].map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        height: "28px",
                      }}
                    >
                      <span
                        style={{
                          color: "#D3F463",
                          fontSize: "12px",
                          flexShrink: 0,
                          lineHeight: 1,
                        }}
                      >
                        ✦
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(14px, 2.5vw, 16px)",
                          color: "rgba(255,255,255,0.85)",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div
              className="hero-bottom-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "100%",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link
                  href={content.primaryCta.href}
                  style={{
                    backgroundColor: "#D3F463",
                    color: "#17181B",
                    borderRadius: "8px",
                    padding: "clamp(14px, 3vw, 20px) clamp(20px, 4vw, 32px)",
                    fontSize: "clamp(14px, 3vw, 18px)",
                    fontWeight: 700,
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {content.primaryCta.label}
                </Link>
                {content.secondaryCta && (
                  <Link
                    href={content.secondaryCta.href}
                    className="hero-secondary-btn"
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      borderRadius: "8px",
                      padding: "clamp(14px, 3vw, 20px) clamp(20px, 4vw, 32px)",
                      fontSize: "clamp(14px, 3vw, 18px)",
                      fontWeight: 500,
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                      border: "1px solid rgba(255,255,255,0.3)",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    {content.secondaryCta.label}
                  </Link>
                )}
              </div>

              <div
                className="hero-stats"
                style={{
                  display: "flex",
                  gap: "clamp(20px, 3vw, 40px)",
                  alignItems: "flex-end",
                }}
              >
                {content.stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      minWidth: "120px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-darker-grotesque), "Darker Grotesque", sans-serif',
                        fontSize: "clamp(32px, 5vw, 48px)",
                        fontWeight: 500,
                        color: "#D3F463",
                        lineHeight: 1,
                        letterSpacing: "-1px",
                      }}
                    >
                      {stat.number}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(11px, 1.5vw, 13px)",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="animate-spin-slow hero-glow"
            style={{
              position: "absolute",
              right: "-100px",
              top: "50%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "conic-gradient(rgba(211, 244, 99, 0.4) 0deg, transparent 60deg, transparent 310deg, rgba(211, 244, 99, 0.4) 360deg)",
              filter: "blur(80px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
        </div>
      </section>

      <div style={{ backgroundColor: "#EFEFEF", padding: "0 clamp(8px, 2vw, 16px)" }}>
        <ClientLogoBanner />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-section {
            height: auto !important;
            min-height: 100vh !important;
          }
          .hero-glow {
            width: 300px !important;
            height: 300px !important;
            right: -150px !important;
          }
          .hero-secondary-btn {
            display: none !important;
          }
          .hero-bottom-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .hero-stats {
            margin-top: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
