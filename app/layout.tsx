// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lavigate.com"),
  title: {
    default: "Lavigate – Smart finance calculators",
    template: "%s | Lavigate – Smart finance calculators",
  },
  description:
    "Navigate your finances with clear, accurate calculators for income tax, paychecks, loans and more – tailored to each region.",
  openGraph: {
    title: "Lavigate – Smart finance calculators",
    description:
      "Navigate your finances with clear, accurate calculators for income tax, paychecks, loans and more – tailored to each region.",
    url: "https://lavigate.com",
    siteName: "Lavigate",
    type: "website",
    images: [
      {
        url: "/lavigate-icon.png",
        width: 512,
        height: 512,
        alt: "Lavigate – Smart finance calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavigate – Smart finance calculators",
    description:
      "Smart, region-specific calculators for taxes, paychecks and loans.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        {/* Google Tag Manager – laddas korrekt via Next.js App Router */}
        <GoogleTagManager gtmId="GTM-NXXQGG43" />

        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-8 md:py-10">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
