import { certifications, education, experience, profile, skills } from "@/content/profile";

/**
 * The site's public address. On Vercel this picks up the production domain automatically,
 * so if you add a custom domain later, everything (canonical URLs, sitemap, share images)
 * switches over without code changes.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://neema-portfolio-pearl.vercel.app");

/** Kept within 50–60 characters so search results show it in full. */
export const SITE_TITLE = `${profile.name} | ${profile.role}, Nairobi`;

/** Kept within 120–160 characters so search results don't cut it off. */
export const SITE_DESCRIPTION =
  `${profile.name}, ${profile.role} in ${profile.location}. I build web applications with React, ` +
  `Next.js, Node.js and Python. See projects and get in touch.`;

const allSkills = skills.flatMap((g) => g.items);

export const KEYWORDS = [
  profile.name,
  profile.shortName,
  "Neema Mkenda developer",
  `${profile.role} ${profile.location}`,
  "Full Stack Developer Kenya",
  "Frontend Developer Nairobi",
  "UI/UX Designer Nairobi",
  "Next.js developer Kenya",
  "React developer Kenya",
  ...allSkills,
];

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Nairobi",
  addressRegion: "Nairobi County",
  addressCountry: "KE",
};

/**
 * schema.org structured data. This is what lets Google understand that this page
 * is about a person named Neema Rhonnah Mkenda and connect it to her GitHub,
 * LinkedIn and Behance (the `sameAs` links), which helps name searches.
 */
export function personJsonLd() {
  const current = experience.find((r) => r.period.includes("Present"));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        alternateName: profile.shortName,
        givenName: "Neema",
        familyName: "Mkenda",
        jobTitle: profile.role,
        description: profile.intro,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        telephone: profile.phone,
        address: ADDRESS,
        homeLocation: { "@type": "Place", name: profile.location },
        alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
        ...(current ? { worksFor: { "@type": "Organization", name: current.company } } : {}),
        knowsAbout: allSkills,
        hasCredential: certifications.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.name,
          recognizedBy: { "@type": "Organization", name: c.issuer },
        })),
        sameAs: Object.values(profile.links).filter((u) => u && !u.includes("YOUR_")),
      },
      {
        // Her freelance offering, so search engines can show it for local searches
        // ("web developer Nairobi"). ProfessionalService is a kind of LocalBusiness.
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: `${profile.shortName}, ${profile.role}`,
        description: "Freelance web application development, UI/UX design and website support.",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        telephone: profile.phone,
        address: ADDRESS,
        areaServed: [
          { "@type": "Country", name: "Kenya" },
          { "@type": "Country", name: "Tanzania" },
        ],
        founder: { "@id": `${SITE_URL}/#person` },
        knowsAbout: allSkills,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.name,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };
}
