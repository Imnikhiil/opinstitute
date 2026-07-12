import { SplitHero } from "@/components/home/SplitHero";
import { Marquee } from "@/components/home/Marquee";
import { TrustBar } from "@/components/home/TrustBar";
import { AboutInstitute } from "@/components/home/AboutInstitute";
import { AboutKids } from "@/components/home/AboutKids";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CoursesSection } from "@/components/home/CoursesSection";
import { PreschoolPrograms } from "@/components/home/PreschoolPrograms";
import { Facilities } from "@/components/home/Facilities";
import { Achievements } from "@/components/home/Achievements";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { AdmissionProcess } from "@/components/home/AdmissionProcess";
import { FAQs } from "@/components/home/FAQs";
import { CTABand } from "@/components/home/CTABand";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <SplitHero />
      <Marquee />
      <TrustBar />
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
