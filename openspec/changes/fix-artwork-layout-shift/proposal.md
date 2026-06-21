## Why

Sur la page Œuvres, les images chargées en différé n'ont pas de dimensions réservées. La grille en colonnes se recalcule à chaque chargement et les œuvres se déplacent, ce qui rend la consultation perturbante.

## What Changes

- Enregistrer les dimensions intrinsèques de chaque image d'œuvre dans le contenu éditorial.
- Rendre ces dimensions sur les images de la galerie pour réserver leur espace avant leur téléchargement.
- Conserver les ratios libres, la maçonnerie CSS et le chargement différé des œuvres hors priorité.

## Capabilities

### New Capabilities

Aucune.

### Modified Capabilities

- `artwork-gallery-lightbox`: la galerie doit réserver la place de chaque image avant son chargement afin que la disposition ne se réorganise pas.

## Impact

- `src/content/config.ts` et les entrées Markdown des œuvres.
- `src/components/ResponsiveArtworkImage.astro`, utilisé par la galerie et les œuvres mises en avant.
- Aucune nouvelle dépendance, API ou modification de la lightbox.
