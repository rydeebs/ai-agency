'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How is this different from hiring an AI consultant?',
    a: "Consultants give you a report and leave. We sit in your Slack, join your standups, and build alongside your team until the systems are live and your people know how to run them. When we're done, you don't need us anymore — that's the point.",
  },
  {
    q: 'What kind of results can we expect?',
    a: "It depends on where you're starting, but most teams see their first automation live within 2-3 weeks. Typical outcomes include 30-50% reduction in manual task time, faster customer response, and team members who actually enjoy using AI instead of fearing it.",
  },
  {
    q: 'Do you work with companies our size?',
    a: "We work best with teams of 20-500 people. Big enough to have real operational complexity, small enough that we can move fast without getting stuck in enterprise procurement limbo.",
  },
  {
    q: 'What if our team isn\'t technical?',
    a: "That's actually most of our clients. We specialize in making AI accessible to ops teams, sales orgs, HR departments — people who know their workflows cold but haven't touched code. By the end, they're building their own automations.",
  },
  {
    q: 'How long does an engagement typically last?',
    a: "Our standard partnership is 12 weeks: discovery, implementation, training, and handoff. Some teams bring us back for new initiatives, but the goal is always to make you self-sufficient. We also offer 2-week quick-start sprints for teams who want to test the waters.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="section_faq"
      style={{ backgroundColor: '#EFEFEF', position: 'relative', overflow: 'hidden' }}
    >
      {/* Grid background with fade */}
      <div className="grid-bg-light" />
      
      <div
        style={{
          padding: '128px 60px',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
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
