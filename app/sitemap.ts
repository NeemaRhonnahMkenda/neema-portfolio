import type { MetadataRoute } from "next";
import { livePaths } from "@/content/projects";
import { SITE_URL } from "@/lib/site";

/** Public pages: the portfolio itself plus every project served by this site (e.g. /waypoint). */
export default function sitemap(): MetadataRoute.Sitemap {
  const builtIn = livePaths();

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...builtIn.map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
