"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

// Flat top nav: page-to-page navigation only. Within-page subsections are
// handled by the floating bottom PillNav on each page, and the full sitemap
// (every subpage link) lives in the Footer.
const navItems = [
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Districts", href: "/districts" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between rounded-[2rem] border border-white/10 bg-[#0B1426]/80 px-5 shadow-2xl backdrop-blur-2xl sm:px-8 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/img/rsamdio.webp"
            alt="RSAMDIO Logo"
            width={40}
            height={40}
            className="object-contain drop-shadow-lg"
            style={{ width: "auto", height: "auto" }}
          />
          <div>
            <div className="text-xl font-bold tracking-tight text-white leading-tight" style={{ fontFamily: "General Sans, sans-serif" }}>
              RSAMDIO
            </div>
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D41B69]">
              Rotaract South Asia
            </div>
          </div>
        </Link>

        {/* Desktop flat nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeToggle />
          <Link
            href="/resources"
            className="hidden rounded-full bg-[#D41B69] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#8A0F3E] hover:shadow-lg hover:shadow-[#D41B69]/20 md:inline-flex"
          >
            Access Resources
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile flat menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-h-[75vh] max-w-7xl overflow-y-auto rounded-2xl border border-white/10 bg-[#131F35]/98 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4">
            <Link
              href="/resources"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-full bg-[#D41B69] hover:bg-[#8A0F3E] text-white text-center font-bold text-xs py-3.5 transition-all shadow-md shadow-pink-900/10"
            >
              Access Resources
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
