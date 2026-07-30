"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, User, Phone, CheckCircle, Loader2, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

type InquiryType = "general" | "district-update" | "partnership" | "media";

const inquiryOptions: { value: InquiryType; label: string; email: string }[] = [
  { value: "general", label: "General Inquiry", email: siteConfig.contact.general },
  { value: "district-update", label: "Submit a District Update", email: siteConfig.contact.districtUpdate },
  { value: "partnership", label: "Partnership / Collaboration Inquiry", email: siteConfig.contact.partnership },
  { value: "media", label: "Media Inquiry", email: siteConfig.contact.media },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as InquiryType) || "general";

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [type, setType] = useState<InquiryType>(
    inquiryOptions.some((o) => o.value === initialType) ? initialType : "general"
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const activeOption = inquiryOptions.find((o) => o.value === type)!;

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-green-200 dark:border-green-500/25 bg-green-50 dark:bg-green-500/10 p-10 text-center shadow-soft">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-[#0B1426] dark:text-white mb-2">Message sent!</h3>
        <p className="text-sm text-slate-500 dark:text-white/55">
          Thank you for reaching out. The Secretariat will respond as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft backdrop-blur-xl space-y-5"
    >
      {/* Inquiry type */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Inquiry Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as InquiryType)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0B1426] focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
        >
          {inquiryOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-slate-400">Routed to {activeOption.email}</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-[#0B1426] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="name@district.org"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-[#0B1426] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 ..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-[#0B1426] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Message
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="How can the Secretariat help?"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-[#0B1426] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition resize-none"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#D41B69] py-3.5 text-sm font-bold text-white hover:bg-[#9A0E4E] transition shadow-lg shadow-[#D41B69]/25 hover:shadow-[#D41B69]/40 disabled:opacity-60 mt-2"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {status === "loading" ? "Sending…" : "Send Message →"}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        Your information is kept private and never shared. See our{" "}
        <a href="/privacy" className="underline hover:text-[#D41B69] transition">Privacy Policy</a>.
      </p>
    </form>
  );
}
