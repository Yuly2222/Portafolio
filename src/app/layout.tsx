import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.heroTitle} ${siteConfig.heroSubtitle}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.heroTitle} ${siteConfig.heroSubtitle}`,
    description: siteConfig.bio,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
