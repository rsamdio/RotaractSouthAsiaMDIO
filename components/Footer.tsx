import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Globe, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const footerLinks = [
  {
    heading: "Portal",
    items: [
      { label: "Home", href: "/" },
      { label: "Regional Map", href: "#ecosystem" },
      { label: "Knowledge Library", href: "#ecosystem" },
      { label: "2048 Challenge", href: "#game-challenge" },
    ],
  },
  {
    heading: "Organization",
    items: [
      { label: "About RSAMDIO", href: "#about-section" },
      { label: "Leadership Board", href: "#leadership-section" },
      { label: "Events & Forums", href: "#events-section" },
      { label: "Join the Network", href: "#waitlist-section" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Resource Library", href: "https://library.rsamdio.org", external: true },
      { label: "Brand Kit", href: "#ecosystem" },
      { label: "Admin Portal", href: "/admin" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#07101E] border-t border-white/8">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/img/rsamdio.webp"
                alt="RSAMDIO Logo"
                width={40}
                height={40}
                className="object-contain drop-shadow-lg"
              />
              <div>
                <div className="text-lg font-bold tracking-tight text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
                  RSAMDIO
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D41B69]">
                  Rotaract South Asia
                </div>
              </div>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs">
              The regional coordination hub for Rotaract across South Asia — unifying 8 nations through shared knowledge, standards, and service.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 hover:bg-[#D41B69]/15 hover:text-[#D41B69] hover:border-[#D41B69]/30 transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://library.rsamdio.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition"
                aria-label="Resource Library"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-white/45 hover:text-white transition"
                      >
                        {item.label}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-white/45 hover:text-white transition"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-white/8 py-6 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Nations", value: "8" },
              { label: "Districts", value: "38+" },
              { label: "Clubs", value: "3,500+" },
              { label: "Members", value: "120K+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-base font-bold text-white">{value}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/20">
            <Shield className="h-3 w-3" />
            GDPR Compliant · RY {siteConfig.rotaryYear}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <p>© {new Date().getFullYear()} Rotaract South Asia MDIO. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition">Privacy Policy</Link>
            <Link href="/admin" className="hover:text-white/60 transition">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
