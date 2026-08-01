import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "videos",
  singular: "Video",
  titleField: "title",
  subtitleField: "kind",
  brandField: "brand",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "Founder Om Prakash — Welcome message",
    },
    {
      name: "description",
      label: "Short description",
      type: "textarea",
      placeholder: "Optional caption under the video",
      fullWidth: true,
    },
    {
      name: "video_url",
      label: "Video (YouTube link or upload)",
      type: "video",
      required: true,
      fullWidth: true,
    },
    {
      name: "thumbnail_url",
      label: "Thumbnail (optional — for uploaded files)",
      type: "image",
    },
    {
      name: "kind",
      label: "Type",
      type: "select",
      options: [
        "founder",
        "parent_review",
        "student_experience",
        "general",
      ],
      optionLabels: {
        founder: "Founder message (About page)",
        parent_review: "Parent review — OP Kids",
        student_experience: "Student experience — Institute",
        general: "General",
      },
      required: true,
    },
    {
      name: "brand",
      label: "Brand (optional)",
      type: "select",
      options: ["preschool", "institute"],
      optionLabels: {
        preschool: "OP Kids Pre School",
        institute: "OP Institute of Studies",
      },
    },
    {
      name: "active",
      label: "Show on website",
      type: "boolean",
      placeholder: "Visible on the site",
    },
    { name: "sort_order", label: "Order (lower shows first)", type: "number" },
  ],
};

export default async function AdminVideosPage() {
  const rows = await fetchRows("videos");
  return (
    <div>
      <PageHeader
        title="Videos"
        subtitle="Founder message, OP Kids parent reviews, and Institute student experiences. Prefer YouTube links."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
