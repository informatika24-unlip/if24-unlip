import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/seo/structured-data";
import ErrorBoundary from "@/components/error-boundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: " Informatika 24 | Universitas Linggabuana PGRI Sukabumi",
    template: "%s | Informatika 24",
  },
  description: "Informatika Angkatan 24 - Universitas Linggabuana PGRI Sukabumi. Platform digital untuk menghubungkan mahasiswa informatika angkatan 2024.",
  keywords: ["informatika", "universitas linggabuana", "pgri sukabumi", "mahasiswa", "teknologi", "programming", "computer science", "angkatan 2024"],
  authors: [{ name: "Informatika 24" }],
  creator: "Informatika 24",
  publisher: "Informatika 24",
  manifest: "/manifest.json",
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
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://if24-unlip.vercel.app",
    siteName: "Informatika 24",
    title: "Informatika 24",
    description: "Informatika Angkatan 24 - Universitas Linggabuana PGRI Sukabumi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Informatika 24",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Informatika 24",
    description: "Informatika Angkatan 24 - Universitas Linggabuana PGRI Sukabumi",
    images: ["/og-image.png"],
    creator: "@informatika24",
  },
  verification: {
    google: "your-google-verification-code",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IF24",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LinkHub I24" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
