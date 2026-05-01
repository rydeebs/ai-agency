"use client";

import Image from "next/image";

const navLinksCol1 = [
  { label: 'AI Transformation', href: '#why-us' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
];

const navLinksCol2 = [
  { label: 'About Us', href: '#team' },
  { label: 'Outcomes', href: '#reviews' },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#000000', position: 'relative', overflow: 'hidden' }}>
      {/* Grid background with fade */}
      <div className="grid-bg-dark" />
      
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'clamp(40px, 8vw, 64px) clamp(20px, 5vw, 60px) clamp(24px, 5vw, 40px)',
          position: 'relative',
        }}
      >
        {/* Main grid */}
        <div
          className="footer-grid"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(32px, 6vw, 40px)',
            marginBottom: 'clamp(32px, 6vw, 48px)',
          }}
        >
          {/* Brand logo and slogan */}
          <div>
            <Image
              src="/images/logo.png"
              alt="NexRevGen"
              width={160}
              height={36}
              style={{
                objectFit: 'contain',
                marginBottom: '12px',
                width: 'clamp(120px, 20vw, 160px)',
                height: 'auto',
              }}
            />
            <p
              style={{
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                color: 'rgba(255,255,255,0.45)',
                maxWidth: '280px',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
              }}
            >
              Your AI transformation partner. We build, you scale.
            </p>
          </div>

          {/* Nav links and CTA row */}
          <div
            className="footer-links-row"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(24px, 5vw, 40px)',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {/* Nav links — two columns */}
            <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 48px)' }}>
              {/* Col 1 */}
              <div>
                {navLinksCol1.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      display: 'block',
                      marginBottom: 'clamp(8px, 2vw, 12px)',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
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
                      marginBottom: 'clamp(8px, 2vw, 12px)',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
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

            {/* Book a Call button */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#D3F463',
                color: '#17181B',
                borderRadius: '100px',
                padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 24px)',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                whiteSpace: 'nowrap',
              }}
            >
              Let&apos;s talk ↗
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 'clamp(16px, 3vw, 24px)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(12px, 2vw, 14px)',
              color: 'rgba(255,255,255,0.35)',
              textAlign: 'center',
              margin: 0,
              fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
            }}
          >
            © 2026 NexRevGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
