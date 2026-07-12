import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OP Kids Pre School",
  description:
    "OP Kids Pre School — colorful, parent-friendly early learning with play-based curriculum, caring teachers, and safe environment for ages 2-6.",
};

export default function OpKidsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
