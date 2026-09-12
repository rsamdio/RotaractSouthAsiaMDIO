"use client";

import { History, Star } from "lucide-react";
import type { SiteEvent } from "@/config/events";
import { EventCard, EventCardEmpty } from "@/components/EventCard";
import { EventsCalendar } from "@/components/EventsCalendar";
import { SectionScrollButton } from "@/components/SectionScrollButton";
import { PastEventsLoadMore } from "@/components/PastEventsLoadMore";
import { useLiveEventPartition } from "@/lib/useEventStore";

type Props = {
  events: SiteEvent[];
};

export function EventsDirectory({ events }: Props) {
  const { upcoming, past, signature } = useLiveEventPartition(events);

  return (
    <>
      <section id="upcoming" className="scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold text-[#0B1426]">
            Upcoming Events
          </h2>
          {upcoming.length === 0 ? (
            <EventCardEmpty message="No upcoming events right now. Check Past Events or the calendar." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upcoming.map((ev) => (
                <EventCard key={ev.slug} event={ev} isPast={false} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="signature" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-2">
            <Star className="h-4 w-4 text-[#F7A81B]" />
            <h2 className="text-2xl font-bold text-[#0B1426]">
              Signature Events
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {signature.map((ev) => (
              <EventCard key={ev.slug} event={ev} />
            ))}
          </div>
        </div>
      </section>

      <section id="past" className="scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-2">
            <History className="h-4 w-4 text-crimson" />
            <h2 className="text-2xl font-bold text-ink">Past Events</h2>
          </div>
          <PastEventsLoadMore events={past} />
        </div>
      </section>

      <section id="calendar" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[#0B1426]">
                Event Calendar
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Navigate months, select a day, and open any event page.
              </p>
            </div>
            <SectionScrollButton
              sectionId="upcoming"
              className="cursor-pointer text-sm font-bold text-[#D41B69] hover:underline"
            >
              Back to upcoming
            </SectionScrollButton>
          </div>
          <EventsCalendar events={events} />
        </div>
      </section>
    </>
  );
}
