# Neema Mkenda · Portfolio

One Next.js site on a free `*.vercel.app` address that:

- shows the portfolio (CV content lives in `content/profile.ts`)
- **hosts every project under its own path**, e.g. `https://neema-mkenda.vercel.app/my-project`

Each project is still its own GitHub repo and its own Vercel project. The portfolio
proxies `/<slug>/*` to it with a Next.js rewrite ("multi-zones"), so visitors only
ever see one address.

```
visitor ──► neema-mkenda.vercel.app/            → this portfolio
        └─► neema-mkenda.vercel.app/my-project  → (rewrite) my-project-xyz.vercel.app/my-project
```

## 1. First deploy (once)

1. Fill in the `TODO`s in `content/profile.ts` (GitHub, LinkedIn, Behance) and `content/projects.ts`.
2. Push this folder to a new GitHub repo, e.g. `portfolio`.
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/portfolio.git
   git push -u origin main
   ```
3. On vercel.com → **Add New → Project** → import the repo → Deploy (defaults are fine).
4. Rename the URL: Vercel → Project → **Settings → Domains** → edit the
   `*.vercel.app` domain to something like `neema-mkenda.vercel.app` (free, no purchase).

## 2. Adding a new project (every time)

**In the new project repo**

1. Create it as usual: `npx create-next-app@latest my-project`
2. Copy `project-template/next.config.ts` into it and set the slug:
   `basePath: "/my-project"` (or set `PORTFOLIO_SLUG=my-project` in Vercel env vars).
3. Push to GitHub and import it into Vercel as its own project.
   Note its URL, e.g. `https://my-project-abc.vercel.app`.
   Its home page is now at `https://my-project-abc.vercel.app/my-project`.

**In this portfolio repo**

4. Add an entry to `content/projects.ts`:
   ```ts
   {
     slug: "my-project",                       // same as basePath
     title: "My Project",
     summary: "One sentence about it.",
     stack: ["Next.js", "Supabase"],
     repoUrl: "https://github.com/<you>/my-project",
     mountUrl: "https://my-project-abc.vercel.app",
     year: 2026,
   },
   ```
5. Commit and push. Vercel redeploys; the card appears and
   `neema-mkenda.vercel.app/my-project` is live.

Future pushes to the project repo go live automatically; the portfolio only needs
a redeploy when you add or remove a project.

## Project gotchas (read once)

| Thing | What to do |
| --- | --- |
| Links inside a project | `next/link` and `router.push` add `basePath` automatically. Plain `<a href="/x">` does not: use `<Link>`. |
| `public/` files | Reference as `/my-project/logo.png`, or use a static image import. |
| Linking between portfolio and a project | Use plain `<a>` (full page load), not `<Link>`. Already done in the portfolio. |
| Supabase / OAuth redirects | Add `https://neema-mkenda.vercel.app/my-project/**` to Supabase → Auth → URL Configuration → Redirect URLs, and use that as the site URL for auth callbacks. |
| Server Actions | Add the portfolio domain to `serverActions.allowedOrigins` (in the template). |
| Cookies | All projects share one origin, so cookies set with `path=/` are visible to every project. Scope auth cookies to `/my-project` where the library allows it, and use distinct cookie names per project. |
| Non-Next.js projects | Work too, as long as they serve everything under `/<slug>`. |

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

To test a mounted project locally, temporarily set its `mountUrl` to
`http://localhost:3001` and run the project with `next dev -p 3001`.

## Privacy

The site intentionally shows email only. Phone numbers and referee details from the
CV are left off: anything published here is scraped.
