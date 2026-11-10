import type { NextConfig } from "next";
import { mountedProjects } from "./content/projects";

/**
 * Every project in content/projects.ts with a `mountUrl` is proxied under
 * /<slug> on this site (Next.js "multi-zones"). The project app must use
 * `basePath: "/<slug>"` so its pages AND its /_next assets live under
 * that prefix.
 */
const nextConfig: NextConfig = {
  cacheComponents: true,
  // Waypoint is mounted at /waypoint (app/waypoint) from its own repo; tell it where it lives.
  env: {
    NEXT_PUBLIC_WAYPOINT_BASE: "/waypoint",
    NEXT_PUBLIC_WAYPOINT_ROUTE_PREFIX: "/waypoint",
    NEXT_PUBLIC_WAYPOINT_HOME_URL: "/",
    // Culinary Canvas (Next.js) is mounted at /culinary-canvas (app/culinary-canvas)
    NEXT_PUBLIC_CC_BASE: "/culinary-canvas",
    NEXT_PUBLIC_CC_ROUTE_PREFIX: "/culinary-canvas",
    NEXT_PUBLIC_CC_HOME_URL: "/",
  },
  partialPrefetching: true,
  experimental: {
    // Put the CSS straight into the HTML so the first paint doesn't wait for a stylesheet download.
    inlineCss: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return mountedProjects().flatMap(({ slug, mountUrl }) => {
      const base = mountUrl.replace(/\/+$/, "");
      return [
        { source: `/${slug}`, destination: `${base}/${slug}` },
        { source: `/${slug}/:path+`, destination: `${base}/${slug}/:path+` },
      ];
    });
  },
  async headers() {
    return [
      {
        source: "/((?!_next/).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Culinary Canvas: no framing; API responses (except photos) are never cached.
      { source: "/culinary-canvas/:path*", headers: [{ key: "X-Frame-Options", value: "DENY" }] },
      { source: "/culinary-canvas/api/:path((?!images).*)", headers: [{ key: "Cache-Control", value: "no-store" }] },
      // Waypoint: no framing; share pages and the API are never indexed or cached.
      { source: "/waypoint/:path*", headers: [{ key: "X-Frame-Options", value: "DENY" }] },
      { source: "/waypoint/t/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      {
        source: "/waypoint/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
