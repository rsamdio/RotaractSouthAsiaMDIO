import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SubpageModal } from "@/components/SubpageModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RSAMDIO | Rotaract South Asia",
  description:
    "The regional coordination hub for Rotaract across South Asia — unifying 3,500+ clubs and 120K+ members across 8 nations through shared knowledge, standards, and service.",
  keywords: ["Rotaract", "South Asia", "MDIO", "Rotary", "Youth Leadership"],
  icons: {
    icon: "/img/rsamdio.webp",
    shortcut: "/img/rsamdio.webp",
    apple: "/img/rsamdio.webp",
  },
  openGraph: {
    title: "RSAMDIO | Rotaract South Asia",
    description: "Regional coordination hub for Rotaract across South Asia.",
    url: "https://rsamdio.org",
    siteName: "RSAMDIO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-[#0B1426] text-[#0B1426] dark:text-white transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <SubpageModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
