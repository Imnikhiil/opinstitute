"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Settings = Record<string, string | null>;

const groups: { title: string; fields: { name: string; label: string; placeholder?: string }[] }[] = [
  {
    title: "Contact Numbers",
    fields: [
      { name: "phone", label: "Main Phone", placeholder: "+91 92136 10182" },
      { name: "phone2", label: "Second Phone", placeholder: "+91 92208 25187" },
      { name: "kids_phone", label: "OP Kids Phone", placeholder: "+91 92208 25187" },
      { name: "whatsapp", label: "WhatsApp (numbers only)", placeholder: "919213610182" },
      { name: "email", label: "Email", placeholder: "opinstituteofstudies@gmail.com" },
    ],
  },
  {
    title: "Addresses",
    fields: [
      {
        name: "address",
        label: "O.P. Institute Address",
        placeholder:
          "A-374, Street No. 11, Mahavir Enclave Part 2, New Delhi 110059",
      },
      {
        name: "kids_address",
        label: "OP Kids Address",
        placeholder:
          "A Block, Part-2, 374, Street No. 11, Mahavir Enclave Part 2, New Delhi 110059",
      },
      {
        name: "branch_address",
        label: "Other Branch (optional)",
        placeholder: "Leave blank if not applicable",
      },
    ],
  },
  {
    title: "Timings",
    fields: [
      {
        name: "weekday_hours",
        label: "OP Institute",
        placeholder: "Monday – Saturday: Open · Closes 9:00 PM",
      },
      { name: "sunday_hours", label: "Sunday", placeholder: "Sunday: Closed" },
      {
        name: "preschool_hours",
        label: "OP Kids",
        placeholder: "OP Kids: Open · Closes 6:00 PM",
      },
    ],
  },
  {
    title: "Social Media Links",
    fields: [
      { name: "facebook", label: "Facebook URL" },
      { name: "instagram", label: "Instagram URL" },
      { name: "youtube", label: "YouTube URL" },
      { name: "linkedin", label: "LinkedIn URL" },
    ],
  },
];

export function SettingsForm({ initial }: { initial: Settings }) {
  const [form, setForm] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const setField = (name: string, value: string) =>
    setForm((f) => ({ ...f, [name]: value }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    const payload = { ...form, id: 1, updated_at: new Date().toISOString() };
    const { error } = await supabase
      .from("site_settings")
      .upsert(payload, { onConflict: "id" });
    setSaving(false);
    if (error) {
      alert("Save fail: " + error.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {groups.map((g) => (
        <div
          key={g.title}
          className="rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/10 p-5 sm:p-6 shadow-sm"
        >
          <h3 className="font-semibold mb-4 text-[#1d2951] dark:text-white">
            {g.title}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {g.fields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                <input
                  type="text"
                  value={form[f.name] ?? ""}
                  onChange={(e) => setField(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-4 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition disabled:opacity-60 shadow-lg"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Saved!
          </span>
        )}
      </div>
    </div>
  );
}
