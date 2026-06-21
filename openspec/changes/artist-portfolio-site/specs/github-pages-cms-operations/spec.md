## ADDED Requirements

### Requirement: Publication GitHub Pages
Le système SHALL construire le site Astro et déployer le dossier statique généré vers GitHub Pages via GitHub Actions.

#### Scenario: Déploiement de la branche configurée
- **WHEN** une modification est poussée sur la branche de publication
- **THEN** l'action construit le site et publie la version statique sur GitHub Pages

### Requirement: CMS Sveltia sous admin
Le système SHALL servir Sveltia CMS sous `/admin/` avec une configuration GitHub pointant vers les collections et médias du dépôt.

#### Scenario: Modification de contenu
- **WHEN** un éditeur autorisé enregistre un contenu dans Sveltia
- **THEN** la modification est écrite dans le chemin de contenu correspondant du dépôt

### Requirement: Domaine personnalisé documenté
Le système SHALL prévoir `public/CNAME` et documenter les enregistrements DNS requis avant activation du domaine personnalisé.

#### Scenario: Configuration du domaine
- **WHEN** le domaine final est renseigné dans CNAME et le DNS est configuré
- **THEN** GitHub Pages sert le site avec le domaine personnalisé et HTTPS activé
