import {
  certifications,
  education,
  experience,
  profile,
  skills,
} from "@/content/profile";
import { projects, type Project } from "@/content/projects";

/** Where a project card should send people. Mounted projects stay on this site. */
function projectHref(p: Project) {
  if (p.mountUrl) return { href: `/${p.slug}`, label: "Open project", external: false };
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

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-b border-line pb-3">
      <span className="font-mono text-xs text-accent">{n}</span>
      <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{children}</h2>
    </div>
  );
}

export default function Home() {
  const sorted = [...projects].sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year,
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">
      {/* Header */}
      <header className="sticky top-0 z-10 -mx-4 flex items-center justify-between bg-paper/85 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <a href="#top" className="font-display text-lg tracking-tight">
          {profile.shortName}
        </a>
        <nav className="flex gap-4 text-sm text-muted sm:gap-6">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {profile.role} · {profile.location} · {profile.location2}
          </p>
          <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            Hi, I&apos;m Neema Mkenda.
            <br />
            <span className="text-muted">I build web apps people enjoy using.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:opacity-90"
            >
              See my work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-ink"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 py-16">
          <SectionLabel n="01">Projects</SectionLabel>
          <div className="grid gap-6 md:grid-cols-2">
            {sorted.map((p) => {
              const link = projectHref(p);
              return (
                <article
                  key={p.slug}
                  className="group flex flex-col rounded-2xl border border-line bg-card p-6 transition hover:border-accent"
                >
                  <div className="mb-3 flex items-center justify-between font-mono text-xs text-muted">
                    <span>{p.year}</span>
                    {p.mountUrl ? (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">
                        live here
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.summary}</p>
                  {p.highlights?.length ? (
                    <ul className="mt-4 space-y-1.5 text-sm leading-relaxed">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-accent">→</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-4 pt-2 text-sm font-medium">
                    {/* Plain <a>, not next/link: mounted projects are a different
                        Next.js app ("zone"), so navigation must be a full page load. */}
                    {link ? (
                      <a
                        href={link.href}
                        className="text-accent hover:underline"
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.label} ↗
                      </a>
                    ) : null}
                    {p.repoUrl && link?.href !== p.repoUrl ? (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-ink"
                      >
                        Source
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-20 py-16">
          <SectionLabel n="02">Experience</SectionLabel>
          <ol className="space-y-10">
            {experience.map((r) => (
              <li key={r.company + r.title} className="grid gap-2 sm:grid-cols-[200px_1fr] sm:gap-8">
                <p className="font-mono text-xs leading-6 text-muted">{r.period}</p>
                <div>
                  <h3 className="text-lg font-medium">
                    {r.title} <span className="text-muted">· {r.company}</span>
                  </h3>
                  <ul className="mt-2 space-y-1.5 leading-relaxed text-muted">
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* About + skills */}
        <section id="about" className="scroll-mt-20 py-16">
          <SectionLabel n="03">About</SectionLabel>
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-lg leading-relaxed">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="pt-4 text-base">
                <p className="font-medium">{education.degree}</p>
                <p className="text-muted">
                  {education.school} · {education.period} · {education.note}
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
                      <li key={s} className="rounded-full border border-line bg-card px-3 py-1 text-sm">
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
                <ul className="space-y-1.5 text-sm">
                  {certifications.map((c) => (
                    <li key={c.name}>
                      {c.name} <span className="text-muted">· {c.issuer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 py-16">
          <SectionLabel n="04">Contact</SectionLabel>
          <div className="rounded-2xl border border-line bg-card p-8 sm:p-12">
            <p className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              Have a project or a role in mind?
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-block text-lg text-accent hover:underline"
            >
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                GitHub
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                LinkedIn
              </a>
              <a href={profile.links.behance} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Behance
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8 text-sm text-muted">
        © {profile.name} · Built with Next.js, hosted on Vercel
      </footer>
    </div>
  );
}
