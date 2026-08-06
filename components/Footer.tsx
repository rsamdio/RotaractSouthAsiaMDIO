import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
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

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  id: string;
  heading: string;
  items: FooterLink[];
};

// Agreed IA (UI / UX / UXR / Frontend / Critic): brand + 3 equal link columns.
// No 5–8 column dump, no stats band, no duplicate Publications Hub.
const footerColumns: FooterColumn[] = [
  {
    id: "organization",
    heading: "Organization",
    items: [
      { label: "About RSAMDIO", href: "/about" },
      { label: "Member Districts", href: "/districts" },
      { label: "Leadership", href: "/leadership" },
      { label: "College of Presidents", href: "/presidents" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    id: "platforms",
    heading: "Platforms",
    items: [
      { label: "Rotaract Library", href: "https://library.rsamdio.org/", external: true },
      { label: "Invoice Calculator", href: "https://dues.rsamdio.org/", external: true },
      { label: "Rotaract Certify", href: "https://certify.rsamdio.org/", external: true },
      { label: "Publications Hub", href: "https://publications.rsamdio.org/", external: true },
      { label: "Initiatives", href: "/initiatives" },
    ],
  },
  {
    id: "connect",
    heading: "Connect",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "News & Updates", href: "/news" },
      { label: "Stories", href: "/stories" },
      { label: "Announcements", href: "/announcements" },
      { label: "RSA Chronicles", href: "/chronicles" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
] as const;

function FooterNavLink({ item }: { item: FooterLink }) {
  const className =
    "inline-flex items-center gap-1.5 text-sm text-slate-600 transition hover:text-[#D41B69] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/35 focus-visible:ring-offset-2 rounded-sm";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`${item.label} (opens in a new tab)`}
      >
        {item.label}
        <ExternalLink className="h-3 w-3 shrink-0 opacity-50" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-[#FAFAF8]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex w-fit rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/35 focus-visible:ring-offset-2"
            >
              <Image
                src="/img/rsamdio.webp"
                alt="RSAMDIO Rotaract South Asia"
                width={72}
                height={72}
                className="h-auto w-16 object-contain sm:w-[4.5rem]"
                style={{ height: "auto" }}
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              The regional coordination hub for Rotaract across South Asia, connecting 8 nations
              through shared knowledge, standards, and service.
            </p>

            <nav aria-label="Social media">
              <ul className="flex items-center gap-2.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-[#D41B69]/25 hover:bg-[#D41B69]/5 hover:text-[#D41B69] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/35 focus-visible:ring-offset-2"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Link columns — equal tracks */}
          <nav aria-label="Footer" className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-8">
              {footerColumns.map((col) => (
                <section key={col.id} aria-labelledby={`footer-${col.id}`}>
                  <h2
                    id={`footer-${col.id}`}
                    className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#17458F]/80"
                  >
                    {col.heading}
                  </h2>
                  <ul className="space-y-2.5">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <FooterNavLink item={item} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Single utility bar */}
      <div className="border-t border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Rotaract South Asia MDIO · RY {siteConfig.rotaryYear}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="transition hover:text-[#D41B69] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/35 focus-visible:ring-offset-2 rounded-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-[#D41B69] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/35 focus-visible:ring-offset-2 rounded-sm"
            >
              Terms of Use
            </Link>
            <Link
              href="/admin"
              className="text-slate-400 transition hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D41B69]/35 focus-visible:ring-offset-2 rounded-sm"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
