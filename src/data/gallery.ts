export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "campus" | "events" | "classroom" | "preschool" | "achievements";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    alt: "Modern classroom with students",
    category: "classroom",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    alt: "Preschool children learning",
    category: "preschool",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    alt: "Campus building exterior",
    category: "campus",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    alt: "Children playing outdoors",
    category: "preschool",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Annual day celebration",
    category: "events",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    alt: "Students in science lab",
    category: "classroom",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    alt: "Award ceremony",
    category: "achievements",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1497633769973-ee10a0550158?w=800&q=80",
    alt: "Library and study area",
    category: "campus",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    alt: "Art and craft activity",
    category: "preschool",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    alt: "Sports day event",
    category: "events",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1607013407627-5ee817b2eb44?w=800&q=80",
    alt: "Trophy and achievements display",
    category: "achievements",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1571260899304-425eee4c276e?w=800&q=80",
    alt: "Group study session",
    category: "classroom",
  },
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "campus", label: "Campus" },
  { id: "classroom", label: "Classroom" },
  { id: "preschool", label: "OP Kids Pre School" },
  { id: "events", label: "Events" },
  { id: "achievements", label: "Achievements" },
];
