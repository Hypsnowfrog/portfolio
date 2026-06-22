## 1. CMS form

- [x] 1.1 Ajouter `cv_sections` au singleton `about` dans `public/admin/config.yml`.
- [x] 1.2 Déclarer les champs imbriqués `title`, `enabled`, `items`, `year` et `text` en cohérence avec `src/content/config.ts`.

## 2. Content verification

- [x] 2.1 Vérifier que `src/content/settings/about.yaml` reste valide avec le formulaire CMS mis à jour.
- [x] 2.2 Vérifier que le rendu de `src/pages/a-propos.astro` et `src/components/CvList.astro` ne nécessite aucun changement structurel.

## 3. Validation

- [x] 3.1 Ouvrir le CMS avec le contenu À propos existant et confirmer que les sections CV sont éditables.
- [x] 3.2 Exécuter le build de production et valider la page À propos.
