import Link from "next/link";
import { Reveal } from "./Reveal";

export function CTAStrip() {
  return (
    <section className="bg-gradient-to-br from-blush via-white to-blush/60 dark:from-[#131F35] dark:via-ink dark:to-ink py-24 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden bg-gradient-to-br from-crimson via-[#bd185c] to-gold">
        <Reveal className="relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Serve with South Asia
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Explore regional programmes and platforms, or write to the Secretariat to connect with Rotaract South Asia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/initiatives"
              className="w-full sm:w-auto bg-white text-crimson rounded-full px-8 py-4 text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Explore Initiatives
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto border-2 border-white/80 bg-transparent text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-white/15 transition-colors shadow-lg"
            >
              Contact RSAMDIO
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
