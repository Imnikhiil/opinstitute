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
}

/**
 * Fallback when the database has no faculty rows.
 * Leadership (Om Prakash, Meenakshi) is featured separately on the site.
 * Add other teachers from Admin → Faculty.
 */
export const faculty: FacultyMember[] = [];
