# Portfolio — Trần Tuấn Anh

Personal developer portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Bilingual (Vietnamese / English) via `/vi` and `/en` routes.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /vi (or /en for English browsers)
npm run build    # production build
```

## Where to edit things

| What | File |
|---|---|
| Name, intro, contact, skills, experience, projects, "Uses" | `src/content/profile.ts` |
| UI labels (buttons, section titles) | `src/content/ui.ts` |
| Terminal commands | `src/components/terminal.tsx` |
| Colors / theme | `src/app/globals.css` (`:root` tokens) |
| Avatar, CV, project screenshots | `public/avatar.png`, `public/cv/`, `public/projects/` |

## Blog

Posts are Markdown files in `content/blog/<slug>/vi.md` and `en.md`.
Copy `content/blog/_template` to a new folder (name must not start with `_`), edit the frontmatter and remove `draft: true`.

## GitHub activity

The contribution heatmap and stats for `TuanAnh164` are fetched at build time and refreshed every 6 hours (ISR). If the APIs are unreachable the section shows a fallback message.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import it at vercel.com → New Project (no settings needed).
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your custom domain for correct social preview links.
