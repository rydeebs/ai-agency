import Image from 'next/image';

const founders = [
  {
    name: 'Raj Patel',
    title: 'Co-Founder & CEO',
    image: '/images/founder-1.png',
    credentials: '12+ years building ML systems at Google and Meta. Led AI ops for a $2B fintech exit. Stanford CS.',
  },
  {
    name: 'Marcus Chen',
    title: 'Co-Founder & CTO',
    image: '/images/founder-2.png',
    credentials: 'Former Head of AI Engineering at Stripe. Built automation platforms serving 50M+ users. MIT PhD.',
  },
  {
    name: 'Jake Morrison',
    title: 'Co-Founder & COO',
    image: '/images/founder-3.png',
    credentials: '10+ years scaling ops at Uber and DoorDash. Deployed AI workflows that cut costs by $40M annually.',
  },
];

export function FoundersSection() {
  return (
    <section
      id="team"
      style={{
        backgroundColor: '#0F1012',
        padding: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background with fade */}
      <div className="grid-bg-dark" />
      
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Dark card */}
        <div
          style={{
            backgroundColor: '#17181B',
            borderRadius: '20px',
            padding: '80px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Grid background with fade for inner card */}
          <div className="grid-bg-dark" style={{ borderRadius: '20px' }} />
          {/* Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                display: 'block',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '20px',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
              }}
            >
              WHO WE ARE
            </span>
            <h2
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontFamily: 'var(--font-darker-grotesque)',
                fontWeight: 500,
                color: 'white',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Operators, not{' '}
              <span style={{ color: '#D3F463' }}>observers.</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.6)',
              textAlign: 'center',
              marginBottom: '64px',
              fontFamily: 'var(--font-dm-sans)',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            We&apos;re builders who got tired of watching companies fumble AI adoption. 
            So we started embedding directly with teams — shipping automations, training staff, 
            and leaving behind systems that actually stick.
          </p>

          {/* Founders grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {founders.map((founder) => (
              <div
                key={founder.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginBottom: '24px',
                    border: '3px solid #D3F463',
                  }}
                >
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={200}
                    height={200}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: '28px',
                    fontFamily: 'var(--font-darker-grotesque)',
                    fontWeight: 500,
                    color: 'white',
                    margin: '0 0 4px 0',
                  }}
                >
                  {founder.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#D3F463',
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 600,
                    margin: '0 0 12px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {founder.title}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-dm-sans)',
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: '280px',
                  }}
                >
                  {founder.credentials}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
