"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Settings = Record<string, string | null>;

const groups: {
  title: string;
  hint?: string;
  fields: {
    name: string;
    label: string;
    placeholder?: string;
    helpText?: string;
    multiline?: boolean;
  }[];
}[] = [
  {
    title: "OP Institute of Studies — Contact",
    hint: "Shown in the footer, contact page, and call buttons for Institute.",
    fields: [
      {
        name: "phone",
        label: "Phone",
        placeholder: "+91 92136 10182",
        helpText: "Display number visitors see and tap to call.",
      },
      {
        name: "whatsapp",
        label: "WhatsApp",
        placeholder: "919213610182",
        helpText: "Digits only — e.g. 919213610182 (no + or spaces).",
      },
      {
        name: "email",
        label: "Email",
        placeholder: "opinstituteofstudies@gmail.com",
      },
      {
        name: "address",
        label: "Address",
        placeholder:
          "A-374, Street No. 11, Mahavir Enclave Part 2, New Delhi 110059",
      },
    ],
  },
  {
    title: "OP Institute of Studies — Social",
    hint: "Footer and contact social links for Institute.",
    fields: [
      {
        name: "instagram",
        label: "Instagram",
        placeholder: "https://www.instagram.com/op_institute",
      },
      {
        name: "facebook",
        label: "Facebook",
        placeholder: "https://www.facebook.com/opinstitute",
      },
      {
        name: "youtube",
        label: "YouTube",
        placeholder: "https://www.youtube.com/@o.p.instituteofstudies3990",
      },
    ],
  },
  {
    title: "OP Kids Pre School — Contact",
    hint: "Shown for Kids World pages, contact, and WhatsApp buttons.",
    fields: [
      {
        name: "kids_phone",
        label: "Phone",
        placeholder: "+91 92208 25187",
      },
      {
        name: "kids_whatsapp",
        label: "WhatsApp",
        placeholder: "919220825187",
        helpText: "Digits only — e.g. 919220825187 (no + or spaces).",
      },
      {
        name: "phone2",
        label: "Alt phone (optional)",
        placeholder: "+91 92208 25187",
      },
      {
        name: "kids_email",
        label: "Email",
        placeholder: "opkidspreschool@gmail.com",
      },
      {
        name: "kids_address",
        label: "Address",
        placeholder:
          "A Block, Part-2, 374, Street No. 11, Mahavir Enclave Part 2, New Delhi 110059",
      },
    ],
  },
  {
    title: "OP Kids Pre School — Social",
    hint: "Footer and contact social links for OP Kids.",
    fields: [
      {
        name: "kids_instagram",
        label: "Instagram",
        placeholder: "https://www.instagram.com/opkidspreschool",
      },
      {
        name: "kids_facebook",
        label: "Facebook",
        placeholder: "https://www.facebook.com/om.prakash.310948",
      },
      {
        name: "kids_youtube",
        label: "YouTube",
        placeholder: "https://www.youtube.com/@opkidspreschool",
      },
    ],
  },
  {
    title: "Campus timings",
    hint: "Shown on the Contact page.",
    fields: [
      {
        name: "weekday_hours",
        label: "OP Institute of Studies hours",
        placeholder: "Monday – Saturday: Open · Closes 9:00 PM",
      },
      {
        name: "sunday_hours",
        label: "Sunday",
        placeholder: "Sunday: Closed",
      },
      {
        name: "preschool_hours",
        label: "OP Kids Pre School hours",
        placeholder: "OP Kids Pre School: Open · Closes 6:00 PM",
      },
    ],
  },
  {
    title: "Front Desk (Home / About / Admissions)",
    hint: "Name and message on the Front Desk section. Change the photo in Gallery → Show as = Front desk.",
    fields: [
      {
        name: "front_desk_name",
        label: "Display name",
        placeholder: "Our Front Desk Executive",
        helpText: "e.g. her name, or “Our Front Desk Executive”.",
      },
      {
        name: "front_desk_title",
        label: "Role title",
        placeholder: "Admissions, Queries & Operations",
      },
      {
        name: "front_desk_message",
        label: "Welcome message",
        placeholder: "When you walk into our campus…",
        multiline: true,
        helpText: "2–4 sentences parents read under the photo.",
      },
    ],
  },
  {
    title: "Home Admissions banner",
    hint: "Orange/gold band near the bottom of the homepage (not the top announcement bar).",
    fields: [
      {
        name: "cta_badge",
        label: "Small badge text",
        placeholder: "Admissions Open 2026–27",
      },
      {
        name: "cta_title",
        label: "Headline",
        placeholder: "Ready to Begin Your Learning Journey?",
      },
      {
        name: "cta_body",
        label: "Supporting text",
        placeholder: "From OP Kids Pre School to CMA & B.Com…",
        multiline: true,
      },
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
    // Never write unused branch_address from this form
    const { branch_address: _drop, ...rest } = form;
    void _drop;
    const payload = { ...rest, id: 1, updated_at: new Date().toISOString() };
    const { error } = await supabase
      .from("site_settings")
      .upsert(payload, { onConflict: "id" });
    setSaving(false);
    if (error) {
      alert(
        "Could not save: " +
          error.message +
          "\n\nIf this mentions missing columns, ask the developer to run add_site_copy_fields.sql in Supabase."
      );
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {groups.map((g) => {
        const isKids = g.title.includes("OP Kids");
        const isInstitute = g.title.includes("OP Institute");
        return (
          <div
            key={g.title}
            className={cn(
              "rounded-2xl bg-white dark:bg-gray-900/80 border p-5 sm:p-6 shadow-sm",
              isKids
                ? "border-kids-200/80 dark:border-kids-800/40"
                : isInstitute
                  ? "border-brand-200/80 dark:border-brand-800/40"
                  : "border-gray-200/80 dark:border-white/10"
            )}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                {isKids && (
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-kids-100 text-kids-700">
                    OP Kids
                  </span>
                )}
                {isInstitute && (
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-brand-100 text-brand-700">
                    Institute
                  </span>
                )}
                <h3 className="font-semibold text-[#1d2951] dark:text-white">
                  {g.title}
                </h3>
              </div>
              {g.hint ? (
                <p className="text-xs text-muted-foreground">{g.hint}</p>
              ) : null}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {g.fields.map((f) => (
                <div
                  key={f.name}
                  className={
                    f.multiline ? "sm:col-span-2" : "sm:col-span-2 md:col-span-1"
                  }
                >
                  <label className="block text-sm font-medium mb-1.5">
                    {f.label}
                  </label>
                  {f.helpText ? (
                    <p className="text-xs text-muted-foreground mb-1.5 -mt-0.5">
                      {f.helpText}
                    </p>
                  ) : null}
                  {f.multiline ? (
                    <textarea
                      rows={4}
                      value={form[f.name] ?? ""}
                      onChange={(e) => setField(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[f.name] ?? ""}
                      onChange={(e) => setField(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="sticky bottom-4 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition disabled:opacity-60 shadow-lg"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Saved — live site will update shortly
          </span>
        )}
      </div>
    </div>
  );
}
