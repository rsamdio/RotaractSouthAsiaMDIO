export const SCROLL_TO_SECTION_KEY = "rsamdio-scroll-to-section";

/** Store a section id to scroll to after navigating to another page (no URL hash). */
export function stashScrollToSection(id: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SCROLL_TO_SECTION_KEY, id);
}

/** Consume a pending section scroll target (set by nav) without touching the URL. */
export function consumeScrollToSection(): string | null {
  if (typeof window === "undefined") return null;
  const id = sessionStorage.getItem(SCROLL_TO_SECTION_KEY);
  if (!id) return null;
  sessionStorage.removeItem(SCROLL_TO_SECTION_KEY);
  return id;
}

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, immediate: behavior === "auto" });
    return;
  }
  el.scrollIntoView({ behavior, block: "start" });
}

/**
 * Wait until the section is in the DOM (cross-page nav), then scroll.
 * Retries briefly so layout/images don't beat the first attempt.
 */
export function scrollToSectionWhenReady(
  id: string,
  behavior: ScrollBehavior = "smooth"
) {
  const maxAttempts = 60;
  let attempts = 0;

  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      scrollToSection(id, behavior);
      return;
    }
    attempts += 1;
    if (attempts < maxAttempts) {
      window.setTimeout(tryScroll, 50);
    }
  };

  requestAnimationFrame(() => {
    window.setTimeout(tryScroll, 0);
  });
}
