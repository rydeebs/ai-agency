"use client";

export function CTASection() {
  return (
    <section
      className="section_cta"
      style={{
        backgroundColor: '#EFEFEF',
        padding: '0 80px 80px',
      }}
    >
      {/* CTA card */}
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #17181B 0%, #2A2B3D 100%)',
        }}
      >
        {/* Background image (if available) */}
        {/* Using a style background as fallback — if the image exists, it will load via the img tag */}
        <img
          src="/images/cta-background.avif"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            padding: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontFamily: 'var(--font-darker-grotesque)',
              fontWeight: 500,
              color: 'white',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Get any design, incredibly fast
          </h2>

          <p
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
            }}
          >
            Click here, and we will be in touch within 24 hours.
          </p>

          {/* Button row */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a
              href="#contact"
              style={{
                backgroundColor: '#D3F463',
                color: '#17181B',
                borderRadius: '8px',
                padding: '20px 40px',
                fontSize: '18px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Get Started ↗
            </a>
            <a
              href="#contact"
              style={{
                backgroundColor: 'white',
                color: '#17181B',
                borderRadius: '8px',
                padding: '20px 40px',
                fontSize: '18px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Book a Call ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
