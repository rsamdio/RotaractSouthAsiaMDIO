"use client";
import { useState } from "react";
import { ref, push, set } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Mail, User, Phone, CheckCircle, Loader2, MapPin } from "lucide-react";

export function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", district: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: string, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const payload = {
        ...form,
        timestamp: Date.now(),
        submittedAt: new Date().toISOString(),
      };
      
      // 1. Submit to Firebase RTDB
      const newRef = push(ref(rtdb, "waitlist"));
      await set(newRef, payload);

      // 2. Submit to Google Sheets (via Apps Script Web App)
      const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
      if (appsScriptUrl) {
        fetch(appsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).catch((err) => console.error("Google Sheets Submission Error:", err));
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", district: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="waitlist-section"
      className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0B1426]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-72 w-[700px] rounded-full bg-[#D41B69]/8 dark:bg-[#D41B69]/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-lg">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-[#D41B69]/10 dark:bg-[#D41B69]/20 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-4">
            Stay Connected
          </span>
          <h2
            className="text-3xl font-bold text-[#0B1426] dark:text-white"
            style={{ fontFamily: "General Sans, sans-serif" }}
          >
            Join the Network
          </h2>
          <p className="mt-3 text-slate-500 dark:text-white/55 text-sm">
            Sign up for updates on regional events, resources, and Rotaract South Asia announcements.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-3xl border border-green-200 dark:border-green-500/25 bg-green-50 dark:bg-green-500/10 p-10 text-center shadow-soft">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0B1426] dark:text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-sm text-slate-500 dark:text-white/55">
              Thank you for joining. We&apos;ll be in touch with the latest from Rotaract South Asia.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-soft dark:shadow-none backdrop-blur-xl space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/25" />
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Arun Teja Godavarthi"
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 pl-10 pr-4 py-3 text-sm text-[#0B1426] dark:text-white placeholder-slate-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/25" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@district.org"
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 pl-10 pr-4 py-3 text-sm text-[#0B1426] dark:text-white placeholder-slate-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/25" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 ..."
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 pl-10 pr-4 py-3 text-sm text-[#0B1426] dark:text-white placeholder-slate-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-white/40 uppercase tracking-wider mb-1.5">
                  District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/25" />
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => update("district", e.target.value)}
                    placeholder="3150"
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 pl-10 pr-4 py-3 text-sm text-[#0B1426] dark:text-white placeholder-slate-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
                  />
                </div>
              </div>
            </div>

            {status === "error" && (
              <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-3 text-xs text-red-600 dark:text-red-400">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#D41B69] py-3.5 text-sm font-bold text-white hover:bg-[#8A0F3E] transition shadow-lg shadow-[#D41B69]/25 hover:shadow-[#D41B69]/40 disabled:opacity-60 mt-2"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {status === "loading" ? "Submitting…" : "Join the Network →"}
            </button>

            <p className="text-center text-[11px] text-slate-400 dark:text-white/25">
              Your information is kept private and never shared. See our{" "}
              <a href="/privacy" className="underline hover:text-[#D41B69] transition">Privacy Policy</a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
