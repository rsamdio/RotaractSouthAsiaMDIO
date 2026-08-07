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
  title: 'Privacy Policy',
  description:
    'Privacy policy for the Rotaract South Asia MDIO portal, covering data collection, usage, and your rights under GDPR.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `When you email the RSAMDIO Secretariat (for example via addresses listed on the Contact page), we receive your name, email address, and whatever you include in the message. We do not collect payment information or sensitive personal data beyond what you voluntarily provide.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `Messages are used solely to respond to your inquiry through the Secretariat. We do not use your data for automated decision-making, profiling, or marketing to third parties.`,
    },
    {
      title: "3. Data Storage & Security",
      content: `Email correspondence is handled through the Secretariat's Google Workspace mailboxes. Editorial website content is managed in Sanity CMS and published as static pages on Netlify. Access to publishing tools is limited to invited editors.`,
    },
    {
      title: "4. Data Sharing",
      content: `We do not sell or trade your personal information. Data may be shared internally with RSAMDIO Secretariat members for operational purposes. We use Google Analytics 4 to understand aggregate site usage (pages viewed, traffic sources, device type). That service may process usage data under Google's terms. We may also disclose information if required by law or legal process.`,
    },
    {
      title: "5. Your Rights (GDPR)",
      content: `If you are located in a jurisdiction covered by GDPR or similar data protection laws, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data ("right to be forgotten"); withdraw consent at any time. To exercise these rights, contact us at the email address below.`,
    },
    {
      title: "6. Cookies",
      content: `This site may store a theme preference (light/dark) in your browser when you change appearance. We also use Google Analytics 4 (measurement ID G-Z4F8DL7KLQ), which sets cookies or similar identifiers to collect anonymized or aggregated usage statistics. We do not use advertising cookies.`,
    },
    {
      title: "7. Children's Privacy",
      content: `Our portal is intended for Rotaract members, who are typically aged 18 and above. We do not knowingly collect personal information from anyone under 18. If you believe a minor has submitted information through our portal, please contact us and we will promptly delete it.`,
    },
    {
      title: "8. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will post the updated policy on this page with a revised date. Continued use of the portal after changes constitutes acceptance of the updated policy.`,
    },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description={
            <>
              Rotaract South Asia MDIO (RSAMDIO) · rsamdio.org
              <br />
              <span className="text-base text-slate-500">
                Last updated: August 2026 · Effective: June 1, 2026
              </span>
            </>
          }
          crumbs={[{ label: "Privacy Policy" }]}
        />

        <div className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 rounded-3xl border border-[#D41B69]/20 bg-[#D41B69]/5 p-7">
              <p className="text-sm leading-relaxed text-slate-700">
                Rotaract South Asia MDIO (&quot;RSAMDIO&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
                committed to protecting your personal information. This Privacy Policy describes how we
                collect, use, and safeguard data you provide when using the RSAMDIO portal at{" "}
                <a href="https://rsamdio.org" className="text-[#D41B69] underline">
                  rsamdio.org
                </a>
                . By using our portal, you agree to this policy.
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
                For privacy-related inquiries, data access requests, or to exercise your rights under
                GDPR, please contact the RSAMDIO Secretariat at{" "}
                <a
                  href={`mailto:${siteConfig.contact.general}`}
                  className="text-[#D41B69] underline transition hover:no-underline"
                >
                  {siteConfig.contact.general}
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-soft transition hover:bg-slate-50"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
