import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, description, crumbs }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#17458F]/5 to-[#FCE8F1]/40 pt-40 pb-20 px-5 sm:px-6 lg:px-8 border-b border-slate-100"
      style={{
        backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(212,19,103,0.06) 1.5px, transparent 0), linear-gradient(135deg, #ffffff 0%, rgba(23, 69, 143, 0.04) 50%, rgba(212, 19, 103, 0.05) 100%)",
        backgroundSize: "28px 28px, 100% 100%",
      }}
    >
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#D41367]/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-[#F7A81B]/5 blur-[110px] pointer-events-none" />



      <div className="relative mx-auto max-w-5xl">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-[#D41367] transition">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 text-slate-300" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-[#D41367] transition">{c.label}</Link>
                ) : (
                  <span className="text-slate-650">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <Reveal>
          <span className="inline-block rounded-full bg-[#D41367]/10 border border-[#D41367]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#D41367] mb-5">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1426] leading-[1.1]"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
