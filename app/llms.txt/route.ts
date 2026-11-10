import { experience, profile, services, skills } from "@/content/profile";
import { projects } from "@/content/projects";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

/**
 * /llms.txt: a short plain-text summary of the site for AI assistants and AI search
 * (see llmstxt.org). Built from the same content as the home page, so it never goes stale.
 */
export function GET() {
  const abs = (u: string) => (u.startsWith("/") ? `${SITE_URL}${u}` : u);
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    ...profile.about,
    "",
    "## Services",
    ...services.map((s) => `- ${s.title}: ${s.body}`),
    "",
    "## Projects",
    ...projects.flatMap((p) => {
      const links = [
        ...(p.versions ?? []).flatMap((v) => [
          ...(v.liveUrl ? [`[${v.label} live](${abs(v.liveUrl)})`] : []),
          `[${v.label} code](${v.repoUrl})`,
        ]),
        ...(p.liveUrl ? [`[Live](${abs(p.liveUrl)})`] : []),
        ...(p.repoUrl ? [`[Code](${p.repoUrl})`] : []),
      ];
      return [`- ${p.title} (${p.year}): ${p.summary}${links.length ? " " + links.join(" · ") : ""}`];
    }),
    "",
    "## Experience",
    ...experience.map((r) => `- ${r.title}, ${r.company} (${r.period})`),
    "",
    "## Skills",
    ...skills.map((g) => `- ${g.group}: ${g.items.join(", ")}`),
    "",
    "## Contact",
    `- Website: [${SITE_URL}](${SITE_URL}/#contact)`,
    `- Phone and WhatsApp: ${profile.phone}`,
    `- Location: ${profile.location}`,
    ...Object.entries(profile.links)
      .filter(([, u]) => u)
      .map(([k, u]) => `- ${k[0].toUpperCase() + k.slice(1)}: ${u}`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
