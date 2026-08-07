import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Use',
  description:
    'Terms of use for the Rotaract South Asia MDIO portal, including acceptable use, intellectual property, and liability limitations.',
  path: '/terms',
});

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using rsamdio.org, you agree to these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the portal.",
    },
    {
      title: "2. Purpose of this website",
      content:
        "This website is an informational platform for Rotaract South Asia MDIO. Content is provided for members, districts, clubs, partners, and the public to understand initiatives, events, and official updates.",
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
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Legal"
          title="Terms of Use"
          description={
            <>
              Rotaract South Asia MDIO (RSAMDIO) · rsamdio.org
              <br />
              <span className="text-base text-slate-500">Last updated: August 2026</span>
            </>
          }
          crumbs={[{ label: "Terms of Use" }]}
        />

        <div className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 rounded-3xl border border-[#D41B69]/20 bg-[#D41B69]/5 p-7">
              <p className="text-sm leading-relaxed text-slate-700">
                These terms govern your use of the RSAMDIO portal at{" "}
                <a href="https://rsamdio.org" className="text-[#D41B69] underline">
                  rsamdio.org
                </a>
                . If you have legal or policy-related questions, contact the Secretariat via email
                below.
              </p>
            </div>

            <div className="space-y-6">
              {sections.map((sec) => (
                <div
                  key={sec.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft"
                >
                  <h2 className="mb-3 text-base font-bold text-[#0B1426]">{sec.title}</h2>
                  <p className="text-sm leading-relaxed text-slate-600">{sec.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-[#F7A81B]/20 bg-[#F7A81B]/5 p-7">
              <div className="mb-3 flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#F7A81B]" />
                <h3 className="font-bold text-[#0B1426]">Contact Us</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
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
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
