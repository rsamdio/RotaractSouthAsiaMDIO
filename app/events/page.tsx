import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { EventsDirectory } from "@/components/EventsDirectory";
import { JsonLd } from "@/components/JsonLd";
import { loadEvents } from "@/sanity/lib/content";
import type { Metadata } from "next";
import {
  breadcrumbNode,
  buildPageMetadata,
  collectionPageNode,
  graph,
  organizationNode,
  webSiteNode,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: 'Events',
  description:
    'Upcoming, signature, and past events across Rotaract South Asia: conventions, leadership learning, and sessions.',
  path: '/events',
});

export default async function EventsPage() {
  const events = await loadEvents();
  const eventItems = events.slice(0, 20).map((e) => ({
    name: e.title,
    path: `/events/${e.slug}`,
    description: [e.startDate, e.kind, e.location].filter(Boolean).join(" · "),
  }));

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          webSiteNode(),
          breadcrumbNode([{ name: "Events", path: "/events" }]),
          collectionPageNode({
            name: "Events & Gatherings",
            description:
              "Upcoming, signature, and past events across Rotaract South Asia: conventions, leadership learning, and sessions.",
            path: "/events",
            items: eventItems,
          })
        )}
      />
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
          eyebrow="Gatherings & Sessions"
          title="Events"
          description="Signature programs, regional gatherings, and working sessions across South Asia. Browse upcoming dates, revisit past events, or open the calendar."
          crumbs={[{ label: "Events" }]}
        />
        <EventsDirectory events={events} />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
