"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { ClientLogoBanner } from "./ClientLogoBanner";

const stats = [
  { number: "3x", label: "faster team output" },
  { number: "40%", label: "reduction in manual tasks" },
  { number: "6 Weeks", label: "to full AI integration" },
];

const features = [
  "Embedded AI leadership",
  "Custom implementation roadmap",
  "Live team workshops",
  "Continuous optimization",
];

interface GridHighlight {
  id: number;
  type: 'horizontal' | 'vertical';
  position: number;
  direction: 1 | -1;
}

function GridHighlights() {
  const [highlights, setHighlights] = useState<GridHighlight[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const addHighlight = () => {
      const type: 'horizontal' | 'vertical' = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      const gridSize = 80;
      const maxLines = type === 'horizontal' ? 10 : 16;
      const lineIndex = Math.floor(Math.random() * maxLines);
      const position = lineIndex * gridSize;
      const direction: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
      
      const newHighlight: GridHighlight = {
        id: idCounter++,
        type,
        position,
        direction,
      };
      
      setHighlights(prev => [...prev, newHighlight]);
      
      setTimeout(() => {
        setHighlights(prev => prev.filter(h => h.id !== newHighlight.id));
      }, 2000);
    };

    addHighlight();
    const interval = setInterval(addHighlight, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          style={{
            position: 'absolute',
            ...(highlight.type === 'horizontal'
              ? {
                  top: highlight.position,
                  left: highlight.direction === 1 ? '-100%' : '100%',
                  width: '200px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(211, 244, 99, 0.6), transparent)',
                  animation: `gridLineHorizontal${highlight.direction === 1 ? '' : 'Reverse'} 2s linear forwards`,
                }
              : {
                  left: highlight.position,
                  top: highlight.direction === 1 ? '-100%' : '100%',
                  width: '1px',
                  height: '200px',
                  background: 'linear-gradient(180deg, transparent, rgba(211, 244, 99, 0.6), transparent)',
                  animation: `gridLineVertical${highlight.direction === 1 ? '' : 'Reverse'} 2s linear forwards`,
                }),
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <>
      <section
        className="hero-section"
        style={{
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
          padding: "clamp(8px, 2vw, 16px)",
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
            minHeight: "calc(100vh - clamp(16px, 4vw, 32px))",
          }}
        >
          {/* Grid background with fade */}
          <div className="grid-bg-dark" />
          
          {/* Animated grid highlights */}
          <GridHighlights />
          
          {/* Navbar overlaid on top */}
          <Navbar />

          {/* Hero main content */}
          <div
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
              minHeight: "calc(100vh - clamp(16px, 4vw, 32px))",
            }}
          >
            {/* Spacer to push content to vertical center */}
            <div style={{ flex: 1 }} />
            
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
                  fontSize: "clamp(40px, 10vw, 96px)",
                  fontWeight: 500,
                  color: "white",
                  lineHeight: 1,
                  letterSpacing: "clamp(-1px, -0.02em, -2px)",
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
                  fontSize: "clamp(14px, 3vw, 18px)",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  marginTop: "clamp(16px, 3vw, 24px)",
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
                  margin: "clamp(20px, 4vw, 32px) 0",
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

              {/* CTA Buttons - moved inside content for mobile */}
              <div className="hero-cta-mobile" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="#contact"
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
                  Schedule Strategy Call ↗
                </Link>
                <Link
                  href="#why-us"
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
                  See How It Works
                </Link>
              </div>
            </div>
            
            {/* Spacer to push stats to bottom */}
            <div style={{ flex: 1 }} />
            
            {/* Stats row - at bottom */}
            <div
              className="hero-stats"
              style={{
                display: "flex",
                gap: "clamp(20px, 5vw, 40px)",
                alignItems: "flex-end",
                flexWrap: "wrap",
                marginTop: "32px",
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
                      fontSize: "clamp(32px, 8vw, 48px)",
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
                      fontSize: "clamp(11px, 2vw, 13px)",
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

          {/* Glowing lime element — right side */}
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

      {/* Client logo banner — below the hero section */}
      <div style={{ backgroundColor: "#EFEFEF", padding: "0 clamp(8px, 2vw, 16px)" }}>
        <ClientLogoBanner />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-glow {
            width: 300px !important;
            height: 300px !important;
            right: -150px !important;
          }
          .hero-secondary-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
