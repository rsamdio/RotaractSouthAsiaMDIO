import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { initiatives } from "@/config/initiatives";

export const metadata = {
  title: "Initiatives | RSAMDIO",
  description: "RSAMDIO's signature initiatives across leadership, service, public image, fellowship, and youth engagement.",
};

export default function InitiativesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Initiatives"
          title="Driving Impact Across Communities"
          description="Focused multi-district initiatives addressing the most pressing challenges facing our region — and the leaders who take them on."
          crumbs={[{ label: "Initiatives" }]}
        />

      <section className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426]">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((item) => (
            <Link key={item.slug} href={`/initiatives/${item.slug}`} className="group cursor-pointer block">
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div
                  className="absolute top-4 left-4 bg-white/90 dark:bg-[#131F35]/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                  style={{ color: item.color }}
                >
                  {item.category}
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-[#0B1426] dark:text-white mb-2 group-hover:text-[#D41B69] transition-colors" style={{ fontFamily: "General Sans, sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-white/60 leading-relaxed mb-3">{item.summary}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D41B69]">
                Learn More <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
