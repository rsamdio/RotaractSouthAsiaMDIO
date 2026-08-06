import { History, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { EventCard, EventCardEmpty } from "@/components/EventCard";
import { EventsCalendar } from "@/components/EventsCalendar";
import { SectionScrollButton } from "@/components/SectionScrollButton";
import { filterPast, filterSignature, filterUpcoming } from "@/config/events";
import { loadEvents } from "@/sanity/lib/content";

export const metadata = {
  title: "Events",
  description:
    "Upcoming, signature, and past events across Rotaract South Asia: conventions, training, and sessions.",
};

export default async function EventsPage() {
  const events = await loadEvents();
  const upcoming = filterUpcoming(events);
  const past = filterPast(events);
  const signature = filterSignature(events);

  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "upcoming", label: "Upcoming" },
          { id: "signature", label: "Signature" },
          { id: "past", label: "Past" },
          { id: "calendar", label: "Calendar" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="Conventions & Forums"
          title="Events"
          description="Signature programmes, regional gatherings, and working sessions across South Asia. Browse upcoming dates, revisit past events, or open the calendar."
          crumbs={[{ label: "Events" }]}
        />

        <section id="upcoming" className="scroll-mt-24 bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-8 text-2xl font-bold text-[#0B1426]"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              Upcoming Events
            </h2>
            {upcoming.length === 0 ? (
              <EventCardEmpty message="No upcoming events right now. Check Past Events or the calendar." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {upcoming.map((ev) => (
                  <EventCard key={ev.slug} event={ev} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="signature" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center gap-2">
              <Star className="h-4 w-4 text-[#F7A81B]" />
              <h2
                className="text-2xl font-bold text-[#0B1426]"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                Signature Events
              </h2>
            </div>
            <p className="mb-8 max-w-2xl text-sm leading-6 text-slate-500">
              Flagship MDIO programmes that define the regional year: installations,
              academies, summits, and the annual convention.
            </p>
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
              <History className="h-4 w-4 text-[#D41B69]" />
              <h2
                className="text-2xl font-bold text-[#0B1426]"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                Past Events
              </h2>
            </div>
            {past.length === 0 ? (
              <EventCardEmpty message="Past events will appear here after they conclude." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {past.map((ev) => (
                  <EventCard key={ev.slug} event={ev} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="calendar" className="scroll-mt-24 bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  className="text-2xl font-bold text-[#0B1426]"
                  style={{ fontFamily: "General Sans, sans-serif" }}
                >
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
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
