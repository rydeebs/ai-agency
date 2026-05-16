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
    heading: 'Answer every lead',
    text: "Calls, forms, and texts get an instant response before the customer calls the next contractor.",
    textColor: '#17181B',
    video: '/videos/cards/kill-busywork.mp4',
  },
  {
    bg: '#FF7D84',
    heading: 'Keep estimates warm',
    text: "Every open quote gets a smart follow-up cadence, so good opportunities do not disappear after one bid.",
    textColor: '#17181B',
    video: '/videos/cards/better-margins.mp4',
  },
  {
    bg: '#FFE176',
    heading: 'Clean up the stack',
    text: "We connect the tools you already use and cut the software that is costing you without helping the office.",
    textColor: '#17181B',
    video: '/videos/cards/embedded.mp4',
  },
  {
    bg: '#8D96FD',
    heading: 'Give owners real numbers',
    text: "Booked jobs, response time, quote status, close rate, and lead sources in one dashboard you can actually read.",
    textColor: '#17181B',
    video: '/videos/cards/train-own.mp4',
  },
  {
    bg: '#D8F66F',
    heading: 'Train the office',
    text: "Your dispatcher, admin, estimator, or sales rep learns the workflow as we build it, so it keeps running.",
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
              WHY CONTRACTORS CHOOSE US
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
              More booked work,{' '}
              <span style={{ color: '#8D96FD' }}>less office drag.</span>
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
              We are not here to sell you another shiny app. We find where jobs are leaking,
              wire AI into your current phones, forms, CRM, and follow-up, then prove the
              system is helping your team book work.
            </p>
          </div>

          {/* Cards container - paddingBottom gives cards room to scroll & stack */}
          <div
            className="cards-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              paddingBottom: 'clamp(100px, 20vw, 200px)',
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="sticky-card"
                style={{
                  position: 'sticky',
                  top: `calc(80px + ${index} * 24px)`,
                  zIndex: index + 1,
                  height: 'clamp(240px, 32vw, 280px)',
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
