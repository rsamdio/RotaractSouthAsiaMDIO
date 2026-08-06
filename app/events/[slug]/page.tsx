import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MarkdownContent } from "@/components/MarkdownContent";
import {
  formatEventDateRange,
  formatEventTime,
  isPastEvent,
} from "@/config/events";
import { loadEvent, loadEvents } from "@/sanity/lib/content";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.title} | Events`,
    description: event.tagline || event.description,
  };
}

export async function generateStaticParams() {
  const events = await loadEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await loadEvent(slug);
  if (!event) notFound();

  const time = formatEventTime(event);
  const past = isPastEvent(event);
  const body = event.body || event.description;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow={past ? "Past Event" : "Event"}
          title={event.title}
          description={event.tagline}
          crumbs={[
            { label: "Events", href: "/events" },
            { label: event.title },
          ]}
        />

        <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              {event.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.image}
                  alt=""
                  className="mb-8 aspect-video w-full rounded-[2rem] object-cover shadow-lg"
                />
              )}
              <MarkdownContent source={body} className="text-lg" />

              <Link
                href="/events"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#D41B69]"
              >
                <ArrowLeft className="h-4 w-4" />
                All events
              </Link>
            </div>

            <aside className="h-fit rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-7 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">
                Event details
              </p>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Date
                    </dt>
                    <dd className="mt-0.5 font-semibold text-[#0B1426]">
                      {formatEventDateRange(event)}
                    </dd>
                  </div>
                </div>

                {time && (
                  <div className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Time
                      </dt>
                      <dd className="mt-0.5 font-semibold text-[#0B1426]">{time}</dd>
                    </div>
                  </div>
                )}

                {(event.location || event.venue) && (
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Location
                      </dt>
                      <dd className="mt-0.5 font-semibold text-[#0B1426]">
                        {event.venue && <span className="block">{event.venue}</span>}
                        {event.location}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>

              {event.registrationUrl && !past && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D41B69] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9A0E4E]"
                >
                  {event.registrationLabel ?? "Register"}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {event.registrationUrl && past && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#D41B69]/40 hover:text-[#D41B69]"
                >
                  Event site
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {!event.registrationUrl && !past && (
                <p className="mt-7 text-sm leading-6 text-slate-500">
                  Registration details will be announced by the Secretariat.
                </p>
              )}
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
