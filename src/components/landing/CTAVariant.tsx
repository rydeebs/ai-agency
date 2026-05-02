"use client";

import type { CTAContent } from "./types";

interface Props {
  content: CTAContent;
  ctaHref?: string;
}

export function CTAVariant({ content, ctaHref = "#contact" }: Props) {
  return (
    <section
      className="section_cta"
      style={{
        backgroundColor: "#EFEFEF",
        padding: "0 clamp(20px, 5vw, 60px) clamp(40px, 8vw, 80px)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "clamp(12px, 3vw, 20px)",
          overflow: "hidden",
          minHeight: "clamp(350px, 50vw, 500px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #17181B 0%, #2A2B3D 100%)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
        >
          <source src="/videos/cta-background.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        />

        <div
          className="grid-bg-dark"
          style={{
            zIndex: 2,
            borderRadius: "20px",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            color: "white",
            padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 24px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 7vw, 80px)",
              fontFamily: "var(--font-darker-grotesque)",
              fontWeight: 500,
              color: "white",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {content.headlineLine1}
            <br />
            <span style={{ color: "#D3F463" }}>{content.headlineLine2}</span>
          </h2>

          <p
            style={{
              fontSize: "clamp(14px, 3vw, 20px)",
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              maxWidth: "600px",
              lineHeight: 1.6,
            }}
          >
            {content.description}
          </p>

          <a
            href={ctaHref}
            style={{
              backgroundColor: "#D3F463",
              color: "#17181B",
              borderRadius: "8px",
              padding: "clamp(14px, 3vw, 20px) clamp(24px, 5vw, 40px)",
              fontSize: "clamp(14px, 3vw, 18px)",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {content.ctaLabel} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
