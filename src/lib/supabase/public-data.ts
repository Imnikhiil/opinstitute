import { createPublicClient } from "@/lib/supabase/public-client";
import { courses as staticCourses, type Course } from "@/data/courses";
import { faculty as staticFaculty, type FacultyMember } from "@/data/faculty";
import { leadership as staticLeadership, type Leader } from "@/data/leadership";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { events as staticEvents, type Event } from "@/data/events";
import { galleryImages as staticGallery, type GalleryImage } from "@/data/gallery";
import type { ContentBrand } from "@/data/brands";
import { siteConfig as staticSiteConfig } from "@/data/site";
import type { SiteVideo, VideoKind, VideoBrand } from "@/data/videos";
import { sharpImageUrl } from "@/lib/utils";

type Row = Record<string, unknown>;

function str(v: unknown, fallback = ""): string {
  if (typeof v !== "string") return fallback;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed : fallback;
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

function stripWrappingQuotes(text: string): string {
  return text.replace(/^[\"'\u201C\u2018]+|[\"'\u201D\u2019]+$/g, "").trim();
}

/** Prefer explicit CMS category; only use department/subject as fallback. */
function resolveFacultyCategory(row: Row): FacultyMember["category"] {
  const raw = str(row.category).toLowerCase();
  if (raw === "preschool" || raw === "institute") return raw;

  const department = str(row.department).toLowerCase();
  const subject = str(row.subject).toLowerCase();
  const hint = `${department} ${subject}`;

  if (
    /op\s*kids|pre\s*school|preschool|pre\s*primary/.test(department)
  ) {
    return "preschool";
  }
  if (/op\s*institute|institute of studies/.test(department)) {
    return "institute";
  }
  if (
    /pre\s*primary|preschool|nursery|\blkg\b|\bukg\b|play\s*group|op\s*kids/.test(
      hint
    )
  ) {
    return "preschool";
  }
  return "institute";
}

function mapFaculty(row: Row): FacultyMember {
  const image = str(row.image_url);

  return {
    id: str(row.id),
    name: str(row.name),
    department: str(row.department),
    qualification: str(row.qualification),
    experience: str(row.experience),
    subject: str(row.subject),
    subjects_taught: str(row.subjects_taught),
    batch_handled: str(row.batch_handled),
    achievement: str(row.achievement),
    quote: stripWrappingQuotes(str(row.quote)),
    category: resolveFacultyCategory(row),
    // Empty when no upload — UI shows initials (avoid stock male placeholder)
    image: image ? sharpImageUrl(image) : "",
  };
}

function mapLeader(row: Row): Leader {
  const image = str(row.image_url);
  const credentials = row.credentials;
  const statsRaw = row.stats;
  return {
    id: str(row.id),
    name: str(row.name),
    title: str(row.title),
    organization: str(row.organization),
    credentials: Array.isArray(credentials) ? (credentials as string[]) : [],
    experience: str(row.experience),
    education: str(row.education),
    since: str(row.since_year) || undefined,
    stats: Array.isArray(statsRaw)
      ? (statsRaw as { value: string; label: string }[])
      : [],
    message: str(row.message),
    image: image ? sharpImageUrl(image, 800) : undefined,
    initials: str(row.initials),
    accent: (row.accent as Leader["accent"]) || "brand",
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

function resolveContentBrand(
  row: Row,
  legacyKidsSignal: string
): ContentBrand {
  const raw = str(row.brand).toLowerCase();
  if (raw === "preschool" || raw === "institute") return raw;
  const signal = legacyKidsSignal.toLowerCase();
  if (
    signal === "preschool" ||
    /kids|pre\s*school|pre\s*primary/.test(signal)
  ) {
    return "preschool";
  }
  return "institute";
}

function mapEvent(row: Row): Event {
  const image = str(row.image_url);
  const type = (str(row.type) as Event["type"]) || "academic";
  const cover =
    image ||
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80";

  let photos: string[] = [];
  if (Array.isArray(row.photos)) {
    photos = row.photos.map(String).filter(Boolean);
  } else if (typeof row.photos === "string" && row.photos.trim()) {
    try {
      const parsed = JSON.parse(row.photos) as unknown;
      if (Array.isArray(parsed)) {
        photos = parsed.map(String).filter(Boolean);
      }
    } catch {
      photos = [];
    }
  }
  if (photos.length === 0 && cover) photos = [cover];

  return {
    id: str(row.id),
    title: str(row.title),
    date: str(row.event_date),
    description: str(row.description),
    image: cover,
    photos,
    type,
    brand: resolveContentBrand(row, type),
  };
}

function mapGallery(row: Row): GalleryImage {
  const src = str(row.image_url);
  const category =
    (str(row.category) as GalleryImage["category"]) || "campus";
  const brand = resolveContentBrand(row, category);
  const defaultAlt =
    brand === "preschool" ? "OP Kids Pre School" : "OP Institute of Studies";
  return {
    id: str(row.id),
    src: src
      ? sharpImageUrl(src, 1200)
      : sharpImageUrl(
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=90",
          1200
        ),
    alt: str(row.alt, defaultAlt),
    category,
    brand,
  };
}

async function fetchTable(table: string): Promise<Row[]> {
  try {
    const supabase = createPublicClient();
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

function isFounderLeader(leader: Pick<Leader, "name" | "title">) {
  return /founder/i.test(leader.title) || /om\s*prakash/i.test(leader.name);
}

function isKidsManagement(leader: Pick<Leader, "title" | "organization">) {
  return (
    /academic|management/i.test(leader.title) &&
    /kids|preschool/i.test(leader.organization)
  );
}

function isInstituteManagement(leader: Pick<Leader, "title" | "organization">) {
  return (
    /academic|management/i.test(leader.title) &&
    /institute/i.test(leader.organization) &&
    !/kids|preschool/i.test(leader.organization)
  );
}

function enrichLeader(leader: Leader): Leader {
  const nameKey = leader.name.trim().toLowerCase();
  const fallback =
    staticLeadership.find((s) => s.name.trim().toLowerCase() === nameKey) ??
    (nameKey === "mona"
      ? staticLeadership.find((s) => s.id === "mona-kids")
      : isKidsManagement(leader)
        ? staticLeadership.find((s) => s.id === "mona-kids")
        : isInstituteManagement(leader)
          ? staticLeadership.find((s) => s.id === "institute-management-head")
          : undefined);

  const org = leader.organization.trim();
  const combinedOrg = /institute/i.test(org) && /kids|preschool/i.test(org);

  // Force kids-only label when this is clearly the preschool management head
  let organization = org || fallback?.organization || "";
  if (combinedOrg && isKidsManagement({ ...leader, organization: org })) {
    organization = "OP Kids Pre School";
  } else if (combinedOrg && fallback?.organization) {
    organization = fallback.organization;
  } else if (
    nameKey === "mona" &&
    (!organization || combinedOrg || /institute/i.test(organization))
  ) {
    organization = "OP Kids Pre School";
  }

  // Normalize known brand spellings
  if (/kids/i.test(organization) && /pre\s*school|preschool/i.test(organization)) {
    organization = "OP Kids Pre School";
  } else if (
    /institute/i.test(organization) &&
    !/kids/i.test(organization)
  ) {
    organization = "OP Institute of Studies";
  }

  return {
    ...leader,
    message:
      !leader.message.trim() ||
      (fallback && leader.message.trim().length + 40 < fallback.message.length)
        ? fallback?.message || leader.message
        : leader.message,
    organization,
    credentials:
      leader.credentials.length > 0
        ? leader.credentials
        : fallback?.credentials ?? [],
    stats: leader.stats.length > 0 ? leader.stats : fallback?.stats ?? [],
    initials: leader.initials || fallback?.initials || "?",
    accent:
      nameKey === "mona" || isKidsManagement({ ...leader, organization })
        ? "gold"
        : leader.accent || fallback?.accent || "brand",
  };
}

export async function getLeadership(): Promise<Leader[]> {
  const rows = await fetchTable("leadership");
  const mapped = (rows.length ? rows.map(mapLeader) : staticLeadership).map(
    enrichLeader
  );

  if (!rows.length) return mapped;

  // Ensure both management heads always appear (DB may only have one of them yet)
  const missing = staticLeadership.filter((s) => {
    if (isFounderLeader(s)) {
      return !mapped.some(isFounderLeader);
    }
    if (isKidsManagement(s)) {
      return !mapped.some(isKidsManagement);
    }
    if (isInstituteManagement(s)) {
      return !mapped.some(isInstituteManagement);
    }
    return !mapped.some(
      (m) => m.name.trim().toLowerCase() === s.name.trim().toLowerCase()
    );
  });

  return [...mapped, ...missing.map(enrichLeader)];
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

const FRONT_DESK_FALLBACK: GalleryImage = {
  id: "front-desk-fallback",
  src: "/images/campus/front-desk.jpg",
  alt: "OP Institute front desk — Founder Om Prakash",
  category: "front_desk",
  brand: "institute",
};

const RECEPTION_FALLBACK: GalleryImage = {
  id: "reception-fallback",
  src: "/images/campus/reception.jpg",
  alt: "OP Institute reception desk",
  category: "reception",
  brand: "institute",
};

/** First gallery photo with category front_desk (or reception), else local campus photo */
export async function getFrontDeskPhoto(): Promise<GalleryImage> {
  const all = await getGalleryImages();
  const front = all.find((img) => img.category === "front_desk");
  if (front) return front;
  const reception = all.find((img) => img.category === "reception");
  if (reception) return reception;
  return FRONT_DESK_FALLBACK;
}

export async function getReceptionPhoto(): Promise<GalleryImage> {
  const all = await getGalleryImages();
  const reception = all.find((img) => img.category === "reception");
  if (reception) return reception;
  const front = all.find((img) => img.category === "front_desk");
  if (front) return front;
  return RECEPTION_FALLBACK;
}

/** Default collage when fewer than N preschool gallery rows exist */
const KIDS_SHOWCASE_FALLBACKS: GalleryImage[] = [
  {
    id: "kids-fallback-1",
    src: sharpImageUrl(
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=90",
      1200
    ),
    alt: "Kids playing outdoors",
    category: "preschool",
    brand: "preschool",
  },
  {
    id: "kids-fallback-2",
    src: sharpImageUrl(
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=90",
      1200
    ),
    alt: "Learning together",
    category: "preschool",
    brand: "preschool",
  },
  {
    id: "kids-fallback-3",
    src: sharpImageUrl(
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=90",
      1200
    ),
    alt: "Happy faces",
    category: "preschool",
    brand: "preschool",
  },
  {
    id: "kids-fallback-4",
    src: sharpImageUrl(
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=90",
      1200
    ),
    alt: "Fun activities",
    category: "preschool",
    brand: "preschool",
  },
];

/**
 * First N OP Kids (preschool) gallery photos by sort_order.
 * Used on home About Kids collage + Kids world showcase.
 * Manage in Admin → Gallery (brand = OP Kids Pre School).
 *
 * Fallbacks only when there are ZERO preschool photos in CMS —
 * so partial uploads never mix with leftover stock images.
 */
export async function getKidsShowcaseImages(
  count = 4
): Promise<GalleryImage[]> {
  const all = await getGalleryImages();
  const kids = all.filter((img) => img.brand === "preschool");
  if (kids.length === 0) {
    return KIDS_SHOWCASE_FALLBACKS.slice(0, count);
  }
  return kids.slice(0, count);
}

function mapVideo(row: Row): SiteVideo {
  const kindRaw = str(row.kind, "general") as VideoKind;
  const kind: VideoKind = [
    "founder",
    "parent_review",
    "student_experience",
    "general",
  ].includes(kindRaw)
    ? kindRaw
    : "general";
  const brandRaw = str(row.brand).toLowerCase();
  const brand: VideoBrand =
    brandRaw === "preschool" || brandRaw === "institute" ? brandRaw : "";

  return {
    id: str(row.id),
    title: str(row.title),
    description: str(row.description),
    videoUrl: str(row.video_url),
    thumbnailUrl: str(row.thumbnail_url),
    brand,
    kind,
    active: row.active !== false,
    sortOrder: Number(row.sort_order) || 0,
  };
}

export async function getVideos(filter?: {
  kind?: VideoKind;
  brand?: "preschool" | "institute";
}): Promise<SiteVideo[]> {
  const rows = await fetchTable("videos");
  let list = rows.map(mapVideo).filter((v) => v.active && v.videoUrl);
  if (filter?.kind) list = list.filter((v) => v.kind === filter.kind);
  if (filter?.brand) {
    list = list.filter(
      (v) => v.brand === filter.brand || v.brand === "" || !v.brand
    );
  }
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export type Announcement = {
  id: string;
  title: string;
  message: string;
  linkUrl: string;
  linkLabel: string;
  showOnMain: boolean;
  showOnKids: boolean;
  showOnInstitute: boolean;
  active: boolean;
  sortOrder: number;
  startsOn: string;
  endsOn: string;
};

function todayISODate(): string {
  // Site audience is India — use IST so Start/End dates match what admin picks
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isAnnouncementLive(row: Announcement, today: string): boolean {
  if (!row.active) return false;
  if (row.startsOn && today < row.startsOn) return false;
  if (row.endsOn && today > row.endsOn) return false;
  return row.showOnMain || row.showOnKids || row.showOnInstitute;
}

function mapAnnouncement(row: Row): Announcement {
  return {
    id: str(row.id),
    title: str(row.title),
    message: str(row.message),
    linkUrl: str(row.link_url),
    linkLabel: str(row.link_label, "Learn more"),
    showOnMain: Boolean(row.show_on_main),
    showOnKids: Boolean(row.show_on_kids),
    showOnInstitute: Boolean(row.show_on_institute),
    active: row.active !== false,
    sortOrder: Number(row.sort_order) || 0,
    startsOn: str(row.starts_on),
    endsOn: str(row.ends_on),
  };
}

/** Active, in-date announcements for the public site banner */
export async function getAnnouncements(): Promise<Announcement[]> {
  const rows = await fetchTable("announcements");
  if (!rows.length) return [];
  const today = todayISODate();
  return rows
    .map(mapAnnouncement)
    .filter((a) => isAnnouncementLive(a, today))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Find an announcement for a deep-link slug — includes scheduled (future) notices
 * so /events/parent-orientation still shows a preview instead of 404.
 */
export async function findAnnouncementForSlug(
  slug: string
): Promise<Announcement | null> {
  const key = slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!key) return null;

  const rows = await fetchTable("announcements");
  if (!rows.length) return null;

  const list = rows
    .map(mapAnnouncement)
    .filter((a) => a.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const titleSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    list.find((a) => titleSlug(a.title) === key) ||
    list.find((a) => {
      const t = titleSlug(a.title);
      return t.startsWith(key) || key.startsWith(t);
    }) ||
    list.find((a) => {
      const url = a.linkUrl.toLowerCase();
      return url.includes(`/${key}`) || url.endsWith(key);
    }) ||
    null
  );
}

export type SiteConfig = typeof staticSiteConfig;

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const supabase = createPublicClient();
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
      kidsEmail: str(row.kids_email, staticSiteConfig.kidsEmail),
      whatsapp: str(row.whatsapp, staticSiteConfig.whatsapp),
      kidsWhatsapp: str(
        row.kids_whatsapp,
        staticSiteConfig.kidsWhatsapp
      ).replace(/[^0-9]/g, "") || staticSiteConfig.kidsWhatsapp,
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
      },
      kidsSocial: {
        facebook: str(row.kids_facebook, staticSiteConfig.kidsSocial.facebook),
        instagram: str(
          row.kids_instagram,
          staticSiteConfig.kidsSocial.instagram
        ),
        youtube: str(row.kids_youtube, staticSiteConfig.kidsSocial.youtube),
      },
      frontDesk: {
        displayName: str(
          row.front_desk_name,
          staticSiteConfig.frontDesk.displayName
        ),
        title: str(row.front_desk_title, staticSiteConfig.frontDesk.title),
        message: str(
          row.front_desk_message,
          staticSiteConfig.frontDesk.message
        ),
      },
      homeCta: {
        badge: str(row.cta_badge, staticSiteConfig.homeCta.badge),
        title: str(row.cta_title, staticSiteConfig.homeCta.title),
        body: str(row.cta_body, staticSiteConfig.homeCta.body),
      },
    };
  } catch {
    return staticSiteConfig;
  }
}
