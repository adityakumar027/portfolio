import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aditya Kumar — AI & Backend Software Engineer",
  description: "Software engineer building production AI, backend infrastructure, and reliable automation. Selected experience and work by Aditya Kumar.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "Aditya Kumar — Software Engineer",
    description: "Production AI, backend infrastructure, and reliable automation.",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 910, alt: "The Core — Aditya Kumar, Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar — Software Engineer",
    description: "Production AI, backend infrastructure, and reliable automation.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
