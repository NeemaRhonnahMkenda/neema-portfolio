// Drop this into EVERY new project repo (replace the existing next.config.ts,
// keeping any options create-next-app generated for you).
//
// PORTFOLIO_SLUG must match the `slug` you add in the portfolio's
// content/projects.ts. Set it in Vercel → Project → Settings → Environment
// Variables, or just hard-code the string.
import type { NextConfig } from "next";

const slug = process.env.PORTFOLIO_SLUG ?? "my-project";

const nextConfig: NextConfig = {
  // All pages and /_next assets are served under /<slug>, so the portfolio
  // can proxy https://<portfolio>.vercel.app/<slug>/* straight to this app.
  basePath: `/${slug}`,

  // Needed only if the project uses Server Actions: the browser's Origin will
  // be the portfolio's domain, not this project's own .vercel.app domain.
  experimental: {
    serverActions: {
      allowedOrigins: ["neema-mkenda.vercel.app"], // TODO: your portfolio domain
    },
  },
};

export default nextConfig;
