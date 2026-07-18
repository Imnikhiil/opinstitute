export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  category: "preschool" | "institute";
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mrs. Rekha Patel",
    role: "Parent – OP Kids Pre School",
    content:
      "OP Kids Pre School has been a blessing for our family. My daughter wakes up excited every morning to go to school. The teachers are incredibly caring, and we receive regular updates about her progress. Highly recommended!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    category: "preschool",
  },
  {
    id: "2",
    name: "Arjun Mehta",
    role: "CMA Student – OP Institute of Studies",
    content:
      "The faculty at OP Institute of Studies is exceptional. Their concept clarity in Costing and Financial Management and the regular test series helped me clear my CMA exams. The personal attention made all the difference.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    category: "institute",
  },
  {
    id: "3",
    name: "Mr. Sanjay Gupta",
    role: "Parent – Class 12 Commerce",
    content:
      "My son improved from 72% to 94% in his board exams after joining OP Institute of Studies. The structured approach, regular tests, and doubt sessions made all the difference. Thank you, team!",
    rating: 5,
    category: "institute",
  },
  {
    id: "4",
    name: "Pooja Reddy",
    role: "B.Com Student – OP Institute of Studies",
    content:
      "The teachers explain every semester topic so clearly that B.Com became easy for me. The previous-year paper practice and doubt sessions boosted my confidence for university exams.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80",
    category: "institute",
  },
  {
    id: "5",
    name: "Rahul Sharma",
    role: "Class 10 Student – 96%",
    content:
      "The teachers here don't just teach — they inspire. The revision sessions before boards were incredibly helpful. I'm proud to be an OP Institute of Studies student.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    category: "institute",
  },
  {
    id: "6",
    name: "Mrs. Ananya Desai",
    role: "Parent – OP Kids Nursery",
    content:
      "The colorful classrooms, safe environment, and loving teachers make OP Kids Pre School the best preschool in the area. My son has learned so much while having the time of his life!",
    rating: 5,
    category: "preschool",
  },
  {
    id: "7",
    name: "Mr. Imran Khan",
    role: "Parent – OP Kids Play Group",
    content:
      "As working parents, the app-based updates give us complete peace of mind. We can see photos and daily activities. My daughter has become so confident and social since joining OP Kids Pre School.",
    rating: 5,
    category: "preschool",
  },
  {
    id: "8",
    name: "Mrs. Sunita Verma",
    role: "Parent – OP Kids LKG",
    content:
      "The Montessori-based learning and the yoga & dance room are wonderful. The low child–teacher ratio means my son gets real attention. Best decision we made for his early years.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    category: "preschool",
  },
  {
    id: "9",
    name: "Neha Agarwal",
    role: "CMA Student – OP Institute of Studies",
    content:
      "Clearing CMA felt achievable because of the structured guidance here. The cost accounting and management classes were detailed and the mentors were always available for doubts. Truly grateful.",
    rating: 5,
    category: "institute",
  },
];
