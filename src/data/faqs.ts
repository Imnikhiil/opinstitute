export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "admissions" | "preschool" | "courses";
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What are the admission requirements for OP Kids Pre School?",
    answer:
      "Admissions are open for Play Group (2+ years), Nursery (3+ years), LKG (4+ years), and UKG (5+ years). Parents need to fill the enquiry form, visit the campus, and submit birth certificate, photographs, and address proof during registration.",
    category: "preschool",
  },
  {
    id: "2",
    question: "What courses do you offer at O.P. Institute of Studies?",
    answer:
      "We offer expert coaching for CMA (Cost & Management Accountancy), along with B.Com (Pass & Honours) and school tuition for Classes I–XII. Each program includes study material, regular tests, doubt sessions, and personal mentorship.",
    category: "courses",
  },
  {
    id: "3",
    question: "What is the batch size for coaching classes?",
    answer:
      "We maintain small batch sizes to ensure personal attention for every student. For OP Kids Pre School, we keep a low child–teacher ratio for optimal care and learning.",
    category: "general",
  },
  {
    id: "4",
    question: "Do you provide transport facilities?",
    answer:
      "Yes, we offer safe and reliable transport services covering major areas of the city. GPS-enabled buses with trained attendants ensure your child's safety.",
    category: "general",
  },
  {
    id: "5",
    question: "How can I enquire about admissions?",
    answer:
      "You can fill out the admission enquiry form on our website, call us at +91 92136 10182 or +91 92208 25187, WhatsApp us, or visit our campus during working hours for a personal counselling session.",
    category: "admissions",
  },
  {
    id: "6",
    question: "What safety measures are in place at OP Kids?",
    answer:
      "Our preschool has CCTV surveillance, verified staff with background checks, child-proof furniture, secure entry/exit points, and a fully fenced playground. We also maintain strict hygiene protocols.",
    category: "preschool",
  },
  {
    id: "7",
    question: "Are there scholarship programs available?",
    answer:
      "Yes, we offer merit-based scholarships for top performers in our entrance tests and need-based financial assistance. Contact our admissions office for details.",
    category: "admissions",
  },
  {
    id: "8",
    question: "What are the class timings?",
    answer:
      "Coaching classes run from 8:00 AM to 7:00 PM (Monday-Saturday) with multiple batch options. OP Kids Pre School operates from 9:00 AM to 1:00 PM, Monday through Saturday.",
    category: "general",
  },
];
