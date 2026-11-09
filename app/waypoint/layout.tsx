import WaypointShell, { waypointMetadata } from "@waypoint/components/Shell";
import "@waypoint/styles/waypoint.css";

/*
 * Waypoint's code lives in its own repo (github.com/NeemaRhonnahMkenda/waypoint) and is
 * fetched into vendor/waypoint before every dev/build. These files only mount its pages here.
 */
export const metadata = waypointMetadata;

export default function WaypointLayout({ children }: LayoutProps<"/waypoint">) {
  return <WaypointShell>{children}</WaypointShell>;
}
