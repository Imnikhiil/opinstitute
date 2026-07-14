export interface FacultyMember {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  subject: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * Fallback when the database has no faculty rows.
 * Leadership (Om Prakash, Meenakshi) is featured separately on the site.
 * Add other teachers from Admin → Faculty.
 */
export const faculty: FacultyMember[] = [];
