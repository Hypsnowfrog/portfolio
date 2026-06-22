## Context

Le modèle de contenu `about` accepte déjà des sections CV structurées et la page À propos les affiche via `CvList.astro`. Le point manquant est le formulaire CMS: `public/admin/config.yml` expose la biographie et la démarche, mais pas `cv_sections`.

## Goals / Non-Goals

**Goals:**

- Permettre la modification des sections Expositions et Formation depuis le CMS sans édition manuelle de YAML.
- Réutiliser la structure de données déjà validée par Astro.
- Garder le diff limité à la configuration CMS et, si nécessaire, aux exemples de contenu associés.

**Non-Goals:**

- Repenser le design de la page À propos.
- Introduire un modèle de CV plus détaillé avec lieu, type d'exposition et école séparés.
- Ajouter une nouvelle dépendance CMS ou un traitement build spécifique.

## Decisions

- Réutiliser le schéma existant `cv_sections[] -> items[]` au lieu d'introduire un nouveau format. Alternative rejetée: éclater chaque entrée en plusieurs champs; cela alourdit le formulaire sans besoin exprimé.
- Exposer `cv_sections` dans Sveltia CMS comme liste imbriquée avec `title`, `enabled`, puis `items` contenant `year` et `text`. Alternative rejetée: un seul champ texte libre; moins fiable pour la validation et le rendu.
- Ne pas modifier `CvList.astro` ni `a-propos.astro`, car le rendu actuel consomme déjà exactement cette structure.

## Risks / Trade-offs

- [Les listes imbriquées sont un peu plus lourdes à éditer qu'un simple textarea] → elles reflètent le schéma réel et évitent les erreurs de format.
- [Des entrées anciennes peuvent rester hétérogènes dans `text`] → conserver `text` tel quel évite une migration de contenu et laisse l'artiste normaliser plus tard si besoin.

## Migration Plan

1. Ajouter les champs `cv_sections` au formulaire CMS de la page À propos.
2. Vérifier que le contenu existant `src/content/settings/about.yaml` s'ouvre et s'enregistre sans modification structurelle.
3. Déployer; aucun backfill ni script de migration n'est nécessaire.

## Open Questions

None.
