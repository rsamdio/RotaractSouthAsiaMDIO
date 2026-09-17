import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ShareBar } from "@/components/ShareBar";
import { renderProgramIcon } from "@/lib/programIcons";
import { loadProgram, loadPrograms } from "@/sanity/lib/content";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbNode,
  buildPageMetadata,
  graph,
  organizationNode,
  resolveSeo,
  webSiteNode,
} from "@/lib/seo";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

function statusLabel(status: string) {
  switch (status) {
    case "ongoing":
    case "active":
      return "Ongoing";
    case "upcoming":
      return "Upcoming";
    case "seasonal":
      return "Seasonal";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await loadProgram(slug);
  if (!program) {
    return { title: "Program Not Found", robots: { index: false, follow: false } };
  }
  const seo = resolveSeo({
    title: program.title,
    description: program.summary,
    image: program.image,
    seo: program.seo,
  });
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/initiatives/${program.slug}`,
    image: seo.image,
  });
}

export async function generateStaticParams() {
  const programs = await loadPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await loadProgram(slug);
  if (!program) notFound();

  const allPrograms = await loadPrograms();
  const currentIndex = allPrograms.findIndex((p) => p.slug === slug);
  const prevProgram = currentIndex > 0 ? allPrograms[currentIndex - 1] : null;
  const nextProgram =
    currentIndex >= 0 && currentIndex < allPrograms.length - 1
      ? allPrograms[currentIndex + 1]
      : null;

  const body = program.body || program.summary;

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          webSiteNode(),
          breadcrumbNode([
            { name: "Initiatives", path: "/initiatives" },
            { name: program.title, path: `/initiatives/${program.slug}` },
          ])
        )}
      />
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow={
            <span className="inline-flex items-center gap-1.5">
              {renderProgramIcon(program.icon, "h-3.5 w-3.5")}
              {program.category}
            </span>
          }
          title={program.title}
          description={program.summary}
          crumbs={[
            { label: "Initiatives", href: "/initiatives" },
            { label: program.title },
          ]}
        />

        <section className="bg-white px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {program.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={program.image}
                alt={program.title}
                className="mb-8 aspect-video w-full rounded-[2rem] object-cover shadow-xl"
              />
            ) : null}

            {/* Editorial line setup for status, living note, and optional link */}
            <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-bold uppercase tracking-wider text-white shadow-xs"
                  style={{ backgroundColor: program.accent || "#D41B69" }}
                >
                  {renderProgramIcon(program.icon, "h-3 w-3")}
                  {program.category}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-bold uppercase tracking-wider text-slate-700 shadow-xs">
                  {statusLabel(program.status)}
                </span>
                {program.livingNote ? (
                  <span className="font-semibold text-slate-500">
                    · {program.livingNote}
                  </span>
                ) : null}
              </div>

              {program.ctaUrl ? (
                <a
                  href={program.ctaUrl}
                  target={/^https?:\/\//i.test(program.ctaUrl) ? "_blank" : undefined}
                  rel={/^https?:\/\//i.test(program.ctaUrl) ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#D41B69] px-4 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#9A0E4E]"
                >
                  {program.ctaLabel || "Learn more"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>

            <MarkdownContent source={body} className="text-lg" />

            {program.ctaUrl ? (
              <div className="mt-10 rounded-2xl border border-[#D41B69]/20 bg-[#FCE8F1]/40 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
                <div>
                  <p className="text-base font-bold text-[#0B1426]">
                    Interested in this initiative?
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Explore the program portal, registration, or relevant guidelines.
                  </p>
                </div>
                <a
                  href={program.ctaUrl}
                  target={/^https?:\/\//i.test(program.ctaUrl) ? "_blank" : undefined}
                  rel={/^https?:\/\//i.test(program.ctaUrl) ? "noopener noreferrer" : undefined}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#D41B69] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#9A0E4E] sm:mt-0"
                >
                  {program.ctaLabel || "Learn more"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ) : null}

            <ShareBar
              path={`/initiatives/${program.slug}`}
              title={program.title}
              tag={program.category}
            />

            <nav aria-label="Initiatives navigation" className="mt-14 border-t border-slate-200 pt-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Initiatives
                </p>
                <Link
                  href="/initiatives"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-[#D41B69]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All programs & campaigns
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {prevProgram ? (
                  <Link
                    href={`/initiatives/${prevProgram.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#D41B69]/30 hover:bg-[#FCE8F1]/40"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#D41B69]">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous initiative
                    </span>
                    <p className="mt-2 text-base font-bold leading-snug text-[#0B1426] group-hover:text-[#D41B69]">
                      {prevProgram.title}
                    </p>
                  </Link>
                ) : (
                  <div className="hidden sm:block" aria-hidden />
                )}

                {nextProgram ? (
                  <Link
                    href={`/initiatives/${nextProgram.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-right transition hover:border-[#D41B69]/30 hover:bg-[#FCE8F1]/40 sm:justify-self-stretch"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#D41B69]">
                      Next initiative
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <p className="mt-2 text-base font-bold leading-snug text-[#0B1426] group-hover:text-[#D41B69]">
                      {nextProgram.title}
                    </p>
                  </Link>
                ) : null}
              </div>
            </nav>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
