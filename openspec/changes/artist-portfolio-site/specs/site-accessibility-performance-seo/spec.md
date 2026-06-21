## ADDED Requirements

### Requirement: Contenu accessible sans interaction avancée
Le système SHALL fournir une structure sémantique, des états de focus visibles, des textes alternatifs requis, des contrastes suffisants et une navigation réduite avec prefers-reduced-motion.

#### Scenario: JavaScript indisponible
- **WHEN** JavaScript est indisponible
- **THEN** les pages, œuvres, images, métadonnées et coordonnées restent consultables

### Requirement: Chargement d'images performant
Le système SHALL charger l'image héroïque prioritairement, différer les autres images, déclarer des dimensions lorsque connues et ne jamais charger une image lightbox avant l'ouverture.

#### Scenario: Consultation de la grille
- **WHEN** un visiteur charge la page Œuvres
- **THEN** les images hors viewport utilisent lazy loading et decoding async

### Requirement: SEO configurable
Le système SHALL générer title, description, Open Graph, sitemap, robots et données structurées de type Person à partir des données éditoriales disponibles.

#### Scenario: Publication
- **WHEN** le site est construit pour production
- **THEN** chaque page publique possède un titre et une méta description pertinents
