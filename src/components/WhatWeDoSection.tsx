export function WhatWeDoSection() {
  const services = [
    'Sales deck design',
    'Digital ads',
    'Website design',
    'Brand guidelines',
    'Design systems',
    'Brochures',
    'Motion design',
    'Social media graphics',
  ];

  // Duplicate for seamless loop
  const tickerItems = [...services, ...services];

  return (
    <section
      style={{ backgroundColor: '#EFEFEF' }}
      className="section_what_we_do"
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
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            height: '640px',
          }}
        >
          {/* LEFT — Dark card */}
          <div
            style={{
              backgroundColor: '#2A2B30',
              borderRadius: '16px',
              padding: '48px',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                fontWeight: 500,
              }}
            >
              WHAT DO WE DO?
            </span>

            <h2
              style={{
                fontSize: '36px',
                fontFamily: 'var(--font-darker-grotesque, "Darker Grotesque", sans-serif)',
                fontWeight: 500,
                color: 'white',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Netflix for design: pay once per month,{' '}
              <span style={{ color: '#D3F463' }}>
                ask for anything as much as you want.
              </span>
            </h2>

            {/* Scrolling service list */}
            <div
              style={{
                overflow: 'hidden',
                height: '200px',
                flex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                  animation: 'ticker-scroll 12s linear infinite',
                }}
              >
                {tickerItems.map((service, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                    }}
                  >
                    <span
                      style={{
                        color: '#D3F463',
                        fontSize: '20px',
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      •
                    </span>
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: '20px',
                        fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
                        fontWeight: 400,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Light card / Design platform mockup */}
          <div
            style={{
              backgroundColor: '#E8E8E8',
              borderRadius: '16px',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Top bar — dark Figma-like toolbar */}
            <div
              style={{
                backgroundColor: '#1E1E1E',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              {/* Traffic-light buttons */}
              {['#FF5F57', '#FEBC2E', '#28C840'].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: color,
                  }}
                />
              ))}
              <div style={{ flex: 1 }} />
              {/* Fake toolbar icons */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>

            {/* Canvas area */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#F5F5F5',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '200px 1fr 160px',
              }}
            >
              {/* Left panel — layers */}
              <div
                style={{
                  backgroundColor: '#2C2C2C',
                  padding: '12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.4)',
                    padding: '4px 8px',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Layers
                </div>
                {['Header', 'Hero section', 'Cards grid', 'Footer', 'Background'].map(
                  (layer, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 8px',
                        borderRadius: '4px',
                        backgroundColor:
                          i === 2 ? 'rgba(141,150,253,0.3)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '2px',
                          backgroundColor: ['#D3F463', '#8D96FD', '#FF7D84', '#FFE176', '#E8E8E8'][i],
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'rgba(255,255,255,0.7)',
                          fontFamily: 'monospace',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {layer}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Main canvas */}
              <div
                style={{
                  backgroundColor: '#CCCCCC',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Fake design canvas */}
                <div
                  style={{
                    width: '85%',
                    height: '85%',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Fake hero block */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '8%',
                      right: '8%',
                      height: '28%',
                      backgroundColor: '#2A2B30',
                      borderRadius: '6px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '12%',
                        width: '55%',
                        height: '12px',
                        backgroundColor: '#D3F463',
                        borderRadius: '2px',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8%',
                        left: '12%',
                        width: '35%',
                        height: '8px',
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        borderRadius: '2px',
                      }}
                    />
                  </div>

                  {/* Fake card row */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '48%',
                      left: '8%',
                      right: '8%',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '8px',
                      height: '22%',
                    }}
                  >
                    {['#D3F463', '#8D96FD', '#FF7D84'].map((color, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: color,
                          borderRadius: '4px',
                          opacity: 0.9,
                        }}
                      />
                    ))}
                  </div>

                  {/* Fake text rows */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10%',
                      left: '8%',
                      right: '8%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: '#E0E0E0',
                        borderRadius: '2px',
                        width: '70%',
                      }}
                    />
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: '#E0E0E0',
                        borderRadius: '2px',
                        width: '50%',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right panel — properties */}
              <div
                style={{
                  backgroundColor: '#2C2C2C',
                  padding: '12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.4)',
                    padding: '4px 8px',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Properties
                </div>
                {[['W', '1280'], ['H', '640'], ['X', '0'], ['Y', '0']].map(
                  ([label, value], i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.4)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'rgba(255,255,255,0.7)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  )
                )}
                <div
                  style={{
                    margin: '4px 8px',
                    height: '1px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  }}
                />
                {/* Color swatches */}
                <div
                  style={{
                    padding: '0 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Fill
                  </span>
                  {['#D3F463', '#8D96FD', '#FF7D84', '#FFE176'].map((color, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '3px',
                          backgroundColor: color,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.5)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
