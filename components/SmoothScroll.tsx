"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import {
  peekScrollToSection,
  consumeScrollToSection,
  scrollToSectionWhenReady,
} from "@/lib/scrollToSection";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    // Sanity Studio owns its own pane scroll; Lenis wheel capture breaks it.
    if (isAdmin) {
      if (window.__lenis) {
        window.__lenis.destroy();
        delete window.__lenis;
      }
      return;
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    let frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [isAdmin]);

  // On route change: scroll to a stashed section (clean URL), else reset to top.
  // Also strip legacy hash fragments and scroll without keeping # in the URL.
  useEffect(() => {
    if (isAdmin) return;

    let cancelled = false;

    const run = async () => {
      const hashId =
        typeof window !== "undefined" && window.location.hash
          ? window.location.hash.replace(/^#/, "")
          : "";

      if (hashId) {
        window.history.replaceState(null, "", pathname || window.location.pathname);
        const ok = await scrollToSectionWhenReady(hashId);
        if (!cancelled && ok) return;
      }

      const stashed = peekScrollToSection();
      if (stashed) {
        const ok = await scrollToSectionWhenReady(stashed);
        if (!cancelled && ok) consumeScrollToSection();
        return;
      }

      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    const timer = window.setTimeout(() => {
      void run();
    }, 80);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname, isAdmin]);

  return null;
}
