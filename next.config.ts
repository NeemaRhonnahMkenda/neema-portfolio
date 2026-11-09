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
  partialPrefetching: true,
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
    ];
  },
};

export default nextConfig;
