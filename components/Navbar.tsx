"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Nav items with dropdown support
const navItems = [
  { 
    label: "About", 
    href: "/about",
    dropdown: [
      { label: "About RSAMDIO", href: "/about" },
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "Districts & Countries", href: "/districts" }
    ]
  },
  { 
    label: "Leadership", 
    href: "/leadership",
    dropdown: [
      { label: "Executive Board", href: "/leadership#executive-board" },
      { label: "DRRs", href: "/leadership#drrs" },
      { label: "Committee Members", href: "/leadership#committee" },
    ]
  },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Districts", href: "/districts" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between rounded-[2rem] border border-slate-200 bg-white/95 px-5 shadow-lg backdrop-blur-2xl sm:px-8 text-slate-700">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/img/rsamdio.webp"
            alt="RSAMDIO Logo"
            width={120}
            height={48}
            className="object-contain drop-shadow-sm h-14 sm:h-16 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100/80 hover:text-[#D41B69] flex items-center gap-1"
              >
                {item.label}
                {item.dropdown && <ChevronDown className="h-3 w-3 opacity-60 group-hover:rotate-180 transition-transform duration-200" />}
              </Link>
              {item.dropdown && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 min-w-[200px] flex flex-col gap-1">
                    {item.dropdown.map(drop => (
                      <Link
                        key={drop.label}
                        href={drop.href}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#D41B69] hover:bg-slate-50 rounded-xl transition"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="hidden rounded-full bg-[#D41B69] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#9A0E4E] hover:shadow-lg hover:shadow-[#D41B69]/20 lg:inline-flex"
          >
            Get in Touch
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 lg:hidden cursor-pointer hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-h-[75vh] max-w-7xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-xl backdrop-blur-2xl lg:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-[#D41B69] transition flex items-center justify-between"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-6 pr-4 space-y-1 mt-1 mb-2">
                    {item.dropdown.map(drop => (
                      <Link
                        key={drop.label}
                        href={drop.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-rose-50/50 hover:text-[#D41B69] transition"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}
    </nav>
  );
}
