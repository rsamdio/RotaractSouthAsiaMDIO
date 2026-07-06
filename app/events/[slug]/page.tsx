import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { signatureEvents } from "@/config/events";

export function generateStaticParams() {
  return signatureEvents.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = signatureEvents.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <Navbar />
      <PageHero
        eyebrow={`${event.month} ${event.year}`}
        title={event.title}
        description={event.tagline}
        crumbs={[{ label: "Events", href: "/events" }, { label: event.title }]}
      />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-8 text-slate-600 dark:text-white/70">{event.description}</p>
          <div className="mt-8 flex items-center gap-2 text-sm text-slate-500 dark:text-white/50">
            <MapPin className="h-4 w-4" />
            Location and registration details to be announced by the Secretariat.
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
