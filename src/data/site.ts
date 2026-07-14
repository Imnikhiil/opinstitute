export const siteConfig = {
  name: "O.P. Institute of Studies",
  kidsName: "OP Kids Pre School",
  established: "2003",
  director: "Om Prakash",
  tagline:
    "Excellence in Education Since 2003 — CMA, B.Com & School Tuition",
  kidsTagline: "Where Kids Love to Learn",
  description:
    "O.P. Institute of Studies (since 2003) — expert coaching for CMA, B.Com (Pass/Hons) and school tuition for Classes I–XII, along with OP Kids Pre School for joyful, safe early childhood learning.",
  url: "https://opinstitute.vercel.app",
  phone: "+91 92136 10182",
  phoneRaw: "919213610182",
  phone2: "+91 92208 25187",
  phone2Raw: "919220825187",
  kidsPhone: "+91 92208 25187",
  email: "opinstituteofstudies@gmail.com",
  kidsEmail: "opkidspreschool@gmail.com",
  whatsapp: "919213610182",
  kidsWhatsapp: "919220825187",
  /** O.P. Institute — Google Business listing */
  address:
    "A-374, Street No. 11, Mahavir Enclave Part 2, Mahavir Enclave, New Delhi, Delhi 110059",
  /** Kept for admin settings compatibility; campus details live in `campuses` */
  branchAddress: "",
  /** OP Kids Pre School — Google Business listing */
  kidsAddress:
    "A Block, Part-2, 374, Street No. 11, Mahavir Enclave Part 2, Mahavir Enclave, New Delhi, Delhi 110059",
  mapEmbed:
    "https://www.google.com/maps?q=O.P.+Institute+of+studies+A-374+Street+No.+11+Mahavir+Enclave+Part+2+New+Delhi+110059&output=embed",
  kidsMapEmbed:
    "https://www.google.com/maps?q=OP+KIDS+PRE+SCHOOL+A-374+Street+No.+11+Mahavir+Enclave+Part+2+New+Delhi+110059&output=embed",
  workingHours: {
    weekdays: "Monday – Saturday: Open · Closes 9:00 PM",
    sunday: "Sunday: Closed",
    preschool: "OP Kids: Open · Closes 6:00 PM",
  },
  /** Institute social (legacy shape — also in brandChannels) */
  social: {
    facebook: "https://www.facebook.com/opinstitute",
    instagram: "https://www.instagram.com/op_institute",
    youtube: "https://www.youtube.com/@o.p.instituteofstudies3990",
  },
  kidsSocial: {
    facebook: "https://www.facebook.com/om.prakash.310948",
    instagram: "https://www.instagram.com/opkidspreschool",
    youtube: "https://www.youtube.com/@opkidspreschool",
  },
};

/**
 * Clean dual-brand channels — Institute vs Kids.
 * Used in Footer / Contact so each brand stays clear (no stacked messy icons).
 */
export const brandChannels = [
  {
    id: "institute" as const,
    name: "O.P. Institute of Studies",
    shortName: "OP Institute",
    accent: "brand" as const,
    phone: "+91 92136 10182",
    phoneRaw: "919213610182",
    email: "opinstituteofstudies@gmail.com",
    whatsapp: "919213610182",
    social: {
      instagram: "https://www.instagram.com/op_institute",
      facebook: "https://www.facebook.com/opinstitute",
      youtube: "https://www.youtube.com/@o.p.instituteofstudies3990",
    },
  },
  {
    id: "kids" as const,
    name: "OP Kids Pre School",
    shortName: "OP Kids",
    accent: "kids" as const,
    phone: "+91 92208 25187",
    phoneRaw: "919220825187",
    email: "opkidspreschool@gmail.com",
    whatsapp: "919220825187",
    social: {
      instagram: "https://www.instagram.com/opkidspreschool",
      facebook: "https://www.facebook.com/om.prakash.310948",
      youtube: "https://www.youtube.com/@opkidspreschool",
    },
  },
];

