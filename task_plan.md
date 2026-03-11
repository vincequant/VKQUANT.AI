# Task Plan: Clean Light Fintech Refresh

## Goal
Switch the landing page from dark fintech styling to a clean light fintech theme, add an AI report gallery with fullscreen reading, and keep a deployment-ready summary for follow-up decisions.

## Phases
- [x] Phase 1: Plan and setup
- [x] Phase 2: Research current code and asset constraints
- [x] Phase 3: Execute UI refactor and add report gallery
- [x] Phase 4: Review, verify, and deliver

## Key Questions
1. Which files currently control the global theme and homepage layout?
2. How should report images be sourced so uploads do not require code changes?
3. What is the safest way to add modal viewing without introducing new dependencies?

## Decisions Made
- Use filesystem discovery from `public/images/ai-reports` so new screenshots appear automatically.
- Keep the existing homepage sections but restyle them to the new light theme for faster rollout.
- Support both image files and PDF files in the gallery modal.
- Support multiple QR image extensions in `public/` so temporary assets like `wechat-qr.JPG` work without renaming.
- Keep deployment advice in a dedicated markdown brief so external reviewers such as Grok can evaluate hosting options from a single file.

## Errors Encountered
- `next build` with default Turbopack was unreliable in this environment: switched project scripts to webpack for stable local verification.

## Status
**Completed** - Light fintech theme, AI report gallery, modal viewer, QR asset fallback handling, and deployment brief are all verified.
