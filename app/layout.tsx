import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Self-hosted so local/dev does not depend on fonts.gstatic.com at compile time.
const openSans = localFont({
  src: [
    { path: "../public/fonts/open-sans/open-sans-300.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/open-sans/open-sans-400.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/open-sans/open-sans-500.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/open-sans/open-sans-600.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/open-sans/open-sans-700.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/open-sans/open-sans-800.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-open-sans",
  display: "swap",
});

const sentinel = localFont({
  src: [
    {
      path: "../public/fonts/Sentinel-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Sentinel-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sentinel",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#D41B69",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rsamdio.org"),
  title: {
    default: "RSAMDIO | Rotaract South Asia MDIO",
    template: "%s | RSAMDIO",
  },
  description:
    "The official regional coordination hub for Rotaract across South Asia — unifying 3,000+ clubs and 120K+ members across 8 nations through shared knowledge, standards, and service.",
  keywords: [
    "Rotaract",
    "Rotaract South Asia",
    "RSAMDIO",
    "Rotary International",
    "Rotary South Asia",
    "District Rotaract Representative",
    "DRR",
    "Youth Leadership South Asia",
  ],
  authors: [{ name: "RSAMDIO Executive Board" }],
  creator: "Rotaract South Asia MDIO",
  publisher: "Rotaract South Asia MDIO",
  icons: {
    icon: "/img/rsamdio.webp",
    shortcut: "/img/rsamdio.webp",
    apple: "/img/rsamdio.webp",
  },
  openGraph: {
    title: "RSAMDIO | Rotaract South Asia MDIO",
    description:
      "The official regional coordination hub for Rotaract across South Asia — unifying 3,000+ clubs and 120K+ members across 8 nations.",
    url: "https://rsamdio.org",
    siteName: "Rotaract South Asia MDIO",
    images: [
      {
        url: "/img/ananta-installation.jpg",
        width: 1200,
        height: 630,
        alt: "Rotaract South Asia MDIO Leadership & Installation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RSAMDIO | Rotaract South Asia MDIO",
    description:
      "Regional coordination hub unifying Rotaract leaders across South Asia.",
    images: ["/img/ananta-installation.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${sentinel.variable} ${openSans.variable} font-sans antialiased bg-white dark:bg-[#0B1426] text-[#0B1426] dark:text-white transition-colors duration-300 overflow-x-hidden min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
