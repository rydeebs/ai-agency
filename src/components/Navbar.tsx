"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "AI Transformation", href: "#why-us" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#team" },
  ];

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
          padding: "clamp(16px, 4vw, 32px) clamp(20px, 5vw, 60px) 16px",
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
            alt="NewRevGen"
            width={180}
            height={40}
            style={{
              objectFit: "contain",
              width: "clamp(120px, 20vw, 180px)",
              height: "auto",
            }}
            priority
          />
        </Link>

        {/* Desktop Nav links */}
        <ul
          className="desktop-nav"
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
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "16px",
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

        {/* Desktop CTA Buttons */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link
            href="#contact"
            style={{
              backgroundColor: "rgb(211, 244, 99)",
              color: "rgb(23, 24, 27)",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "14px",
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
            Schedule Call ↗
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
          }}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D3F463"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            display: "none",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "rgba(23, 24, 27, 0.98)",
            backdropFilter: "blur(10px)",
            padding: "20px",
            borderRadius: "0 0 16px 16px",
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                padding: "16px 20px",
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: "block",
              marginTop: "16px",
              backgroundColor: "#D3F463",
              color: "#17181B",
              padding: "16px 20px",
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Schedule Strategy Call ↗
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
