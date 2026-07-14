"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { BackToTop } from "@/components/layout/BackToTop";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pb-[4.75rem] lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingButtons />
      <MobileActionBar />
      <BackToTop />
    </>
  );
}
