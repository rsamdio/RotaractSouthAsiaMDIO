"use client";

import { useEffect, useRef } from "react";

/** Smoothly center `tab` inside a horizontal scroll container (no page jump). */
export function scrollTabIntoView(scroller: HTMLElement, tab: HTMLElement) {
  const scrollerRect = scroller.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const delta =
    tabRect.left + tabRect.width / 2 - (scrollerRect.left + scrollerRect.width / 2);
  if (Math.abs(delta) < 2) return;
  scroller.scrollBy({ left: delta, behavior: "smooth" });
}

/**
 * Keeps the active tab visible (and neighbors peeking) in an overflow-x tab strip.
 * Manual swipe/drag scrolling still works.
 */
export function useScrollActiveTabIntoView<K extends string>(activeKey: K) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<K, HTMLElement | null>>>({});

  useEffect(() => {
    const scroller = scrollerRef.current;
    const tab = tabRefs.current[activeKey];
    if (!scroller || !tab) return;
    scrollTabIntoView(scroller, tab);
  }, [activeKey]);

  const setTabRef = (key: K) => (el: HTMLButtonElement | null) => {
    tabRefs.current[key] = el;
  };

  return { scrollerRef, setTabRef };
}
