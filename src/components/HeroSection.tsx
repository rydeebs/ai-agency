import Link from "next/link";
import { Navbar } from "./Navbar";
import { ClientLogoBanner } from "./ClientLogoBanner";

const stats = [
  { number: "+50", label: "projects completed" },
  { number: "+1000", label: "hours of creative work" },
  { number: "+300", label: "Hours Spent Finding the Perfect Font" },
];

const features = [
  "Same day delivery*",
  "Dedicated project manager",
  "Any Design asset",
];

export function HeroSection() {
  return (
    <section
      style={{
        height: "954px",
        overflow: "hidden",
        position: "relative",
        padding: "16px",
        backgroundColor: "#EFEFEF",
      }}
    >
      {/* Dark card */}
      <div
        style={{
          backgroundColor: "#17181B",
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      >
        {/* Navbar overlaid on top */}
        <Navbar />

        {/* Hero main content */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "0 80px",
            paddingTop: "120px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left content column */}
          <div
            style={{
              maxWidth: "640px",
              flex: 1,
            }}
          >
            {/* Switzerland badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "100px",
                padding: "8px 16px",
                fontSize: "14px",
                color: "white",
                marginBottom: "32px",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              🇨🇭 Based in Switzerland
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily:
                  'var(--font-darker-grotesque), "Darker Grotesque", sans-serif',
                fontSize: "clamp(80px, 10vw, 144px)",
                fontWeight: 500,
                color: "white",
                lineHeight: 0.95,
                letterSpacing: "-3px",
                margin: 0,
              }}
            >
              Design
              <br />
              On-demand
            </h1>

            {/* Feature list */}
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                margin: "32px 0",
                padding: 0,
                listStyle: "none",
              }}
            >
              {features.map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
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
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Large Get Started CTA */}
            <Link
              href="#"
              style={{
                backgroundColor: "#D3F463",
                color: "#17181B",
                borderRadius: "8px",
                padding: "20px 32px",
                fontSize: "18px",
                fontWeight: 700,
                fontFamily: "var(--font-dm-sans), sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
            >
              Get Started ↗
            </Link>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              paddingTop: "60px",
              paddingBottom: "48px",
              alignItems: "flex-end",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-darker-grotesque), "Darker Grotesque", sans-serif',
                    fontSize: "56px",
                    fontWeight: 700,
                    color: "#D3F463",
                    lineHeight: 1,
                    letterSpacing: "-1px",
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    maxWidth: "160px",
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client logo banner — scrolling pills at bottom of dark card */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
        >
          <ClientLogoBanner />
        </div>

        {/* Glowing lime element — right side */}
        <div
          className="animate-spin-slow"
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
  );
}
