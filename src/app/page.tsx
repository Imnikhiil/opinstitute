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
import { FrontDeskHighlight } from "@/components/sections/FrontDeskHighlight";
import { EventsCarousel } from "@/components/sections/EventsCarousel";
import {
  getEvents,
  getFrontDeskPhoto,
  getKidsShowcaseImages,
  getLeadership,
  getReceptionPhoto,
  getTestimonials,
} from "@/lib/supabase/public-data";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.kidsName} & ${siteConfig.name} | Mahavir Enclave, Delhi`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.kidsName} & ${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const [
    testimonials,
    kidsShowcase,
    frontDeskPhoto,
    receptionPhoto,
    leaders,
    events,
  ] = await Promise.all([
    getTestimonials(),
    getKidsShowcaseImages(4),
    getFrontDeskPhoto(),
    getReceptionPhoto(),
    getLeadership(),
    getEvents(),
  ]);

  return (
    <>
      <SplitHero />
      <Marquee />
      <LearningJourney />
      <AboutInstitute frontDeskPhoto={frontDeskPhoto} leaders={leaders} />
      <AboutKids showcaseImages={kidsShowcase} />
      <WhyChooseUs />
      <EventsCarousel events={events} />
      <Testimonials testimonials={testimonials} />
      <AdmissionProcess />
      <FrontDeskHighlight photo={receptionPhoto} />
      <FAQs />
      <CTABand />
      <ContactSection />
    </>
  );
}
