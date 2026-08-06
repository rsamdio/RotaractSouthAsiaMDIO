import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer, InstagramIcon, LinkedinIcon, FacebookIcon } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { siteConfig } from "@/config/site";
import { CheckCircle2, Mail } from "lucide-react";

export const metadata = {
  title: "Contact | RSAMDIO",
  description:
    "Contact the RSAMDIO Secretariat for general questions, district updates, partnership proposals, or media inquiries.",
};

const helpItems = [
  "District & club collaboration",
  "Partnership & sponsorship proposals",
  "Media & press inquiries",
  "Event hosting & bid submissions",
  "Resource & story submissions",
  "General Rotaract South Asia questions",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Stay Connected"
          title="Contact RSAMDIO"
          description="Reach the Secretariat for general questions, district updates, partnership proposals, or media inquiries."
          crumbs={[{ label: "Contact" }]}
        />

        <section className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-72 w-[700px] rounded-full bg-[#D41B69]/5 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-4xl space-y-6">
            <h2
              className="text-2xl font-bold text-[#0B1426]"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              Connect with RSA MDIO
            </h2>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                Email the Secretariat
              </h3>
              <a
                href={`mailto:${siteConfig.contact.general}`}
                className="flex items-center gap-3 group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D41B69]/10 text-[#D41B69]">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">All inquiries</p>
                  <p className="text-sm text-[#D41B69] group-hover:underline break-all">
                    {siteConfig.contact.general}
                  </p>
                </div>
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Follow Us
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/rsamdio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group text-slate-700 hover:text-[#D41B69] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0 group-hover:bg-[#D41B69]/10 transition-colors">
                      <InstagramIcon className="w-5 h-5 text-[#D41B69]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#D41B69] transition-colors">
                        Instagram
                      </div>
                      <div className="text-xs text-slate-500">@rsamdio</div>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/rsamdio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group text-slate-700 hover:text-[#D41B69] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600/10 transition-colors">
                      <LinkedinIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        LinkedIn
                      </div>
                      <div className="text-xs text-slate-500">Rotaract South Asia MDIO</div>
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/rsamdio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group text-slate-700 hover:text-[#D41B69] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 group-hover:bg-blue-700/10 transition-colors">
                      <FacebookIcon className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        Facebook
                      </div>
                      <div className="text-xs text-slate-500">@rsamdio</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  What We Help With
                </h3>
                <ul className="space-y-3.5 text-sm">
                  {helpItems.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-600">
                      <CheckCircle2 className="h-5 w-5 text-[#D41B69] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
