"use client";
import { useEffect, useState, useCallback } from "react";

// Floating bottom pill nav (MindMarket pattern): shows the current page's
// sections with a scrollspy highlight. Each page passes its own `items`;
// the homepage set is the default.
export type PillItem = { id: string; label: string };

const homeItems: PillItem[] = [
  { id: "hero", label: "Home" },
  { id: "about-snapshot", label: "About" },
  { id: "global", label: "Presence" },
  { id: "initiatives", label: "Initiatives" },
  { id: "leadership", label: "Leadership" },
  { id: "news", label: "News" },
  { id: "events", label: "Events" },
];

export function PillNav({ items = homeItems }: { items?: PillItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -112 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto rounded-2xl border border-[#0B1426]/5 bg-white px-2 py-2 shadow-[0_8px_30px_rgba(39,43,36,0.12)] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
            active === item.id ? "bg-[#D41B69] text-white" : "text-[#0B1426]/60 hover:text-[#0B1426]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
