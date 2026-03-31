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

  // Duplicate for seamless loop
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
          padding: '128px 60px',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            height: '640px',
          }}
        >
          {/* LEFT — Dark card */}
          <div
            style={{
              backgroundColor: '#2A2B30',
              borderRadius: '16px',
              padding: '48px',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* Grid background with fade */}
            <div className="grid-bg-dark" style={{ borderRadius: '16px' }} />
            <span
              style={{
                fontSize: '12px',
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
                fontSize: '64px',
                fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                fontWeight: 500,
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: '-1.3px',
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
                height: '280px',
                flex: 1,
                marginTop: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  animation: 'ticker-scroll 12s linear infinite',
                }}
              >
                {tickerItems.map((service, i) => (
                  <div
                    key={i}
                    style={{
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '100px',
                      padding: '12px 24px',
                      fontSize: '20px',
                      lineHeight: '30px',
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
              padding: '24px',
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
                borderRadius: '12px',
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
