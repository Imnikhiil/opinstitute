import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  let initial: Record<string, string | null> = {};
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    initial = (data as Record<string, string | null>) ?? {};
  } catch {
    initial = {};
  }

  return (
    <div>
      <PageHeader
        title="Site Settings"
        subtitle="Phone, WhatsApp, address, Front Desk text, and the home Admissions banner — these update the live website."
      />
      <div className="mt-6">
        <SettingsForm initial={initial} />
      </div>
    </div>
  );
}
