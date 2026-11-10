import type { Metadata } from "next";
import CulinaryShell, { ccMetadata } from "@culinary/components/Shell";
import "@culinary/styles/culinary.css";

/*
 * Culinary Canvas (Next.js rebuild) lives in its own repo
 * (github.com/NeemaRhonnahMkenda/culinary-canvas) and is fetched into vendor/ before
 * every dev/build. These files only mount its pages and API here.
 */
export const metadata: Metadata = {
  ...ccMetadata,
  alternates: { canonical: "/culinary-canvas" },
  openGraph: {
    type: "website",
    url: "/culinary-canvas",
    title: "Culinary Canvas · Share your recipes",
    description: "A recipe-sharing blog built by Neema Rhonnah Mkenda, in Next.js and in Django.",
  },
};

export default function CulinaryLayout({ children }: LayoutProps<"/culinary-canvas">) {
  return <CulinaryShell>{children}</CulinaryShell>;
}
