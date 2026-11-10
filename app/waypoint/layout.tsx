import type { Metadata } from "next";
import WaypointShell, { waypointMetadata } from "@waypoint/components/Shell";
import "@waypoint/styles/waypoint.css";

/*
 * Waypoint's code lives in its own repo (github.com/NeemaRhonnahMkenda/waypoint) and is
 * fetched into vendor/waypoint before every dev/build. These files only mount its pages here.
 */
export const metadata: Metadata = {
  ...waypointMetadata,
  // Its own canonical address; otherwise it inherits "/" and Google treats it as a duplicate of the home page.
  alternates: { canonical: "/waypoint" },
  openGraph: {
    type: "website",
    url: "/waypoint",
    title: "Waypoint · Plan trips together",
    description: "A travel planner for families and friends, built by Neema Rhonnah Mkenda.",
  },
};

export default function WaypointLayout({ children }: LayoutProps<"/waypoint">) {
  return <WaypointShell>{children}</WaypointShell>;
}
