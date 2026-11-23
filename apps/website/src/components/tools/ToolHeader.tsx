"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const bookingUrl = "https://calendar.app.google/fvAx1yvcih4jMp346";

const navLinks = [
  { label: "Roofing", href: "/roofing" },
  { label: "Contractors", href: "/operations" },
  { label: "All tools", href: "/tools" },
  { label: "What we fix", href: "/#services" },
];

export function ToolHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-5 md:px-10">
      <Link href="/" aria-label="NewRevGen home" className="inline-flex items-center">
        <Image
          src="/images/logo.png"
          alt="NewRevGen"
          width={180}
          height={40}
          className="h-auto w-[140px] sm:w-[165px]"
          priority
        />
      </Link>

      <nav aria-label="Site navigation" className="hidden items-center gap-7 md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} className="text-sm text-white/65 transition hover:text-white" href={link.href}>
            {link.label}
          </Link>
        ))}
        <a
          className="rounded-lg bg-cp-lime px-4 py-2.5 text-sm font-bold text-cp-dark transition hover:opacity-85"
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
        >
          Book a walkthrough ↗
        </a>
      </nav>

      <button
        type="button"
        className="rounded-lg p-2 text-cp-lime md:hidden"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open ? (
        <nav
          aria-label="Mobile site navigation"
          className="absolute left-5 right-5 top-[72px] flex flex-col gap-1 rounded-xl border border-white/10 bg-cp-dark p-3 shadow-2xl md:hidden"
        >
          {navLinks.map((link) => (
            <Link key={link.href} className="rounded-lg px-4 py-3 text-white" href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a
            className="mt-1 rounded-lg bg-cp-lime px-4 py-3 text-center font-bold text-cp-dark"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Book a walkthrough ↗
          </a>
        </nav>
      ) : null}
    </header>
  );
}

