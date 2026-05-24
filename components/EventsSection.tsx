"use client";
import {
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot,
  serverTimestamp, type Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { CalendarDays, MapPin, Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export type Event = {
  id: string;
  title: string;
  month: string;
  year: string;
  location: string;
  description: string;
  category: "pink" | "gold" | "blue";
  link?: string;
  createdAt?: Timestamp;
};

const categoryStyles: Record<Event["category"], { bg: string; text: string; border: string; dot: string }> = {
  pink: { bg: "bg-[#D41B69]/10 dark:bg-[#D41B69]/15", text: "text-[#D41B69]", border: "border-[#D41B69]/20", dot: "bg-[#D41B69]" },
  gold: { bg: "bg-[#F7A81B]/10 dark:bg-[#F7A81B]/15", text: "text-[#C87900] dark:text-[#F7A81B]", border: "border-[#F7A81B]/20", dot: "bg-[#F7A81B]" },
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", border: "border-blue-100 dark:border-blue-800/40", dot: "bg-blue-600" },
};

const defaultEvents: Event[] = [
  {
    id: "default-1",
    title: "ANANTA 2026: 17th RSA MDIO Installation Ceremony & ROAR Awards",
    month: "MAY",
    year: "2026",
    location: "Bengaluru, Karnataka, India",
    description: "The historic 17th Rotaract South Asia MDIO Installation Ceremony and ROAR Awards at Ramada by Wyndham Yelahanka, marking the regional leadership transition for RY 2026–27 under President Arun Teja Godavarthi.",
    category: "gold",
    link: "https://ananta.rsamdio.org/"
  }
];

export function EventsSection() {
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

  if (loading) {
    return (
      <section className="py-24 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#D41B69]" />
      </section>
    );
  }

  return (
    <section id="events-section" className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1426]">
      {/* Dark mode ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#D41B69]/10 blur-[100px] dark:bg-[#D41B69]/15" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#F7A81B]/8 blur-[100px] dark:bg-[#F7A81B]/10" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-[#D41B69]/10 dark:bg-[#D41B69]/20 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-4">
            Conventions &amp; Forums
          </span>
          <h2 className="text-4xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
            Upcoming Events
          </h2>
          <p className="mt-3 text-slate-600 dark:text-white/60">
            Major regional activities and conventions across South Asia.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 text-slate-400 dark:text-white/30">
            <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No events scheduled yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((ev) => {
              const s = categoryStyles[ev.category] ?? categoryStyles.pink;
              return (
                <div
                  key={ev.id}
                  className={`flex gap-5 rounded-2xl border ${s.border} ${s.bg} p-5 transition-all hover:shadow-soft`}
                >
                  <div className={`${s.dot} rounded-xl text-white p-3 text-center shrink-0 min-w-[60px] flex flex-col items-center justify-center`}>
                    <div className="text-sm font-bold">{ev.month}</div>
                    <div className="text-[10px] opacity-80">{ev.year}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-[#0B1426] dark:text-white text-base`}>{ev.title}</h4>
                    {ev.location && (
                      <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-white/50 mt-0.5">
                        <MapPin className="h-3 w-3" /> {ev.location}
                      </p>
                    )}
                    {ev.description && (
                      <p className="text-xs text-slate-600 dark:text-white/60 mt-2 leading-relaxed">{ev.description}</p>
                    )}
                    {ev.link && (
                      <a
                        href={ev.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#D41B69] hover:bg-[#8A0F3E] text-white text-[10px] font-bold px-3 py-1.5 mt-3.5 transition-all shadow-md shadow-[#D41B69]/10"
                      >
                        Visit Event Site →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
