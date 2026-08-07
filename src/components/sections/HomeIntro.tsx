import { ScrollReveal } from "@/components/ui/ScrollReveal";

/** Readable intro copy for SEO + parents — keeps one clear job: explain who we are. */
export function HomeIntro() {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center text-balance">
            A trusted education family in Mahavir Enclave, New Delhi
          </h2>
          <div className="mt-5 sm:mt-6 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              Welcome to OP Kids Pre School and OP Institute of Studies — two
              connected learning worlds under one roof at Mahavir Enclave Part 2,
              New Delhi. Families visit us for joyful early childhood education
              and for structured coaching that supports school and college goals.
              Whether you are looking for Playgroup, Nursery, LKG and UKG, or
              for CMA, B.Com and Class I–XII tuition, our team focuses on clear
              teaching, caring guidance, and steady progress.
            </p>
            <p>
              OP Kids Pre School is designed so young children feel safe,
              curious, and excited to learn. Classrooms, daily routines, and
              parent communication are built around strong foundations in the
              early years. At OP Institute of Studies, students receive focused
              support for commerce and school subjects, with an emphasis on
              concept clarity, regular practice, and confidence for exams and
              careers. Together, we help learners grow from their first school
              days through higher studies.
            </p>
            <p>
              Parents often choose us because the campus is easy to reach, the
              staff stays approachable, and admissions guidance is simple. You
              can explore our events and gallery, meet faculty on the Faculty
              page, or start an enquiry for the new session. If you want a
              preschool seat or coaching for CMA, B.Com, or school tuition in
              Mahavir Enclave, we are ready to welcome you and answer your
              questions with honesty and care.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
