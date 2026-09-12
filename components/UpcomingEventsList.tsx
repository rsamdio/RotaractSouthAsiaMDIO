"use client";

import type { SiteEvent } from "@/config/events";
import { useLiveEventPartition } from "@/lib/useEventStore";
import { EventCard, EventCardEmpty } from "./EventCard";
import { Reveal } from "./Reveal";

type Props = {
  events: SiteEvent[];
  limit?: number;
};

export function UpcomingEventsList({ events, limit = 3 }: Props) {
  const { upcoming } = useLiveEventPartition(events);
  const visibleEvents = upcoming.slice(0, limit);

  if (visibleEvents.length === 0) {
    return <EventCardEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleEvents.map((ev, i) => (
        <Reveal key={ev.slug} delay={i * 0.08} className="h-full">
          <EventCard event={ev} isPast={false} />
        </Reveal>
      ))}
    </div>
  );
}
