/**
 * PROJECT REGISTRY
 * ----------------
 * This is the only file you edit when you ship a new project.
 *
 * Each entry with `mountUrl` is served INSIDE this portfolio at
 *   https://<portfolio>.vercel.app/<slug>
 * via a Next.js rewrite (see next.config.ts). The project itself must
 * set `basePath: "/<slug>"` in its own next.config.ts. See README.md.
 *
 * Entries without `mountUrl` still show on the site and link out to
 * `liveUrl` / `repoUrl` instead.
 */

export type Project = {
  /** URL path segment, lowercase-kebab. Must match the project's basePath. */
  slug: string;
  title: string;
  /** One sentence for the card. */
  summary: string;
  /** Bullet points for the detail section. */
  highlights?: string[];
  stack: string[];
  repoUrl?: string;
  /**
   * The project's own Vercel deployment, WITHOUT a trailing slash,
   * e.g. "https://the-archive-neema.vercel.app".
   * When set, the project is mounted at /<slug> on this site.
   */
  mountUrl?: string;
  /**
   * Where the live project is. A path like "/waypoint" means it's served by this
   * deployment (fetched from its own repo at build time); a full URL means it's hosted elsewhere.
   */
  liveUrl?: string;
  year: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "waypoint",
    title: "Waypoint",
    summary:
      "A travel planner for families and friends: shared itineraries, places to stay, group budgets and who-owes-whom.",
    highlights: [
      "Plan together with edit and view links, no accounts needed",
      "Day-by-day itinerary with live weather and a route map",
      "Vote on destinations and places to stay",
      "Budgets in any currency, settled by person or by family",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Upstash Redis", "Leaflet", "Recharts"],
    repoUrl: "https://github.com/NeemaRhonnahMkenda/waypoint",
    liveUrl: "/waypoint", // served by this deployment; code pulled from the repo above at build time
    year: 2026,
    featured: true,
  },
  {
    slug: "the-archive",
    title: "The Archive",
    summary:
      "A private family library platform for cataloguing books and sharing collections between family members.",
    highlights: [
      "Supabase auth, sessions, family membership and invitation workflows",
      "Role-based access control enforced in the database with Row Level Security",
      "ISBN lookups through the Open Library API via Next.js route handlers",
      "Profile management with Supabase Storage for avatars",
    ],
    stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind"],
    // GitHub only for now. Hosting is added later via mountUrl (see README).
    repoUrl: "https://github.com/YOUR_GITHUB_USERNAME/the-archive", // TODO: real repo URL
    year: 2026,
    featured: true,
  },
];

export function mountedProjects() {
  return projects.filter((p): p is Project & { mountUrl: string } =>
    Boolean(p.mountUrl),
  );
}
