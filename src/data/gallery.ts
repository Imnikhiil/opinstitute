import type { ContentBrand } from "@/data/brands";

export type GalleryTopic =
  | "campus"
  | "events"
  | "classroom"
  | "preschool"
  | "achievements";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  /** Topic / moment type */
  category: GalleryTopic;
  /** Which brand this photo belongs to */
  brand: ContentBrand;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    alt: "Modern classroom with students",
    category: "classroom",
    brand: "institute",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    alt: "Preschool children learning",
    category: "preschool",
    brand: "preschool",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    alt: "Campus building exterior",
    category: "campus",
    brand: "institute",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    alt: "Children playing outdoors",
    category: "preschool",
    brand: "preschool",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    alt: "Annual day celebration",
    category: "events",
    brand: "institute",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    alt: "Students in science lab",
    category: "classroom",
    brand: "institute",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    alt: "Award ceremony",
    category: "achievements",
    brand: "institute",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1497633769973-ee10a0550158?w=800&q=80",
    alt: "Library and study area",
    category: "campus",
    brand: "institute",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    alt: "Art and craft activity",
    category: "preschool",
    brand: "preschool",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    alt: "Sports day event",
    category: "events",
    brand: "institute",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1607013407627-5ee817b2eb44?w=800&q=80",
    alt: "Trophy and achievements display",
    category: "achievements",
    brand: "institute",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c276e?w=800&q=80",
    alt: "Group study session",
    category: "classroom",
    brand: "institute",
  },
];

/** Brand tabs on Gallery / Events */
export { contentBrandFilters as galleryBrandFilters } from "@/data/brands";

/** Topic chips (shown after brand is chosen / for All) */
export const galleryTopics = [
  { id: "all" as const, label: "All Photos" },
  { id: "campus" as const, label: "Campus" },
  { id: "classroom" as const, label: "Classroom" },
  { id: "preschool" as const, label: "Kids Moments" },
  { id: "events" as const, label: "Events" },
  { id: "achievements" as const, label: "Achievements" },
];
