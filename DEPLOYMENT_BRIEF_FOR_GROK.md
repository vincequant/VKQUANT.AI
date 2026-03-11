# VKQuant.ai Deployment Brief For Grok

Updated: 2026-03-11

## What This Project Is
- Repository name: `vkquant.ai`
- Type: `Next.js 16.1.6` App Router site
- UI stack: `React 19`, TypeScript, Tailwind CSS 4, Framer Motion, Lucide icons
- Nature of site: a marketing / landing page style quant site with no login, no database, no API routes, and no server-side user sessions
- Current local commands:
  - `npm run dev`
  - `npm run lint`
  - `npm run build`
  - `./start.sh`

## Current Runtime Characteristics
- Build command currently used and verified: `npm run build`
- The current homepage is prerendered as static content during build.
- There are no required environment variables at the moment.
- AI report cards are generated from files placed in `public/images/ai-reports/`.
- The community QR card now auto-detects these files in `public/`:
  - `wechat-qr.png`
  - `wechat-qr.jpg`
  - `wechat-qr.jpeg`
  - `wechat-qr.JPG`
  - `wechat-qr.JPEG`
  - `wechat-qr.webp`

## Important Code / Asset Notes
- This is not a Framer project and should not be rebuilt in a no-code tool if the goal is to preserve the current design exactly.
- The repo already works as a code-first deployment target.
- Verified build output on 2026-03-11 showed the main route `/` as static content.
- The project currently uses `next build --webpack` for reliable local verification.

## What Matters For Hosting
1. The easiest path is a platform that accepts a normal Next.js repo without export adapters.
2. If mainland China / WeChat access is the top priority, edge coverage in China matters more than “zero config”.
3. If zero code change is the top priority, avoid platforms that require converting the project into a separate static export workflow first.

## Best Platform Fit

### Option A: Vercel
Why it fits:
- Official Vercel docs position Next.js deployment as zero-configuration for frontend projects.
- This repo already matches the expected setup: standard Next.js app, no custom server, no database, no runtime secrets.
- It is the lowest-risk path if the goal is “deploy the existing repo exactly as-is”.

Why I would choose it first:
- Fastest path from local repo -> GitHub -> production
- Minimal chance of design drift
- No need to add an adapter or rework build/export behavior first

Tradeoff:
- If the target audience is mainly in mainland China, Grok should separately assess whether Vercel edge performance is acceptable for that audience. That is a network/distribution question, not a code compatibility question.

### Option B: Tencent EdgeOne Pages
Why it is interesting:
- Official EdgeOne docs cover Pages deployment and list `Next.js` among supported frameworks for static site generation.
- This makes it a strong candidate if China-first delivery is more important than lowest setup effort.

Why it is not my first recommendation for this repo today:
- The current repo is already verified in normal Next.js build mode.
- I have not yet converted this repo into an explicit static export target like `output: 'export'`.
- So EdgeOne is credible, but it is not the current zero-change path.

### Option C: Cloudflare Workers
Why it works:
- Official Cloudflare docs support Next.js through OpenNext on Workers.

Why I would not start here:
- More moving parts than Vercel for this particular repo
- No clear upside unless there is a specific Cloudflare requirement

## My Recommendation
- Default recommendation: `Vercel`
- If China-mainland speed is the dominant business requirement and some deployment adaptation is acceptable: evaluate `Tencent EdgeOne Pages` second
- I would not start with Cloudflare for this project unless there is an external requirement

## Questions Grok Should Answer
1. Based on the target audience of `vkquant.ai`, is zero-change deployment more important than mainland-China acceleration?
2. For a fully static prerendered Next.js landing page like this one, is Vercel enough, or is Tencent EdgeOne materially better for the expected visitors?
3. If recommending EdgeOne, what exact build/output mode should this repo use so the deployment stays identical to the current local build?

## Official Sources
- Vercel Next.js docs: https://vercel.com/docs/frameworks/frontend/nextjs
- Vercel Hobby plan docs: https://vercel.com/docs/plans/hobby
- Cloudflare Workers + Next.js docs: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Tencent EdgeOne Pages overview: https://edgeone.ai/document/162027908093321216
- Tencent EdgeOne framework support: https://edgeone.ai/document/158296440776376320
