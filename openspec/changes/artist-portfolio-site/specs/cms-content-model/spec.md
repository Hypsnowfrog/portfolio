## ADDED Requirements

### Requirement: Contenu éditable validé
Le système SHALL stocker les œuvres en Markdown et les réglages singleton en YAML, tous validés par les schémas Astro et éditables depuis Sveltia CMS.

#### Scenario: Création d'une œuvre
- **WHEN** l'artiste enregistre une œuvre dans Sveltia CMS
- **THEN** le fichier contient au minimum title, slug, year, medium, dimensions, image et alt, ainsi que les champs éditoriaux définis pour l'affichage et le SEO

### Requirement: Réglages globaux configurables
Le système SHALL exposer artist_name, coordonnées, SEO, thème, familles typographiques, image par défaut, réglages d'accueil, filtres, navigation et footer sans modification de composant.

#### Scenario: Changement de thème
- **WHEN** l'artiste modifie une couleur ou police valide dans les réglages
- **THEN** le build applique cette valeur aux variables CSS globales

### Requirement: Modèle d'œuvre sans commerce
Le système SHALL permettre featured, show_on_home, available, status, order, category, series, image_display_mode, background_tone et orientation_hint, sans prix, panier ou donnée de paiement.

#### Scenario: Statut d'une œuvre
- **WHEN** un statut éditorial est renseigné
- **THEN** il peut être affiché dans la lightbox sans créer de mécanisme d'achat
