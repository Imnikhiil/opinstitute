import { SplitHero } from "@/components/sections/SplitHero";
import { Marquee } from "@/components/sections/Marquee";
import { TrustBar } from "@/components/sections/TrustBar";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { AboutInstitute } from "@/components/sections/AboutInstitute";
import { AboutKids } from "@/components/sections/AboutKids";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { PreschoolPrograms } from "@/components/sections/PreschoolPrograms";
import { Facilities } from "@/components/sections/Facilities";
import { Achievements } from "@/components/sections/Achievements";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { AdmissionProcess } from "@/components/sections/AdmissionProcess";
import { FAQs } from "@/components/sections/FAQs";
import { CTABand } from "@/components/sections/CTABand";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <SplitHero />
      <TrustBar />
      <Marquee />
      <LearningJourney />
      <AboutInstitute />
      <AboutKids />
      <WhyChooseUs />
      <CoursesSection />
      <PreschoolPrograms />
      <Facilities />
      <Achievements />
      <GalleryPreview />
      <Testimonials />
      <AdmissionProcess />
      <FAQs />
      <CTABand />
      <ContactSection />
    </>
  );
}
