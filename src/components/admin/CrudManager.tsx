"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Upload,
  Loader2,
  Search,
  Inbox,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ImageCropper } from "@/components/admin/ImageCropper";
import { FACULTY_PHOTO_ASPECT } from "@/data/faculty";

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
  /** Display labels for select options (value → label) */
  optionLabels?: Record<string, string>;
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
  /** Field used for Kids / Institute list filter (e.g. brand or category) */
  brandField?: string;
}

type Row = Record<string, unknown>;
type BrandFilter = "all" | "preschool" | "institute";

const BRAND_LABELS: Record<string, string> = {
  preschool: "OP Kids",
  institute: "Institute",
};

function brandValue(row: Row, field?: string): string | null {
  if (!field) return null;
  const v = String(row[field] || "").toLowerCase();
  if (v === "preschool" || v === "institute") return v;
  return null;
}

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
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [cropFieldName, setCropFieldName] = useState("");
  const [brandFilter, setBrandFilter] = useState<BrandFilter>("all");
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (config.brandField && brandFilter !== "all") {
        if (brandValue(row, config.brandField) !== brandFilter) return false;
      }
      if (!q) return true;
      const title = String(row[config.titleField] || "").toLowerCase();
      const subtitle = config.subtitleField
        ? String(row[config.subtitleField] || "").toLowerCase()
        : "";
      return title.includes(q) || subtitle.includes(q);
    });
  }, [rows, brandFilter, search, config]);

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
        alert("Image upload failed: " + error.message);
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
        alert("Failed to save: " + error.message);
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
        alert("Failed to add: " + error.message);
        setSaving(false);
        return;
      }
      setRows((prev) => [data, ...prev]);
    }
    setSaving(false);
    close();
  };

  const remove = async (row: Row) => {
    if (!confirm(`Delete this ${config.singular}?`)) return;
    const supabase = createClient();
    const { error } = await supabase
      .from(config.table)
      .delete()
      .eq("id", row.id as string);
    if (!error) setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const formatSubtitle = (row: Row) => {
    if (!config.subtitleField) return "";
    // Brand is shown as a badge — don't duplicate as raw subtitle
    if (config.subtitleField === config.brandField) return "";
    const raw = String(row[config.subtitleField] || "");
    const field = config.fields.find((f) => f.name === config.subtitleField);
    return field?.optionLabels?.[raw] || BRAND_LABELS[raw] || raw;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${config.singular.toLowerCase()}…`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {config.brandField && (
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-white/10 shadow-sm">
            {(
              [
                { id: "all", label: "All" },
                { id: "preschool", label: "OP Kids" },
                { id: "institute", label: "Institute" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setBrandFilter(f.id)}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-xs font-semibold transition",
                  brandFilter === f.id
                    ? f.id === "preschool"
                      ? "bg-kids-500 text-white"
                      : "bg-brand-600 text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold text-sm hover:from-brand-700 hover:to-brand-800 shadow-md shadow-brand-600/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add {config.singular}
        </button>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Showing {filteredRows.length} of {rows.length}{" "}
        {config.singular.toLowerCase()}
        {rows.length === 1 ? "" : "s"}
      </p>

      {filteredRows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 p-12 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/30 text-brand-600 flex items-center justify-center mb-4">
            <Inbox className="w-7 h-7" />
          </div>
          <p className="font-semibold text-[#1d2951] dark:text-white">
            {rows.length === 0
              ? `No ${config.singular.toLowerCase()} yet`
              : "No matches"}
          </p>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            {rows.length === 0
              ? `Click “Add ${config.singular}” to create the first one.`
              : "Try another search or brand filter."}
          </p>
          {rows.length === 0 && (
            <button
              onClick={openAdd}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add {config.singular}
            </button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRows.map((row) => {
            const brand = brandValue(row, config.brandField);
            return (
              <div
                key={row.id as string}
                className="rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/10 p-4 flex flex-col hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800 transition-all"
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
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold line-clamp-1 text-[#1d2951] dark:text-white">
                    {(row[config.titleField] as string) || "—"}
                  </p>
                  {brand && (
                    <span
                      className={cn(
                        "shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-semibold",
                        brand === "preschool"
                          ? "bg-kids-100 text-kids-700 dark:bg-kids-900/40 dark:text-kids-300"
                          : "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                      )}
                    >
                      {BRAND_LABELS[brand]}
                    </span>
                  )}
                </div>
                {config.subtitleField && formatSubtitle(row) && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 flex-1">
                    {formatSubtitle(row)}
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
            );
          })}
        </div>
      )}

      {cropFile && (
        <ImageCropper
          file={cropFile}
          aspect={
            config.table === "faculty"
              ? FACULTY_PHOTO_ASPECT
              : config.table === "leadership" || config.table === "testimonials"
                ? 1
                : config.table === "gallery"
                  ? 4 / 3
                  : FACULTY_PHOTO_ASPECT
          }
          onCrop={(croppedFile) => {
            setCropFile(null);
            uploadImage(croppedFile, cropFieldName);
          }}
          onCancel={() => setCropFile(null)}
        />
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-white/10">
            <div className="sticky top-0 flex items-center justify-between bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-5 py-4 z-10">
              <h3 className="font-display font-bold text-lg text-[#1d2951] dark:text-white">
                {editing ? "Edit" : "Add"} {config.singular}
              </h3>
              <button
                onClick={close}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 grid sm:grid-cols-2 gap-4">
              {config.fields.map((f) => {
                const value = form[f.name];
                const wrapCls =
                  f.fullWidth || f.type === "textarea" || f.type === "image"
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
                        placeholder={f.placeholder || "separate with commas"}
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
                            {f.optionLabels?.[o] ?? o}
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
                          {f.placeholder || "Yes"}
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
                              if (file) {
                                setCropFile(file);
                                setCropFieldName(f.name);
                              }
                              e.target.value = "";
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
