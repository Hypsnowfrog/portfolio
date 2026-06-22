## ADDED Requirements

### Requirement: Sections CV de la page À propos éditables
Le système SHALL exposer les sections CV de la page À propos dans Sveltia CMS comme contenu structuré lié à `src/content/settings/about.yaml`, avec pour chaque section un titre, un état actif et une liste d'entrées contenant une année et un texte.

#### Scenario: Modification d'une exposition
- **WHEN** l'artiste modifie une entrée dans la section Expositions depuis le CMS
- **THEN** le CMS enregistre une structure valide dans `about.yaml` sans édition manuelle du fichier

#### Scenario: Désactivation d'une section CV
- **WHEN** l'artiste désactive une section CV dans le CMS
- **THEN** la valeur enregistrée reste conforme au schéma Astro existant et le rendu peut continuer à filtrer cette section
