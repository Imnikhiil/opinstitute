/** Hidden field bots often auto-fill; humans never see/touch it */
export const HONEYPOT_FIELD = "website";

/** Reject submissions faster than a human can fill the form */
export const MIN_FORM_MS = 3000;

/** Max enquiries per IP inside the window */
export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") || "unknown";
}

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function isSubmittedTooFast(formStartedAt: unknown): boolean {
  const started = Number(formStartedAt);
  if (!Number.isFinite(started) || started <= 0) return true;
  return Date.now() - started < MIN_FORM_MS;
}

/** Returns true when this IP is allowed to submit */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX) return false;

  bucket.count += 1;
  return true;
}
