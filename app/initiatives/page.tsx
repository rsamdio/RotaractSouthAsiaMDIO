import { ExternalLink, ArrowRight, BookOpen, ImageIcon, Newspaper, Route, Award } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Reveal } from "@/components/Reveal";
import { initiatives } from "@/config/initiatives";

const iconMap = { "book-open": BookOpen, "award": Award, "image": ImageIcon, "newspaper": Newspaper, "route": Route };

export const metadata = {
  title: "Initiatives | RSAMDIO",
  description: "RSAMDIO's core platforms and tools powering every club and district.",
};

export default function InitiativesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Initiatives"
          title="Everything Your Club Needs, in One Place"
          description="Five signature platforms power every club and district — from templates to certification to administration."
          crumbs={[{ label: "Initiatives" }]}
        />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((item, i) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || ArrowRight;
              
              const isExternal = item.url?.startsWith('http');
              const CardWrapper = isExternal ? 'a' : Link;
              const linkProps = isExternal 
                ? { href: item.url!, target: "_blank", rel: "noopener noreferrer" }
                : { href: item.url || `/initiatives/${item.slug}` };

              return (
                <Reveal key={item.slug} delay={i * 0.06}>
                  <CardWrapper
                    {...linkProps}
                    className="group rounded-[2rem] border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-7 hover:shadow-soft transition-all duration-300 hover:-translate-y-1 block h-full"
                  >
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: item.color + "20", color: item.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: item.color }}>
                      {item.category}
                    </span>
                    <h3 className="font-bold text-[#0B1426] dark:text-white text-lg mt-1 mb-2 group-hover:text-[#D41B69] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-white/50 leading-relaxed mb-4">{item.summary}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D41B69]">
                      Open {item.title} {isExternal ? <ExternalLink className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                    </span>
                  </CardWrapper>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
