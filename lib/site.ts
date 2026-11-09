import { certifications, education, experience, profile, skills } from "@/content/profile";

/**
 * The site's public address. On Vercel this picks up the production domain automatically,
 * so if you add a custom domain later, everything (canonical URLs, sitemap, share images)
 * switches over without code changes.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://neema-portfolio-pearl.vercel.app");

export const SITE_TITLE = `${profile.name} | ${profile.role} in ${profile.location}`;

export const SITE_DESCRIPTION =
  `${profile.name} is a ${profile.role} based in ${profile.location} with 3+ years building responsive ` +
  `web applications with React, Next.js, Vue, Node.js, Python and Supabase. Portfolio, projects and contact details.`;

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
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
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
