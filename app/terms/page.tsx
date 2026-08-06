import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, ArrowLeft, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the Rotaract South Asia MDIO portal, including acceptable use, intellectual property, and liability limitations.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using rsamdio.org, you agree to these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the portal.",
    },
    {
      title: "2. Purpose of the Portal",
      content:
        "This portal is an informational and coordination platform for Rotaract South Asia MDIO. Content is provided for members, districts, clubs, partners, and the public to understand initiatives, events, and official updates.",
    },
    {
      title: "3. Acceptable Use",
      content:
        "You agree not to misuse the portal, attempt unauthorized access, interfere with availability, distribute malicious content, or use this site for unlawful activity.",
    },
    {
      title: "4. Intellectual Property",
      content:
        "Unless otherwise noted, text, graphics, branding, and published materials on this portal are owned by RSAMDIO or used with permission. You may reference content with attribution, but may not reproduce or redistribute it for commercial use without prior written consent.",
    },
    {
      title: "5. External Links",
      content:
        "This portal may include links to external platforms and partner services. RSAMDIO is not responsible for third-party content, security, privacy policies, or operational availability of those sites.",
    },
    {
      title: "6. Disclaimer",
      content:
        "Content is provided on an 'as is' and 'as available' basis. While we strive for accuracy, RSAMDIO does not warrant that all information is complete, current, or error-free at all times.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "To the fullest extent permitted by law, RSAMDIO is not liable for any direct, indirect, incidental, or consequential damages arising from use of, or inability to use, this portal.",
    },
    {
      title: "8. Changes to Terms",
      content:
        "We may revise these Terms of Use periodically. Updated terms will be posted on this page. Continued use of the portal after updates constitutes acceptance of the revised terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1426]">
      <div className="relative overflow-hidden border-b border-white/10 bg-[#0B1426] px-5 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#D41B69]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#F7A81B]/10 blur-[100px]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portal
          </Link>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D41B69]/25 bg-[#D41B69]/15 text-[#D41B69]">
              <ScrollText className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D41B69]">
                Legal Document
              </div>
              <h1
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "General Sans, sans-serif" }}
              >
                Terms of Use
              </h1>
            </div>
          </div>
          <p className="text-sm text-white/50">
            Rotaract South Asia MDIO (RSAMDIO) · rsamdio.org
          </p>
          <p className="mt-1 text-xs text-white/30">
            Last updated: August 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-[#D41B69]/20 bg-[#D41B69]/5 p-7 dark:bg-[#D41B69]/8">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-white/75">
            These terms govern your use of the RSAMDIO portal at{" "}
            <a href="https://rsamdio.org" className="text-[#D41B69] underline">
              rsamdio.org
            </a>
            . If you have legal or policy-related questions, contact the Secretariat
            via email below.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            >
              <h2 className="mb-3 text-base font-bold text-[#0B1426] dark:text-white">
                {sec.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-white/60">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-[#F7A81B]/20 bg-[#F7A81B]/5 p-7 dark:bg-[#F7A81B]/8">
          <div className="mb-3 flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#F7A81B]" />
            <h3 className="font-bold text-[#0B1426] dark:text-white">Contact Us</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-white/65">
            For questions about these terms, contact{" "}
            <a
              href={`mailto:${siteConfig.contact.general}`}
              className="text-[#D41B69] underline transition hover:no-underline"
            >
              {siteConfig.contact.general}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
