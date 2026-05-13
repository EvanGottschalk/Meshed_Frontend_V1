import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/config/site";
import { TopMenu } from "@/components/layout/TopMenu";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.meta.defaultTitle,
    template: SITE.meta.titleTemplate,
  },
  description: SITE.meta.description,
  openGraph: {
    title: SITE.meta.defaultTitle,
    description: SITE.meta.description,
    type: "website",
    siteName: SITE.businessName,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.meta.defaultTitle,
    description: SITE.meta.description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-base text-fg-primary font-body antialiased">
        <TopMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
