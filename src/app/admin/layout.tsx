import type { Metadata, Viewport } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPwaRegister } from "@/components/admin/AdminPwaRegister";
import "./admin-app.css";

export const metadata: Metadata = {
  title: {
    default: "OP Admin",
    template: "%s · OP Admin",
  },
  applicationName: "OP Admin",
  robots: { index: false, follow: false },
  manifest: "/admin-pwa/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    // default = solid status bar (safer on iPhone). Content stays below clock/battery.
    statusBarStyle: "default",
    title: "OP Admin",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: "/admin-pwa/icon-192.png",
    icon: [
      { url: "/admin-pwa/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/admin-pwa/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d2951",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email: string | undefined;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      email = user?.email;
    } catch {
      email = undefined;
    }
  }

  return (
    <>
      <AdminPwaRegister />
      {email ? (
        <AdminShell email={email}>{children}</AdminShell>
      ) : (
        <div className="admin-app-root">{children}</div>
      )}
    </>
  );
}
