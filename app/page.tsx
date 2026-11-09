import {
  certifications,
  education,
  experience,
  profile,
  skills,
} from "@/content/profile";
import { projects, type Project } from "@/content/projects";
import MobileNav from "./components/MobileNav";
import {
  ArrowUpRight,
  ChatIcon,
  CodeIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./components/icons";

/* ---------- contact links (built once from content/profile.ts) ---------- */

const contact = {
  tel: `tel:+${profile.phoneDigits}`,
  whatsapp: `https://wa.me/${profile.phoneDigits}?text=${encodeURIComponent(
    `Hi ${profile.shortName.split(" ")[0]}, I found your portfolio and would like to talk.`,
  )}`,
  mail: `mailto:${profile.email}`,
};

/** Where a project card should send people. Mounted projects stay on this site. */
function projectHref(p: Project) {
  if (p.mountUrl) return { href: `/${p.slug}`, label: "Open project", external: false };
  if (p.liveUrl?.startsWith("/")) return { href: p.liveUrl, label: "Open project", external: false };
  if (p.liveUrl) return { href: p.liveUrl, label: "Visit site", external: true };
  if (p.repoUrl) return { href: p.repoUrl, label: "View code", external: true };
  return null;
}

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const stats = [
  { value: "3+", label: "years building for the web" },
  { value: "30%", label: "fewer support tickets after UX fixes" },
  { value: `${experience.length}`, label: "teams and clients shipped with" },
];

/* Shared focus ring so keyboard users always see where they are. */
const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/* ---------- small building blocks ---------- */

function SectionLabel({
  n,
  title,
  kicker,
}: {
  n: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-8 border-b border-line pb-4 sm:mb-12">
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span className="font-mono text-xs text-accent">{n}</span>
        <h2 className="font-display text-2xl tracking-tight sm:text-4xl">{title}</h2>
      </div>
      {kicker ? <p className="mt-2 text-muted sm:pl-9">{kicker}</p> : null}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper transition hover:opacity-90 ${focus}`}
    >
      {children}
    </a>
  );
}

function SecondaryButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line bg-card px-6 text-sm font-medium transition hover:border-ink ${focus}`}
    >
      {children}
    </a>
  );
}

/* ---------- page ---------- */

