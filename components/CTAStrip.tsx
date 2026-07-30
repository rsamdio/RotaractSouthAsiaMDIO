import Link from "next/link";
import { Reveal } from "./Reveal";

export function CTAStrip() {
  return (
    <section className="bg-gradient-to-br from-[#F4EDFF] via-white to-[#FCE8F1] dark:from-[#131F35] dark:via-[#0B1426] dark:to-[#0B1426] py-24 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden bg-gradient-to-br from-[#D41B69] via-[#bd185c] to-[#F7A81B]">
        <Reveal className="relative z-10">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            Be Part of the Movement
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join a regional network of leaders shaping the future of South Asia through service, leadership, and collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/initiatives"
              className="w-full sm:w-auto bg-[#0B1426] text-white rounded-full px-8 py-4 text-lg font-semibold hover:bg-[#1a2b4c] transition-colors shadow-lg"
            >
              Explore Initiatives
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white text-[#D41B69] rounded-full px-8 py-4 text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Contact RSAMDIO
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
