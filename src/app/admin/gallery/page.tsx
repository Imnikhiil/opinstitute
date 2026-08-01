import { fetchRows } from "@/lib/supabase/admin-data";
import { PageHeader } from "@/components/admin/PageHeader";
import { CrudManager, type CrudConfig } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const config: CrudConfig = {
  table: "gallery",
  singular: "Photo",
  titleField: "alt",
  subtitleField: "category",
  imageField: "image_url",
  brandField: "brand",
  emptyHint:
    "Upload a photo and set Show as. Tip: Front desk / office updates the home About image. OP Kids brand photos with a low order fill the Kids collage.",
  fields: [
    {
      name: "image_url",
      label: "Photo",
      type: "image",
      required: true,
    },
    {
      name: "alt",
      label: "Caption",
      type: "text",
      placeholder: "Front desk — campus welcome",
      helpText: "Short description for accessibility and admin list.",
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      options: ["preschool", "institute"],
      optionLabels: {
        preschool: "OP Kids Pre School",
        institute: "OP Institute of Studies",
      },
      required: true,
    },
    {
      name: "category",
      label: "Show as",
      type: "select",
      options: [
        "front_desk",
        "reception",
        "campus",
        "classroom",
        "preschool",
        "events",
        "achievements",
      ],
      optionLabels: {
        front_desk: "Front desk / office (home About photo)",
        reception: "Reception desk",
        campus: "Campus / general gallery",
        classroom: "Classroom",
        preschool: "Kids moments",
        events: "Events",
        achievements: "Achievements",
      },
      helpText:
        "Front desk = special home/About photo. Campus = general Gallery page.",
    },
    {
      name: "sort_order",
      label: "Display order",
      type: "number",
      helpText: "Lower numbers appear first (important for Kids collage).",
    },
  ],
};

export default async function AdminGalleryPage() {
  const rows = await fetchRows("gallery");
  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Campus photos for the Gallery page. Use Show as = Front desk for the home About image. OP Kids photos with a low order appear in the Kids collage."
      />
      <CrudManager config={config} initialRows={rows} />
    </div>
  );
}
