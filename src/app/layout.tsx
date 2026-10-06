import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findFirst();
  return {
    title: {
      default: setting?.metaTitle || "Firma Hukum Swa Law — Trusted Legal Partner",
      template: `%s | ${setting?.firmName || "Firma Hukum Swa Law"}`,
    },
    description: setting?.metaDescription || "Firma hukum profesional yang memberikan pendampingan strategis dan solusi hukum terpercaya.",
    icons: {
      icon: setting?.faviconUrl || "/favicon.ico",
    },
    openGraph: {
      title: setting?.metaTitle || "Firma Hukum Swa Law",
      description: setting?.metaDescription || "Trusted Legal Partner",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      siteName: setting?.firmName || "Firma Hukum Swa Law",
      locale: "id_ID",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
