import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories, galleryImages } from "@/config/news";
import { Reveal } from "./Reveal";

export function StoriesGallery() {
  const [main, second, third] = stories;
  // Wide fourth tile reuses the featured story's copy pattern but needs its
  // own photo so the bento grid never repeats an image.
  const fourthImage = galleryImages.find((src) => src !== main.image && src !== second.image && src !== third.image) ?? galleryImages[0];

  return (
    <section className="py-24 bg-white dark:bg-[#0D1825] px-5 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-[#0B1426] dark:text-white mb-2" style={{ fontFamily: "General Sans, sans-serif" }}>
            Stories of Impact
          </h2>
          <p className="text-lg text-slate-600 dark:text-white/60">
            Moments of service, leadership, and fellowship captured across the region.
          </p>
        </div>
        <Link
          href="/news#gallery"
          className="inline-flex items-center gap-2 text-base font-semibold text-[#0B1426] dark:text-white hover:text-[#D41B69] border-b-2 border-transparent hover:border-[#D41B69] pb-1 transition-colors shrink-0"
        >
          View Gallery
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[240px]">
        <Reveal delay={0} className="col-span-2 row-span-2">
          <Link href={`/news/${main.slug}`} className="rounded-[2rem] overflow-hidden relative group block h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={main.image} alt={main.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/90 via-[#0B1426]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#F7A81B] mb-2 block">{main.category}</span>
              <h3 className="text-2xl font-semibold leading-snug tracking-tight" style={{ fontFamily: "General Sans, sans-serif" }}>{main.title}</h3>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <Link href={`/news/${second.slug}`} className="rounded-[2rem] overflow-hidden relative group block h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={second.image} alt={second.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5 text-white">
              <span className="text-base font-medium">{second.title}</span>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.16}>
          <Link href={`/news/${third.slug}`} className="rounded-[2rem] overflow-hidden relative group block h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={third.image} alt={third.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5 text-white">
              <span className="text-base font-medium">{third.title}</span>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.24} className="col-span-2">
          <Link href="/news#gallery" className="rounded-[2rem] overflow-hidden relative group block h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fourthImage} alt="Moments from across the region" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/90 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#FFE0A0] mb-2 block">Gallery</span>
              <h3 className="text-xl font-semibold leading-snug tracking-tight" style={{ fontFamily: "General Sans, sans-serif" }}>Moments of fellowship from across 8 nations</h3>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
