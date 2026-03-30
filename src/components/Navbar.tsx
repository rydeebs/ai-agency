"use client";

import Link from "next/link";
import Image from "next/image";

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
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "32px 60px 16px",
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
            textDecoration: "none",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="NexRevGen"
            width={180}
            height={40}
            style={{
              objectFit: "contain",
            }}
            priority
          />
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
