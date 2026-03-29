"use client";

import Link from "next/link";

function AIIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Neural network / AI brain icon */}
      <circle cx="16" cy="16" r="14" stroke="#D3F463" strokeWidth="2" fill="none" />
      <circle cx="16" cy="10" r="2.5" fill="#D3F463" />
      <circle cx="10" cy="18" r="2.5" fill="#D3F463" />
      <circle cx="22" cy="18" r="2.5" fill="#D3F463" />
      <circle cx="16" cy="22" r="2" fill="#D3F463" opacity="0.7" />
      <line x1="16" y1="12.5" x2="11.5" y2="16" stroke="#D3F463" strokeWidth="1.5" />
      <line x1="16" y1="12.5" x2="20.5" y2="16" stroke="#D3F463" strokeWidth="1.5" />
      <line x1="12" y1="19" x2="14.5" y2="21" stroke="#D3F463" strokeWidth="1.5" opacity="0.7" />
      <line x1="20" y1="19" x2="17.5" y2="21" stroke="#D3F463" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

export function Navbar() {
  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "32px 80px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo / Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <AIIcon />
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "18px",
              color: "white",
              letterSpacing: "-0.3px",
            }}
          >
            <span style={{ fontWeight: 700 }}>GenAIPI</span>
          </span>
        </Link>

        {/* Nav links */}
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {[
            { label: "AI Transformation", href: "#why-us" },
            { label: "Services", href: "#services" },
            { label: "Pricing", href: "#pricing" },
            { label: "About", href: "#team" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "rgb(170, 172, 180)",
                  textDecoration: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  transition: "color 0.2s ease",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgb(170, 172, 180)";
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Buttons + Language */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Schedule Strategy Call button */}
          <Link
            href="#contact"
            style={{
              backgroundColor: "rgb(211, 244, 99)",
              color: "rgb(23, 24, 27)",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "var(--font-dm-sans), sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            Schedule Strategy Call ↗
          </Link>

          {/* Login button */}
          <Link
            href="#"
            style={{
              backgroundColor: "transparent",
              color: "rgb(170, 172, 180)",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "var(--font-dm-sans), sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              transition: "color 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
