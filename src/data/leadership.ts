export interface LeaderStat {
  value: string;
  label: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  organization: string;
  credentials: string[];
  experience: string;
  education: string;
  since?: string;
  stats: LeaderStat[];
  message: string;
  image?: string;
  initials: string;
  accent: "brand" | "gold";
}

/** Always featured on the website — not managed via admin faculty CRUD. */
export const leadership: Leader[] = [
  {
    id: "om-prakash",
    name: "Om Prakash",
    title: "Founder & Director",
    organization: "O.P. Institute of Studies",
    credentials: ["Founder", "Since 2003"],
    experience: "20+ years",
    education: "M.Com, B.Ed",
    stats: [
      { value: "500+", label: "students mentored" },
      { value: "2", label: "institutes led" },
    ],
    message:
      "Education is the most powerful tool we can use to change the world. At OP Institute of Studies, we are committed to nurturing every student's unique potential — from a child's first day at OP Kids to cracking professional exams like CMA. Our dedicated team works tirelessly to create an environment where learning is joyful, meaningful, and transformative. I invite you to join our family and experience the difference.",
    initials: "OP",
    accent: "brand",
  },
  {
    id: "meenakshi",
    name: "Meenakshi",
    title: "Academic & Management Head",
    organization: "O.P. Institute · OP Kids",
    credentials: ["NPTT", "B.Ed", "CTET qualified"],
    experience: "8 years",
    education: "B.Ed",
    since: "2018",
    stats: [
      { value: "200+", label: "early learners guided" },
      { value: "3", label: "certifications" },
    ],
    message:
      "Alongside our Founder, I oversee the day-to-day management of OP Institute and OP Kids — from primary education and classroom quality to parent coordination and campus operations. With NPTT, B.Ed and CTET qualifications, my focus is strong foundations in the early years and a smoothly run institution where every student and parent feels supported.",
    initials: "M",
    accent: "gold",
  },
];