/** Real Google Business locations shown on Contact & campus sections */
export const campuses = [
  {
    id: "institute",
    name: "O.P. Institute of Studies",
    shortName: "OP Institute",
    category: "Coaching centre · Delhi",
    address:
      "A-374, Street No. 11, Mahavir Enclave Part 2, Mahavir Enclave, New Delhi, Delhi 110059",
    phone: "+91 92136 10182",
    phoneRaw: "919213610182",
    email: "opinstituteofstudies@gmail.com",
    hours: "Open · Closes 9:00 PM",
    ratingNote: "4.7★ on Google",
    mapEmbed:
      "https://www.google.com/maps?q=O.P.+Institute+of+studies+A-374+Street+No.+11+Mahavir+Enclave+Part+2+New+Delhi+110059&output=embed",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=O.P.+Institute+of+studies+Mahavir+Enclave+Part+2+New+Delhi",
    accent: "brand" as const,
    social: brandChannels[0].social,
  },
  {
    id: "kids",
    name: "OP Kids Pre School",
    shortName: "OP Kids",
    category: "Preschool · Delhi",
    address:
      "A Block, Part-2, 374, Street No. 11, Mahavir Enclave Part 2, Mahavir Enclave, New Delhi, Delhi 110059",
    phone: "+91 92208 25187",
    phoneRaw: "919220825187",
    email: "opkidspreschool@gmail.com",
    hours: "Open · Closes 6:00 PM",
    ratingNote: "5.0★ on Google",
    mapEmbed:
      "https://www.google.com/maps?q=OP+KIDS+PRE+SCHOOL+A-374+Street+No.+11+Mahavir+Enclave+Part+2+New+Delhi+110059&output=embed",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=OP+KIDS+PRE+SCHOOL+Mahavir+Enclave+Part+2+New+Delhi",
    accent: "kids" as const,
    social: brandChannels[1].social,
  },
];


/** Merge live Admin / siteConfig values into campus cards */
export function resolveCampuses(config: typeof siteConfig) {
  return campuses.map((campus) => {
    if (campus.id === "institute") {
      return {
        ...campus,
        address: config.address || campus.address,
        phone: config.phone || campus.phone,
        phoneRaw: config.phoneRaw || campus.phoneRaw,
        email: config.email || campus.email,
        hours: config.workingHours.weekdays || campus.hours,
        social: {
          instagram: config.social.instagram || campus.social.instagram,
          facebook: config.social.facebook || campus.social.facebook,
          youtube: config.social.youtube || campus.social.youtube,
        },
      };
    }
    return {
      ...campus,
      address: config.kidsAddress || campus.address,
      phone: config.kidsPhone || campus.phone,
      phoneRaw: config.kidsPhone?.replace(/[^0-9]/g, "") || campus.phoneRaw,
      email: config.kidsEmail || campus.email,
      hours: config.workingHours.preschool || campus.hours,
      social: {
        instagram: config.kidsSocial.instagram || campus.social.instagram,
        facebook: config.kidsSocial.facebook || campus.social.facebook,
        youtube: config.kidsSocial.youtube || campus.social.youtube,
      },
    };
  });
}

/** Merge live Admin / siteConfig into footer brand channel cards */
export function resolveBrandChannels(config: typeof siteConfig) {
  return brandChannels.map((brand) => {
    if (brand.id === "institute") {
      return {
        ...brand,
        phone: config.phone || brand.phone,
        phoneRaw: config.phoneRaw || brand.phoneRaw,
        email: config.email || brand.email,
        whatsapp: config.whatsapp || brand.whatsapp,
        social: {
          instagram: config.social.instagram || brand.social.instagram,
          facebook: config.social.facebook || brand.social.facebook,
          youtube: config.social.youtube || brand.social.youtube,
        },
      };
    }
    return {
      ...brand,
      phone: config.kidsPhone || brand.phone,
      phoneRaw: config.kidsPhone?.replace(/[^0-9]/g, "") || brand.phoneRaw,
      email: config.kidsEmail || brand.email,
      whatsapp: config.kidsWhatsapp || brand.whatsapp,
      social: {
        instagram: config.kidsSocial.instagram || brand.social.instagram,
        facebook: config.kidsSocial.facebook || brand.social.facebook,
        youtube: config.kidsSocial.youtube || brand.social.youtube,
      },
    };
  });
}

