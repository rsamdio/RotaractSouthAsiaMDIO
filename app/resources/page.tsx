import { ExternalLink, BookOpen, ImageIcon, Newspaper, Route, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

const iconMap = { "book-open": BookOpen, "award": Award, "image": ImageIcon, "newspaper": Newspaper, "route": Route };

export const metadata = {
  title: "Resources | RSAMDIO",
  description: "Access the Rotaract Library, Rotaract Certify, Brand Kit, Publications Hub, and NAVIGATE.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Resources — Rotaract Library"
          title="Everything Your Club Needs, in One Place"
          description="Five named platforms power every club and district — from templates to certification to administration."
          crumbs={[{ label: "Resources" }]}
        />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => {
              const Icon = iconMap[tool.icon as keyof typeof iconMap];
              return (
                <Reveal key={tool.slug} delay={i * 0.06}>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[2rem] border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-7 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 block h-full"
                  >
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: tool.color + "20", color: tool.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: tool.color }}>
                      {tool.tagline}
                    </span>
                    <h3 className="font-bold text-[#0B1426] dark:text-white text-lg mt-1 mb-2 group-hover:text-[#D41B69] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-white/50 leading-relaxed mb-4">{tool.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D41B69]">
                      Open {tool.name} <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2} className="mt-14 rounded-[2rem] bg-gradient-to-br from-[#D41B69] to-[#8A0F3E] p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "General Sans, sans-serif" }}>
              Full Rotaract Library
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Every platform above — and hundreds more resources — lives on the dedicated Rotaract Library site.
            </p>
            <a
              href={siteConfig.libraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#D41B69] px-7 py-3.5 text-sm font-bold shadow-lg transition hover:bg-slate-50"
            >
              Browse library.rsamdio.org <ExternalLink className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
