import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greybird — Experience Meets Opportunity",
  description: "Connect with senior professionals for part-time projects, advisory sessions, and flexible work. Access 20+ years of industry expertise on demand.",
  keywords: ["senior professionals", "advisory", "consulting", "part-time work", "remote work", "experts", "freelance", "experienced talent"],
  authors: [{ name: "Greybird" }],
  icons: {
    icon: "/favicon-bg.png",
    apple: "/favicon-bg.png",
  },
  openGraph: {
    title: "Greybird — Experience Meets Opportunity",
    description: "Connect with senior professionals for part-time projects, advisory sessions, and flexible work.",
    url: "https://greybird.pro",
    siteName: "Greybird",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greybird — Experience Meets Opportunity",
    description: "Connect with senior professionals for part-time projects, advisory sessions, and flexible work.",
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
      </body>
    </html>
  );
}
