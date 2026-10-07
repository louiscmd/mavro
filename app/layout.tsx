import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { BagProvider } from "@/components/BagProvider";
import { BagPanel } from "@/components/BagPanel";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const t = getDictionary();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: t.meta.title, template: "%s — mavro" },
  description: t.meta.description,
  openGraph: {
    type: "website",
    siteName: "mavro",
    title: t.meta.title,
    description: t.meta.description,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: "mavro" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#181614" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll reveals only when JS runs, so content never stays hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <BagProvider>
          <Header />
          <main id="main" className="min-h-svh">
            {children}
          </main>
          <Footer />
          <BagPanel />
        </BagProvider>
      </body>
    </html>
  );
}
