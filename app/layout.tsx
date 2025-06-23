import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Perfume Recommendation | Find Your Perfect Scent",
  description: "Get personalized perfume recommendations using AI. Discover your ideal fragrance based on your preferences, occasion, and budget.",
  keywords: "perfume recommendation, AI fragrance finder, personalized scent, fragrance quiz",
  openGraph: {
    title: "AI Perfume Recommendation | Find Your Perfect Scent",
    description: "Get personalized perfume recommendations using AI. Discover your ideal fragrance based on your preferences, occasion, and budget.",
    type: "website",
    url: "https://fragranceai.netlify.app",
    images: [
      {
        url: "https://fragranceai.netlify.app",
        width: 1200,
        height: 630,
        alt: "AI Perfume Recommendation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Perfume Recommendation | Find Your Perfect Scent",
    description: "Get personalized perfume recommendations using AI. Discover your ideal fragrance based on your preferences, occasion, and budget.",
    images: ["https://fragranceai.netlify.app"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
