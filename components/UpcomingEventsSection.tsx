import { EventCard, EventCardEmpty } from "./EventCard";
import { Reveal } from "./Reveal";
import { filterUpcoming } from "@/config/events";
import { loadEvents } from "@/sanity/lib/content";

export async function UpcomingEventsSection() {
  const events = filterUpcoming(await loadEvents());

  if (events.length === 0) return <EventCardEmpty />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((ev, i) => (
        <Reveal key={ev.slug} delay={i * 0.06} className="h-full">
          <div className="h-full">
            <EventCard event={ev} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
