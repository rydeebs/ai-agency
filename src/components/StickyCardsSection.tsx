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

// Returns a slightly darker shade of the bg color for the right half accent area
function getAccentBg(hex: string): string {
  const map: Record<string, string> = {
    '#D8F66F': '#C4E45A',
    '#8D96FD': '#7A84EA',
    '#FF7D84': '#EC6A71',
    '#FFE176': '#EDD063',
  };
  return map[hex] ?? hex;
}

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
          padding: '128px 60px',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '35% 65%',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* LEFT — sticky heading */}
          <div
            style={{
              position: 'sticky',
              top: '100px',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
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
                fontSize: '84px',
                fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                fontWeight: 500,
                color: '#17181B',
                lineHeight: '75.6px',
                margin: 0,
                letterSpacing: '-1.7px',
              }}
            >
              AI that ships,{' '}
              <span style={{ color: '#8D96FD' }}>not AI theater.</span>
            </h2>

            <p
              style={{
                fontSize: '18px',
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

          {/* RIGHT — stacking cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              paddingBottom: '200px',
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                style={{
                  position: 'sticky',
                  top: `${100 + index * 24}px`,
                  height: '260px',
                  borderRadius: '20px',
                  display: 'flex',
                  overflow: 'hidden',
                  backgroundColor: card.bg,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  zIndex: index + 1,
                }}
              >
                {/* Left half — text content */}
                <div
                  style={{
                    width: '55%',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '12px',
                    backgroundColor: card.bg,
                  }}
                >
                  <h3
                    style={{
                      fontSize: '42px',
                      fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                      fontWeight: 500,
                      color: card.textColor,
                      margin: 0,
                      lineHeight: '42px',
                      letterSpacing: '-0.8px',
                    }}
                  >
                    {card.heading}
                  </h3>
                  <p
                    style={{
                      fontSize: '16px',
                      fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                      color: 'rgba(23,24,27,0.7)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {card.text}
                  </p>
                </div>

                {/* Right half — video */}
                <div
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
    </section>
  );
}
