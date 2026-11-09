/**
 * Pulls separately-hosted project repos into vendor/ before `next dev` / `next build`,
 * so they ship inside this one Vercel deployment while living in their own GitHub repos.
 *
 * Runs automatically via the "predev" and "prebuild" npm scripts (Vercel runs `npm run build`).
 *
 * Per project you can override (handy for testing or pinning a release):
 *   WAYPOINT_REPO   git URL or local path   (default: the GitHub repo below)
 *   WAYPOINT_REF    branch, tag or commit   (default: main)
 * Set SKIP_PROJECT_FETCH=1 to use whatever is already in vendor/ (e.g. offline).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";

const PROJECTS = [
  { name: "waypoint", repo: "https://github.com/NeemaRhonnahMkenda/waypoint.git", ref: "main" },
];

const git = (args, opts = {}) => execFileSync("git", args, { stdio: ["ignore", "pipe", "inherit"], ...opts }).toString().trim();

for (const p of PROJECTS) {
  const key = p.name.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  const repo = process.env[`${key}_REPO`] ?? p.repo;
  const ref = process.env[`${key}_REF`] ?? p.ref;
  const dir = `vendor/${p.name}`;

  if (process.env.SKIP_PROJECT_FETCH === "1" && existsSync(dir)) {
    console.log(`[projects] ${p.name}: using existing ${dir} (SKIP_PROJECT_FETCH=1)`);
    continue;
  }

  try {
    if (!existsSync(`${dir}/.git`)) {
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(dir, { recursive: true });
      git(["init", "-q", dir]);
      git(["-C", dir, "remote", "add", "origin", repo]);
    } else {
      git(["-C", dir, "remote", "set-url", "origin", repo]);
    }
    // Works for branches, tags and commit SHAs; shallow to keep builds fast.
    git(["-C", dir, "fetch", "-q", "--depth", "1", "origin", ref]);
    git(["-C", dir, "checkout", "-q", "--force", "FETCH_HEAD"]);
    const sha = git(["-C", dir, "rev-parse", "--short", "HEAD"]);
    console.log(`[projects] ${p.name}: ${repo} @ ${ref} (${sha})`);
  } catch (err) {
    if (existsSync(`${dir}/package.json`)) {
      console.warn(`[projects] ${p.name}: couldn't update (${err.message.split("\n")[0]}). Using the copy already in ${dir}.`);
    } else {
      console.error(`[projects] ${p.name}: couldn't fetch ${repo} @ ${ref}. Is the repo public and the branch right?`);
      process.exit(1);
    }
  }
}
