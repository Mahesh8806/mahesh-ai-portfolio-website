# maheshbunage.com

Personal portfolio of Mahesh Bunage, Data & AI Engineer. Vite + React 19 + Tailwind CSS v4 + Framer Motion.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs dist/
```

## Where things live

- `constants.ts`: all site content (profile, projects, experience, skills, pipeline explorer). Edit content here, not in components. Only add what is on the resume.
- `index.css`: design tokens (colours for dark and light themes, type, cards, buttons).
- `components/`: one file per section, plus `ui.tsx` (shared helpers), `CommandPalette.tsx` (⌘K menu) and `ProjectVisual.tsx` (project artwork).
- `public/api/contact.php`: contact form endpoint (Mailjet). Credentials live in a `.env` on the server, never in the repo.

## Deploy

Merging to `master` runs `.github/workflows/deploy.yml`, which builds the site and pushes `dist/` to the `deploy` branch. Hostinger auto-deploys that branch.
