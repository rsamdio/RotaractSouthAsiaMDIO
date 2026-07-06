import Link from "next/link";
import { ArrowRight, Newspaper, FileText, ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { stories, pressReleases, publications, galleryImages } from "@/config/news";

export const metadata = {
  title: "News & Media | RSAMDIO",
  description: "Stories, press releases, publications, and gallery from Rotaract South Asia.",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "stories", label: "Stories" },
          { id: "press", label: "Press" },
          { id: "publications", label: "Publications" },
          { id: "gallery", label: "Gallery" },
        ]}
      />
      <PageHero
        eyebrow="News & Media"
        title="Stories, Updates & Opportunities"
        description="Real stories of service, leadership, and fellowship — plus official communications from the Secretariat."
        crumbs={[{ label: "News & Media" }]}
      />

      {/* Stories */}
      <section id="stories" className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426] scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white mb-8" style={{ fontFamily: "General Sans, sans-serif" }}>
            Stories
          </h2>
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            {stories[0] && (
              <Link href={`/news/${stories[0].slug}`} className="group overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-white/5 shadow-2xl block">
                <div className="relative h-96 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={stories[0].image} alt={stories[0].title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/80 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="rounded-full bg-[#F7A81B] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#0B1426]">
                      {stories[0].category}
                    </span>
                    <h3 className="mt-5 text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
                      {stories[0].title}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-lg leading-8 text-slate-700 dark:text-white/70">{stories[0].excerpt}</p>
                </div>
              </Link>
            )}
            <div className="grid gap-6">
              {stories.slice(1).map((s) => (
                <Link key={s.slug} href={`/news/${s.slug}`} className="rounded-[2rem] bg-slate-50 dark:bg-white/5 p-7 shadow-xl block hover:-translate-y-1 transition">
                  <span className="rounded-full bg-[#FCE8F1] dark:bg-[#D41B69]/15 px-3 py-1 text-xs font-bold text-[#D41B69]">{s.category}</span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">{s.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D41B69]">
                    Read Story <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section id="press" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1825] scroll-mt-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-8">
            <Newspaper className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Press Releases
            </h2>
          </div>
          <div className="space-y-3">
            {pressReleases.map((p) => (
              <div key={p.slug} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h4 className="font-bold text-[#0B1426] dark:text-white text-sm">{p.title}</h4>
                  <span className="text-xs text-slate-400 dark:text-white/40 shrink-0">{p.date}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-white/60">{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426] scroll-mt-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-8">
            <FileText className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Publications Hub
            </h2>
          </div>
          <div className="space-y-2.5">
            {publications.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 hover:border-[#D41B69]/30 hover:bg-[#FCE8F1]/30 dark:hover:bg-white/10 transition text-sm"
              >
                <span className="text-[#0B1426] dark:text-white font-medium">{p.title} — {p.period}</span>
                <span className="text-slate-400">↓</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1825] scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-8">
            <ImageIcon className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Gallery
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" className="w-full aspect-square object-cover rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
