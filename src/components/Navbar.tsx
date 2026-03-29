"use client";

import Link from "next/link";

function PropellerIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Center hub */}
      <circle cx="16" cy="16" r="3" fill="#D3F463" />
      {/* Blade 1 — top-left */}
      <path
        d="M16 13 C14 8, 8 6, 7 10 C6 13, 10 14, 13 13 Z"
        fill="#D3F463"
        opacity="0.9"
      />
      {/* Blade 2 — bottom-right */}
      <path
        d="M16 19 C18 24, 24 26, 25 22 C26 19, 22 18, 19 19 Z"
        fill="#D3F463"
        opacity="0.9"
      />
      {/* Blade 3 — top-right */}
      <path
        d="M19 13 C24 14, 26 8, 22 7 C19 6, 18 10, 19 13 Z"
        fill="#D3F463"
        opacity="0.7"
      />
      {/* Blade 4 — bottom-left */}
      <path
        d="M13 19 C8 18, 6 24, 10 25 C13 26, 14 22, 13 19 Z"
        fill="#D3F463"
        opacity="0.7"
      />
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
          <PropellerIcon />
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "18px",
              color: "white",
              letterSpacing: "-0.3px",
            }}
          >
            <span style={{ fontWeight: 400 }}>Creative</span>
            <span style={{ fontWeight: 700 }}> Propeller</span>
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
            { label: "About", href: "#team" },
            { label: "PORTFOLIO", href: "/portfolio" },
            { label: "Prices", href: "#pricing" },
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
          {/* Get Started button */}
          <Link
            href="#"
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
            Get Started ↗
          </Link>

          {/* Login button */}
          <Link
            href="#"
            style={{
              backgroundColor: "rgb(0, 122, 255)",
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
            Login ↗
          </Link>

          {/* Language selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "rgb(170, 172, 180)",
              fontSize: "14px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "6px",
              marginLeft: "4px",
            }}
          >
            <span>🇬🇧</span>
            <span>English</span>
            <span style={{ fontSize: "10px" }}>▾</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
