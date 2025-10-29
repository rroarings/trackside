<!-- GitHub Copilot / AI agent guidance for the Trackside project -->

# Trackside — Copilot instructions

This file contains concise, actionable guidance for AI coding agents working on the Trackside (Astro + Tailwind) website. Keep guidance focused on observable patterns and commands.

1. Project at-a-glance
   - Astro site (Astro v5) using Vite and Tailwind v4.x. Key entry points: `astro.config.mjs`, `package.json`.
   - Content-driven site using `astro:content` collections in `src/content/` for `blog`, `constructors`, `drivers`, and `races` (see `src/content.config.ts` for schemas).
   - UI is implemented with .astro components under `src/components/` and page routes in `src/pages/` and `src/pages/seasons/`.

2. Developer workflows (commands)
   - Install: `npm install`
   - Dev server (local preview + live reload): `npm run dev` (Astro default port 4321 unless overridden)
   - Build: `npm run build` (produces a static build)
   - Preview production build: `npm run preview`
   - Formatting: `npm run format` (Prettier + Astro plugin)

3. Key conventions & patterns
   - Content collections: frontmatter is strictly typed in `src/content.config.ts`. When adding or editing content files under `src/content/{blog,constructors,drivers,races}`, follow the schema keys (e.g., `drivers` require `profileImage`, `driverFirstName`, `driverLastName`, `season`).
   - Slugs and routes: collection entry IDs are used to form routes. Example: `src/components/DriverCard.astro` derives a driver slug with `driver.id.split("/").pop()` and links to `/seasons/{year}/drivers/{slug}`.
   - Images: Use `astro:assets` `Image` component when rendering content images (see `src/layouts/BlogPost.astro` and `src/components/DriverCard.astro`). Use image-frontmatter types from the content schemas where present (e.g., `profileImage`).
   - Team backgrounds & assets: team-specific background images and logos live under `src/assets/constructors/{team}/...` and are mapped in `src/utils/teamBgMap.ts`.
   - Styling: Tailwind classes are applied directly in components. Global styles loaded in `src/styles/global.css` and individual layouts sometimes include local styles.

4. Architecture & data flow notes
   - Static content (posts, drivers, constructors, races) is loaded at build time via `astro:content` collections. Components accept `CollectionEntry` types and expect `data` fields consistent with the content schema.
   - Pages under `src/pages/seasons/` use dynamic routing (`[slug].astro`) to render season-specific pages. Keep dynamic param parsing consistent with how components build links.
   - No server APIs or runtime backends are present — focus on build-time transforms and static rendering.

5. Examples to reference
   - Content schema: `src/content.config.ts` (authoritative frontmatter expectations)
   - Driver card & routing example: `src/components/DriverCard.astro`
   - Blog post layout: `src/layouts/BlogPost.astro`
   - Index page showing composition of components: `src/pages/index.astro`

6. Common, discoverable pitfalls
   - Do not add new frontmatter keys without updating `src/content.config.ts` schema; content validation will fail during build.
   - When linking to content-derived routes, use the collection entry `id` to compute slugs (watch for nested paths).
   - Images referenced in content should match the expected `image()` frontmatter type — broken or misnamed assets will break image imports at build time.

7. Tests & linters
   - No automated tests are present. Formatting is handled by Prettier. Run `npm run format` before committing.

8. When creating PRs
   - Keep changes small and focused. If you add or change content schema, note the change in the PR description and update any example content files.
   - Mention required build steps if additional native dependencies are added (e.g., `sharp` is a dependency; on macOS it may require system toolchains). The repo already includes `sharp` in dependencies.

9. If you need more info
   - Look for patterns in `src/components/` and `src/pages/` to keep UI consistent.
   - For images and assets, check `src/assets/` subfolders for team, circuit, and component images.

---

If any part of this guidance is unclear or you want more granular rules (naming conventions, PR checklist, tests), tell me which area to expand and I'll iterate.
