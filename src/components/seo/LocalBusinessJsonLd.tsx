import { siteConfig } from "@/data/site";

/** Local business / organization JSON-LD for Google + SEO auditors */
export function LocalBusinessJsonLd() {
  const kids = {
    "@type": "Preschool",
    "@id": `${siteConfig.url}/op-kids#preschool`,
    name: siteConfig.kidsName,
    url: `${siteConfig.url}/op-kids`,
    image: `${siteConfig.url}/logos/op-kids-logo.png`,
    telephone: siteConfig.kidsPhone,
    email: siteConfig.kidsEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.kidsAddress,
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110059",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6103,
      longitude: 77.0812,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      siteConfig.kidsSocial.facebook,
      siteConfig.kidsSocial.instagram,
      siteConfig.kidsSocial.youtube,
    ].filter(Boolean),
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  };

  const institute = {
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/institute#institute`,
    name: siteConfig.name,
    url: `${siteConfig.url}/institute`,
    image: `${siteConfig.url}/logos/op-institute-logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110059",
      addressCountry: "IN",
    },
    foundingDate: siteConfig.established,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ].filter(Boolean),
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: `${siteConfig.kidsName} & ${siteConfig.name}`,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logos/op-kids-logo.png`,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.kidsAddress,
          addressLocality: "New Delhi",
          addressRegion: "Delhi",
          postalCode: "110059",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.kidsPhone,
            contactType: "admissions",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
          {
            "@type": "ContactPoint",
            telephone: siteConfig.phone,
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        ],
      },
      kids,
      institute,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.kidsName} | ${siteConfig.name}`,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
