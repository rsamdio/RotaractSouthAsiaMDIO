import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import {
  Footer,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  XIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { siteConfig } from "@/config/site";
import { CheckCircle2, Mail } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description:
    'Contact the RSAMDIO Secretariat for general questions, district updates, partnership proposals, or media inquiries.',
  path: '/contact',
});

const helpItems = [
  "District & club collaboration",
  "Partnership & sponsorship proposals",
  "Media & press inquiries",
  "Event hosting & bid submissions",
  "Resource & story submissions",
  "General Rotaract South Asia questions",
];

const followLinks = [
  {
    label: "Instagram",
    handle: "@rsamdio",
    href: siteConfig.social.instagram,
    Icon: InstagramIcon,
    iconWrap: "bg-rose-50 group-hover:bg-[#D41B69]/10",
    iconClass: "text-[#D41B69]",
  },
  {
    label: "Facebook",
    handle: "@rsamdio",
    href: siteConfig.social.facebook,
    Icon: FacebookIcon,
    iconWrap: "bg-sky-50 group-hover:bg-blue-700/10",
    iconClass: "text-blue-700",
  },
  {
    label: "X",
    handle: "@rsa_mdio",
    href: siteConfig.social.x,
    Icon: XIcon,
    iconWrap: "bg-slate-100 group-hover:bg-slate-200/80",
    iconClass: "text-slate-800",
  },
  {
    label: "YouTube",
    handle: "@rsamdio",
    href: siteConfig.social.youtube,
    Icon: YoutubeIcon,
    iconWrap: "bg-red-50 group-hover:bg-red-100/80",
    iconClass: "text-red-600",
  },
  {
    label: "LinkedIn",
    handle: "Rotaract South Asia MDIO",
    href: siteConfig.social.linkedin,
    Icon: LinkedinIcon,
    iconWrap: "bg-blue-50 group-hover:bg-blue-600/10",
    iconClass: "text-blue-600",
  },
  {
    label: "WhatsApp Channel",
    handle: "go.rsamdio.org/WAchannel",
    href: siteConfig.social.whatsapp,
    Icon: WhatsAppIcon,
    iconWrap: "bg-emerald-50 group-hover:bg-emerald-100/80",
    iconClass: "text-emerald-600",
  },
] as const;

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
            >
              Connect with RSAMDIO
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
                  {followLinks.map(({ label, handle, href, Icon, iconWrap, iconClass }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group text-slate-700 hover:text-[#D41B69] transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${iconWrap}`}
                      >
                        <Icon className={`w-5 h-5 ${iconClass}`} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-[#D41B69] transition-colors">
                          {label}
                        </div>
                        <div className="text-xs text-slate-500">{handle}</div>
                      </div>
                    </a>
                  ))}
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
