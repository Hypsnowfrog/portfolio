## 1. Generated artwork metadata

- [x] 1.1 Add a direct `sharp` development dependency and a prebuild metadata command.
- [x] 1.2 Implement idempotent dimension sync, legacy creation-date backfill, and `order` removal.

## 2. Content and CMS model

- [x] 2.1 Replace manual order sorting with descending `created_at` sorting in the content schema and loader.
- [x] 2.2 Simplify the artwork CMS form: generated dimensions hidden, `order` and duplicate availability removed, required status dropdown, and hidden creation timestamp.
- [x] 2.3 Remove the browser-side dimension enhancement.
- [x] 2.4 Sort artwork by year, then creation date for equal years.

## 3. Verification

- [x] 3.1 Run metadata sync twice to verify it is idempotent.
- [x] 3.2 Run the production build and validate all artwork content.
