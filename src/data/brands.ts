export type ContentBrand = "preschool" | "institute";
export type BrandFilter = "all" | ContentBrand;

export const contentBrandFilters = [
  { id: "all" as const, label: "All" },
  { id: "preschool" as const, label: "OP Kids Pre School" },
  { id: "institute" as const, label: "OP Institute of Studies" },
];

export const contentBrandLabels: Record<ContentBrand, string> = {
  preschool: "OP Kids Pre School",
  institute: "OP Institute of Studies",
};

export function parseBrandFilter(
  value: string | null | undefined
): BrandFilter {
  if (value === "preschool" || value === "institute") return value;
  return "all";
}
