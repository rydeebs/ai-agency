import type { TickerContent } from "./types";

interface TickerItemProps {
  text: string;
  strip: 1 | 2;
}

function TickerItem({ text, strip }: TickerItemProps) {
  const isDark = strip === 1;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "clamp(8px, 2vw, 12px)",
        paddingLeft: "clamp(16px, 4vw, 32px)",
        paddingRight: "clamp(4px, 1vw, 8px)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: "clamp(20px, 4vw, 28px)",
          height: "clamp(20px, 4vw, 28px)",
          borderRadius: "50%",
          backgroundColor: isDark ? "#D3F463" : "#17181B",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(10px, 2vw, 14px)",
          color: isDark ? "#17181B" : "white",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
      <span
        style={{
          color: isDark ? "white" : "#17181B",
          fontSize: "clamp(14px, 3vw, 18px)",
          fontWeight: 500,
          fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
        }}
      >
        {text}
      </span>
    </span>
  );
}

interface Props {
  content: TickerContent;
}

export function TickerStripsVariant({ content }: Props) {
  const strip1Doubled = [...content.strip1, ...content.strip1];
  const strip2Doubled = [...content.strip2, ...content.strip2];

  return (
    <section style={{ overflow: "hidden", backgroundColor: "transparent" }}>
      <div
        style={{
          backgroundColor: "#17181B",
          height: "clamp(56px, 10vw, 80px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            animation: "marquee 30s linear infinite",
            display: "flex",
            width: "fit-content",
          }}
        >
          {strip1Doubled.map((item, i) => (
            <TickerItem key={i} text={item} strip={1} />
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#FFE176",
          height: "clamp(56px, 10vw, 80px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            animation: "marquee-reverse 30s linear infinite",
            display: "flex",
            width: "fit-content",
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
