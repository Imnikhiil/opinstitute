"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { BackToTop } from "@/components/layout/BackToTop";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";
import type { Announcement } from "@/lib/supabase/public-data";

export function SiteChrome({
  children,
  announcements = [],
}: {
  children: React.ReactNode;
  announcements?: Announcement[];
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {announcements.length > 0 && (
        <AnnouncementBanner announcements={announcements} />
      )}
      <main className="min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingButtons />
      <BackToTop />
    </>
  );
}
