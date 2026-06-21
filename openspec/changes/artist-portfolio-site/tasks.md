## 1. Foundation Astro

- [x] 1.1 Initialiser Astro en sortie statique avec TypeScript strict, les scripts build/preview et la configuration du site public.
- [x] 1.2 Ajouter les intégrations nécessaires au sitemap et à Svelte, sans dépendance UI ou lightbox externe.
- [x] 1.3 Créer `src/layouts/BaseLayout.astro`, les styles globaux et les variables CSS de la direction « Galerie silencieuse ».
- [x] 1.4 Créer `src/components/Seo.astro`, `Header.astro`, `Navigation.astro`, `MobileMenu.astro` et `Footer.astro` en lisant les réglages CMS.

## 2. Modèle de contenu et CMS

- [x] 2.1 Définir dans `src/content/config.ts` les schémas validés des œuvres et des réglages singletons.
- [x] 2.2 Ajouter les exemples `site_settings.yaml`, `homepage.yaml`, `about.yaml`, `contact.yaml`, `navigation.yaml` et deux œuvres Markdown avec tous les champs demandés.
- [x] 2.3 Créer `public/admin/index.html` et `public/admin/config.yml` pour Sveltia CMS, les collections, les médias `public/uploads` et les widgets de listes/choix.
- [x] 2.4 Ajouter les règles éditoriales : alt obligatoire, slug unique, statuts contrôlés, modes d'image contrôlés et valeurs par défaut de thème.

## 3. Pages publiques et composants d'œuvres

- [x] 3.1 Créer `ResponsiveArtworkImage.astro` et `WorkMeta.astro` avec ratios préservés, mode contain/cover/natural et chargement différé.
- [x] 3.2 Créer `WorkCard.astro` et `WorkGrid.astro`, le tri par `order`, les filtres configurables et les colonnes mobile/tablette/ordinateur.
- [x] 3.3 Créer `FeaturedWork.astro` et `RecentWorks.astro`, puis composer `src/pages/index.astro` depuis les réglages d'accueil.
- [x] 3.4 Créer `src/pages/oeuvres.astro` avec titre, texte optionnel, grille et données de lightbox sérialisées.
- [x] 3.5 Créer `AboutContent.astro`, `CvList.astro` et `src/pages/a-propos.astro` avec sections désactivables.
- [x] 3.6 Créer `ContactForm.astro` et `src/pages/contact.astro` avec email, Instagram, affichage conditionnel du formulaire et messages configurables.

## 4. Lightbox accessible

- [x] 4.1 Implémenter `WorkLightbox.svelte` comme île unique avec dialogue modal, image `object-fit: contain` et métadonnées responsives.
- [x] 4.2 Ajouter les contrôles fermer/précédent/suivant, Échap, flèches clavier, focus trap, verrouillage du scroll et restauration du focus.
- [x] 4.3 Synchroniser l'état avec `?work=<slug>`, `pushState` et `popstate`, y compris la fermeture et les liens entrants invalides.
- [ ] 4.4 Vérifier au clavier et sur écran tactile les ratios portrait, paysage, carré et panoramique.

## 5. Qualité, SEO et publication

- [x] 5.1 Ajouter les métadonnées globales/par page, Open Graph configurable, JSON-LD Person, `robots.txt` et sitemap.
- [ ] 5.2 Vérifier HTML sémantique, contraste, focus visible, prefers-reduced-motion et consultation utile sans JavaScript.
- [ ] 5.3 Ajouter le workflow GitHub Actions de build et déploiement GitHub Pages ainsi que `public/CNAME` avec une procédure de remplacement du domaine.
- [x] 5.4 Documenter dans README les limites d'upload (poids, dimensions, formats), l'accès Sveltia, le domaine DNS et la configuration de l'endpoint de formulaire.
- [ ] 5.5 Exécuter `npm run build`, tester les quatre routes, liens de partage lightbox, navigation clavier, écran mobile et production GitHub Pages.
