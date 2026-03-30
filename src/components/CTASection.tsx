"use client";

export function CTASection() {
  return (
    <section
      className="section_cta"
      style={{
        backgroundColor: '#EFEFEF',
        padding: '0 60px 80px',
        maxWidth: '1440px',
        margin: '0 auto',
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

        {/* Grid pattern overlay with fade */}
        <div 
          className="grid-bg-dark" 
          style={{ 
            zIndex: 2,
            borderRadius: '20px',
          }} 
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
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
            Stop talking about AI. Start shipping it.
          </h2>

          <p
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
              maxWidth: '600px',
            }}
          >
            Book a 30-minute call. We&apos;ll audit one of your workflows live 
            and show you exactly what&apos;s possible — no pitch deck, no fluff.
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
              Book a Free Audit Call ↗
            </a>
            <a
              href="#pricing"
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
              View Engagement Options ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
