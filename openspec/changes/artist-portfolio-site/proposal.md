## Why

L'artiste doit pouvoir présenter et maintenir ses œuvres sans dépendre d'une boutique, d'une page détail par œuvre, ni de modifications de code. Le site doit rendre des images de formats très variés avec une expérience de consultation sobre, rapide, accessible et partageable.

## What Changes

- Créer un site statique Astro pour GitHub Pages, composé des pages Accueil, Œuvres, À propos et Contact.
- Centraliser le contenu et les réglages éditoriaux dans des fichiers Markdown/YAML gérés par Sveltia CMS.
- Ajouter une grille d'œuvres sans recadrage imposé et une lightbox plein écran accessible, navigable et adressable par URL.
- Ajouter le thème configurable, l'en-tête, le pied de page, le formulaire de contact configurable et les métadonnées SEO.
- Préparer le déploiement GitHub Pages et les fichiers nécessaires au domaine personnalisé.

## Capabilities

### New Capabilities

- `cms-content-model`: schémas de contenu éditables pour les œuvres, pages, navigation, thème et réglages du site.
- `artist-site-pages`: rendu des quatre pages publiques et de la navigation galerie minimaliste.
- `artwork-gallery-lightbox`: grille responsive d'œuvres et lightbox accessible avec navigation, URL partageable et images sans recadrage.
- `site-accessibility-performance-seo`: comportements accessibles, optimisation image, HTML/SEO et rendu progressif.
- `github-pages-cms-operations`: configuration Sveltia CMS, publication GitHub Pages et domaine personnalisé.

### Modified Capabilities

Aucune.

## Impact

- Ajout d'une application Astro, de composants Astro et d'une île interactive légère pour la lightbox.
- Ajout de collections de contenu, de fichiers de configuration Sveltia CMS et d'exemples éditables.
- Ajout de la configuration GitHub Pages, du sitemap/robots et d'une stratégie de formulaire via endpoint configurable.
- Aucune fonctionnalité de catalogue marchand, de panier, de paiement ou de page produit.
