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
 title: "Annual Day Celebration 2026",
 date: "December 15, 2026",
 description:
 "A grand celebration showcasing student talents through performances, awards, and cultural programs.",
 image:
 "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
 type: "cultural",
 },
 {
 id: "2",
 title: "OP Kids Summer Camp 2026",
 date: "May 20 – June 10, 2026",
 description:
 "Fun-filled summer camp with art, craft, storytelling, and adventure activities for kids aged 2 to 6.",
 image:
 "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
 type: "preschool",
 },
 {
 id: "3",
 title: "CMA Weekly Test Series",
 date: "Every Sunday",
 description:
 "Full-length mock tests for CMA Foundation, Inter, and Final students with detailed performance analysis.",
 image:
 "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
 type: "academic",
 },
 {
 id: "4",
 title: "Annual Sports Day 2027",
 date: "January 26, 2027",
 description:
 "Inter-house sports competitions including athletics, cricket, and fun races for all age groups.",
 image:
 "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80",
 type: "sports",
 },
 {
 id: "5",
 title: "Parent-Teacher Meeting",
 date: "First Saturday of Every Month",
 description:
 "Regular parent-teacher meetings to discuss student progress, learning outcomes, and growth strategies.",
 image:
 "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
 type: "academic",
 },
 {
 id: "6",
 title: "Festival Celebrations",
 date: "Throughout the Year",
 description:
 "Diwali, Holi, Christmas, Independence Day, and Republic Day celebrations fostering cultural values and unity.",
 image:
 "https://images.unsplash.com/photo-1605810230434-7631ac76ecb0?w=600&q=80",
 type: "cultural",
 },
 {
 id: "7",
 title: "Science Exhibition 2027",
 date: "February 28, 2027",
 description:
 "Students showcase innovative science projects and experiments in our annual inter-class science fair.",
 image:
 "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
 type: "academic",
 },
 {
 id: "8",
 title: "OP Kids Fancy Dress Competition",
 date: "November 14, 2026",
 description:
 "A colorful fancy dress competition for preschoolers celebrating Children's Day with creativity and fun.",
 image:
 "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
 type: "preschool",
 },
];
