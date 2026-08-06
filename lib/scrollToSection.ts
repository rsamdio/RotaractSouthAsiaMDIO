export const SCROLL_TO_SECTION_KEY = "rsamdio-scroll-to-section";

/** In-memory mirror so React Strict Mode remounts don't lose the target. */
let pendingSectionId: string | null = null;

/** Approximate fixed chrome (nav + sticky controls) for Lenis, which ignores CSS scroll-margin. */
export const SECTION_SCROLL_OFFSET = -112;

/** Store a section id to scroll to after navigating to another page (no URL hash required). */
export function stashScrollToSection(id: string) {
  if (typeof window === "undefined") return;
  pendingSectionId = id;
  try {
    sessionStorage.setItem(SCROLL_TO_SECTION_KEY, id);
  } catch {
    // Private mode / blocked storage — memory still works for this session.
  }
}

/** Read pending target without clearing (safe under Strict Mode double-mount). */
export function peekScrollToSection(): string | null {
  if (typeof window === "undefined") return null;
  if (pendingSectionId) return pendingSectionId;
  try {
    return sessionStorage.getItem(SCROLL_TO_SECTION_KEY);
  } catch {
    return null;
  }
}

/** Clear pending target after a successful (or abandoned) scroll. */
export function consumeScrollToSection(): string | null {
  const id = peekScrollToSection();
  pendingSectionId = null;
  if (typeof window === "undefined") return id;
  try {
    sessionStorage.removeItem(SCROLL_TO_SECTION_KEY);
  } catch {
    // ignore
  }
  return id;
}

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: SECTION_SCROLL_OFFSET,
      immediate: behavior === "auto",
    });
    return true;
  }
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

/**
 * Wait until the section is in the DOM (cross-page nav), then scroll.
 * Retries briefly so layout/images don't beat the first attempt.
 */
export function scrollToSectionWhenReady(
  id: string,
  behavior: ScrollBehavior = "smooth"
): Promise<boolean> {
  const maxAttempts = 80;

  return new Promise((resolve) => {
    let attempts = 0;

    const tryScroll = () => {
      if (scrollToSection(id, behavior)) {
        resolve(true);
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(tryScroll, 50);
      } else {
        resolve(false);
      }
    };

    requestAnimationFrame(() => {
      window.setTimeout(tryScroll, 0);
    });
  });
}
