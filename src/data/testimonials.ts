export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mrs. Rekha Patel",
    role: "Parent – OP Kids Pre School",
    content:
      "OP Kids has been a blessing for our family. My daughter wakes up excited every morning to go to school. The teachers are incredibly caring, and we receive regular updates about her progress. Highly recommended!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    id: "2",
    name: "Arjun Mehta",
    role: "CA Student – OP Institute",
    content:
      "The faculty at OP Institute is exceptional. Their concept clarity in Accounts and Law and the regular test series helped me clear my CA exams. The personal attention made all the difference.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: "3",
    name: "Mr. Sanjay Gupta",
    role: "Parent – Class 12 Commerce",
    content:
      "My son improved from 72% to 94% in his board exams after joining OP Institute. The structured approach, regular tests, and doubt sessions made all the difference. Thank you, team!",
    rating: 5,
  },
  {
    id: "4",
    name: "Pooja Reddy",
    role: "B.Com Student – OP Institute",
    content:
      "The teachers explain every semester topic so clearly that B.Com became easy for me. The previous-year paper practice and doubt sessions boosted my confidence for university exams.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80",
  },
  {
    id: "5",
    name: "Rahul Sharma",
    role: "Class 10 Student – 96%",
    content:
      "The teachers here don't just teach — they inspire. The revision sessions before boards were incredibly helpful. I'm proud to be an OP Institute student.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
  {
    id: "6",
    name: "Mrs. Ananya Desai",
    role: "Parent – OP Kids Nursery",
    content:
      "The colorful classrooms, safe environment, and loving teachers make OP Kids the best preschool in the area. My son has learned so much while having the time of his life!",
    rating: 5,
  },
];
