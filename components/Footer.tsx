import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Globe, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

// Brand icons hand-rolled as SVG — lucide-react removed brand glyphs.
export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
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

export function FacebookIcon({ className }: { className?: string }) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const footerColumns = [
  {
    heading: "About",
    items: [
      { label: "About RSAMDIO", href: "/about" },
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "Districts & Countries", href: "/districts" },
    ],
  },
  {
    heading: "Leadership",
    items: [
      { label: "Executive Board", href: "/leadership#executive-board" },
      { label: "DRRs", href: "/leadership#drrs" },
      { label: "Committee Members", href: "/leadership#committee" },
      { label: "Past Leadership Archive", href: "/leadership#past-leadership" },
    ],
  },
  {
    heading: "Initiatives",
    items: [
      { label: "Rotaract Library", href: "https://library.rsamdio.org/essentials", external: true },
      { label: "Rotaract Certify", href: "https://library.rsamdio.org/", external: true },
      { label: "Brand Kit", href: "https://library.rsamdio.org/#brand-identity", external: true },
      { label: "Publications Hub", href: "https://library.rsamdio.org/#publications", external: true },
    ],
  },
  {
    heading: "News & Media",
    items: [
      { label: "Stories", href: "/news#stories" },
      { label: "Press Releases", href: "/news#press" },
      { label: "Publications Hub", href: "/news#publications" },
      { label: "Gallery", href: "/news#gallery" },
    ],
  },
  {
    heading: "Contact",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "Submit an Update", href: "/contact?type=district-update" },
      { label: "Partnership Inquiry", href: "/contact?type=partnership" },
      { label: "Media Inquiry", href: "/contact?type=media" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 xl:grid-cols-[1.3fr_repeat(7,0.85fr)] xl:gap-12">
          {/* Brand column */}
          <div className="space-y-5 col-span-2 md:col-span-4 xl:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/img/rsamdio.webp"
                alt="RSAMDIO Logo"
                width={40}
                height={40}
                className="object-contain drop-shadow-sm"
              />
              <div>
                <div className="text-lg font-bold tracking-tight text-[#17458F]" style={{ fontFamily: "General Sans, sans-serif" }}>
                  RSAMDIO
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#D41B69]">
                  Rotaract South Asia
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              The regional coordination hub for Rotaract across South Asia — unifying 8 nations through shared knowledge, standards, and service.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-[#D41B69]/10 hover:text-[#D41B69] hover:border-[#D41B69]/20 transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-[#D41B69]/10 hover:text-[#D41B69] hover:border-[#D41B69]/20 transition"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-[#D41B69]/10 hover:text-[#D41B69] hover:border-[#D41B69]/20 transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://library.rsamdio.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition"
                aria-label="Resource Library"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">
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
                        className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#D41B69] transition"
                      >
                        {item.label}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-slate-600 hover:text-[#D41B69] transition"
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
      <div className="border-t border-slate-200 py-6 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Nations", value: siteConfig.stats.countries },
              { label: "Districts", value: siteConfig.stats.districts },
              { label: "Clubs", value: siteConfig.stats.clubs },
              { label: "Members", value: siteConfig.stats.members },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-base font-bold text-slate-800">{value}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Shield className="h-3 w-3" />
            GDPR Compliant · RY {siteConfig.rotaryYear}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 py-5 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Rotaract South Asia MDIO. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-700 transition">Privacy Policy</Link>
            <Link href="/admin" className="hover:text-slate-700 transition">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
