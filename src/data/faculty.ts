export type FacultyCategory = "preschool" | "institute";

export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  qualification: string;
  experience: string;
  subject: string;
  subjects_taught: string;
  batch_handled: string;
  achievement: string;
  quote: string;
  image: string;
  /** preschool = OP Kids Pre School · institute = OP Institute of Studies */
  category: FacultyCategory;
}

/** width ÷ height — keep crop + website card in sync */
export const FACULTY_PHOTO_ASPECT = 4 / 5;

export const facultyCategories = [
  { id: "all" as const, label: "All Faculty" },
  { id: "preschool" as const, label: "OP Kids Pre School" },
  { id: "institute" as const, label: "OP Institute of Studies" },
];

export const facultyCategoryLabels: Record<FacultyCategory, string> = {
  preschool: "OP Kids Pre School",
  institute: "OP Institute of Studies",
};

/**
 * Fallback when the database has no faculty rows.
 * Leadership (Om Prakash, Meenakshi) is featured separately on the site.
 * Add other teachers from Admin → Faculty.
 */
export const faculty: FacultyMember[] = [];
