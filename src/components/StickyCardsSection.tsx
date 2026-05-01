"use client";

interface Card {
  bg: string;
  heading: string;
  text: string;
  textColor: string;
  video: string;
}

const cards: Card[] = [
  {
    bg: '#D8F66F',
    heading: 'Kill the busywork',
    text: "Reports that took hours now take minutes. Data entry that drained your team? Gone.",
    textColor: '#17181B',
    video: '/videos/cards/kill-busywork.mp4',
  },
  {
    bg: '#FF7D84',
    heading: 'Better margins, same headcount',
    text: "Do more with who you have. No layoffs, no burnout — just smarter operations.",
    textColor: '#17181B',
    video: '/videos/cards/better-margins.mp4',
  },
  {
    bg: '#FFE176',
    heading: 'Embedded, not external',
    text: "We work inside your team, not from a consulting tower. Slack channels, standups, the whole thing.",
    textColor: '#17181B',
    video: '/videos/cards/embedded.mp4',
  },
  {
    bg: '#8D96FD',
    heading: 'We train, you own',
    text: "Your team learns as we build. When we leave, the knowledge stays.",
    textColor: '#17181B',
    video: '/videos/cards/train-own.mp4',
  },
  {
    bg: '#D8F66F',
    heading: 'Built to evolve',
    text: "AI moves fast. We build systems that adapt as tools improve — no rebuild required.",
    textColor: '#17181B',
    video: '/videos/cards/built-evolve.mp4',
  },
];

export function StickyCardsSection() {
  return (
    <section
      id="why-us"
      style={{ backgroundColor: '#EFEFEF', position: 'relative' }}
    >
      {/* Grid background with fade */}
      <div className="grid-bg-light" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      
      <div
        style={{
          padding: 'clamp(64px, 12vw, 128px) clamp(20px, 5vw, 60px)',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="sticky-cards-grid"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(32px, 6vw, 60px)',
          }}
        >
          {/* Heading section */}
          <div
            className="sticky-heading"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px, 3vw, 24px)',
              maxWidth: '600px',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(10px, 2vw, 12px)',
                textTransform: 'uppercase' as const,
                letterSpacing: '2px',
                color: 'rgba(23,24,27,0.5)',
                fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                fontWeight: 500,
              }}
            >
              WHY TEAMS CHOOSE US
            </span>

            <h2
              style={{
                fontSize: 'clamp(36px, 8vw, 84px)',
                fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                fontWeight: 500,
                color: '#17181B',
                lineHeight: 0.95,
                margin: 0,
                letterSpacing: 'clamp(-0.5px, -0.02em, -1.7px)',
              }}
            >
              AI that ships,{' '}
              <span style={{ color: '#8D96FD' }}>not AI theater.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(14px, 3vw, 18px)',
                fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                color: 'rgba(23,24,27,0.6)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Most AI initiatives die in pilot purgatory. We&apos;re not here to run 
              experiments — we&apos;re here to deploy systems that your team actually uses 
              every single day.
            </p>
          </div>

          {/* Cards container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px, 3vw, 24px)',
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="sticky-card"
                style={{
                  minHeight: 'clamp(200px, 35vw, 260px)',
                  borderRadius: 'clamp(12px, 3vw, 20px)',
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'hidden',
                  backgroundColor: card.bg,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}
              >
                {/* Left half — text content */}
                <div
                  style={{
                    flex: 1,
                    padding: 'clamp(20px, 5vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 'clamp(8px, 2vw, 12px)',
                    backgroundColor: card.bg,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 'clamp(24px, 5vw, 42px)',
                      fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                      fontWeight: 500,
                      color: card.textColor,
                      margin: 0,
                      lineHeight: 1,
                      letterSpacing: 'clamp(-0.3px, -0.02em, -0.8px)',
                    }}
                  >
                    {card.heading}
                  </h3>
                  <p
                    className="card-text"
                    style={{
                      fontSize: 'clamp(13px, 2.5vw, 16px)',
                      fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                      color: 'rgba(23,24,27,0.7)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {card.text}
                  </p>
                </div>

                {/* Right half — video (hidden on mobile) */}
                <div
                  className="card-video"
                  style={{
                    width: '45%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
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
          .sticky-card {
            position: sticky !important;
            top: calc(100px + var(--index, 0) * 24px) !important;
            z-index: calc(1 + var(--index, 0)) !important;
          }
          .sticky-card:nth-child(1) { --index: 0; }
          .sticky-card:nth-child(2) { --index: 1; }
          .sticky-card:nth-child(3) { --index: 2; }
          .sticky-card:nth-child(4) { --index: 3; }
          .sticky-card:nth-child(5) { --index: 4; }
        }
        @media (max-width: 768px) {
          .card-video {
            display: none !important;
          }
          .sticky-card {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
