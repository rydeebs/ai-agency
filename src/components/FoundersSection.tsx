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
              marginBottom: '0',
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
        </div>
      </div>
    </section>
  )
}
