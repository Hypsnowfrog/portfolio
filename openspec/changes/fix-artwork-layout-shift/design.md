## Context

`WorkGrid.astro` utilise des colonnes CSS pour les images aux ratios libres. `ResponsiveArtworkImage.astro` rend actuellement un `<img>` sans dimensions intrinsèques. Avant le chargement, les cartes n'ont donc pas de hauteur stable et le navigateur redistribue les colonnes au fil des téléchargements.

## Goals / Non-Goals

**Goals:**

- Réserver la hauteur exacte de chaque œuvre avant son chargement.
- Conserver les images non recadrées et le chargement différé.
- Garder le contenu modifiable dans Sveltia CMS.

**Non-Goals:**

- Remplacer la maçonnerie CSS, charger toute la galerie en eager, ou ajouter une bibliothèque de grille/images.

## Decisions

Ajouter `image_width` et `image_height` au schéma et aux entrées des œuvres, puis les transmettre aux attributs `width` et `height` de `<img>`. Ces attributs sont la primitive HTML native qui réserve le ratio correct sans JavaScript ni changement visuel après téléchargement.

Une valeur générique fondée sur `orientation_hint` est écartée : elle ne représente pas le ratio réel et laisse des décalages. Passer à une grille CSS classique est écarté : cela modifierait l'esthétique de maçonnerie sans traiter le manque d'information sur les dimensions.

## Risks / Trade-offs

- [Dimensions erronées dans le CMS] → l'espace réservé sera incorrect ; renseigner les valeurs depuis les fichiers source et valider qu'elles sont des entiers positifs.
- [Nouvelles images sans dimensions] → refuser le contenu invalide au build plutôt que réintroduire un déplacement de mise en page.
