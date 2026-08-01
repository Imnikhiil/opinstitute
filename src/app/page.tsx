import { SplitHero } from "@/components/sections/SplitHero";
import { Marquee } from "@/components/sections/Marquee";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { AboutInstitute } from "@/components/sections/AboutInstitute";
import { AboutKids } from "@/components/sections/AboutKids";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { AdmissionProcess } from "@/components/sections/AdmissionProcess";
import { FAQs } from "@/components/sections/FAQs";
import { CTABand } from "@/components/sections/CTABand";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  getFrontDeskPhoto,
  getKidsShowcaseImages,
  getLeadership,
  getTestimonials,
} from "@/lib/supabase/public-data";

export const revalidate = 60;

export default async function HomePage() {
  const [testimonials, kidsShowcase, frontDeskPhoto, leaders] =
    await Promise.all([
      getTestimonials(),
      getKidsShowcaseImages(4),
      getFrontDeskPhoto(),
      getLeadership(),
    ]);

  return (
    <>
      <SplitHero />
      <Marquee />
      <LearningJourney />
      <AboutInstitute frontDeskPhoto={frontDeskPhoto} leaders={leaders} />
      <AboutKids showcaseImages={kidsShowcase} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <AdmissionProcess />
      <FAQs />
      <CTABand />
      <ContactSection />
    </>
  );
}
