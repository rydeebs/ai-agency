"use client";

export function CTASection() {
  return (
    <section
      className="section_cta"
      style={{
        backgroundColor: '#EFEFEF',
        padding: '0 clamp(20px, 5vw, 60px) clamp(40px, 8vw, 80px)',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      {/* CTA card */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          overflow: 'hidden',
          minHeight: 'clamp(350px, 50vw, 500px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #17181B 0%, #2A2B3D 100%)',
        }}
      >
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }}
        >
          <source src="/videos/cta-background.mp4" type="video/mp4" />
        </video>

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
            padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(16px, 3vw, 24px)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 7vw, 80px)',
              fontFamily: 'var(--font-darker-grotesque)',
              fontWeight: 500,
              color: 'white',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Stop talking about AI.
            <br />
            <span style={{ color: '#D3F463' }}>Start implementing it.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 3vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Book a 30-minute call. We&apos;ll audit one of your workflows live 
            and show you exactly what&apos;s possible — no pitch deck, no fluff.
          </p>

          {/* Button */}
          <a
            href="#contact"
            style={{
              backgroundColor: '#D3F463',
              color: '#17181B',
              borderRadius: '8px',
              padding: 'clamp(14px, 3vw, 20px) clamp(24px, 5vw, 40px)',
              fontSize: 'clamp(14px, 3vw, 18px)',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Book a Free Audit Call ↗
          </a>
        </div>
      </div>
    </section>
  );
}
