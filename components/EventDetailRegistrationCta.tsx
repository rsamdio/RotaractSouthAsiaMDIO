"use client";

import { ExternalLink } from "lucide-react";
import type { SiteEvent } from "@/config/events";
import { useIsEventPast } from "@/lib/useEventStore";

type Props = {
  event: SiteEvent;
  initialPast: boolean;
};

export function EventDetailEyebrow({ event, initialPast }: Props) {
  const past = useIsEventPast(event, initialPast);
  return <>{past ? "Past Event" : "Event"}</>;
}

export function EventDetailRegistrationCta({ event, initialPast }: Props) {
  const past = useIsEventPast(event, initialPast);

  if (!event.registrationUrl && !past) {
    return (
      <p className="mt-7 text-sm leading-6 text-slate-500">
        Registration details will be published here closer to the date.
      </p>
    );
  }

  if (!event.registrationUrl && past) {
    return (
      <p className="mt-7 text-sm leading-6 text-slate-400">
        This event has concluded.
      </p>
    );
  }

  if (past) {
    return (
      <a
        href={event.registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#D41B69]/40 hover:text-[#D41B69]"
      >
        Event site
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  }

  return (
    <a
      href={event.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D41B69] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9A0E4E]"
    >
      {event.registrationLabel ?? "Register"}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
