"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#about-section", label: "About" },
  { href: "#ecosystem", label: "Resource Hub" },
  { href: "#events-section", label: "Events" },
  { href: "#leadership-section", label: "Leadership" },
  { href: "#waitlist-section", label: "Join Waitlist" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between rounded-[2rem] border border-white/10 bg-[#0B1426]/80 px-5 shadow-2xl backdrop-blur-2xl sm:px-8 text-white">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
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

        {/* Desktop Simplified Flat Navbar (Decluttered, only high-level flat links) */}
        <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-sm backdrop-blur-xl lg:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="#ecosystem"
            className="hidden rounded-full bg-[#D41B69] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#8A0F3E] hover:shadow-lg hover:shadow-[#D41B69]/20 md:inline-flex"
          >
            Access Resources
          </Link>
          <Link
            href="#game-challenge"
            className="hidden sm:inline-flex rounded-full bg-[#F7A81B] px-5 py-2.5 text-sm font-bold text-[#0B1426] transition hover:bg-yellow-500 hover:shadow-lg hover:shadow-[#F7A81B]/20"
          >
            Challenge 2048
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Decluttered & Flat) */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#131F35]/98 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
              >
                {label}
              </Link>
            ))}
          </div>
          {/* Mobile actions at the bottom of drawer */}
          <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4">
            <Link
              href="#ecosystem"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-full bg-[#D41B69] hover:bg-[#8A0F3E] text-white text-center font-bold text-xs py-3.5 transition-all shadow-md shadow-pink-900/10"
            >
              Access Resources
            </Link>
            <Link
              href="#game-challenge"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-full bg-[#F7A81B] hover:bg-yellow-500 text-navy-dark text-center font-bold text-xs py-3.5 transition-all shadow-md shadow-orange-950/15"
            >
              Challenge 2048
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
