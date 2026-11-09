import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private or machine-only parts of Waypoint: shared trip links, imports and the API.
        disallow: ["/waypoint/api/", "/waypoint/t/", "/waypoint/import", "/waypoint/trips/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
