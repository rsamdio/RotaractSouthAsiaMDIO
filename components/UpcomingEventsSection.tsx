"use client";
import { Loader2 } from "lucide-react";
import { useUpcomingEvents } from "@/lib/useEvents";
import { EventCard, EventCardEmpty } from "./EventCard";
import { Reveal } from "./Reveal";

export function UpcomingEventsSection() {
  const { events, loading } = useUpcomingEvents();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[#D41B69]" />
      </div>
    );
  }

  if (events.length === 0) return <EventCardEmpty />;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {events.map((ev, i) => (
        <Reveal key={ev.id} delay={i * 0.06} className="h-full">
          <div className="h-full">
            <EventCard event={ev} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
