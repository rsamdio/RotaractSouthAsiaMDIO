import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { initiatives, getInitiative } from "@/config/initiatives";

export function generateStaticParams() {
  return initiatives.map((i) => ({ slug: i.slug }));
}

export default async function InitiativeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const initiative = getInitiative(slug);
  if (!initiative) notFound();

  return (
    <>
      <Navbar />
      <PageHero
        eyebrow={initiative.category}
        title={initiative.title}
        description={initiative.summary}
        crumbs={[{ label: "Initiatives", href: "/initiatives" }, { label: initiative.title }]}
      />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-4xl grid md:grid-cols-[1fr_1.1fr] gap-12 items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={initiative.image}
            alt={initiative.title}
            className="w-full rounded-[2rem] object-cover aspect-[4/3] shadow-xl border border-slate-100 dark:border-white/10"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white mb-5" style={{ fontFamily: "General Sans, sans-serif" }}>
              Program Highlights
            </h2>
            <ul className="space-y-4">
              {initiative.highlights.map((h) => (
                <li key={h} className="flex gap-3 items-start text-slate-700 dark:text-white/80 font-medium">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: initiative.color }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact?type=partnership"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D41B69] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#D41B69]/20 transition hover:bg-[#8A0F3E]"
            >
              Get Involved <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
