## Context

Artwork dimensions reserve layout space and are required by the Astro content schema. The current CMS script attempts to write those fields by manipulating the browser DOM after upload. The gallery is manually ordered with `order`, although new entries should appear first.

## Goals / Non-Goals

**Goals:**

- Generate dimensions from the actual file before Astro validates content.
- Keep status and publishing choices unambiguous in the CMS.
- Sort artwork by year, then immutable creation time instead of an editorial rank.

**Non-Goals:**

- Transform, resize, or publish image derivatives.
- Derive creation dates from filesystem timestamps.
- Add a CMS plugin or server-side save hook.

## Decisions

- Use a `prebuild` Node script with `sharp` to update `image_width` and `image_height` in artwork frontmatter. `sharp` supports every image type accepted by Sveltia (AVIF, GIF, JPEG, PNG, WebP, SVG) and inspects the local source that will actually be published.
- Declare `sharp` directly as a development dependency. Astro currently brings it transitively, but build tooling must not rely on a transitive package contract.
- The script adds `created_at` only to legacy entries, using their Git creation commit. New CMS entries receive it through a hidden `{{now}}` field. The script fails for a missing date when Git history is unavailable, rather than inventing a filesystem-derived date.
- Remove `order` during metadata sync and sort year descending, then `created_at` descending in the content loader.
- Keep true binary decisions (`featured`, `show_on_home`) as booleans. Remove `available`, because the required status select already represents availability.
- Set the status select `required: true` and `dropdown_threshold: 1`, avoiding an empty enum value and radio-button UI.
- Convert legacy empty statuses from the old `available` value during sync (`true` becomes `Disponible`; otherwise `Non disponible`).

## Risks / Trade-offs

- [A build mutates generated frontmatter] → metadata is deterministic and the script is idempotent; rerunning it produces no further changes.
- [An image cannot be read] → fail before publishing instead of emitting incorrect layout dimensions.
- [A legacy entry lacks Git history] → require a one-time explicit `created_at` value.

## Migration Plan

1. Run the metadata script once to backfill dates, dimensions, and remove `order`.
2. Deploy; every subsequent build refreshes dimensions before Astro validation.
3. Roll back by restoring the previous schema, CMS configuration, and sort; generated dimensions remain valid.

## Open Questions

None.
