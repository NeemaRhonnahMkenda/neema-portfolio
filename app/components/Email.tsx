"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/content/profile";

const noop = () => () => {};
/** True only in the browser, after hydration. The server HTML never contains the address. */
const useInBrowser = () => useSyncExternalStore(noop, () => true, () => false);
const address = () => [profile.email.user, profile.email.domain].join("@");

/** A mailto link whose address is only assembled in the browser. */
export function EmailLink({ className, children }: { className?: string; children: React.ReactNode }) {
  const ready = useInBrowser();
  return (
    <a href={ready ? `mailto:${address()}` : "#contact"} className={className}>
      {children}
    </a>
  );
}

/** The address as text, shown once the page is running in a browser. */
export function EmailText({ fallback = "Send me an email" }: { fallback?: string }) {
  return useInBrowser() ? address() : fallback;
}
