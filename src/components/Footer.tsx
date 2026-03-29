"use client";

const navLinksCol1 = [
  { label: 'Why us?', href: '#why-us' },
  { label: 'Our Works', href: '#works' },
  { label: 'Services', href: '#services' },
];

const navLinksCol2 = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#000000' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 80px 40px',
        }}
      >
        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '40px',
            alignItems: 'start',
            marginBottom: '48px',
          }}
        >
          {/* Brand text */}
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '240px',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
            }}
          >
            We&apos;re not just entrepreneurs, we&apos;re designers at heart
          </p>

          {/* Nav links — two columns combined in one grid area using sub-grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', gridColumn: 'span 1' }}>
            {/* Col 1 */}
            <div>
              {navLinksCol1.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    display: 'block',
                    marginBottom: '12px',
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            {/* Col 2 */}
            <div>
              {navLinksCol2.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    display: 'block',
                    marginBottom: '12px',
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Book a call button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#D3F463',
                color: '#17181B',
                borderRadius: '100px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                whiteSpace: 'nowrap',
              }}
            >
              Book a call ↗
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.35)',
              textAlign: 'center',
              margin: 0,
              fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
            }}
          >
            © 2026 Creative Propeller. Based in Switzerland
          </p>
        </div>
      </div>
    </footer>
  );
}
