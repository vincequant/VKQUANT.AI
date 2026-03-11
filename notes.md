# Notes: Clean Light Fintech Refresh

## Current Findings

### Homepage structure
- `src/app/page.tsx` currently owns the hero layout and section composition.
- `src/app/globals.css` defines the visual system and custom utility classes.
- `src/components/Gallery.tsx` renders the six AI strategy cards.
- `src/components/JoinGroup.tsx` renders the community / QR section.
- `src/components/HeroBackground.tsx` and `src/components/NeuralParticles.tsx` still use the darker visual language.

### Asset / implementation constraints
- Existing build works with webpack, but default Turbopack has sandbox limitations in this environment.
- Google font fetching is blocked in sandbox, so local/CSS font stacks are safer than remote font downloads.
- Report gallery should ideally auto-discover images from `public/images/ai-reports`.

## Implementation Direction
- Replace dark palette with clean light fintech variables.
- Convert the hero to a brighter institutional SaaS look.
- Lighten particle/background effects rather than deleting motion entirely.
- Add a server component that reads report images from disk and passes them to a client gallery with modal interactions.

## Completed Changes
- `src/app/page.tsx` now reads AI report assets from disk and passes them into a dedicated client shell.
- `src/components/HomePageClient.tsx` owns the light-theme homepage layout and inserts the AI report gallery between strategy cards and the community block.
- `src/components/AIReportGallery.tsx` implements horizontal snap scrolling, 3D tilt cards, and fullscreen reading for both images and PDFs.
- `src/lib/ai-reports.ts` auto-discovers files from `public/images/ai-reports`.
- `src/app/globals.css`, `src/components/HeroBackground.tsx`, `src/components/NeuralParticles.tsx`, `src/components/Gallery.tsx`, and `src/components/JoinGroup.tsx` were all restyled to the new light fintech system.
- `package.json` and `next.config.ts` were adjusted so local `dev/build` runs use webpack and the project root is explicit.
- `src/components/Gallery.tsx` was later refactored again from generic strategy cards into a single-account live performance center based on the provided Interactive Brokers PortfolioAnalyst metrics and milestone timeline.
- `src/components/JoinGroup.tsx` now auto-detects QR assets from `public/wechat-qr.png`, `.jpg`, `.jpeg`, `.JPG`, `.JPEG`, or `.webp`, so temporary uploads do not require code edits.
- `src/components/HomePageClient.tsx`, `src/components/AIReportGallery.tsx`, and `src/components/JoinGroup.tsx` were refined for mobile:
  - top hero header now stacks more cleanly on small screens
  - neural network panel width and spacing are constrained on mobile
  - AI report cards use tighter swipe spacing and lighter text density on small screens
  - the QR card is larger and more centered on mobile

## Deployment Research (2026-03-11)

### Project hosting facts
- This is a `Next.js 16.1.6` App Router project with `React 19`, TypeScript, Tailwind CSS 4, Framer Motion, and no backend/database.
- Current verified commands are `npm run lint` and `npm run build`; local dev uses `npm run dev` or `./start.sh`.
- The homepage route is currently prerendered as static content during build.
- AI report discovery reads files from `public/images/ai-reports` using `fs` during build time.
- Community QR now loads from a root-level public asset and does not need a specific extension anymore.

### Hosting implications
- Vercel is the lowest-friction option because the repo is already a standard Next.js app and does not require adapters or export-specific changes.
- Cloudflare is viable, but official docs route Next.js through an OpenNext adapter to Workers, which adds setup compared with Vercel.
- Tencent EdgeOne Pages documents support for static sites and lists Next.js in supported frameworks, so it is a credible China-first option, but the current repo is not yet configured as a pure `output: 'export'` static export target.

### Official references checked
- Vercel framework deploy docs: https://vercel.com/docs/frameworks/frontend/nextjs
- Vercel plan docs: https://vercel.com/docs/plans/hobby
- Cloudflare Workers + Next.js docs: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Tencent EdgeOne Pages overview: https://edgeone.ai/document/162027908093321216
- Tencent EdgeOne framework support: https://edgeone.ai/document/158296440776376320
