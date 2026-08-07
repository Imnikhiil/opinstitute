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
import { HomeIntro } from "@/components/sections/HomeIntro";
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
    absolute: "OP Kids Pre School | Mahavir Enclave, Delhi",
  },
  description: siteConfig.description,
  openGraph: {
    title: "OP Kids Pre School | Mahavir Enclave, Delhi",
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
      {/*
        DOM order for SEO tools: H1 + paragraphs first, then hero H2s.
        Visual order stays Hero → Marquee → Intro via CSS order.
      */}
      <div className="flex flex-col">
        <div className="order-3">
          <HomeIntro />
        </div>
        <div className="order-1">
          <SplitHero />
        </div>
        <div className="order-2">
          <Marquee />
        </div>
      </div>

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
