"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  filterMonth,
  type SiteEvent,
} from "@/config/events";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const accentClass: Record<SiteEvent["accent"], string> = {
  pink: "bg-[#D41B69]",
  gold: "bg-[#F7A81B]",
  blue: "bg-[#17458F]",
};

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** Monday-based weekday index (0 = Mon … 6 = Sun) */
function mondayOffset(year: number, monthIndex: number) {
  const sundayBased = new Date(year, monthIndex, 1).getDay();
  return (sundayBased + 6) % 7;
}

function isoFor(year: number, monthIndex: number, day: number) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function eventTouchesDay(event: SiteEvent, iso: string) {
  const end = event.endDate ?? event.startDate;
  return iso >= event.startDate && iso <= end;
}

export function EventsCalendar({ events }: { events: SiteEvent[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());

  const monthEvents = useMemo(
    () => filterMonth(events, year, monthIndex),
    [events, year, monthIndex]
  );

  const totalDays = daysInMonth(year, monthIndex);
  const offset = mondayOffset(year, monthIndex);
  const monthLabel = new Date(year, monthIndex, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedIso =
    selectedDay != null ? isoFor(year, monthIndex, selectedDay) : null;
  const selectedEvents = selectedIso
    ? monthEvents.filter((e) => eventTouchesDay(e, selectedIso))
    : [];

  function shiftMonth(delta: number) {
    const d = new Date(year, monthIndex + delta, 1);
    setYear(d.getFullYear());
    setMonthIndex(d.getMonth());
    setSelectedDay(1);
  }

  const isCurrentMonth =
    year === now.getFullYear() && monthIndex === now.getMonth();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#D41B69]/30 hover:text-[#D41B69]"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-center">
            <h3
              className="text-lg font-bold text-[#0B1426]"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              {monthLabel}
            </h3>
            {!isCurrentMonth && (
              <button
                type="button"
                onClick={() => {
                  setYear(now.getFullYear());
                  setMonthIndex(now.getMonth());
                  setSelectedDay(now.getDate());
                }}
                className="mt-0.5 text-xs font-semibold text-[#D41B69] hover:underline"
              >
                Jump to today
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#D41B69]/30 hover:text-[#D41B69]"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {WEEKDAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`pad-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: totalDays }, (_, i) => {
            const day = i + 1;
            const iso = isoFor(year, monthIndex, day);
            const dayEvents = monthEvents.filter((e) => eventTouchesDay(e, iso));
            const selected = selectedDay === day;
            const isToday =
              isCurrentMonth && day === now.getDate();

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition ${
                  selected
                    ? "bg-[#0B1426] text-white"
                    : isToday
                      ? "bg-[#FCE8F1] text-[#D41B69]"
                      : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {day}
                {dayEvents.length > 0 && (
                  <span className="mt-0.5 flex gap-0.5">
                    {dayEvents.slice(0, 3).map((e) => (
                      <span
                        key={e.slug}
                        className={`h-1 w-1 rounded-full ${
                          selected ? "bg-white/80" : accentClass[e.accent]
                        }`}
                      />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          {selectedIso
            ? new Date(`${selectedIso}T12:00:00`).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            : "Select a day"}
        </p>

        {selectedEvents.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No events on this day.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {selectedEvents.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/events/${e.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#D41B69]/30"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${accentClass[e.accent]}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {e.kind}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-[#0B1426]">{e.title}</p>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{e.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {monthEvents.length > 0 && (
          <p className="mt-6 text-xs text-slate-400">
            {monthEvents.length} event{monthEvents.length === 1 ? "" : "s"} this month
          </p>
        )}
      </div>
    </div>
  );
}
