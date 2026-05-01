'use client';

import Image from 'next/image';
import { useState } from 'react';

const founders = [
  {
    name: 'Gokul Sundar',
    title: 'Co-Founder & CEO',
    image: '/images/founder-1.png',
    hoverImage: '/images/founder-1-hover.png',
    credentials: '12+ years building ML systems at Google and Meta. Led AI ops for a $2B fintech exit. Stanford CS.',
    funFact: 'Conquers mountains on weekends',
  },
  {
    name: 'Pawel Chrzanowski',
    title: 'Co-Founder & CTO',
    image: '/images/founder-2.png',
    hoverImage: '/images/founder-2-hover.png',
    credentials: 'Former Head of AI Engineering at Stripe. Built automation platforms serving 50M+ users. MIT PhD.',
    funFact: 'Rides sharks for fun',
  },
  {
    name: 'Ryan DeBerardinis',
    title: 'Co-Founder & COO',
    image: '/images/founder-3.png',
    hoverImage: '/images/founder-3-hover.png',
    credentials: '10+ years scaling ops at Uber and DoorDash. Deployed AI workflows that cut costs by $40M annually.',
    funFact: 'Gator wrangler extraordinaire',
  },
];

function FounderCard({ founder, index }: { founder: typeof founders[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with hover effects */}
      <div
        style={{
          width: '220px',
          height: '220px',
          borderRadius: isHovered ? '20px' : '50%',
          overflow: 'hidden',
          marginBottom: '24px',
          border: `4px solid ${isHovered ? '#D3F463' : 'rgba(211, 244, 99, 0.5)'}`,
          boxShadow: isHovered 
            ? '0 0 40px rgba(211, 244, 99, 0.4), 0 20px 60px rgba(0,0,0,0.5)' 
            : '0 8px 32px rgba(0,0,0,0.3)',
          transform: isHovered 
            ? `scale(1.1) rotate(${index === 1 ? '-3' : index === 2 ? '3' : '0'}deg)` 
            : 'scale(1) rotate(0deg)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          position: 'relative',
        }}
      >
        {/* Default image */}
        <Image
          src={founder.image}
          alt={founder.name}
          width={220}
          height={220}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />
        {/* Hover image */}
        <Image
          src={founder.hoverImage}
          alt={`${founder.name} adventure`}
          width={220}
          height={220}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* Name with hover effect */}
      <h3
        style={{
          fontSize: '28px',
          fontFamily: 'var(--font-darker-grotesque)',
          fontWeight: 500,
          color: isHovered ? '#D3F463' : 'white',
          margin: '0 0 4px 0',
          transition: 'color 0.3s ease, transform 0.3s ease',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {founder.name}
      </h3>

      {/* Title */}
      <p
        style={{
          fontSize: '14px',
          color: '#D3F463',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 600,
          margin: '0 0 12px 0',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {founder.title}
      </p>

      {/* Credentials / Fun fact swap */}
      <p
        style={{
          fontSize: '14px',
          color: isHovered ? 'rgba(211, 244, 99, 0.8)' : 'rgba(255,255,255,0.5)',
          fontFamily: 'var(--font-dm-sans)',
          lineHeight: 1.6,
          margin: 0,
          maxWidth: '280px',
          transition: 'all 0.3s ease',
          fontStyle: isHovered ? 'italic' : 'normal',
        }}
      >
        {isHovered ? `"${founder.funFact}"` : founder.credentials}
      </p>
    </div>
  );
}

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
              gap: '48px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {founders.map((founder, index) => (
              <FounderCard key={founder.name} founder={founder} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
