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
  /**
   * The same project built more than once (e.g. a Next.js rebuild and the Django original).
   * Each version gets its own "Live" and "Code" buttons on the card.
   * A version with `mountUrl` is proxied at /<slug> on this site, like a top-level mountUrl.
   */
  versions?: ProjectVersion[];
};

export type ProjectVersion = {
  label: string;
  stack: string;
  repoUrl: string;
  /** Path on this site, e.g. "/culinary-canvas" (served by this deployment). */
  liveUrl?: string;
  /** For proxied versions: path segment on this site and the server it lives on. */
  slug?: string;
  mountUrl?: string;
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
    slug: "culinary-canvas",
    title: "Culinary Canvas",
    summary:
      "A recipe-sharing blog where people sign up, post recipes with photos, and browse by cooking method or search. Built twice: the original in Django, and a rebuild in Next.js.",
    highlights: [
      "Accounts with hashed passwords and httpOnly sessions; only authors can edit or delete",
      "Photo uploads resized in the browser before upload",
      "Search across titles, recipes and cooks; filter by baked, boiled or fried",
      "Same features in two stacks, so you can compare the approaches",
    ],
    stack: ["Next.js", "TypeScript", "Upstash Redis", "Django", "Python", "SQLite"],
    year: 2026,
    versions: [
      {
        label: "Next.js rebuild",
        stack: "Next.js · TypeScript · Redis",
        liveUrl: "/culinary-canvas", // served by this deployment; code pulled from its repo at build time
        repoUrl: "https://github.com/NeemaRhonnahMkenda/culinary-canvas",
      },
      {
        label: "Original in Django",
        stack: "Django · Python · SQLite",
        slug: "culinary-canvas-django",
        // Set CULINARY_DJANGO_URL in Vercel (e.g. https://neemamkenda.pythonanywhere.com) to switch the live demo on.
        mountUrl: process.env.CULINARY_DJANGO_URL || undefined,
        repoUrl: "https://github.com/NeemaRhonnahMkenda/CulinaryCanvasProject",
      },
    ],
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

/** Everything proxied from another server: top-level projects and individual versions. */
export function mountedProjects(): { slug: string; mountUrl: string }[] {
  const top = projects.filter((p) => p.mountUrl).map((p) => ({ slug: p.slug, mountUrl: p.mountUrl! }));
  const versions = projects
    .flatMap((p) => p.versions ?? [])
    .filter((v) => v.slug && v.mountUrl)
    .map((v) => ({ slug: v.slug!, mountUrl: v.mountUrl! }));
  return [...top, ...versions];
}

/** Paths on this site where a live project can be visited (for the sitemap). */
export function livePaths(): string[] {
  const out: string[] = [];
  for (const p of projects) {
    if (p.mountUrl) out.push(`/${p.slug}`);
    else if (p.liveUrl?.startsWith("/")) out.push(p.liveUrl);
    for (const v of p.versions ?? []) {
      if (v.liveUrl?.startsWith("/")) out.push(v.liveUrl);
      else if (v.slug && v.mountUrl) out.push(`/${v.slug}`);
    }
  }
  return [...new Set(out)];
}
