const strip1Items: string[] = [
  'Workflow Automation',
  'Custom GPT Agents',
  'Process Redesign',
  'Team Workshops',
  'Data Pipelines',
  'Tool Integration',
  'Slack Bots',
  'Document Processing',
  'Email Automation',
  'Reporting Dashboards',
  'Internal Knowledge Bases',
];

const strip2Items: string[] = [
  'Sales Ops',
  'People Teams',
  'Marketing',
  'Customer Success',
  'Finance',
  'Support',
  'Product',
  'Leadership',
  'RevOps',
  'Legal',
  'Any Department',
];

interface TickerItemProps {
  text: string;
  strip: 1 | 2;
}

function TickerItem({ text, strip }: TickerItemProps) {
  const isDark = strip === 1;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        paddingLeft: '32px',
        paddingRight: '8px',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Check icon */}
      <span
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: isDark ? '#D3F463' : '#17181B',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          color: isDark ? '#17181B' : 'white',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
      {/* Text */}
      <span
        style={{
          color: isDark ? 'white' : '#17181B',
          fontSize: '18px',
          fontWeight: 500,
          fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
        }}
      >
        {text}
      </span>
    </span>
  );
}

export function TickerStrips() {
  // Duplicate each array for seamless loop
  const strip1Doubled = [...strip1Items, ...strip1Items];
  const strip2Doubled = [...strip2Items, ...strip2Items];

  return (
    <section style={{ overflow: 'hidden', backgroundColor: 'transparent' }}>
      {/* Strip 1 — dark */}
      <div
        style={{
          backgroundColor: '#17181B',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            animation: 'marquee 30s linear infinite',
            display: 'flex',
            width: 'fit-content',
          }}
        >
          {strip1Doubled.map((item, i) => (
            <TickerItem key={i} text={item} strip={1} />
          ))}
        </div>
      </div>

      {/* Strip 2 — yellow */}
      <div
        style={{
          backgroundColor: '#FFE176',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            animation: 'marquee-reverse 30s linear infinite',
            display: 'flex',
            width: 'fit-content',
          }}
        >
          {strip2Doubled.map((item, i) => (
            <TickerItem key={i} text={item} strip={2} />
          ))}
        </div>
      </div>
    </section>
  );
}
