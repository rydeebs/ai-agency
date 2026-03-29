// Scrolling client logo banner — pill-shaped logos with infinite marquee

const logos = [
  { name: "DECKO", subtitle: "THE DECK COMPANY" },
  { name: "Keenee" },
  { name: "Lumina" },
  { name: "Goa Ventures" },
  { name: "Your Friends Are Boring ☺" },
  { name: "535West" },
  { name: "CryptoLock" },
  { name: "Off the Grid" },
];

function LogoPill({ name, subtitle }: { name: string; subtitle?: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(170, 172, 180, 0.6)",
        borderRadius: "1440px",
        height: "96px",
        minWidth: "200px",
        padding: "0 32px",
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
          fontSize: subtitle ? "14px" : "18px",
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
            fontSize: "10px",
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
  // Duplicate for seamless loop
  const doubled = [...logos, ...logos];

  return (
    <div
      style={{
        height: "96px",
        overflow: "hidden",
        width: "100%",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
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
