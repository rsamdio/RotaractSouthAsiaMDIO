import type { Metadata, Viewport } from "next";
import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: { absolute: "RSAMDIO Admin" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-studio min-h-screen bg-[#FAFAF8]">
      {children}
    </div>
  );
}
