"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const bookingUrl = "https://calendar.app.google/fvAx1yvcih4jMp346";

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

      <nav aria-label="Tool navigation" className="hidden items-center gap-7 md:flex">
        <Link className="text-sm text-white/65 transition hover:text-white" href="/tools">
          All tools
        </Link>
        <Link className="text-sm text-white/65 transition hover:text-white" href="/#services">
          What we fix
        </Link>
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
          aria-label="Mobile tool navigation"
          className="absolute left-5 right-5 top-[72px] flex flex-col gap-1 rounded-xl border border-white/10 bg-cp-dark p-3 shadow-2xl md:hidden"
        >
          <Link className="rounded-lg px-4 py-3 text-white" href="/tools" onClick={() => setOpen(false)}>
            All tools
          </Link>
          <Link className="rounded-lg px-4 py-3 text-white" href="/#services" onClick={() => setOpen(false)}>
            What we fix
          </Link>
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

