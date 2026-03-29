interface Card {
  bg: string;
  heading: string;
  text: string;
  textColor: string;
}

const cards: Card[] = [
  {
    bg: '#D8F66F',
    heading: 'Kill the busywork',
    text: "Reports that took hours now take minutes. Data entry that drained your team? Gone.",
    textColor: '#17181B',
  },
  {
    bg: '#8D96FD',
    heading: 'Let your people think again',
    text: "When machines handle the grind, your team finally has headspace for strategy and creativity.",
    textColor: '#17181B',
  },
  {
    bg: '#FF7D84',
    heading: 'Better margins, same headcount',
    text: "Do more with who you have. No layoffs, no burnout — just smarter operations.",
    textColor: '#17181B',
  },
  {
    bg: '#FFE176',
    heading: 'Embedded, not external',
    text: "We work inside your team, not from a consulting tower. Slack channels, standups, the whole thing.",
    textColor: '#17181B',
  },
  {
    bg: '#D8F66F',
    heading: 'Quick wins in weeks, not quarters',
    text: "First automations ship in 2-3 weeks. You see ROI before the invoice arrives.",
    textColor: '#17181B',
  },
  {
    bg: '#8D96FD',
    heading: 'We train, you own',
    text: "Your team learns as we build. When we leave, the knowledge stays.",
    textColor: '#17181B',
  },
  {
    bg: '#FF7D84',
    heading: 'Built to evolve',
    text: "AI moves fast. We build systems that adapt as tools improve — no rebuild required.",
    textColor: '#17181B',
  },
  {
    bg: '#FFE176',
    heading: 'Senior AI operators, not juniors',
    text: "Every engagement is led by practitioners who\'ve shipped AI at scale, not fresh grads with ChatGPT.",
    textColor: '#17181B',
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
      style={{ backgroundColor: '#EFEFEF', position: 'relative', overflow: 'hidden' }}
    >
      {/* Grid background with fade */}
      <div className="grid-bg-light" />
      
      <div
        style={{
          padding: '128px 80px',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* LEFT — sticky heading */}
          <div
            style={{
              position: 'sticky',
              top: '128px',
              height: 'fit-content',
              alignSelf: 'start',
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
                fontSize: '64px',
                fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                fontWeight: 500,
                color: '#17181B',
                lineHeight: 1.05,
                margin: 0,
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
              gap: '0',
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                style={{
                  position: 'sticky',
                  top: `${160 + index * 16}px`,
                  height: '280px',
                  borderRadius: '20px',
                  display: 'flex',
                  overflow: 'hidden',
                  backgroundColor: card.bg,
                  marginBottom: '16px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
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
                      fontSize: '28px',
                      fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                      fontWeight: 500,
                      color: card.textColor,
                      margin: 0,
                      lineHeight: 1.2,
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

                {/* Right half — accent decorative area */}
                <div
                  style={{
                    width: '45%',
                    backgroundColor: getAccentBg(card.bg),
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Decorative geometric shapes */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      right: '15%',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.25)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '10%',
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      transform: 'rotate(15deg)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100px',
                      height: '100px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255,255,255,0.4)',
                      }}
                    />
                  </div>
                  {/* Card index badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(23,24,27,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'rgba(23,24,27,0.5)',
                      fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
