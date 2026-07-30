import Link from "next/link";
import { Star, CalendarCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { UpcomingEventsSection } from "@/components/UpcomingEventsSection";
import { signatureEvents, calendarHighlights } from "@/config/events";

export const metadata = {
  title: "Events | RSAMDIO",
  description: "Upcoming and signature events across Rotaract South Asia.",
};

const highlightColor: Record<string, string> = {
  pink: "bg-[#D41B69]",
  gold: "bg-[#F7A81B] text-[#0B1426]",
  blue: "bg-[#17458F]",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "upcoming", label: "Upcoming" },
          { id: "signature", label: "Signature" },
          { id: "calendar", label: "Calendar" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="Conventions & Forums"
          title="Events"
          description="Major regional activities, conventions, and training seminars across South Asia."
          crumbs={[{ label: "Events" }]}
        />

      {/* Upcoming */}
      <section id="upcoming" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1426] scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white mb-8" style={{ fontFamily: "General Sans, sans-serif" }}>
            Upcoming Events
          </h2>
          <UpcomingEventsSection />
        </div>
      </section>

      {/* Signature */}
      <section id="signature" className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0D1825] scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-4 w-4 text-[#F7A81B]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Signature Events
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {signatureEvents.map((ev) => (
              <Link
                key={ev.slug}
                href={`/events/${ev.slug}`}
                className="group rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="h-32 bg-slate-100 dark:bg-white/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium text-xs">
                    Image Preview
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#D41B69] mb-2">
                    <span>{ev.month} {ev.year}</span>
                  </div>
                  <h3 className="font-bold text-[#0B1426] dark:text-white text-sm group-hover:text-[#D41B69] transition-colors line-clamp-1">{ev.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-white/50 mt-1.5 line-clamp-2">{ev.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1426] scroll-mt-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-8">
            <CalendarCheck className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Calendar Highlights
            </h2>
          </div>
          <div className="rounded-[2rem] border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 p-8">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 dark:text-white/30 mb-3">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-slate-700 dark:text-white/70">
              {Array.from({ length: 31 }, (_, i) => {
                const day = String(i + 1);
                const highlight = calendarHighlights.find((h) => h.date === day);
                return (
                  <span
                    key={day}
                    className={`p-2 rounded-xl ${highlight ? `${highlightColor[highlight.color]} text-white` : ""}`}
                    title={highlight?.label}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
            <div className="mt-6 space-y-2">
              {calendarHighlights.map((h) => (
                <div key={h.date} className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/60">
                  <span className={`h-2.5 w-2.5 rounded-full ${highlightColor[h.color]}`} />
                  {h.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
