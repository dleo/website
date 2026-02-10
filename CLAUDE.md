# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website for David Lopez, built with **Astro 5.0**, **Tailwind CSS 3**, and **TypeScript**. Outputs fully static HTML/CSS/JS. Deployed to **Netlify**.

## Commands

```bash
npm run dev           # Dev server on localhost:3000
npm run build         # Production build to /dist
npm run preview       # Preview production build
npm run check         # Run all checks (astro types + eslint + prettier)
npm run fix           # Auto-fix eslint + prettier issues
```

## Architecture

### Layout Hierarchy
`Layout.astro` (base HTML) → `PageLayout.astro` (Header + Footer wrapper) → Page → Widgets → UI Components

- `LandingLayout.astro` and `MarkdownLayout.astro` are alternate layout wrappers.

### Key Directories
- `src/pages/` — Astro file-based routing. Blog uses dynamic routes in `src/pages/[...blog]/`.
- `src/data/post/` — Blog posts as `.md`/`.mdx` files with frontmatter (title, publishDate, category, tags, etc.).
- `src/components/widgets/` — Reusable page sections (Hero, Features, Steps, CallToAction, etc.).
- `src/components/common/` — Shared components (Metadata, Image, SocialShare, ToggleTheme).
- `src/components/blog/` — Blog-specific components (SinglePost, Grid, List, Pagination, Tags).
- `src/utils/` — Blog queries (`blog.ts`), URL generation (`permalinks.ts`), remark/rehype plugins (`frontmatter.ts`), image helpers.
- `src/navigation.ts` — Header and footer navigation data.
- `src/config.yaml` — Central site configuration (metadata, blog settings, analytics, theme).
- `src/types.d.ts` — TypeScript interfaces for all widget and content types.

### Custom Astro Integration
`vendor/integration/` contains the `astrowind` integration that:
- Loads `src/config.yaml` as a virtual module (`astrowind:config`) exporting `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, `ANALYTICS`.
- Updates `robots.txt` with sitemap reference after build.

### Content Collections
Blog posts are defined in `src/content/config.ts`. Schema fields: `publishDate`, `title`, `excerpt`, `image`, `category`, `tags`, `author`, `draft`, `metadata`. Drafts are excluded from production builds. Reading time is auto-calculated via a remark plugin.

### Blog Routing
Post permalinks default to `/%slug%` (configurable in `config.yaml`). Category pages at `/category/{slug}`, tag pages at `/tag/{slug}` (noindex). Pagination at 6 posts per page.

## Conventions

- **Imports:** Use `~/` alias for `src/` (e.g., `import X from '~/components/...'`).
- **Component naming:** PascalCase `.astro` files. Pages are kebab-case.
- **Unused variables:** Prefix with `_` to satisfy ESLint.
- **Styling:** Tailwind utilities with CSS variable-based custom colors (`primary`, `secondary`, `accent`). Dark mode is class-based.
- **Icons:** Use `astro-icon` with Tabler Icons and select Flat Color Icons.
- **View Transitions:** Enabled via Astro's `ClientRouter`.

## Adding Content

**New blog post:** Create `src/data/post/my-post.md` with required frontmatter (`title`, `publishDate`).
**New page:** Create `src/pages/my-page.astro`, import `PageLayout`, compose with widgets.
**Navigation changes:** Edit `src/navigation.ts`.
**Site config changes:** Edit `src/config.yaml`.
