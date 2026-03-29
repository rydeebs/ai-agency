export function PricingSection() {
  const featureTags = [
    '1 request at a time',
    'Average 24 hour delivery',
    'Unlimited brands',
    'Webflow development',
    'Unlimited revision rounds',
  ];

  return (
    <section id="pricing" style={{ backgroundColor: '#EFEFEF' }}>
      <div
        style={{
          padding: '128px 80px',
          maxWidth: '1280px',
          margin: '0 auto',
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
          PRICING
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
          One subscription{' '}
          <span style={{ color: '#8D96FD' }}>for all your design needs.</span>
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
                fontWeight: 700,
                fontFamily: 'var(--font-darker-grotesque)',
                color: '#17181B',
                margin: '0 0 12px 0',
              }}
            >
              Design On-demand
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: '#5D616A',
                lineHeight: 1.6,
                margin: '0 0 32px 0',
              }}
            >
              Netflix for design: pay once per month, ask for anything as much as you want.
            </p>

            {/* Price */}
            <div style={{ marginBottom: '32px' }}>
              <span
                style={{
                  fontSize: '64px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-darker-grotesque)',
                  color: '#17181B',
                  lineHeight: 1,
                }}
              >
                $4,995
              </span>
              <span style={{ fontSize: '20px', color: '#5D616A' }}>/month</span>
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
              Book a Call ↗
            </a>
          </div>

          {/* Secondary cards column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Trial card */}
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
                  fontSize: '16px',
                  color: '#17181B',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                  fontWeight: 500,
                }}
              >
                Not sure if it&apos;s for you? Get a full-time designer for 5 days at $1000,
                satisfied or refunded.
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
                Get more info →
              </a>
            </div>

            {/* Pitch deck card */}
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
                ↗ PitchDeckCreators.com
              </p>
              <p
                style={{
                  fontSize: '16px',
                  color: '#5D616A',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                }}
              >
                Need a full pitch deck custom made? Let&apos;s work together.
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
                Get more info →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
