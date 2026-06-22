## Why

The CMS relies on a browser script that mutates its rendered fields after upload, so image dimensions are unreliable and content may fail validation. Manual display ordering and duplicate availability fields also make the artwork form harder to use than necessary.

## What Changes

- Derive artwork image dimensions during the build from the locally uploaded image, without CMS fields or browser-side mutation.
- Replace the optional status radios with one required status dropdown and remove the duplicate availability toggle.
- Record an artwork creation timestamp automatically and use it to break ties between artworks from the same year.
- **BREAKING** Remove the editorial `order` frontmatter field. Keep `image_width` and `image_height` as generated metadata, not CMS inputs.

## Capabilities

### New Capabilities

- `artwork-build-metadata`: Derive trusted image dimensions and display order from local build inputs.
- `artwork-cms-form`: Provide a concise, schema-valid artwork form.

### Modified Capabilities

- None.

## Impact

- Changes the artwork content schema, build script, CMS configuration, and gallery sort.
- Adds `sharp` as a direct development dependency for stable build-time image metadata extraction.
- Removes the static CMS enhancement from `public/admin/`.
