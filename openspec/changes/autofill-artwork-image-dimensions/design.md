## Context

Artwork dimensions are required by the Astro content schema so browsers can reserve image space. Sveltia CMS is served as a static page and currently loads only its CDN bundle, leaving editors to enter these fields manually.

## Goals / Non-Goals

**Goals:**

- Read the selected image's intrinsic dimensions in the editor and populate the artwork fields before save.
- Preserve required numeric validation in the CMS and Astro build.
- Work entirely in the browser for local files and the existing GitHub-backed CMS flow.

**Non-Goals:**

- Image resizing, conversion, optimisation, or server-side metadata extraction.
- Changing existing artwork records or gallery rendering.

## Decisions

- Add a small script to `public/admin/index.html` after the CMS bundle. It will observe the artwork editor, detect image selections, load the selected file or preview with a browser `Image`, and set the width and height fields. This keeps the capability next to the only upload UI and adds no dependency.
- Keep the values editable. Editors retain a fallback for images whose metadata cannot be read, while build validation continues to reject missing or invalid values.
- Do not add a GitHub Action that writes metadata back to the repository. A browser-side operation provides feedback before save and avoids a privileged write workflow.

## Risks / Trade-offs

- [CMS DOM changes] → Scope selectors to stable field names and leave manual fields available as fallback.
- [Unsupported or unreadable image] → Do not overwrite existing values; show a concise editor-side warning and require manual input.
- [Remote existing image edited without replacement] → Preserve its saved dimensions rather than attempting a network fetch.

## Migration Plan

1. Deploy the static admin-page script with the site.
2. Upload a new artwork image and confirm both values are filled before saving.
3. Roll back by removing the script; existing content remains valid because dimensions are stored in frontmatter.

## Open Questions

None.
