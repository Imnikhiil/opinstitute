export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  eligibility: string;
  features: string[];
  category: "professional" | "degree" | "school";
  popular?: boolean;
}

export const courses: Course[] = [
  {
    id: "cma",
    name: "CMA – Cost & Management Accountancy",
    description:
      "Expert guidance for the Cost & Management Accountancy course with emphasis on costing, financial management, and practical problem solving.",
    duration: "Foundation / Inter / Final",
    eligibility: "Class 12 pass & graduates",
    features: [
      "Cost & management accounting",
      "Financial management",
      "Practical numerical practice",
      "Regular assessments",
      "One-on-one guidance",
    ],
    category: "professional",
    popular: true,
  },
  {
    id: "bcom",
    name: "B.Com (Pass & Honours)",
    description:
      "Comprehensive tuition for B.Com Pass and Honours students covering the complete university syllabus with exam-focused preparation.",
    duration: "3 Years (Semester-wise)",
    eligibility: "Class 12 pass (Commerce preferred)",
    features: [
      "Complete semester syllabus",
      "Accountancy & economics",
      "Business studies & finance",
      "Previous year papers",
      "Result-oriented teaching",
    ],
    category: "degree",
    popular: true,
  },
  {
    id: "school-1-8",
    name: "School Tuition (Class I – VIII)",
    description:
      "Strong foundation tuition for primary and middle school students across all subjects with personal attention and concept-based learning.",
    duration: "Yearly (All Subjects)",
    eligibility: "Class I to VIII students",
    features: [
      "All subjects covered",
      "Homework & concept help",
      "Regular practice tests",
      "Small batches",
      "Individual attention",
    ],
    category: "school",
  },
  {
    id: "school-9-10",
    name: "Class IX & X (CBSE)",
    description:
      "Board-focused coaching for Class 9 and 10 students with subject expertise, sample paper practice, and regular assessments.",
    duration: "1 – 2 Years",
    eligibility: "Class 9 & 10 students",
    features: [
      "Subject-wise expert teachers",
      "Sample paper practice",
      "Revision before exams",
      "Parent-teacher meetings",
      "Board exam strategies",
    ],
    category: "school",
    popular: true,
  },
  {
    id: "school-11-12",
    name: "Class XI & XII (Commerce)",
    description:
      "Specialized coaching for Class 11 & 12 Commerce students — Accountancy, Business Studies, Economics — building the base for CMA & B.Com.",
    duration: "1 – 2 Years",
    eligibility: "Class 11 & 12 Commerce students",
    features: [
      "Accountancy & Economics",
      "Business Studies",
      "Board pattern papers",
      "Career counselling",
      "Doubt sessions",
    ],
    category: "school",
  },
];

export const courseCategories = [
  { id: "all", label: "All Courses" },
  { id: "professional", label: "Professional (CMA)" },
  { id: "degree", label: "B.Com Degree" },
  { id: "school", label: "School Tuition" },
];
