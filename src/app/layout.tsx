import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteConfigProvider } from "@/components/providers/SiteConfigProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { BackToTop } from "@/components/layout/BackToTop";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { siteConfig } from "@/data/site";
import { getSiteConfig } from "@/lib/supabase/public-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.kidsName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "OP Institute of Studies",
    "OP Kids Pre School",
    "CA coaching",
    "CS coaching",
    "CMA coaching",
    "B.Com tuition",
    "commerce coaching Delhi",
    "school tuition Mahavir Enclave",
    "preschool New Delhi",
    "admissions",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.kidsName}`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3f45e4" },
    { media: "(prefers-color-scheme: dark)", color: "#1d2951" },
  ],
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider>
          <SiteConfigProvider config={config}>
            <LoadingScreen />
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen pb-[4.75rem] lg:pb-0">{children}</main>
            <Footer />
            <FloatingButtons />
            <MobileActionBar />
            <BackToTop />
          </SiteConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
