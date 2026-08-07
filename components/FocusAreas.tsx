import {
  Globe,
  GraduationCap,
  MessagesSquare,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";

const pillars: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: Globe,
    title: "Information",
    desc: "Stories, updates, newsletters, announcements, and resources that help Rotaract clubs and districts stay current across the region.",
  },
  {
    icon: MessagesSquare,
    title: "Communication",
    desc: "Channels and regional updates that facilitate communication among Rotaract clubs across member districts.",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    desc: "Learning pathways for Rotaract clubs and future district Rotaract leaders across South Asia.",
  },
  {
    icon: Target,
    title: "Multidistrict programs",
    desc: "Regional service projects, programs, and campaigns that bring clubs together across member districts.",
  },
];

export function FocusAreas() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-blush/40 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-block rounded-full border border-crimson/20 bg-crimson/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-crimson">
            What We Do
          </span>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Open to every Rotaractor
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-8">
            Whether you need an update, a way to stay in touch, learning, or a
            program to join, there is a place to start.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05} y={16}>
                <article className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200/80 bg-ice-cream/40 p-7 transition hover:border-crimson/25 hover:bg-white sm:rounded-[1.75rem] sm:p-8 lg:p-9">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-crimson/15 bg-crimson/10 text-crimson transition group-hover:border-crimson/25 group-hover:bg-crimson/15">
                    <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-ink sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-7">
                    {p.desc}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
