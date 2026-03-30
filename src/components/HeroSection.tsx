import Link from "next/link";
import { Navbar } from "./Navbar";
import { ClientLogoBanner } from "./ClientLogoBanner";

const stats = [
  { number: "3x", label: "faster team output" },
  { number: "40%", label: "reduction in manual tasks" },
  { number: "12 Weeks", label: "to full AI integration" },
];

const features = [
  "Embedded AI leadership",
  "Custom implementation roadmap",
  "Live team workshops",
  "Continuous optimization",
];

export function HeroSection() {
  return (
    <>
      <section
        style={{
          height: "900px",
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
          }}
        >
          {/* Grid background with fade */}
          <div className="grid-bg-dark" />
          
          {/* Navbar overlaid on top */}
          <Navbar />

          {/* Hero main content */}
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              height: "100%",
              padding: "0 80px",
              paddingTop: "80px",
              paddingBottom: "140px",
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Left content column - vertically centered */}
            <div
              style={{
                maxWidth: "640px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* H1 */}
              <h1
                style={{
                  fontFamily:
                    'var(--font-darker-grotesque), "Darker Grotesque", sans-serif',
                  fontSize: "clamp(56px, 7vw, 96px)",
                  fontWeight: 500,
                  color: "white",
                  lineHeight: 1,
                  letterSpacing: "-2px",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                Transform
                <br />
                your Business
                <br />
                <span style={{ color: "#D3F463" }}>with AI.</span>
              </h1>
              
              {/* Subheadline */}
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  marginTop: "24px",
                  marginBottom: "0",
                  maxWidth: "500px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                Stop drowning in AI hype. We embed directly with your team to build real systems 
                that cut costs, accelerate output, and free your people to do meaningful work.
              </p>

              {/* Vertical auto-scrolling feature ticker */}
              <div
                style={{
                  height: "28px",
                  overflow: "hidden",
                  margin: "32px 0",
                }}
              >
                <div
                  style={{
                    animation: "ticker-scroll 4s linear infinite",
                  }}
                >
                  {[...features, ...features].map((feature, i) => (
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
                          fontSize: "16px",
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

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link
                  href="#contact"
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
                  Schedule Strategy Call ↗
                </Link>
                <Link
                  href="#why-us"
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    borderRadius: "8px",
                    padding: "20px 32px",
                    fontSize: "18px",
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
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
          
          {/* Stats row — bottom of section */}
          <div
            style={{
              position: "absolute",
              bottom: "48px",
              right: "80px",
              display: "flex",
              gap: "40px",
              alignItems: "flex-end",
              zIndex: 1,
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: stat.number === "12 Weeks" ? "160px" : "140px",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      'var(--font-darker-grotesque), "Darker Grotesque", sans-serif',
                    fontSize: "48px",
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
                    fontSize: "13px",
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

      {/* Client logo banner — below the hero section */}
      <div style={{ backgroundColor: "#EFEFEF", padding: "0 16px" }}>
        <ClientLogoBanner />
      </div>
    </>
  );
}
