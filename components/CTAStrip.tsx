import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CTAStrip() {
  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Reveal className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[1.5rem] bg-crimson px-6 py-10 text-center sm:rounded-[2rem] sm:px-10 sm:py-12 md:px-14 md:py-14 lg:rounded-[2.5rem]">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 sm:mb-4 sm:text-xs">
            Get involved
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            Connect with RSAMDIO
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base md:text-lg md:leading-8">
            Explore multidistrict programs and digital platforms, or write to
            the Secretariat to connect as a Rotaractor, club, or district.
          </p>

          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/initiatives"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-crimson shadow-sm transition hover:bg-white/95 sm:w-auto sm:px-7 sm:text-base"
            >
              Explore initiatives
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/70 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto sm:px-7 sm:text-base"
            >
              Contact RSAMDIO
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
