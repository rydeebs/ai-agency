const logos = [
  { name: "Meridian Auto", subtitle: "60% TIME SAVED" },
  { name: "ScaleForce" },
  { name: "Horizon Health" },
  { name: "Atlas Financial" },
  { name: "Apex Logistics", subtitle: "30+ HRS AUTOMATED" },
  { name: "Citadel Ventures" },
  { name: "Redwood Partners" },
  { name: "Pinnacle Tech" },
];

function LogoPill({ name, subtitle }: { name: string; subtitle?: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(170, 172, 180, 0.6)",
        borderRadius: "1440px",
        height: "clamp(64px, 12vw, 96px)",
        minWidth: "clamp(140px, 25vw, 200px)",
        padding: "0 clamp(16px, 4vw, 32px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        gap: "2px",
      }}
    >
      <span
        style={{
          fontSize: subtitle ? "clamp(11px, 2vw, 14px)" : "clamp(14px, 2.5vw, 18px)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          letterSpacing: subtitle ? "1px" : "0",
          textTransform: subtitle ? "uppercase" : "none",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
      {subtitle && (
        <span
          style={{
            fontSize: "clamp(8px, 1.5vw, 10px)",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}

export function ClientLogoBanner() {
  const doubled = [...logos, ...logos];

  return (
    <div
      style={{
        height: "clamp(64px, 12vw, 96px)",
        overflow: "hidden",
        width: "100%",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "clamp(8px, 2vw, 16px)",
          width: "fit-content",
          animation: "marquee 35s linear infinite",
        }}
      >
        {doubled.map((logo, i) => (
          <LogoPill key={i} name={logo.name} subtitle={logo.subtitle} />
        ))}
      </div>
    </div>
  );
}