export const navLinks: { href: string; label: string; highlight?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/op-kids", label: "OP Kids", highlight: true },
  { href: "/courses", label: "Courses" },
  { href: "/faculty", label: "Faculty" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: 20, suffix: "+", label: "Years Since 2003" },
  { value: 5000, suffix: "+", label: "Students Taught" },
  { value: 7, suffix: "+", label: "Courses & Programs" },
  { value: 2, suffix: "", label: "Campuses in Delhi" },
];

export const whyChooseUs = [
  {
    icon: "Award",
    title: "Proven Track Record",
    description:
      "Consistently delivering top results in board exams and competitive tests with dedicated mentorship.",
  },
  {
    icon: "Users",
    title: "Expert Faculty",
    description:
      "Highly qualified teachers with years of experience and passion for student success.",
  },
  {
    icon: "BookOpen",
    title: "Comprehensive Curriculum",
    description:
      "Structured programs covering school academics, professional courses, and holistic development.",
  },
  {
    icon: "Monitor",
    title: "Smart Classrooms",
    description:
      "Technology-enabled learning with digital boards, online resources, and interactive sessions.",
  },
  {
    icon: "Shield",
    title: "Safe Environment",
    description:
      "CCTV surveillance, verified staff, and child-friendly spaces for complete peace of mind.",
  },
  {
    icon: "Heart",
    title: "Personal Attention",
    description:
      "Small batch sizes ensuring every student receives individual guidance and care.",
  },
];

