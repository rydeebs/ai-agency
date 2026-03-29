const teamBadges = [
  { name: 'AI Strategy', color: '#8B5CF6', x: '15%', y: '15%' },
  { name: 'Training', color: '#EF4444', x: '55%', y: '20%' },
  { name: 'Implementation', color: '#10B981', x: '20%', y: '65%' },
  { name: 'Analytics', color: '#F59E0B', x: '45%', y: '55%' },
  { name: 'Support', color: '#06B6D4', x: '75%', y: '70%' },
]

const designScreens = [
  { left: '5%', top: '10%', width: '28%', height: '55%', color: '#1E2028', border: '#8B5CF6' },
  { left: '36%', top: '5%', width: '32%', height: '45%', color: '#1E2028', border: '#D3F463' },
  { left: '71%', top: '8%', width: '24%', height: '50%', color: '#1E2028', border: '#007AFF' },
  { left: '8%', top: '72%', width: '20%', height: '22%', color: '#1E2028', border: '#EF4444' },
  { left: '38%', top: '58%', width: '25%', height: '35%', color: '#1E2028', border: '#10B981' },
  { left: '68%', top: '65%', width: '28%', height: '28%', color: '#1E2028', border: '#F59E0B' },
]

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

          {/* Team video mockup */}
          <div
            style={{
              width: '100%',
              height: '500px',
              backgroundColor: '#1A1B1F',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Design screen rectangles */}
            {designScreens.map((screen, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: screen.left,
                  top: screen.top,
                  width: screen.width,
                  height: screen.height,
                  backgroundColor: screen.color,
                  borderRadius: '8px',
                  border: `1px solid ${screen.border}30`,
                  boxShadow: `0 0 20px ${screen.border}15`,
                }}
              >
                {/* Inner design elements */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    height: '3px',
                    backgroundColor: screen.border,
                    borderRadius: '2px',
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    left: '12px',
                    width: '60%',
                    height: '2px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '2px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '34px',
                    left: '12px',
                    width: '40%',
                    height: '2px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                  }}
                />
                {i % 2 === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      height: '30%',
                      backgroundColor: `${screen.border}10`,
                      borderRadius: '6px',
                      border: `1px solid ${screen.border}20`,
                    }}
                  />
                )}
              </div>
            ))}

            {/* Connecting lines (decorative) */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line x1="29" y1="37" x2="36" y2="28" stroke="rgba(211,244,99,0.15)" strokeWidth="0.3" />
              <line x1="68" y1="33" x2="71" y2="33" stroke="rgba(0,122,255,0.15)" strokeWidth="0.3" />
              <line x1="52" y1="50" x2="50" y2="58" stroke="rgba(16,185,129,0.15)" strokeWidth="0.3" />
            </svg>

            {/* Team name badges */}
            {teamBadges.map((badge) => (
              <div
                key={badge.name}
                style={{
                  position: 'absolute',
                  left: badge.x,
                  top: badge.y,
                  backgroundColor: badge.color,
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: 'var(--font-dm-sans)',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                  boxShadow: `0 2px 12px ${badge.color}60`,
                  transform: 'translateY(-50%)',
                }}
              >
                {badge.name}
              </div>
            ))}

            {/* Figma-like toolbar hint at top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '36px',
                backgroundColor: '#13141A',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '16px',
                gap: '8px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#28C840' }} />
              <div
                style={{
                  marginLeft: '12px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                ai-transformation-dashboard.app
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
