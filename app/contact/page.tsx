import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact | RSAMDIO",
  description: "Contact the RSAMDIO Secretariat, submit a district update, or reach out for partnership and media inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageHero
        eyebrow="Stay Connected"
        title="Contact RSAMDIO"
        description="Reach the Secretariat for general questions, district updates, partnership proposals, or media inquiries."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1426]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-72 w-[700px] rounded-full bg-[#D41B69]/8 dark:bg-[#D41B69]/12 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-lg">
          <Suspense fallback={<div className="h-96 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 animate-pulse" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
