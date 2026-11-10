import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private or machine-only parts of Waypoint: shared trip links, imports and the API.
        disallow: [
          "/waypoint/api/",
          "/waypoint/t/",
          "/waypoint/import",
          "/waypoint/trips/",
          "/culinary-canvas/api/",
          "/culinary-canvas/login",
          "/culinary-canvas/signup",
          "/culinary-canvas/new",
          "/culinary-canvas/me",
          "/culinary-canvas-django/admin/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
