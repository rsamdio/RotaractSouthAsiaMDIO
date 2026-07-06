"use client";
import { useEffect, useState, useCallback } from "react";

// Floating bottom pill nav (MindMarket pattern): shows the current page's
// sections with a scrollspy highlight. Each page passes its own `items`;
// the homepage set is the default.
export type PillItem = { id: string; label: string };

const homeItems: PillItem[] = [
  { id: "hero", label: "Home" },
  { id: "about-snapshot", label: "About" },
  { id: "global", label: "Network" },
  { id: "initiatives", label: "Initiatives" },
  { id: "leadership", label: "Leadership" },
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-[#0B1426]/90 px-2 py-2 shadow-2xl backdrop-blur-2xl [&::-webkit-scrollbar]:hidden">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`shrink-0 whitespace-nowrap rounded-full px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer ${
            active === item.id ? "bg-[#D41B69] text-white" : "text-white/50 hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
