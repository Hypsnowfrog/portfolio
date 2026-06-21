## ADDED Requirements

### Requirement: Disposition stable de la galerie
Le système SHALL enregistrer la largeur et la hauteur intrinsèques de chaque image d'œuvre et SHALL les rendre sur l'image de la galerie afin de réserver son espace avant le chargement du fichier.

#### Scenario: Chargement différé d'œuvres aux ratios mixtes
- **WHEN** les images de la grille se chargent à des instants différents
- **THEN** la position des cartes déjà rendues ne change pas à cause de l'arrivée d'une image

#### Scenario: Nouvelle œuvre éditée dans le CMS
- **WHEN** une œuvre est ajoutée ou modifiée
- **THEN** ses dimensions d'image sont des entiers positifs requis avec son chemin d'image
