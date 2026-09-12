"use client";

import { useSyncExternalStore, useMemo } from "react";
import {
  type SiteEvent,
  isEventConcluded,
  partitionEvents,
  filterUpcoming,
  filterPast,
  filterSignature,
  isPastEvent,
} from "@/config/events";

// Global external store for client clock
const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;
let currentClientTime = typeof window !== "undefined" ? Date.now() : 0;

function notify() {
  if (typeof window !== "undefined") {
    currentClientTime = Date.now();
  }
  for (const listener of listeners) {
    listener();
  }
}

function handleVisibility() {
  if (typeof document !== "undefined" && document.visibilityState === "visible") {
    notify();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  if (listeners.size === 1 && typeof window !== "undefined") {
    currentClientTime = Date.now();
    window.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", notify);
    intervalId = setInterval(notify, 30_000);
  }

  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", notify);
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  };
}

function getClientTime(): number {
  return currentClientTime;
}

function getServerTime(): number {
  return 0;
}

/**
 * Hook to progressively enhance event partitioning on the client.
 * - During SSR and initial hydration: returns server/build-time partition (clientTime === 0).
 * - On client mount: dynamically recalculates with live client time.
 */
export function useLiveEventPartition(events: SiteEvent[]) {
  const clientTime = useSyncExternalStore(
    subscribe,
    getClientTime,
    getServerTime
  );

  return useMemo(() => {
    if (clientTime === 0) {
      return {
        upcoming: filterUpcoming(events),
        past: filterPast(events),
        signature: filterSignature(events),
        isLive: false,
      };
    }

    const partitioned = partitionEvents(events, clientTime);
    return {
      ...partitioned,
      isLive: true,
    };
  }, [events, clientTime]);
}

/**
 * Hook to check if a single event is concluded.
 * - During SSR: returns serverPast (or build-time check).
 * - On client: returns live status against current client time.
 */
export function useIsEventPast(event: SiteEvent, serverPast?: boolean): boolean {
  const clientTime = useSyncExternalStore(
    subscribe,
    getClientTime,
    getServerTime
  );

  if (clientTime === 0) {
    return serverPast ?? isPastEvent(event);
  }

  return isEventConcluded(event, clientTime);
}