export const facilities = [
  {
    title: "Smart Classrooms",
    description: "Interactive digital boards and modern teaching aids.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
  },
  {
    title: "Library & Study Zone",
    description: "Extensive collection of books and quiet study areas.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
  },
  {
    title: "Science Lab",
    description: "Well-equipped labs for hands-on practical learning.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
  },
  {
    title: "Playground",
    description: "Safe outdoor play area for physical development.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
  },
  {
    title: "Computer Lab",
    description: "Modern computers with high-speed internet access.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
  },
  {
    title: "Activity Rooms",
    description: "Dedicated spaces for art, music, dance, and creativity.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
];

export const admissionSteps = [
  {
    step: 1,
    title: "Enquiry",
    description: "Fill out the admission enquiry form or visit our campus.",
  },
  {
    step: 2,
    title: "Counselling",
    description: "Meet our counsellors to discuss programs and requirements.",
  },
  {
    step: 3,
    title: "Registration",
    description: "Complete registration with required documents and fees.",
  },
  {
    step: 4,
    title: "Orientation",
    description: "Attend orientation and begin your learning journey with us.",
  },
];

export const aboutContent = {
  history:
    "Founded in 2003 with a vision to transform education, O.P. Institute of Studies has been a trusted name in commerce and school education for over two decades. From professional courses like CMA and B.Com to school tuition for Classes I–XII, we help students build strong careers. With the launch of OP Kids Pre School, we now nurture learners from their earliest years right through to professional success.",
  vision:
    "To be the most trusted educational institution, empowering students of all ages to achieve their fullest potential through innovative teaching, caring mentorship, and a culture of excellence.",
  mission:
    "To provide quality education that combines academic rigor with holistic development, fostering curious minds, confident learners, and successful professionals who contribute positively to society.",
  directorMessage:
    "Education is the most powerful tool we can use to change the world. At OP Institute of Studies, we are committed to nurturing every student's unique potential — from a child's first day at OP Kids to cracking professional exams like CMA. Our dedicated team works tirelessly to create an environment where learning is joyful, meaningful, and transformative. I invite you to join our family and experience the difference.",
  directorName: "Om Prakash",
  directorTitle: "Founder & Director, O.P. Institute of Studies",
  principalMessage:
    "Alongside our Founder, I oversee the day-to-day management of OP Institute and OP Kids — from primary education and classroom quality to parent coordination and campus operations. With NPTT, B.Ed and CTET qualifications, my focus is strong foundations in the early years and a smoothly run institution where every student and parent feels supported.",
  principalName: "Meenakshi",
  principalTitle: "Academic & Management Head",
  values: [
    {
      title: "Excellence",
      description: "Striving for the highest standards in everything we do.",
    },
    {
      title: "Integrity",
      description: "Building trust through honesty, transparency, and ethics.",
    },
    {
      title: "Innovation",
      description: "Embracing modern methods and creative teaching approaches.",
    },
    {
      title: "Compassion",
      description: "Caring for every student with empathy and understanding.",
    },
    {
      title: "Collaboration",
      description: "Working together with students, parents, and community.",
    },
    {
      title: "Growth",
      description: "Fostering continuous learning and personal development.",
    },
  ],
};

export const kidsFeatures = [
  {
    icon: "Gamepad2",
    title: "Attractive Play Area",
    description:
      "Colorful, safe play zones designed to keep little ones happy and active.",
    color: "from-orange-400 to-pink-500",
  },
  {
    icon: "Sparkles",
    title: "Hygienic Maintenance",
    description:
      "Clean, sanitised classrooms and washrooms maintained to the highest standards.",
    color: "from-teal-400 to-cyan-500",
  },
  {
    icon: "HeartHandshake",
    title: "Experienced & Inspiring Staff",
    description:
      "Trained, caring teachers who inspire and nurture every child like family.",
    color: "from-rose-400 to-red-500",
  },
  {
    icon: "Footprints",
    title: "Yoga & Dance Room",
    description:
      "Dedicated space for yoga, dance, and movement to build fitness and confidence.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: "Shield",
    title: "CCTV Monitored School",
    description:
      "Complete CCTV surveillance across the campus for total safety and peace of mind.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: "Puzzle",
    title: "Montessori Based Learning",
    description:
      "Modern teaching aids and Montessori methods that make learning natural and fun.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: "Users",
    title: "Low Child–Teacher Ratio",
    description:
      "Small groups ensure individual attention and care for every single child.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "Sun",
    title: "Picnic & Field Trips",
    description:
      "Fun-filled picnics and field trips that make learning exciting beyond the classroom.",
    color: "from-amber-400 to-yellow-500",
  },
  {
    icon: "Lock",
    title: "Safe & Secure Atmosphere",
    description:
      "Secure entry, verified staff, and a fully protected environment for your child.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: "MessageCircle",
    title: "App-Based Parent Communication",
    description:
      "Stay connected with real-time updates, photos, and notices through our parent app.",
    color: "from-sky-400 to-blue-500",
  },
];

export const preschoolPrograms = [
  {
    name: "Play Group",
    age: "2 – 3 Years",
    description: "Sensory play, motor skills, and social interaction in a nurturing setting.",
    features: ["Free play", "Story time", "Music & movement", "Parent involvement"],
  },
  {
    name: "Nursery",
    age: "3 – 4 Years",
    description: "Introduction to letters, numbers, colors, and shapes through fun activities.",
    features: ["Phonics basics", "Art & craft", "Outdoor play", "Social skills"],
  },
  {
    name: "LKG",
    age: "4 – 5 Years",
    description: "Building foundational literacy and numeracy with creative learning methods.",
    features: ["Reading readiness", "Number concepts", "Science exploration", "Dance & music"],
  },
  {
    name: "UKG",
    age: "5 – 6 Years",
    description: "School readiness program preparing children for formal primary education.",
    features: ["Writing skills", "Advanced phonics", "Problem solving", "Confidence building"],
  },
];

// Quick feel-good numbers shown on the OP Kids page
export const kidsStats = [
  { value: 500, suffix: "+", label: "Happy Little Learners", emoji: "😊" },
  { value: 20, suffix: "+", label: "Years of Loving Care", emoji: "💛" },
  { value: 4, suffix: "", label: "Age-wise Programs", emoji: "🎒" },
  { value: 100, suffix: "%", label: "Safe & CCTV Secured", emoji: "🛡️" },
];

// What children explore & develop every day at OP Kids
export const kidsCurriculum = [
  {
    emoji: "🔤",
    title: "Language & Literacy",
    description: "Phonics, storytelling, rhymes and joyful early reading & writing.",
    color: "from-rose-400 to-pink-500",
  },
  {
    emoji: "🔢",
    title: "Numeracy & Logic",
    description: "Numbers, shapes, patterns and playful hands-on problem solving.",
    color: "from-sky-400 to-blue-500",
  },
  {
    emoji: "🎨",
    title: "Art & Creativity",
    description: "Drawing, craft, colours and free imaginative self-expression.",
    color: "from-amber-400 to-orange-500",
  },
  {
    emoji: "🤸",
    title: "Physical Development",
    description: "Motor skills, yoga, dance and active, safe outdoor play.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    emoji: "🧠",
    title: "Cognitive Skills",
    description: "Puzzles, memory games and Montessori-based discovery.",
    color: "from-violet-400 to-purple-500",
  },
  {
    emoji: "🤝",
    title: "Social & Emotional",
    description: "Sharing, empathy, confidence and making new little friends.",
    color: "from-fuchsia-400 to-pink-500",
  },
];

// A typical joyful day at OP Kids Pre School
export const kidsDayRoutine = [
  { time: "9:00 AM", title: "Warm Welcome", detail: "Cheerful greetings, free play and settling in.", emoji: "👋" },
  { time: "9:30 AM", title: "Circle Time", detail: "Prayer, rhymes, calendar and the day's fun theme.", emoji: "⭕" },
  { time: "10:00 AM", title: "Learning Activity", detail: "Montessori-based, hands-on concept learning.", emoji: "📚" },
  { time: "10:45 AM", title: "Snack & Hygiene", detail: "Healthy snack break and good-habit routines.", emoji: "🍎" },
  { time: "11:15 AM", title: "Creative Play", detail: "Art, craft, music, dance and story time.", emoji: "🎨" },
  { time: "12:00 PM", title: "Outdoor Fun", detail: "Safe playground games and physical activity.", emoji: "⚽" },
  { time: "12:45 PM", title: "Happy Goodbye", detail: "Recap, goodbye song and joyful home time.", emoji: "🎈" },
];

// Common questions from parents about OP Kids
export const kidsFaqs = [
  { q: "What age groups do you accept?", a: "We welcome children aged 2 to 6 years across Play Group, Nursery, LKG and UKG." },
  { q: "What are the school timings?", a: "OP Kids Pre School is open Monday to Saturday and closes at 6:00 PM (as listed on Google). Class activities typically run in the morning; please confirm the exact session time during admission." },
  { q: "How safe is the campus?", a: "Full CCTV surveillance, verified staff, secure entry/exit points and a fenced play area keep every child safe." },
  { q: "What is the child–teacher ratio?", a: "We keep small groups with a low child–teacher ratio so every child gets individual attention and care." },
  { q: "Do you follow Montessori methods?", a: "Yes — our curriculum blends Montessori-based, play-way and activity learning for joyful, natural growth." },
  { q: "How do I enrol my child?", a: "Fill the enquiry form or visit our campus. Carry the birth certificate, photographs and address proof at registration." },
];

// The complete learning journey — our unique dual-brand advantage (age 2 to professional)
export const learningJourney = [
  {
    stage: "Early Years",
    age: "Age 2 – 6",
    title: "OP Kids Pre School",
    detail: "Play Group, Nursery, LKG & UKG — a joyful, Montessori-based start.",
    brand: "kids" as const,
  },
  {
    stage: "Foundation",
    age: "Class I – VIII",
    title: "School Tuition",
    detail: "Strong all-subject foundation with concept-based learning.",
    brand: "institute" as const,
  },
  {
    stage: "Board Years",
    age: "Class IX – XII",
    title: "Board & Commerce",
    detail: "Focused coaching for boards, Accountancy, Economics & Business Studies.",
    brand: "institute" as const,
  },
  {
    stage: "Graduation",
    age: "Degree",
    title: "B.Com (Pass / Hons)",
    detail: "Complete university tuition that builds a career-ready base.",
    brand: "institute" as const,
  },
  {
    stage: "Professional",
    age: "Career",
    title: "CMA",
    detail: "Expert coaching to crack the CMA professional exams.",
    brand: "institute" as const,
  },
];
