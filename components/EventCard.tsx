import Link from "next/link";
import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";
import {
  formatEventDateRange,
  formatEventTime,
  eventMonthYear,
  isPastEvent,
  type SiteEvent,
} from "@/config/events";

const accentDot: Record<string, string> = {
  pink: "bg-[#D41B69]",
  gold: "bg-[#F7A81B]",
  blue: "bg-[#17458F]",
  green: "bg-[#059669]",
};

const kindLabel: Record<SiteEvent["kind"], string> = {
  signature: "Signature",
  regional: "Regional",
  training: "Training",
  session: "Session",
};

export function EventCard({ event }: { event: SiteEvent }) {
  const { month, year, day } = eventMonthYear(event);
  const time = formatEventTime(event);
  const past = isPastEvent(event);
  const href = `/events/${event.slug}`;
  const dotColor = event.customAccent || (event.accent === "custom" ? "#D41B69" : undefined);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-[#D41B69]/25 hover:shadow-md"
    >
      <div className="relative h-36 bg-slate-100">
        {event.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <CalendarDays className="h-8 w-8 text-slate-300" />
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-xl bg-white/95 px-2.5 py-1.5 text-center shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#D41B69]">
            {month}
          </div>
          <div className="text-lg font-extrabold leading-none text-[#0B1426]">{day}</div>
          <div className="text-[10px] font-semibold text-slate-400">{year}</div>
        </div>
        {past && (
          <span className="absolute right-3 top-3 rounded-full bg-[#0B1426]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Past
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${!dotColor ? (accentDot[event.accent] ?? "bg-[#D41B69]") : ""}`}
            style={dotColor ? { backgroundColor: dotColor } : undefined}
          />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {kindLabel[event.kind]}
          </span>
        </div>
        <h3 className="text-sm font-bold leading-snug text-[#0B1426] transition group-hover:text-[#D41B69]">
          {event.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
          {event.tagline}
        </p>
        <div className="mt-auto space-y-1.5 pt-3 text-[11px] text-slate-500">
          <p className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 shrink-0" />
            {formatEventDateRange(event)}
          </p>
          {time && (
            <p className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 shrink-0" />
              {time}
            </p>
          )}
          {event.location && (
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </p>
          )}
          {event.registrationUrl && (
            <p className="flex items-center gap-1.5 font-semibold text-[#D41B69]">
              <ExternalLink className="h-3 w-3 shrink-0" />
              Registration available
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function EventCardEmpty({ message }: { message?: string }) {
  return (
    <div className="py-16 text-center text-slate-400">
      <CalendarDays className="mx-auto mb-3 h-12 w-12 opacity-40" />
      <p className="text-sm">{message ?? "No events scheduled yet. Check back soon."}</p>
    </div>
  );
}
