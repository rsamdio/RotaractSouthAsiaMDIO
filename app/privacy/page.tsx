import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | RSAMDIO",
  description:
    "Privacy policy for the Rotaract South Asia MDIO portal — covering data collection, usage, and your rights under GDPR.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `When you submit our "Join the Network" waitlist form, we collect your full name, email address, phone number (optional), and Rotaract district. When you submit a 2048 game score, we collect your display name, district, and game score. We do not collect any payment information, sensitive personal data, or location data beyond what you voluntarily provide.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `Waitlist data is used solely to keep you informed about RSAMDIO regional events, resources, and organizational updates. Game leaderboard data is displayed publicly on the portal to foster community engagement. We do not use your data for automated decision-making, profiling, or marketing to third parties.`,
    },
    {
      title: "3. Data Storage & Security",
      content: `All data is stored securely using Google Firebase (Realtime Database and Firestore), hosted on Google Cloud infrastructure in the Asia-Southeast1 region. Database access rules are enforced at the server level — unauthenticated users cannot read waitlist or score data. Administrative access is restricted to verified @rsamdio.org accounts only.`,
    },
    {
      title: "4. Data Sharing",
      content: `We do not sell, trade, or share your personal information with third parties. Data may be shared internally with RSAMDIO Secretariat members (authorized @rsamdio.org accounts) for operational purposes. We may disclose information if required by law or legal process.`,
    },
    {
      title: "5. Your Rights (GDPR)",
      content: `If you are located in a jurisdiction covered by GDPR or similar data protection laws, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data ("right to be forgotten"); withdraw consent at any time. To exercise these rights, contact us at the email address below.`,
    },
    {
      title: "6. Cookies",
      content: `The RSAMDIO portal uses minimal cookies for session management and theme preferences (light/dark mode). We do not use tracking cookies, advertising cookies, or third-party analytics cookies. You can disable cookies in your browser settings; this may affect certain portal functionality.`,
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1426]">
      {/* Header */}
      <div className="bg-[#0B1426] border-b border-white/10 py-16 px-5 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#D41B69]/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#F7A81B]/10 blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portal
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41B69]/15 border border-[#D41B69]/25 text-[#D41B69]">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D41B69]">
                Legal Document
              </div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
                Privacy Policy
              </h1>
            </div>
          </div>
          <p className="text-white/50 text-sm">
            Rotaract South Asia MDIO (RSAMDIO) · rsamdio.org
          </p>
          <p className="text-white/30 text-xs mt-1">
            Last updated: May 2026 · Effective: June 1, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="rounded-3xl border border-[#D41B69]/20 bg-[#D41B69]/5 dark:bg-[#D41B69]/8 p-7 mb-10">
          <p className="text-slate-700 dark:text-white/75 leading-relaxed text-sm">
            Rotaract South Asia MDIO (&quot;RSAMDIO&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and safeguard data you provide when using the RSAMDIO portal at{" "}
            <a href="https://rsamdio.org" className="text-[#D41B69] underline">rsamdio.org</a>. By using our portal, you agree to this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-soft dark:shadow-none"
            >
              <h2 className="font-bold text-[#0B1426] dark:text-white mb-3 text-base">
                {sec.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-3xl border border-[#F7A81B]/20 bg-[#F7A81B]/5 dark:bg-[#F7A81B]/8 p-7">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="h-5 w-5 text-[#F7A81B]" />
            <h3 className="font-bold text-[#0B1426] dark:text-white">Contact Us</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-white/65 leading-relaxed">
            For privacy-related inquiries, data access requests, or to exercise your rights under GDPR, please contact the RSAMDIO Secretariat at{" "}
            <a href="mailto:secretary@rsamdio.org" className="text-[#D41B69] underline hover:no-underline transition">
              secretary@rsamdio.org
            </a>. We will respond within 30 days.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition shadow-soft dark:shadow-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
