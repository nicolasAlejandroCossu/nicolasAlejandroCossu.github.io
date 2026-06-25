import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Mono } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  defaultTitle,
  defaultDescription,
  keywords as seoKeywords,
} from "@/content/seo";
import { site } from "@/content/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s — Nicolas Cossu",
  },
  description: defaultDescription,
  keywords: [...seoKeywords],
  applicationName: "Nicolas Cossu",
  authors: [{ name: "Nicolas Cossu", url: SITE_URL }],
  creator: "Nicolas Cossu",
  publisher: "Nicolas Cossu",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: "Nicolas Cossu",
    type: "profile",
    locale: "en_US",
    firstName: "Nicolas",
    lastName: "Cossu",
    images: [
      {
        url: site.photo,
        width: 600,
        height: 800,
        alt: "Nicolas Cossu — Data Engineer & Forward Deployed Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [site.photo],
  },
};

export const viewport: Viewport = {
  themeColor: "#edebde",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f%5B%5D=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cotton text-noir font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
