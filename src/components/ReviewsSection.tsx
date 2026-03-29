'use client';

import Image from 'next/image';

const testimonials = [
  {
    name: 'James Thornton',
    title: 'CEO',
    company: 'Meridian Auto',
    avatar: '/images/avatar-darren.avif',
    quote:
      'I was skeptical — we\'d been burned by consultants before. But this team actually shipped. Within 8 weeks, our ops team cut reporting time by 60%. Real results, not slide decks.',
    linkedIn: true,
    featured: true,
  },
  {
    name: 'Priya Sharma',
    title: 'VP of Operations',
    company: 'ScaleForce',
    avatar: '/images/avatar-katherine.avif',
    quote:
      "We tried to do AI internally for a year — complete chaos. They came in, audited our workflows, and built automations that actually stuck. Our team finally gets it.",
    linkedIn: true,
  },
  {
    name: 'Marcus Webb',
    title: 'Chief Digital Officer',
    company: 'Horizon Health',
    avatar: '/images/avatar-cj.avif',
    quote:
      'The difference? They didn\'t just recommend tools — they sat with our people and built alongside them. Now our staff trains new hires on AI workflows they created.',
    linkedIn: true,
  },
  {
    name: 'Elena Costa',
    title: 'Director of Innovation',
    company: 'Atlas Financial',
    avatar: '/images/avatar-abraham.avif',
    quote:
      'Our customer response time dropped from 4 hours to 12 minutes. Not because we hired more people — because they helped us work smarter.',
    linkedIn: true,
  },
  {
    name: 'David Park',
    title: 'COO',
    company: 'Apex Logistics',
    avatar: null,
    quote:
      "We automated 30+ hours of weekly admin work. My operations managers finally have time to actually manage operations instead of pushing paper.",
    linkedIn: true,
  },
];

const projects = [
  { name: 'Meridian Auto', bg: '#1A1A2E', textColor: 'white', tag: 'Full Stack AI Integration' },
  { name: 'ScaleForce', bg: '#6B4EFF', textColor: 'white', tag: 'Team Enablement Program' },
  { name: 'Horizon Health', bg: '#4F46E5', textColor: 'white', tag: 'Workflow Automation' },
  { name: 'Atlas Financial', bg: '#0F172A', textColor: 'white', tag: 'Customer Experience AI' },
];

const floatingAvatars = [
  {
    initials: 'JT',
    badge: 'Finally works!',
    badgeBg: '#D3F463',
    badgeColor: '#17181B',
    style: { left: '5%', top: '30%' } as React.CSSProperties,
  },
  {
    initials: 'PS',
    badge: 'Worth it',
    badgeBg: '#007AFF',
    badgeColor: 'white',
    style: { right: '30%', top: '20%' } as React.CSSProperties,
  },
  {
    initials: 'MW',
    badge: 'No more chaos',
    badgeBg: '#FFE176',
    badgeColor: '#17181B',
    style: { right: '5%', top: '40%' } as React.CSSProperties,
  },
];

function AvatarFallback({ initials, size = 64 }: { initials: string; size?: number }) {
  const colors: Record<string, string> = {
    DW: '#6B4EFF',
    KG: '#007AFF',
    AM: '#D3F463',
    CJ: '#FF6B6B',
    TF: '#4ECDC4',
  };
  const bg = colors[initials] ?? '#8D96FD';
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.3,
        fontWeight: 700,
        color: 'white',
        flexShrink: 0,
        border: '2px solid white',
      }}
    >
      {initials}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" style={{ backgroundColor: '#EFEFEF' }}>
      <div
        style={{
          padding: '128px 80px',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Floating avatar badges */}
        {floatingAvatars.map((item) => (
          <div
            key={item.badge}
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 10,
              ...item.style,
            }}
          >
            <AvatarFallback initials={item.initials} size={64} />
            <span
              style={{
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: item.badgeBg,
                color: item.badgeColor,
                whiteSpace: 'nowrap',
              }}
            >
              {item.badge}
            </span>
          </div>
        ))}

        {/* Section header */}
        <div style={{ textAlign: 'center', paddingBottom: '64px' }}>
          <span
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#5D616A',
              fontWeight: 600,
              display: 'block',
              marginBottom: '16px',
            }}
          >
            CLIENT RESULTS
          </span>
          <h2
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              fontFamily: 'var(--font-darker-grotesque)',
              fontWeight: 500,
              color: '#17181B',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Teams that stopped{' '}
            <span style={{ color: '#8D96FD' }}>fighting AI and started winning.</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                minWidth: '340px',
                border: '1px solid #E8E8E8',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flexShrink: 0,
              }}
            >
              {/* Avatar + name row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    unoptimized
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      width: '48px',
                      height: '48px',
                    }}
                  />
                ) : (
                  <AvatarFallback
                    initials={t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                    size={48}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#17181B' }}>
                      {t.name}
                    </span>
                    {t.linkedIn && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '18px',
                          height: '18px',
                          backgroundColor: '#0A66C2',
                          color: 'white',
                          fontSize: '10px',
                          fontWeight: 700,
                          borderRadius: '3px',
                          fontFamily: 'sans-serif',
                        }}
                      >
                        in
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: '#5D616A' }}>
                    {t.title} · {t.company}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: '15px',
                  color: '#5D616A',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Portfolio grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '48px',
          }}
        >
          {projects.map((p) => (
            <div
              key={p.name}
              style={{
                height: '280px',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: p.bg,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  marginBottom: '8px',
                  width: 'fit-content',
                }}
              >
                {p.tag}
              </span>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: p.textColor,
                  fontFamily: 'var(--font-darker-grotesque)',
                }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
