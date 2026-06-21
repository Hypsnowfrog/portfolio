## Why

New artwork currently requires an editor to look up and type the image's pixel dimensions. This is error-prone and undermines the layout-stability fix that depends on accurate intrinsic dimensions.

## What Changes

- Populate `image_width` and `image_height` from the selected artwork image in the Sveltia CMS editor.
- Keep both fields required in saved artwork content and preserve manual entry as a fallback if automatic detection fails.
- Support the image formats already accepted by the browser-based CMS without adding an upload service or runtime dependency.

## Capabilities

### New Capabilities

- `cms-artwork-image-metadata`: Automatically capture intrinsic dimensions for artwork images during CMS editing.

### Modified Capabilities

- None.

## Impact

- `public/admin/index.html` gains a small browser-side CMS enhancement.
- `public/admin/config.yml` may hide or clarify automatically managed dimension fields.
- No new packages, server, or public-site runtime code.
