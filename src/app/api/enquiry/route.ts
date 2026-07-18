import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  checkRateLimit,
  getClientIp,
  isHoneypotTripped,
  isSubmittedTooFast,
  HONEYPOT_FIELD,
} from "@/lib/spam-guard";
import { admissionFormSchema, contactFormSchema } from "@/lib/schemas";

function fakeSuccess() {
  // Pretend OK so bots don't retry smarter — nothing saved
  return NextResponse.json({ ok: true, saved: false });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (isHoneypotTripped(body[HONEYPOT_FIELD])) {
    return fakeSuccess();
  }

  if (isSubmittedTooFast(body.formStartedAt)) {
    return NextResponse.json(
      { error: "Please take a moment to complete the form, then try again." },
      { status: 429 }
    );
  }

  const ip = getClientIp(request.headers);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many enquiries from this device. Please wait 15 minutes and try again.",
      },
      { status: 429 }
    );
  }

  const type = body.type;
  if (type !== "admission" && type !== "contact") {
    return NextResponse.json({ error: "Invalid enquiry type" }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    if (type === "admission") {
      const parsed = admissionFormSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Invalid form data" },
          { status: 400 }
        );
      }
      const data = parsed.data;
      const brand =
        body.brand === "preschool" || body.brand === "institute"
          ? body.brand
          : null;

      const { error } = await supabase.from("queries").insert({
        type: "admission",
        name: data.studentName,
        parent_name: data.parentName,
        email: data.email,
        phone: data.phone,
        program: data.program,
        age: data.age || null,
        message: data.message || null,
        brand,
      });

      if (error) {
        console.error("Admission insert failed:", error.message);
        return NextResponse.json(
          { error: "Could not save your enquiry. Please try again." },
          { status: 500 }
        );
      }
    } else {
      const parsed = contactFormSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Invalid form data" },
          { status: 400 }
        );
      }
      const data = parsed.data;
      const brand =
        body.brand === "preschool" || body.brand === "institute"
          ? body.brand
          : null;

      const { error } = await supabase.from("queries").insert({
        type: "contact",
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        brand,
      });

      if (error) {
        console.error("Contact insert failed:", error.message);
        return NextResponse.json(
          { error: "Could not save your enquiry. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true, saved: true });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
