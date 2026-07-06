"use client";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useUpcomingEvents } from "@/lib/useEvents";
import { EventCard, EventCardEmpty } from "./EventCard";
import { Reveal } from "./Reveal";

export function UpcomingEventsPreview() {
  const { events, loading } = useUpcomingEvents();
  const preview = events.slice(0, 3);

  return (
    <section id="events" className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1426] scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#D41B69]/10 blur-[100px] dark:bg-[#D41B69]/15" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#F7A81B]/8 blur-[100px] dark:bg-[#F7A81B]/10" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center mb-12">
          <span className="inline-block rounded-full bg-[#D41B69]/10 dark:bg-[#D41B69]/20 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-4">
            Conventions & Forums
          </span>
          <h2 className="text-4xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
            Upcoming Events
          </h2>
          <p className="mt-3 text-slate-600 dark:text-white/60">
            Major regional activities and conventions across South Asia.
          </p>
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#D41B69]" />
          </div>
        ) : preview.length === 0 ? (
          <EventCardEmpty />
        ) : (
          <div className="space-y-4">
            {preview.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 0.08}>
                <EventCard event={ev} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#0B1426] dark:text-white hover:text-[#D41B69] border-b-2 border-transparent hover:border-[#D41B69] pb-1 transition-colors"
          >
            View Full Calendar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
