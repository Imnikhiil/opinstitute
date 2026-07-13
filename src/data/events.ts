export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  type: "academic" | "cultural" | "sports" | "preschool";
}

export const events: Event[] = [
  {
    id: "1",
    title: "Annual Day Celebration 2025",
    date: "December 15, 2025",
    description:
      "A grand celebration showcasing student talents through performances, awards, and cultural programs.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    type: "cultural",
  },
  {
    id: "2",
    title: "OP Kids Summer Camp",
    date: "May 20 – June 10, 2025",
    description:
      "Fun-filled summer camp with art, craft, storytelling, swimming, and adventure activities for kids.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    type: "preschool",
  },
  {
    id: "3",
    title: "CMA Test Series",
    date: "Every Sunday",
    description:
      "Full-length mock tests for CMA students with detailed analysis and performance feedback.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    type: "academic",
  },
  {
    id: "4",
    title: "Sports Day 2025",
    date: "January 26, 2025",
    description:
      "Inter-house sports competitions including athletics, cricket, football, and fun races for all age groups.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80",
    type: "sports",
  },
  {
    id: "5",
    title: "Parent-Teacher Meet",
    date: "First Saturday Monthly",
    description:
      "Regular parent-teacher meetings to discuss student progress and collaborative learning strategies.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    type: "academic",
  },
  {
    id: "6",
    title: "Festival Celebrations",
    date: "Throughout the Year",
    description:
      "Diwali, Holi, Christmas, and Independence Day celebrations teaching cultural values and unity.",
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ecb0?w=600&q=80",
    type: "cultural",
  },
  {
    id: "7",
    title: "Science Exhibition",
    date: "February 28, 2025",
    description:
      "Students showcase innovative science projects and experiments in our annual science fair.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    type: "academic",
  },
  {
    id: "8",
    title: "OP Kids Fancy Dress",
    date: "November 14, 2025",
    description:
      "Adorable fancy dress competition for preschoolers celebrating Children's Day with creativity and fun.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    type: "preschool",
  },
];
