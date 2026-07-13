"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Save, Upload, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "tags"
  | "image";

export interface CrudField {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export interface CrudConfig {
  table: string;
  singular: string;
  fields: CrudField[];
  titleField: string;
  subtitleField?: string;
  imageField?: string;
}

type Row = Record<string, unknown>;

export function CrudManager({
  config,
  initialRows,
}: {
  config: CrudConfig;
  initialRows: Row[];
}) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [editing, setEditing] = useState<Row | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<Row>({});

  const openAdd = () => {
    const blank: Row = {};
    config.fields.forEach((f) => {
      blank[f.name] = f.type === "boolean" ? false : f.type === "tags" ? [] : "";
    });
    setForm(blank);
    setEditing(null);
    setIsOpen(true);
  };

  const openEdit = (row: Row) => {
    setForm({ ...row });
    setEditing(row);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditing(null);
    setForm({});
  };

  const setField = (name: string, value: unknown) =>
    setForm((f) => ({ ...f, [name]: value }));

  const uploadImage = async (file: File, fieldName: string) => {
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${config.table}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: true });
      if (error) {
        alert("Image upload fail hui: " + error.message);
        return;
      }
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setField(fieldName, data.publicUrl);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    const supabase = createClient();

    // Build payload only from configured fields
    const payload: Row = {};
    config.fields.forEach((f) => {
      let v = form[f.name];
      if (f.type === "number") v = v === "" || v == null ? 0 : Number(v);
      if (f.type === "tags") {
        if (typeof v === "string") {
          v = v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
      payload[f.name] = v ?? null;
    });

    if (editing?.id) {
      const { data, error } = await supabase
        .from(config.table)
        .update(payload)
        .eq("id", editing.id)
        .select()
        .single();
      if (error) {
        alert("Save fail: " + error.message);
        setSaving(false);
        return;
      }
      setRows((prev) => prev.map((r) => (r.id === editing.id ? data : r)));
    } else {
      const { data, error } = await supabase
        .from(config.table)
        .insert(payload)
        .select()
        .single();
      if (error) {
        alert("Add fail: " + error.message);
        setSaving(false);
        return;
      }
      setRows((prev) => [data, ...prev]);
    }
    setSaving(false);
    close();
  };

  const remove = async (row: Row) => {
    if (!confirm(`Ye ${config.singular} delete karein?`)) return;
    const supabase = createClient();
    const { error } = await supabase
      .from(config.table)
      .delete()
      .eq("id", row.id as string);
    if (!error) setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add {config.singular}
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-muted-foreground">
          Abhi koi {config.singular.toLowerCase()} nahi hai. &quot;Add&quot; par click karein.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((row) => (
            <div
              key={row.id as string}
              className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-white/10 p-4 flex flex-col"
            >
              {config.imageField && row[config.imageField] ? (
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={row[config.imageField] as string}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <p className="font-semibold line-clamp-1">
                {(row[config.titleField] as string) || "—"}
              </p>
              {config.subtitleField && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 flex-1">
                  {(row[config.subtitleField] as string) || ""}
                </p>
              )}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => openEdit(row)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => remove(row)}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-5 py-4">
              <h3 className="font-display font-bold text-lg">
                {editing ? "Edit" : "Add"} {config.singular}
              </h3>
              <button
                onClick={close}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 grid sm:grid-cols-2 gap-4">
              {config.fields.map((f) => {
                const value = form[f.name];
                const wrapCls = f.fullWidth || f.type === "textarea" || f.type === "image"
                  ? "sm:col-span-2"
                  : "";
                return (
                  <div key={f.name} className={wrapCls}>
                    <label className="block text-sm font-medium mb-1.5">
                      {f.label}
                      {f.required && <span className="text-red-500"> *</span>}
                    </label>

                    {f.type === "textarea" && (
                      <textarea
                        rows={3}
                        value={(value as string) ?? ""}
                        onChange={(e) => setField(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      />
                    )}

                    {(f.type === "text" || f.type === "number") && (
                      <input
                        type={f.type === "number" ? "number" : "text"}
                        value={(value as string) ?? ""}
                        onChange={(e) => setField(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    )}

                    {f.type === "tags" && (
                      <input
                        type="text"
                        value={
                          Array.isArray(value)
                            ? (value as string[]).join(", ")
                            : (value as string) ?? ""
                        }
                        onChange={(e) => setField(f.name, e.target.value)}
                        placeholder={f.placeholder || "comma se alag karein"}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    )}

                    {f.type === "select" && (
                      <select
                        value={(value as string) ?? ""}
                        onChange={(e) => setField(f.name, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="">Select…</option>
                        {f.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    )}

                    {f.type === "boolean" && (
                      <label className="flex items-center gap-2 cursor-pointer mt-1">
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(e) => setField(f.name, e.target.checked)}
                          className="w-5 h-5 rounded accent-brand-600"
                        />
                        <span className="text-sm text-muted-foreground">
                          {f.placeholder || "Haan"}
                        </span>
                      </label>
                    )}

                    {f.type === "image" && (
                      <div>
                        {value ? (
                          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2 bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={value as string}
                              alt=""
                              fill
                              sizes="400px"
                              className="object-cover"
                            />
                          </div>
                        ) : null}
                        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm">
                          {uploading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          {value ? "Change image" : "Upload image"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) uploadImage(file, f.name);
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-5 py-4">
              <button
                onClick={close}
                className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving || uploading}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition disabled:opacity-60"
                )}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
