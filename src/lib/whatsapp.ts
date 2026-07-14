/** Build a wa.me URL with a prefilled message. */
export function buildWhatsAppUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Open WhatsApp chat; falls back to same-tab if popup is blocked. */
export function openWhatsApp(phone: string, text: string): void {
  if (typeof window === "undefined") return;
  const url = buildWhatsAppUrl(phone, text);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    window.location.href = url;
  }
}

export function formatContactWhatsAppMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return [
    "*New Contact Enquiry — OP Institute*",
    "",
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    `*Email:* ${data.email}`,
    `*Subject:* ${data.subject}`,
    "",
    `*Message:*`,
    data.message,
  ].join("\n");
}

export function formatAdmissionWhatsAppMessage(data: {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  program: string;
  age?: string;
  message?: string;
}): string {
  const lines = [
    "*New Admission Enquiry — OP Institute*",
    "",
    `*Student:* ${data.studentName}`,
    `*Parent:* ${data.parentName}`,
    `*Phone:* ${data.phone}`,
    `*Email:* ${data.email}`,
    `*Program:* ${data.program}`,
  ];
  if (data.age?.trim()) lines.push(`*Age / Class:* ${data.age.trim()}`);
  if (data.message?.trim()) {
    lines.push("", `*Message:*`, data.message.trim());
  }
  return lines.join("\n");
}
