"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";

type NavItem = { href: string; label: string };

/** Hamburger menu for small screens. Closes on link tap and on Escape. */
export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-11 place-items-center rounded-full border border-line bg-card"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          className="absolute inset-x-4 top-full mt-2 rounded-2xl border border-line bg-card p-2 shadow-lg"
        >
          <ul>
            {items.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base hover:bg-accent-soft"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
