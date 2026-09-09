import type { PricingContent } from "./types";

interface Props {
  content: PricingContent;
  ctaHref?: string;
}

export function PricingVariant({ content, ctaHref = "#contact" }: Props) {
  return (
    <section
      id="pricing"
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
            margin: "0 0 clamp(20px, 4vw, 32px) 0",
            lineHeight: 0.95,
            letterSpacing: "clamp(-0.5px, -0.02em, -1.7px)",
            maxWidth: "700px",
          }}
        >
          {content.headline}{" "}
          <span style={{ color: "#8D96FD" }}>{content.highlight}</span>
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(6px, 1.5vw, 8px)",
            marginBottom: "clamp(32px, 6vw, 48px)",
          }}
        >
          {content.featureTags.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid #AAACB4",
                borderRadius: "100px",
                padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px)",
                fontSize: "clamp(12px, 2.5vw, 14px)",
                color: "#5D616A",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "clamp(12px, 3vw, 20px)",
              padding: "clamp(24px, 5vw, 48px)",
              border: "1px solid #E8E8E8",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(22px, 4vw, 28px)",
                fontWeight: 500,
                fontFamily: "var(--font-darker-grotesque)",
                color: "#17181B",
                margin: "0 0 12px 0",
              }}
            >
              {content.mainCard.title}
            </h3>
            <p
              style={{
                fontSize: "clamp(14px, 2.5vw, 16px)",
                color: "#5D616A",
                lineHeight: 1.6,
                margin: "0 0 clamp(20px, 4vw, 32px) 0",
              }}
            >
              {content.mainCard.description}
            </p>

            <div style={{ marginBottom: "clamp(20px, 4vw, 32px)" }}>
              <span
                style={{
                  fontSize: "clamp(32px, 6vw, 48px)",
                  fontWeight: 700,
                  fontFamily: "var(--font-darker-grotesque)",
                  color: "#17181B",
                  lineHeight: 1,
                }}
              >
                {content.mainCard.price}
              </span>
              <p
                style={{
                  fontSize: "clamp(12px, 2vw, 14px)",
                  color: "#5D616A",
                  marginTop: "8px",
                }}
              >
                {content.mainCard.priceCaption}
              </p>
            </div>

            <a
              href={ctaHref}
              style={{
                display: "block",
                backgroundColor: "#17181B",
                color: "white",
                borderRadius: "8px",
                padding: "clamp(14px, 3vw, 18px) clamp(20px, 4vw, 32px)",
                width: "100%",
                fontSize: "clamp(15px, 3vw, 18px)",
                fontWeight: 700,
                textAlign: "center",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              {content.mainCard.ctaLabel}
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                backgroundColor: "#17181B",
                borderRadius: "clamp(12px, 3vw, 16px)",
                padding: "clamp(20px, 4vw, 32px)",
                border: "1px solid #333",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(10px, 2vw, 12px)",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "#D3F463",
                  marginBottom: "12px",
                  fontWeight: 600,
                }}
              >
                {content.includedCard.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {content.includedCard.items.map((item, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ color: "#D3F463", fontSize: "12px" }}>✓</span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "clamp(12px, 2.5vw, 14px)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "clamp(12px, 3vw, 16px)",
                padding: "clamp(20px, 4vw, 32px)",
                border: "1px solid #E8E8E8",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(16px, 3vw, 18px)",
                  fontWeight: 700,
                  color: "#17181B",
                  margin: "0 0 8px 0",
                }}
              >
                {content.quickStartCard.title}
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  color: "#5D616A",
                  lineHeight: 1.6,
                  margin: "0 0 20px 0",
                }}
              >
                {content.quickStartCard.description}
              </p>
              <a
                href={ctaHref}
                style={{
                  fontSize: "clamp(14px, 2.5vw, 15px)",
                  fontWeight: 600,
                  color: "#22C55E",
                  textDecoration: "none",
                }}
              >
                {content.quickStartCard.ctaLabel} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
