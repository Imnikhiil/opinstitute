import { createClient } from "@/lib/supabase/server";
import { courses as staticCourses, type Course } from "@/data/courses";
import { faculty as staticFaculty, type FacultyMember } from "@/data/faculty";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { events as staticEvents, type Event } from "@/data/events";
import { galleryImages as staticGallery, type GalleryImage } from "@/data/gallery";
import { siteConfig as staticSiteConfig } from "@/data/site";

type Row = Record<string, unknown>;

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function mapCourse(row: Row): Course {
  return {
    id: str(row.id),
    name: str(row.name),
    description: str(row.description),
    duration: str(row.duration),
    eligibility: str(row.eligibility),
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    category: (row.category as Course["category"]) || "professional",
    popular: Boolean(row.popular),
  };
}

function mapFaculty(row: Row): FacultyMember {
  const linkedin = str(row.linkedin);
  return {
    id: str(row.id),
    name: str(row.name),
    qualification: str(row.qualification),
    experience: str(row.experience),
    subject: str(row.subject),
    image: str(row.image_url),
    social: linkedin ? { linkedin } : undefined,
  };
}

function mapTestimonial(row: Row): Testimonial {
  const image = str(row.image_url);
  return {
    id: str(row.id),
    name: str(row.name),
    role: str(row.role),
    content: str(row.content),
    rating: Number(row.rating) || 5,
    image: image || undefined,
    category: (row.category as Testimonial["category"]) || "institute",
  };
}

function mapEvent(row: Row): Event {
  return {
    id: str(row.id),
    title: str(row.title),
    date: str(row.event_date),
    description: str(row.description),
    image: str(row.image_url),
    type: (row.type as Event["type"]) || "academic",
  };
}

function mapGallery(row: Row): GalleryImage {
  return {
    id: str(row.id),
    src: str(row.image_url),
    alt: str(row.alt),
    category: (row.category as GalleryImage["category"]) || "campus",
  };
}

async function fetchTable(table: string): Promise<Row[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return [];
    return data as Row[];
  } catch {
    return [];
  }
}

export async function getCourses(): Promise<Course[]> {
  const rows = await fetchTable("courses");
  return rows.length ? rows.map(mapCourse) : staticCourses;
}

export async function getFaculty(): Promise<FacultyMember[]> {
  const rows = await fetchTable("faculty");
  return rows.length ? rows.map(mapFaculty) : staticFaculty;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchTable("testimonials");
  return rows.length ? rows.map(mapTestimonial) : staticTestimonials;
}

export async function getEvents(): Promise<Event[]> {
  const rows = await fetchTable("events");
  return rows.length ? rows.map(mapEvent) : staticEvents;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const rows = await fetchTable("gallery");
  return rows.length ? rows.map(mapGallery) : staticGallery;
}

export type SiteConfig = typeof staticSiteConfig;

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (!data) return staticSiteConfig;

    const row = data as Row;
    const phone = str(row.phone, staticSiteConfig.phone);

    return {
      ...staticSiteConfig,
      phone,
      phoneRaw: phone.replace(/[^0-9]/g, ""),
      phone2: str(row.phone2, staticSiteConfig.phone2),
      phone2Raw: str(row.phone2, staticSiteConfig.phone2).replace(/[^0-9]/g, ""),
      kidsPhone: str(row.kids_phone, staticSiteConfig.kidsPhone),
      email: str(row.email, staticSiteConfig.email),
      whatsapp: str(row.whatsapp, staticSiteConfig.whatsapp),
      address: str(row.address, staticSiteConfig.address),
      branchAddress: str(row.branch_address, staticSiteConfig.branchAddress),
      kidsAddress: str(row.kids_address, staticSiteConfig.kidsAddress),
      workingHours: {
        weekdays: str(row.weekday_hours, staticSiteConfig.workingHours.weekdays),
        sunday: str(row.sunday_hours, staticSiteConfig.workingHours.sunday),
        preschool: str(row.preschool_hours, staticSiteConfig.workingHours.preschool),
      },
      social: {
        facebook: str(row.facebook, staticSiteConfig.social.facebook),
        instagram: str(row.instagram, staticSiteConfig.social.instagram),
        youtube: str(row.youtube, staticSiteConfig.social.youtube),
        linkedin: str(row.linkedin, staticSiteConfig.social.linkedin),
      },
    };
  } catch {
    return staticSiteConfig;
  }
}
