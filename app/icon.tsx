import { renderIcon } from "@/lib/og";

// 512px PNG: Google shows site icons next to search results and needs at least 48px.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return renderIcon(512);
}
