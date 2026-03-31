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
          padding: '64px 60px 40px',
          position: 'relative',
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
              }}
            />
            <p
              style={{
                fontSize: '14px',
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

          {/* Book a Call button */}
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
              Let&apos;s talk ↗
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
            © 2026 NexRevGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
