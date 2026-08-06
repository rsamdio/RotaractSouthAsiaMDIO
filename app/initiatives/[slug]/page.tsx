import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ShareBar } from "@/components/ShareBar";
import { getProgramIcon } from "@/lib/programIcons";
import { loadProgram, loadPrograms } from "@/sanity/lib/content";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

function statusLabel(status: string) {
  switch (status) {
    case "active":
      return "Active";
    case "upcoming":
      return "Upcoming";
    case "seasonal":
      return "Seasonal";
    default:
      return status;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await loadProgram(slug);
  if (!program) return { title: "Program Not Found" };
  return {
    title: program.title,
    description: program.summary,
  };
}

export async function generateStaticParams() {
  const programs = await loadPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await loadProgram(slug);
  if (!program) notFound();

  const Icon = getProgramIcon(program.icon);
  const body = program.body || program.summary;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow={program.category}
          title={program.title}
          description={program.summary}
          crumbs={[
            { label: "Initiatives", href: "/initiatives" },
            { label: program.title },
          ]}
        />

        <section className="bg-white px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              {program.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={program.image}
                  alt=""
                  className="mb-8 aspect-video w-full rounded-[2rem] object-cover shadow-lg"
                />
              ) : null}
              <MarkdownContent source={body} className="text-lg" />
              <ShareBar
                path={`/initiatives/${program.slug}`}
                title={program.title}
                tag={program.category}
              />

              <Link
                href="/initiatives"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#D41B69]"
              >
                <ArrowLeft className="h-4 w-4" />
                All initiatives
              </Link>
            </div>

            <aside className="h-fit rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-7 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">
                Program details
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: program.accent }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Category
                  </p>
                  <p className="font-semibold text-[#0B1426]">{program.category}</p>
                </div>
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </dt>
                  <dd className="mt-1 font-semibold text-[#0B1426]">
                    {statusLabel(program.status)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    At a glance
                  </dt>
                  <dd className="mt-1 leading-relaxed text-slate-600">{program.livingNote}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
