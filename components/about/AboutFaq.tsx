import { aboutFaqs } from "@/config/faq";

export function AboutFaq() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-slate-100 bg-white px-5 py-24 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#0D1825]"
    >
      <div className="mx-auto max-w-3xl">
        <span className="mb-4 inline-block rounded-full border border-crimson/20 bg-crimson/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-crimson">
          FAQ
        </span>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl dark:text-white">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg dark:text-white/65">
          Clear answers about what RSAMDIO is and how it serves Rotaract across
          South Asia.
        </p>

        <dl className="mt-10 space-y-6">
          {aboutFaqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-white/5"
            >
              <dt className="text-lg font-bold tracking-tight text-ink dark:text-white">
                {faq.question}
              </dt>
              <dd className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px] dark:text-white/65">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
