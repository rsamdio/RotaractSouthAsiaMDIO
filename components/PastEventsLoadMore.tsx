"use client";

import { useState } from "react";
import type { SiteEvent } from "@/config/events";
import { EventCard, EventCardEmpty } from "@/components/EventCard";
import { LoadMoreButton } from "@/components/LoadMoreButton";

const DEFAULT_PAGE_SIZE = 8;

type Props = {
  events: SiteEvent[];
  pageSize?: number;
};

export function PastEventsLoadMore({
  events,
  pageSize = DEFAULT_PAGE_SIZE,
}: Props) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(pageSize, events.length),
  );

  if (events.length === 0) {
    return (
      <EventCardEmpty message="Past events will appear here after they conclude." />
    );
  }

  const effectiveCount = Math.max(
    visibleCount,
    Math.min(pageSize, events.length)
  );
  const visible = events.slice(0, effectiveCount);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((ev) => (
          <EventCard key={ev.slug} event={ev} />
        ))}
      </div>
      {events.length > pageSize && (
        <LoadMoreButton
          showing={Math.min(effectiveCount, events.length)}
          total={events.length}
          itemLabel="past events"
          onLoadMore={() =>
            setVisibleCount((n) => Math.min(Math.max(n, effectiveCount) + pageSize, events.length))
          }
        />
      )}
    </div>
  );
}
