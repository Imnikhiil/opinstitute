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

  if (!email) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen lg:flex bg-[linear-gradient(160deg,#eef1f8_0%,#f5f6fa_45%,#eef0f6_100%)] dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-950 dark:to-[#141b3d]">
      <AdminSidebar email={email} />
      <main className="flex-1 min-w-0 min-h-screen">
        <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 xl:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
