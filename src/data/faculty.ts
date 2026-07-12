export interface FacultyMember {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  subject: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export const faculty: FacultyMember[] = [
  {
    id: "1",
    name: "CA Amit Verma",
    qualification: "Chartered Accountant (FCA)",
    experience: "18 Years",
    subject: "Accountancy & CA",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "2",
    name: "CS Sunita Rao",
    qualification: "Company Secretary (ACS)",
    experience: "15 Years",
    subject: "Company Law & CS",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "3",
    name: "Mr. Vikram Singh",
    qualification: "M.Com, CMA",
    experience: "12 Years",
    subject: "Cost Accounting & CMA",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "4",
    name: "Dr. Neha Gupta",
    qualification: "M.A. Economics, Ph.D.",
    experience: "10 Years",
    subject: "Economics",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "5",
    name: "Mrs. Anjali Mehta",
    qualification: "M.A. English, B.Ed.",
    experience: "14 Years",
    subject: "English",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    id: "6",
    name: "Mr. Ravi Shankar",
    qualification: "M.Com, MBA (Finance)",
    experience: "11 Years",
    subject: "Business Studies & B.Com",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "7",
    name: "Mrs. Kavita Joshi",
    qualification: "M.Ed., Early Childhood Education",
    experience: "8 Years",
    subject: "OP Kids – Preschool",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    id: "8",
    name: "Mr. Deepak Malhotra",
    qualification: "M.Sc. Mathematics, B.Ed.",
    experience: "9 Years",
    subject: "Mathematics (School)",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    social: { linkedin: "#" },
  },
];
