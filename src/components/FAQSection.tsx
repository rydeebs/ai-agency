'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What services are included in the subscription?',
    a: "Your subscription gives you access to unlimited designs, from websites to motion design. We'll work on one request at a time.",
  },
  {
    q: 'How do I submit design requests?',
    a: 'You can submit design requests through our designated software platform, providing detailed instructions and context for each task.',
  },
  {
    q: 'What if I need help after the launch?',
    a: 'The turnaround time varies based on task complexity. We strive to complete tasks promptly during regular working hours (9 a.m. to 5 p.m. Swiss time, Monday to Friday).',
  },
  {
    q: 'Can I request revisions for my designs?',
    a: 'Yes, our service includes unlimited revision rounds. You can request revisions until you are satisfied, as long as the requests are reasonable and not entirely new tasks.',
  },
  {
    q: 'How long does a project take?',
    a: 'Imagine you want to build a house. If you want a one-meter square house, it will take much less time than a mansion. The same principle applies to our design services.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="section_faq"
      style={{ backgroundColor: '#EFEFEF' }}
    >
      <div
        style={{
          padding: '128px 80px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <div>
            <span
              style={{
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#5D616A',
                fontWeight: 600,
                display: 'block',
                marginBottom: '16px',
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontFamily: 'var(--font-darker-grotesque)',
                fontWeight: 500,
                color: '#17181B',
                margin: '0 0 24px 0',
                lineHeight: 1.1,
              }}
            >
              Frequently asked questions
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#5D616A',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Didn&apos;t find the answer?{' '}
              <a
                href="#contact"
                style={{
                  color: '#17181B',
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                Book a Call ↗
              </a>{' '}
              right now.
            </p>
          </div>

          {/* Right column — accordion */}
          <div>
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                style={{
                  borderBottom: '1px solid #DEDEDE',
                  padding: '24px 0',
                }}
              >
                {/* Question header */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#17181B',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#D3F463',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 400,
                      color: '#17181B',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>

                {/* Answer body */}
                <div
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <p
                    style={{
                      fontSize: '16px',
                      color: '#5D616A',
                      lineHeight: 1.7,
                      paddingTop: '12px',
                      margin: 0,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
