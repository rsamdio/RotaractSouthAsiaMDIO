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

  const visible = events.slice(0, visibleCount);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((ev) => (
          <EventCard key={ev.slug} event={ev} />
        ))}
      </div>
      {events.length > pageSize && (
        <LoadMoreButton
          showing={visibleCount}
          total={events.length}
          itemLabel="past events"
          onLoadMore={() =>
            setVisibleCount((n) => Math.min(n + pageSize, events.length))
          }
        />
      )}
    </div>
  );
}
