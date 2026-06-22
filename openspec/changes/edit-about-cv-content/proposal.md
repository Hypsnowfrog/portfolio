## Why

La page À propos supporte déjà `cv_sections` dans `about.yaml` et dans le rendu Astro, mais cette structure n'est pas exposée dans le formulaire Sveltia CMS. Modifier les expositions et la formation demande donc encore une édition manuelle du fichier au lieu d'un flux CMS.

## What Changes

- Exposer les sections CV de la page À propos dans Sveltia CMS avec une liste structurée de sections et d'entrées.
- Conserver le modèle actuel (`title`, `enabled`, `items`, `year`, `text`) pour éviter toute migration de contenu.
- Garantir que les modifications enregistrées depuis le CMS restent valides pour le schéma Astro et le rendu actuel de la page.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `cms-content-model`: expose les sections Expositions / Formation de la page À propos comme contenu éditable dans le CMS.

## Impact

- Met à jour la configuration Sveltia CMS dans `public/admin/config.yml`.
- Confirme le contrat de contenu existant dans `src/content/config.ts` et `src/content/settings/about.yaml`.
- N'ajoute aucune dépendance et ne change pas la structure de rendu de `src/pages/a-propos.astro` et `src/components/CvList.astro`.
