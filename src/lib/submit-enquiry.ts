import { HONEYPOT_FIELD } from "@/lib/spam-guard";

type EnquiryPayload = Record<string, unknown> & {
  type: "admission" | "contact";
  formStartedAt: number;
};

export async function submitEnquiry(
  payload: EnquiryPayload
): Promise<
  { ok: true; saved: boolean } | { ok: false; error: string }
> {
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      [HONEYPOT_FIELD]: payload[HONEYPOT_FIELD] ?? "",
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    saved?: boolean;
    error?: string;
  };

  if (!res.ok) {
    return {
      ok: false,
      error: data.error || "Could not save your enquiry. Please try again.",
    };
  }

  return { ok: true, saved: data.saved !== false };
}
