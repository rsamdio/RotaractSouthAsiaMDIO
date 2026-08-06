"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { projectId } from "@/sanity/env";
import "@/sanity/styles/studio.css";

export default function AdminStudioPage() {
  if (!projectId) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 px-6 py-16 text-[#0B1426]">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "General Sans, sans-serif" }}>
          RSAMDIO Admin
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Sanity is not configured yet. Create a project at{" "}
          <a className="font-semibold text-[#D41B69] underline" href="https://www.sanity.io/manage">
            sanity.io/manage
          </a>
          , then set <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code> in{" "}
          <code className="rounded bg-slate-100 px-1">.env.local</code>. See{" "}
          <code className="rounded bg-slate-100 px-1">docs/CMS.md</code>.
        </p>
        <p className="text-sm text-slate-500">
          Until then, the public site uses local seed content from <code>config/</code>.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
