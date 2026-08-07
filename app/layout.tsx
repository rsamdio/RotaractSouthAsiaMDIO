import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import {
  DEFAULT_OG_PATH,
  SITE_URL,
  graph,
  organizationNode,
  webSiteNode,
} from "@/lib/seo";
import "./globals.css";

const siteDescription = siteConfig.description;

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rotaract South Asia MDIO (RSAMDIO)",
    template: "%s | Rotaract South Asia MDIO",
  },
  description: siteDescription,
  authors: [{ name: "RSAMDIO Executive Board" }],
  creator: "Rotaract South Asia MDIO",
  publisher: "Rotaract South Asia MDIO",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/img/favicon.ico", sizes: "32x32" },
      { url: "/img/favicon.png", type: "image/png", sizes: "100x100" },
      { url: "/img/favicon.webp", type: "image/webp", sizes: "100x100" },
    ],
    shortcut: "/img/favicon.ico",
    apple: [{ url: "/img/favicon.png", sizes: "100x100", type: "image/png" }],
  },
  openGraph: {
    title: "Rotaract South Asia MDIO (RSAMDIO)",
    description: siteDescription,
    url: SITE_URL,
    siteName: "Rotaract South Asia MDIO",
    images: [
      {
        url: DEFAULT_OG_PATH,
        width: 1200,
        height: 630,
        alt: "Rotaract South Asia MDIO (RSAMDIO)",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotaract South Asia MDIO (RSAMDIO)",
    description: siteDescription,
    images: [DEFAULT_OG_PATH],
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
      <body
        suppressHydrationWarning
        className={`${sentinel.variable} ${openSans.variable} font-sans antialiased bg-white dark:bg-[#0B1426] text-[#0B1426] dark:text-white transition-colors duration-300 overflow-x-hidden min-h-screen`}
      >
        <JsonLd data={graph(organizationNode(), webSiteNode(true))} />
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
