## ADDED Requirements

### Requirement: Grille d'œuvres à ratios préservés
Le système SHALL afficher les œuvres en une colonne mobile, deux colonnes tablette et trois colonnes ordinateur sans étirer ni rogner les images par défaut.

#### Scenario: Œuvres aux ratios mixtes
- **WHEN** la collection contient des images portrait, paysage, carrées ou panoramiques
- **THEN** chaque image conserve son ratio et les cartes restent lisibles avec leurs métadonnées

### Requirement: Filtres éditoriaux optionnels
Le système SHALL générer les filtres disponibles à partir des catégories, séries, années, statuts ou attributs définis et ne les rendra que si les réglages les activent.

#### Scenario: Filtres désactivés
- **WHEN** enable_filters est false
- **THEN** toutes les œuvres restent visibles sans interface de filtre

### Requirement: Lightbox accessible et partageable
Le système SHALL ouvrir l'œuvre dans un dialogue plein écran avec image contain, métadonnées, précédent, suivant et fermeture, et synchroniser l'œuvre ouverte avec `?work=<slug>`.

#### Scenario: Ouverture d'un lien partagé
- **WHEN** un visiteur ouvre `/oeuvres/?work=un-slug-valide`
- **THEN** la grille charge et la lightbox ouvre l'œuvre correspondante

#### Scenario: Navigation clavier
- **WHEN** la lightbox est ouverte et le visiteur presse Échap, Flèche gauche ou Flèche droite
- **THEN** le dialogue se ferme ou sélectionne respectivement l'œuvre précédente ou suivante

#### Scenario: Fermeture accessible
- **WHEN** la lightbox se ferme
- **THEN** le scroll de fond est restauré et le focus revient au déclencheur d'origine
