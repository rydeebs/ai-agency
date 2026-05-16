export function PricingSection() {
  const featureTags = [
    'Free revenue leak audit',
    '30-day pilot',
    'Built on your current tools',
    'Owner-facing reporting',
    'No long-term lock-in',
  ];

  return (
    <section id="pricing" style={{ backgroundColor: '#EFEFEF', position: 'relative', overflow: 'hidden' }}>
      {/* Grid background with fade */}
      <div className="grid-bg-light" />
      
      <div
        style={{
          padding: 'clamp(64px, 12vw, 128px) clamp(20px, 5vw, 60px)',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Label */}
        <span
          style={{
            fontSize: 'clamp(10px, 2vw, 12px)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#5D616A',
            fontWeight: 600,
            display: 'block',
            marginBottom: 'clamp(12px, 2vw, 16px)',
          }}
        >
          HOW WE WORK WITH OWNERS
        </span>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(36px, 8vw, 84px)',
            fontFamily: 'var(--font-darker-grotesque)',
            fontWeight: 500,
            color: '#17181B',
            margin: '0 0 clamp(20px, 4vw, 32px) 0',
            lineHeight: 0.95,
            letterSpacing: 'clamp(-0.5px, -0.02em, -1.7px)',
            maxWidth: '700px',
          }}
        >
          Start with the leak{' '}
          <span style={{ color: '#8D96FD' }}>closest to revenue.</span>
        </h2>

        {/* Feature tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(6px, 1.5vw, 8px)',
            marginBottom: 'clamp(32px, 6vw, 48px)',
          }}
        >
          {featureTags.map((tag) => (
            <span
              key={tag}
              style={{
                border: '1px solid #AAACB4',
                borderRadius: '100px',
                padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px)',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                color: '#5D616A',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cards grid */}
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '16px',
            alignItems: 'start',
          }}
        >
          {/* Main pricing card */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 'clamp(12px, 3vw, 20px)',
              padding: 'clamp(24px, 5vw, 48px)',
              border: '1px solid #E8E8E8',
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(22px, 4vw, 28px)',
                fontWeight: 500,
                fontFamily: 'var(--font-darker-grotesque)',
                color: '#17181B',
                margin: '0 0 12px 0',
              }}
            >
              Contractor Revenue System
            </h3>
            <p
              style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#5D616A',
                lineHeight: 1.6,
                margin: '0 0 clamp(20px, 4vw, 32px) 0',
              }}
            >
              We audit your lead flow, missed calls, estimate follow-up, CRM, and software
              stack. Then we build the AI workflows that help your office book more jobs
              without adding another full-time hire.
            </p>

            {/* Price */}
            <div style={{ marginBottom: 'clamp(20px, 4vw, 32px)' }}>
              <span
                style={{
                  fontSize: 'clamp(32px, 6vw, 48px)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-darker-grotesque)',
                  color: '#17181B',
                  lineHeight: 1,
                }}
              >
                Custom Scope
              </span>
              <p style={{ fontSize: 'clamp(12px, 2vw, 14px)', color: '#5D616A', marginTop: '8px' }}>Based on lead volume, trade, and current stack</p>
            </div>

            {/* Book a Call button */}
            <a
              href="#contact"
              style={{
                display: 'block',
                backgroundColor: '#17181B',
                color: 'white',
                borderRadius: '8px',
                padding: 'clamp(14px, 3vw, 18px) clamp(20px, 4vw, 32px)',
                width: '100%',
                fontSize: 'clamp(15px, 3vw, 18px)',
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              Get a Revenue Leak Audit ↗
            </a>
          </div>

          {/* Secondary cards column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* What's Included card */}
            <div
              style={{
                backgroundColor: '#17181B',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 4vw, 32px)',
                border: '1px solid #333',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#D3F463',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                WHAT&apos;S INCLUDED
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Missed-call and lead-response audit', 'Estimate follow-up automation', 'CRM cleanup and tool consolidation', 'Owner dashboard with booked-job metrics'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#D3F463', fontSize: '12px' }}>✓</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(12px, 2.5vw, 14px)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Start card */}
            <div
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(20px, 4vw, 32px)',
                border: '1px solid #E8E8E8',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: 700,
                  color: '#17181B',
                  margin: '0 0 8px 0',
                }}
              >
                30-Day Pilot
              </p>
              <p
                style={{
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  color: '#5D616A',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                }}
              >
                Want proof first? We launch one high-impact workflow, usually missed-call
                text-back or estimate follow-up, and measure the lift before expanding.
              </p>
              <a
                href="#contact"
                style={{
                  fontSize: 'clamp(14px, 2.5vw, 15px)',
                  fontWeight: 600,
                  color: '#22C55E',
                  textDecoration: 'none',
                }}
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
