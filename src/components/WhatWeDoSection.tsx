export function WhatWeDoSection() {
  const services = [
    'Workflow Automation',
    'AI Tool Selection & Setup',
    'Hands-On Team Workshops',
    'Process Re-engineering',
    'Custom GPT & Agent Builds',
    'Data Pipeline Integration',
    'Leadership Alignment',
    'Ongoing Support & Iteration',
  ];

  const tickerItems = [...services, ...services];

  return (
    <section
      id="services"
      style={{ backgroundColor: '#EFEFEF', position: 'relative', overflow: 'hidden' }}
      className="section_what_we_do"
    >
      {/* Grid background with fade */}
      <div className="grid-bg-light" />
      
      <div
        style={{
          padding: 'clamp(64px, 10vw, 100px) clamp(20px, 5vw, 60px)',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <div
          className="what-we-do-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '16px',
            height: 'clamp(350px, 45vw, 480px)',
          }}
        >
          {/* LEFT — Dark card */}
          <div
            style={{
              backgroundColor: '#2A2B30',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 40px)',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 2vw, 20px)',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* Grid background with fade */}
            <div className="grid-bg-dark" style={{ borderRadius: '16px' }} />
            <span
              style={{
                fontSize: 'clamp(10px, 2vw, 12px)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                fontWeight: 500,
              }}
            >
              HOW WE WORK
            </span>

            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                fontWeight: 500,
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: 'clamp(-0.5px, -0.02em, -1.3px)',
              }}
            >
              We don&apos;t just consult —{' '}
              <span style={{ color: '#D3F463' }}>
                we build alongside you.
              </span>
            </h2>

            {/* Service list with rotating vertical buttons */}
            <div
              style={{
                overflow: 'hidden',
                height: 'clamp(140px, 20vw, 200px)',
                flex: 1,
                marginTop: 'clamp(4px, 1vw, 8px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(6px, 1.5vw, 10px)',
                  animation: 'ticker-scroll 12s linear infinite',
                }}
              >
                {tickerItems.map((service, i) => (
                  <div
                    key={i}
                    style={{
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '100px',
                      padding: 'clamp(6px, 1.5vw, 10px) clamp(14px, 2.5vw, 20px)',
                      fontSize: 'clamp(13px, 2.5vw, 18px)',
                      lineHeight: 'clamp(18px, 3vw, 26px)',
                      color: 'rgba(255,255,255,0.8)',
                      fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                      width: 'fit-content',
                    }}
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Video */}
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              height: '100%',
              position: 'relative',
              backgroundColor: '#1E1E1E',
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
                objectFit: 'contain',
              }}
            >
              <source src="/videos/how-we-work.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
