import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://greybird.pro"),
  title: "Greybird — Experience Meets Opportunity",
  description: "Connect with senior professionals for part-time projects, advisory sessions, and flexible work. Access 20+ years of industry expertise on demand.",
  keywords: ["senior professionals", "advisory", "consulting", "part-time work", "remote work", "experts", "freelance", "experienced talent"],
  authors: [{ name: "Greybird" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Greybird — Experience Meets Opportunity",
    description: "Connect with senior professionals for part-time projects, advisory sessions, and flexible work.",
    url: "https://greybird.pro",
    siteName: "Greybird",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Greybird — Experience Meets Opportunity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greybird — Experience Meets Opportunity",
    description: "Connect with senior professionals for part-time projects, advisory sessions, and flexible work.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-gray-50">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
