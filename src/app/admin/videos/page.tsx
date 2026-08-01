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
  emptyHint:
    "Add a YouTube link and pick the type: Founder (About), Parent review (OP Kids), or Student experience (Institute).",
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
      label: "Video",
      type: "video",
      required: true,
      fullWidth: true,
      helpText: "Best option: paste a YouTube link. File upload is optional.",
    },
    {
      name: "thumbnail_url",
      label: "Thumbnail (optional)",
      type: "image",
      helpText: "Only needed for uploaded video files (not YouTube).",
    },
    {
      name: "kind",
      label: "Where it shows",
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
      helpText: "Usually match the type above (Kids vs Institute).",
    },
    {
      name: "active",
      label: "Show on website",
      type: "boolean",
      placeholder: "Visible on the site",
    },
    {
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first.",
    },
  ],
};

export default async function AdminVideosPage() {
  const rows = await fetchRows("videos");
  return (
    <div>
      <PageHeader
        title="Videos"
        subtitle="Founder message (About), OP Kids parent reviews, and Institute student experiences. Prefer YouTube links."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