export default function Home() {
  const sorted = [...projects].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year,
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-line/60 bg-paper/85 backdrop-blur">
        <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
          <a href="#top" className={`font-display text-lg tracking-tight ${focus}`}>
            {profile.shortName}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-muted md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className={`hover:text-ink ${focus}`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.tel}
              className={`hidden min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-paper transition hover:opacity-90 md:inline-flex ${focus}`}
            >
              <PhoneIcon />
              <span>Call me</span>
            </a>
            <MobileNav items={nav} />
          </div>
        </div>
      </header>

      <div id="top" className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <main id="main">
          {/* Hero */}
          <section className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:py-28">
            <div>
              {profile.availability ? (
                <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs sm:text-sm">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  {profile.availability}
                </p>
              ) : null}

              <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Hi, I&apos;m {profile.shortName}.
                <span className="mt-2 block text-muted">I build web apps people enjoy using.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
                {profile.intro}
              </p>

              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                <span>{profile.role}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <PinIcon className="size-3.5" />
                  {profile.location}
                </span>
                {profile.location2 ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{profile.location2}</span>
                  </>
                ) : null}
              </p>

              <div className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap">
                <PrimaryButton href={contact.tel}>
                  <PhoneIcon /> Call {profile.phone}
                </PrimaryButton>
                <SecondaryButton href={contact.whatsapp} external>
                  <ChatIcon /> WhatsApp
                </SecondaryButton>
                <SecondaryButton href="#projects">See my work</SecondaryButton>
              </div>
            </div>

            {/* Stats */}
            <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-card px-5 py-4 sm:block sm:p-5"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="w-16 shrink-0 font-display text-3xl tracking-tight sm:w-auto sm:text-4xl">
                    {s.value}
                  </dd>
                  <dd className="text-sm leading-snug text-muted sm:mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Projects */}
          <section id="projects" className="scroll-mt-20 py-14 sm:py-20">
            <SectionLabel n="01" title="Projects" kicker="Things I've designed and built recently." />
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {sorted.map((p) => {
                const link = projectHref(p);
                return (
                  <article
                    key={p.slug}
                    className="group flex flex-col rounded-3xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg sm:p-7"
                  >
                    <div className="mb-4 flex items-center justify-between font-mono text-xs text-muted">
                      <span>{p.year}</span>
                      {p.mountUrl || p.liveUrl?.startsWith("/") ? (
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                          Live demo
                        </span>
                      ) : p.featured ? (
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                          Featured
                        </span>
                      ) : null}
                    </div>

                    <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.summary}</p>

                    {p.highlights?.length ? (
                      <ul className="mt-5 space-y-2 text-sm leading-relaxed">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5">
                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
                      {p.stack.map((s) => (
                        <li
                          key={s}
                          className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    {/* Plain <a>, not next/link: mounted projects are a different
                        Next.js app ("zone"), so navigation must be a full page load. */}
                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                      {link ? (
                        <a
                          href={link.href}
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition hover:opacity-90 ${focus}`}
                        >
                          {link.href === p.repoUrl ? <CodeIcon /> : null}
                          {link.label}
                          <ArrowUpRight />
                          <span className="sr-only"> for {p.title}</span>
                        </a>
                      ) : null}
                      {p.repoUrl && link?.href !== p.repoUrl ? (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium hover:border-ink ${focus}`}
                        >
                          <CodeIcon /> Source
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}

              {/* Placeholder card so the grid never looks empty */}
              <div className="flex min-h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-line p-6 text-center text-muted">
                <p className="font-display text-xl text-ink">More on the way</p>
                <p className="mt-1 text-sm">New projects land here as I ship them.</p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="scroll-mt-20 py-14 sm:py-20">
            <SectionLabel n="02" title="Experience" kicker="Where I've worked and what I delivered." />
            <ol className="relative border-l border-line sm:border-l-0">
              {experience.map((r) => {
                const current = r.period.includes("Present");
                return (
                  <li
                    key={r.company + r.title}
                    className="relative pb-10 pl-6 last:pb-0 sm:grid sm:grid-cols-[180px_1fr] sm:gap-10 sm:pl-0"
                  >
                    {/* timeline dot (mobile) */}
                    <span
                      aria-hidden
                      className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-paper sm:hidden ${
                        current ? "bg-accent" : "bg-line"
                      }`}
                    />
                    <p className="font-mono text-xs leading-6 text-muted">{r.period}</p>
                    <div className="sm:border-l sm:border-line sm:pl-10">
                      <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-medium leading-snug">
                        {r.title}
                        {current ? (
                          <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">
                            Current
                          </span>
                        ) : null}
                      </h3>
                      <p className="text-muted">{r.company}</p>
                      <ul className="mt-3 space-y-2 leading-relaxed text-muted">
                        {r.points.map((pt) => (
                          <li key={pt} className="flex gap-2.5">
                            <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* About + skills */}
          <section id="about" className="scroll-mt-20 py-14 sm:py-20">
            <SectionLabel n="03" title="About" />
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4 text-base leading-relaxed sm:text-lg">
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <div className="mt-6 rounded-2xl border border-line bg-card p-5 text-base">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    Education
                  </p>
                  <p className="mt-2 font-medium">{education.degree}</p>
                  <p className="text-muted">{education.school}</p>
                  <p className="text-sm text-muted">
                    {education.period} · {education.note}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {skills.map((g) => (
                  <div key={g.group}>
                    <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                      {g.group}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-line bg-card px-3 py-1.5 text-sm"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    Certifications
                  </h3>
                  <ul className="divide-y divide-line rounded-2xl border border-line bg-card text-sm">
                    {certifications.map((c) => (
                      <li key={c.name} className="px-4 py-3">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-muted">{c.issuer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-20 py-14 sm:py-20">
            <SectionLabel n="04" title="Contact" />
            <div className="rounded-3xl bg-ink p-6 text-paper sm:p-12">
              <p className="font-display text-3xl leading-tight tracking-tight sm:text-5xl">
                Have a project or a role in mind?
              </p>
              <p className="mt-3 max-w-xl opacity-75">
                The fastest way to reach me is a call or a WhatsApp message. I usually reply the
                same day.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { href: contact.tel, icon: <PhoneIcon className="size-5" />, title: "Call", detail: profile.phone },
                  { href: contact.whatsapp, icon: <ChatIcon className="size-5" />, title: "WhatsApp", detail: "Send a message", external: true },
                  { href: contact.mail, icon: <MailIcon className="size-5" />, title: "Email", detail: profile.email },
                ].map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`flex min-w-0 items-center gap-4 rounded-2xl bg-paper/10 p-4 transition hover:bg-paper/20 ${focus}`}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-ink">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium">{c.title}</span>
                      <span className="block truncate text-sm opacity-75">{c.detail}</span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-paper/20 pt-6 text-sm">
                {[
                  ["GitHub", profile.links.github],
                  ["LinkedIn", profile.links.linkedin],
                  ["Behance", profile.links.behance],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 opacity-75 hover:opacity-100 ${focus}`}
                  >
                    {label} <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="flex flex-col gap-2 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {profile.name}</p>
          <a href="#top" className={`hover:text-ink ${focus}`}>
            Back to top ↑
          </a>
        </footer>

        {/* Space so the mobile contact bar never covers the footer */}
        <div aria-hidden className="h-20 md:hidden" />
      </div>

      {/* Sticky contact bar: phones only */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href={contact.tel}
            className={`inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-accent text-sm font-medium text-paper ${focus}`}
          >
            <PhoneIcon /> Call
          </a>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-line bg-card text-sm font-medium ${focus}`}
          >
            <ChatIcon /> WhatsApp
          </a>
          <a
            href={contact.mail}
            className={`inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-line bg-card text-sm font-medium ${focus}`}
          >
            <MailIcon /> Email
          </a>
        </div>
      </div>
    </>
  );
}
