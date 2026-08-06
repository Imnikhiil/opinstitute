/** Client-side resize + JPEG compress before Supabase upload (phone photos). */

const DEFAULT_MAX_EDGE = 1600;
const DEFAULT_QUALITY = 0.78;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

/**
 * Shrink large camera photos to ~1600px JPEG so album uploads finish faster.
 * Optional `aspectRatio` (width/height) center-crops so every album photo matches.
 */
export async function compressImageForUpload(
  file: File,
  options?: {
    maxEdge?: number;
    quality?: number;
    /** e.g. 1 = square, 4/3 = landscape. Omit to keep original aspect. */
    aspectRatio?: number;
  }
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  const maxEdge = options?.maxEdge ?? DEFAULT_MAX_EDGE;
  const quality = options?.quality ?? DEFAULT_QUALITY;
  const aspectRatio = options?.aspectRatio;

  try {
    const img = await loadImage(file);
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) return file;

    let sx = 0;
    let sy = 0;
    let sw = w;
    let sh = h;

    if (aspectRatio && aspectRatio > 0) {
      const srcAspect = w / h;
      if (srcAspect > aspectRatio) {
        // Wider than target — crop sides
        sw = Math.round(h * aspectRatio);
        sx = Math.round((w - sw) / 2);
      } else if (srcAspect < aspectRatio) {
        // Taller than target — crop top/bottom
        sh = Math.round(w / aspectRatio);
        sy = Math.round((h - sh) / 2);
      }
    }

    const cropW = sw;
    const cropH = sh;
    const longest = Math.max(cropW, cropH);
    const scale = longest > maxEdge ? maxEdge / longest : 1;
    const outW = Math.max(1, Math.round(cropW * scale));
    const outH = Math.max(1, Math.round(cropH * scale));

    // Already small + same aspect — skip re-encode when no crop needed
    if (
      !aspectRatio &&
      longest <= maxEdge &&
      file.size <= 400_000
    ) {
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", quality)
    );
    if (!blob) return file;
    // When cropping to a fixed aspect, always prefer the cropped file
    if (!aspectRatio && blob.size >= file.size) {
      return file;
    }

    const base = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${base}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}

/** Run async work over items with a max concurrency (keeps uploads fast but stable). */
export async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }

  const n = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}
