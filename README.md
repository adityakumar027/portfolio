# Aditya Kumar — Portfolio

Personal portfolio of Aditya Kumar, an AI & backend software engineer.

**Live site:** https://portfolio.adicrzz.workers.dev

## What's inside

- Hero with an interactive 3D intro scene (Three.js / React Three Fiber)
- Experience: Software Engineering Intern at Curefit (House of Cult), Quantitative Research Consultant at WorldQuant BRAIN
- Selected projects: Automated Job Application System, Graph Node Classification (GCN), PyOS
- Skills, education (Integrated B.Tech IT + MBA, IIIT Gwalior, class of 2027) and contact
- Resume PDF served from `public/`

## Tech stack

- Next.js 16 + React 19 + TypeScript, built with [vinext](https://github.com/cloudflare/vinext)
- Tailwind CSS 4
- Three.js (React Three Fiber + Drei), Framer Motion, GSAP
- Drizzle ORM
- Deployed as a Cloudflare Worker

## Run locally

Requires Node.js >= 22.13.

```bash
npm install
npm run dev
```

## Other commands

```bash
npm run build   # production build
npm start       # serve the production build
npm test        # build + rendered-HTML tests (node --test)
npm run lint    # eslint
```

## Repository layout

- `app/` — site code and components (including the 3D intro scene)
- `worker/` — Cloudflare Worker entry point
- `db/` — Drizzle schema
- `public/` — static assets, including the resume PDF
- `tests/` — rendered-HTML tests

## Deployment

Deployed on Cloudflare Workers. Production site: https://portfolio.adicrzz.workers.dev
