/** Site video entries — founder intro, Kids parent reviews, Institute student stories */

export type VideoKind =
  | "founder"
  | "parent_review"
  | "student_experience"
  | "general";

export type VideoBrand = "preschool" | "institute" | "";

export interface SiteVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  brand: VideoBrand;
  kind: VideoKind;
  active: boolean;
  sortOrder: number;
}

export const videoKindLabels: Record<VideoKind, string> = {
  founder: "Founder message",
  parent_review: "Parent review (OP Kids)",
  student_experience: "Student experience (Institute)",
  general: "General",
};

/** Turn YouTube / Vimeo / direct URL into an embeddable form when possible */
export function getVideoEmbed(url: string): {
  type: "youtube" | "vimeo" | "file";
  src: string;
} | null {
  const raw = url.trim();
  if (!raw) return null;

  try {
    const u = new URL(raw);

    if (
      u.hostname.includes("youtube.com") ||
      u.hostname.includes("youtube-nocookie.com")
    ) {
      const id =
        u.searchParams.get("v") ||
        (u.pathname.startsWith("/embed/")
          ? u.pathname.split("/")[2]
          : u.pathname.startsWith("/shorts/")
            ? u.pathname.split("/")[2]
            : "");
      if (id) {
        return {
          type: "youtube",
          src: `https://www.youtube-nocookie.com/embed/${id}`,
        };
      }
    }

    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (id) {
        return {
          type: "youtube",
          src: `https://www.youtube-nocookie.com/embed/${id}`,
        };
      }
    }

    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id)) {
        return { type: "vimeo", src: `https://player.vimeo.com/video/${id}` };
      }
    }
  } catch {
    /* fall through */
  }

  return { type: "file", src: raw };
}
