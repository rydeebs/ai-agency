"use client";

import type { StickyCardsContent } from "./types";

interface Props {
  content: StickyCardsContent;
}

export function StickyCardsVariant({ content }: Props) {
  return (
    <section id="why-us" style={{ backgroundColor: "#EFEFEF", position: "relative" }}>
      <div
        className="grid-bg-light"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />

      <div
        style={{
          padding: "clamp(64px, 12vw, 128px) clamp(20px, 5vw, 60px)",
          maxWidth: "1440px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="sticky-cards-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(32px, 6vw, 60px)",
          }}
        >
          <div
            className="sticky-heading"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 3vw, 24px)",
              maxWidth: "600px",
            }}
          >
            <span
              style={{
                fontSize: "clamp(10px, 2vw, 12px)",
                textTransform: "uppercase" as const,
                letterSpacing: "2px",
                color: "rgba(23,24,27,0.5)",
                fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                fontWeight: 500,
              }}
            >
              {content.eyebrow}
            </span>

            <h2
              style={{
                fontSize: "clamp(36px, 8vw, 84px)",
                fontFamily:
                  'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                fontWeight: 500,
                color: "#17181B",
                lineHeight: 0.95,
                margin: 0,
                letterSpacing: "clamp(-0.5px, -0.02em, -1.7px)",
              }}
            >
              {content.headline}{" "}
              <span style={{ color: "#8D96FD" }}>{content.highlight}</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(14px, 3vw, 18px)",
                fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                color: "rgba(23,24,27,0.6)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {content.description}
            </p>
          </div>

          <div
            className="cards-container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              paddingBottom: "clamp(100px, 20vw, 200px)",
            }}
          >
            {content.cards.map((card, index) => (
              <div
                key={index}
                className="sticky-card"
                style={{
                  position: "sticky",
                  top: `calc(80px + ${index} * 24px)`,
                  zIndex: index + 1,
                  height: "clamp(240px, 32vw, 280px)",
                  borderRadius: "clamp(12px, 3vw, 20px)",
                  display: "flex",
                  flexDirection: "row",
                  overflow: "hidden",
                  backgroundColor: card.bg,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: "clamp(20px, 5vw, 40px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "clamp(8px, 2vw, 12px)",
                    backgroundColor: card.bg,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(24px, 5vw, 42px)",
                      fontFamily:
                        'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                      fontWeight: 500,
                      color: card.textColor,
                      margin: 0,
                      lineHeight: 1,
                      letterSpacing: "clamp(-0.3px, -0.02em, -0.8px)",
                    }}
                  >
                    {card.heading}
                  </h3>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "clamp(13px, 2.5vw, 16px)",
                      fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                      color: "rgba(23,24,27,0.7)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {card.text}
                  </p>
                </div>

                <div
                  className="card-video"
                  style={{
                    width: "45%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <source src={card.video} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .sticky-cards-grid {
            display: grid !important;
            grid-template-columns: 35% 65% !important;
            gap: 60px !important;
            align-items: start !important;
          }
          .sticky-heading {
            position: sticky !important;
            top: 100px !important;
            height: fit-content !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 768px) {
          .card-video {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
