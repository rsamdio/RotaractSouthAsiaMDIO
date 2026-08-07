"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { stashScrollToSection, scrollToSection } from "@/lib/scrollToSection";
import { siteConfig } from "@/config/site";

type NavDrop = {
  label: string;
  href: string;
  /** Scroll to this element id on the target page without adding a URL hash. */
  scrollTo?: string;
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: NavDrop[];
};

const navItems: NavItem[] = [
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "About RSAMDIO", href: "/about" },
      { label: "Member Districts", href: "/districts" },
      { label: "College of Presidents", href: "/presidents" },
    ],
  },
  {
    label: "Leadership",
    href: "/leadership",
    dropdown: [
      { label: "Executive Board", href: "/leadership", scrollTo: "executive-board" },
      { label: "DRRs", href: "/leadership", scrollTo: "drrs" },
      { label: "Committee Members", href: "/leadership", scrollTo: "committee" },
    ],
  },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Events", href: "/events" },
  {
    label: "News & Updates",
    href: "/news",
    dropdown: [
      { label: "Stories", href: "/stories" },
      { label: "Announcements", href: "/announcements" },
      { label: "RSA Chronicles", href: "/chronicles" },
    ],
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close the sheet on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock page + Lenis scroll while the mobile menu is open so only the sheet scrolls.
  useEffect(() => {
    if (!mobileOpen) return;

    const lenis = window.__lenis;
    const scrollY = typeof lenis?.scroll === "number" ? lenis.scroll : window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
    };

    lenis?.stop();
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      lenis?.start();
      if (lenis) lenis.scrollTo(scrollY, { immediate: true });
      else window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  const goTo = (drop: NavDrop, e: MouseEvent<HTMLAnchorElement>) => {
    if (!drop.scrollTo) {
      setMobileOpen(false);
      return;
    }

    e.preventDefault();
    setMobileOpen(false);

    if (pathname === drop.href) {
      scrollToSection(drop.scrollTo);
      return;
    }

    stashScrollToSection(drop.scrollTo);
    // Prevent Next.js from forcing scroll-to-top after navigation,
    // which would cancel our section scroll.
    router.push(drop.href, { scroll: false });
  };

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 cursor-default bg-[#0B1426]/35 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="relative z-50 mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-3xl border border-slate-200 bg-white/95 px-4 shadow-lg backdrop-blur-2xl sm:px-6 text-slate-700">
        {/* Logo */}
        <Link
          href="/"
          className="relative block h-9 w-[86px] shrink-0 sm:h-10 sm:w-[96px]"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/img/rsamdio.webp"
            alt="RSAMDIO Logo"
            fill
            className="object-contain object-left"
            sizes="(min-width: 640px) 96px, 86px"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100/80 hover:text-[#D41B69] flex items-center gap-1"
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown className="h-3 w-3 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                )}
              </Link>
              {item.dropdown && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 min-w-[200px] flex flex-col gap-1">
                    {item.dropdown.map((drop) => (
                      <Link
                        key={drop.label}
                        href={drop.href}
                        onClick={(e) => goTo(drop, e)}
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
          <a
            href={siteConfig.connectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-crimson px-5 py-2 text-sm font-bold text-white transition hover:bg-crimson-hover hover:shadow-lg hover:shadow-crimson/20 lg:inline-flex"
          >
            Sign in to RSA Connect
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 lg:hidden cursor-pointer hover:bg-slate-100"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="relative z-50 mx-auto mt-2 max-h-[min(75vh,calc(100dvh-5.5rem))] max-w-7xl overflow-y-auto overscroll-contain touch-pan-y rounded-2xl border border-slate-200 bg-white p-4 shadow-xl backdrop-blur-2xl [-webkit-overflow-scrolling:touch] lg:hidden"
        >
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
                    {item.dropdown.map((drop) => (
                      <Link
                        key={drop.label}
                        href={drop.href}
                        onClick={(e) => goTo(drop, e)}
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-rose-50/50 hover:text-[#D41B69] transition"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={siteConfig.connectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center rounded-full bg-crimson px-5 py-3 text-sm font-bold text-white transition hover:bg-crimson-hover"
            >
              Sign in to RSA Connect
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
