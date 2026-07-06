"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Event, defaultEvents } from "@/config/events";

export function useUpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "events"),
      (snap) => {
        if (snap.empty) {
          setEvents(defaultEvents);
        } else {
          const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Event));
          data.sort((a, b) => (a.year + a.month).localeCompare(b.year + b.month));
          setEvents(data);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore onSnapshot error, using default events:", error);
        setEvents(defaultEvents);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  return { events, loading };
}
