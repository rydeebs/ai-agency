export function PricingSection() {
  const featureTags = [
    'Embedded AI team',
    '12-week sprints',
    'Weekly syncs',
    'Live workshops',
    'Slack support',
  ];

  return (
    <section id="pricing" style={{ backgroundColor: '#EFEFEF', position: 'relative', overflow: 'hidden' }}>
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
        {/* Label */}
        <span
          style={{
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#5D616A',
            fontWeight: 600,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          ENGAGEMENT OPTIONS
        </span>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(48px, 6vw, 84px)',
            fontFamily: 'var(--font-darker-grotesque)',
            fontWeight: 500,
            color: '#17181B',
            margin: '0 0 32px 0',
            lineHeight: 1.1,
            maxWidth: '700px',
          }}
        >
          Flexible models{' '}
          <span style={{ color: '#8D96FD' }}>that fit how you work.</span>
        </h2>

        {/* Feature tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '48px',
          }}
        >
          {featureTags.map((tag) => (
            <span
              key={tag}
              style={{
                border: '1px solid #AAACB4',
                borderRadius: '100px',
                padding: '8px 16px',
                fontSize: '14px',
                color: '#5D616A',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            alignItems: 'start',
          }}
        >
          {/* Main pricing card */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '48px',
              border: '1px solid #E8E8E8',
            }}
          >
            <h3
              style={{
                fontSize: '28px',
                fontWeight: 500,
                fontFamily: 'var(--font-darker-grotesque)',
                color: '#17181B',
                margin: '0 0 12px 0',
              }}
            >
              Full Integration Partnership
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: '#5D616A',
                lineHeight: 1.6,
                margin: '0 0 32px 0',
              }}
            >
              We embed with your team for 12 weeks. Discovery, implementation, training, 
              and handoff — everything you need to run AI independently.
            </p>

            {/* Price */}
            <div style={{ marginBottom: '32px' }}>
              <span
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-darker-grotesque)',
                  color: '#17181B',
                  lineHeight: 1,
                }}
              >
                Custom Scope
              </span>
              <p style={{ fontSize: '14px', color: '#5D616A', marginTop: '8px' }}>Based on team size and complexity</p>
            </div>

            {/* Book a Call button */}
            <a
              href="#contact"
              style={{
                display: 'block',
                backgroundColor: '#17181B',
                color: 'white',
                borderRadius: '8px',
                padding: '18px 32px',
                width: '100%',
                fontSize: '18px',
                fontWeight: 700,
                textAlign: 'center',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              Book a Discovery Call ↗
            </a>
          </div>

          {/* Secondary cards column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* What's Included card */}
            <div
              style={{
                backgroundColor: '#17181B',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #333',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
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
                {['Full workflow audit & opportunity map', 'Custom automation builds', 'Live team training sessions', 'Documentation & playbooks'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#D3F463', fontSize: '12px' }}>✓</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Start card */}
            <div
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #E8E8E8',
              }}
            >
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#17181B',
                  margin: '0 0 8px 0',
                }}
              >
                Quick Start Sprint
              </p>
              <p
                style={{
                  fontSize: '16px',
                  color: '#5D616A',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                }}
              >
                Not ready for a full engagement? Start with a 2-week sprint focused on 
                one high-impact workflow.
              </p>
              <a
                href="#contact"
                style={{
                  fontSize: '15px',
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
