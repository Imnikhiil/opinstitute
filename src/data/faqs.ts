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
    question: "Where is the institute located?",
    answer:
      "Both O.P. Institute of Studies and OP Kids Pre School are located at A-374, Street No. 11, Mahavir Enclave Part 2, New Delhi 110059. We are easily accessible from all surrounding areas.",
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
      "O.P. Institute of Studies is open Monday to Saturday and closes at 9:00 PM, with multiple batch options available. OP Kids Pre School is open Monday to Saturday and closes at 6:00 PM. Sunday is a holiday for both.",
    category: "general",
  },
];
