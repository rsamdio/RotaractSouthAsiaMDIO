"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signOut } from "@/lib/auth";
import { Loader2, Lock } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn() {
    setError("");
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      const email = res.user?.email || "";
      if (email.endsWith("@rsamdio.org")) {
        router.push("/admin/dashboard");
      } else {
        setError("Unauthorized. Access is restricted to @rsamdio.org administration emails.");
        await signOut();
      }
    } catch (err: any) {
      console.error("Google Sign-In failed:", err);
      setError(err.message || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1426] flex items-center justify-center px-4">
      {/* Ambient glows */}
      <div className="fixed -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[#D41B69]/15 blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[#F7A81B]/10 blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl mb-4 overflow-hidden">
            <Image src="/img/rsamdio.webp" alt="RSAMDIO" width={48} height={48} className="object-contain" style={{ width: "auto", height: "auto" }} />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
            Secretariat Dashboard
          </h1>
          <p className="text-sm text-white/50 mt-1">RSAMDIO Admin Portal</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D41B69]/15 text-[#D41B69]">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69]">Authorized Access Only</p>
              <p className="text-[11px] text-white/40">Secretariat members only</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-white/70 leading-relaxed">
              Sign in with your authorized <strong>@rsamdio.org</strong> Google Workspace account to access waitlist lists, game leaderboards, and events.
            </p>

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-xs text-red-400 font-semibold leading-relaxed">
                {error}
              </div>
            )}

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white hover:bg-slate-100 py-3.5 text-sm font-bold text-slate-800 transition disabled:opacity-60 cursor-pointer shadow-lg active:scale-98"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#D41B69]" />
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {loading ? "Signing in…" : "Sign In with Google"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-white/25 mt-6">
          Access restricted to authorized RSAMDIO secretariat staff only.
        </p>
      </div>
    </div>
  );
}

