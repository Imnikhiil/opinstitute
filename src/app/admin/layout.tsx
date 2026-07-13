import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email: string | undefined;

  // If Supabase isn't configured yet, still render (login page will show a clear error).
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

  // Not logged in → render children plain (this is the login page;
  // middleware already redirects protected routes to /admin/login).
  if (!email) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-gray-950 lg:flex">
      <AdminSidebar email={email} />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
