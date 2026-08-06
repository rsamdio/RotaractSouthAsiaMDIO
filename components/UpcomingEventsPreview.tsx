import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { filterUpcoming } from "@/config/events";
import { loadEvents } from "@/sanity/lib/content";
import { EventCard, EventCardEmpty } from "./EventCard";
import { Reveal } from "./Reveal";

export async function UpcomingEventsPreview() {
  const events = filterUpcoming(await loadEvents(), 3);

  return (
    <section
      id="events"
      className="relative scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#D41B69]/10 blur-[100px]" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#F7A81B]/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-[#D41B69]/20 bg-[#D41B69]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">
            Conventions & Forums
          </span>
          <h2
            className="text-4xl font-bold text-[#0B1426]"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            Upcoming Events
          </h2>
          <p className="mt-3 text-slate-600">
            Major regional activities, training, and sessions across South Asia.
          </p>
        </Reveal>

        {events.length === 0 ? (
          <EventCardEmpty />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev, i) => (
              <Reveal key={ev.slug} delay={i * 0.08} className="h-full">
                <EventCard event={ev} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-base font-semibold text-[#0B1426] transition-colors hover:border-[#D41B69] hover:text-[#D41B69]"
          >
            View full calendar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
