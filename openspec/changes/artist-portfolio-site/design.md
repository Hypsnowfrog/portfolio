## Context

Le dépôt ne contient pas encore d'application. Le site doit être exportable statiquement vers GitHub Pages, éditable dans Sveltia CMS et conserver une esthétique de catalogue : quatre routes publiques, aucune route de produit ni comportement marchand. Les images d'œuvres ont des ratios non contraints et la consultation détaillée doit rester une interaction sur `/oeuvres/`.

## Goals / Non-Goals

**Goals:**

- Construire un site Astro statique mobile-first dont le contenu est issu de collections Markdown/YAML.
- Donner à Sveltia CMS la maîtrise des textes, navigation, thème, réglages, œuvres et ordre d'affichage.
- Afficher les œuvres sans déformation ni recadrage par défaut et fournir une lightbox clavier/mobile accessible et adressable avec `?work=<slug>`.
- Conserver un rendu utile sans JavaScript : pages, listes, métadonnées et liens de contact restent lisibles.

**Non-Goals:**

- Vente, prix, panier, paiement, stock ou pages individuelles d'œuvre.
- Recherche, comptes visiteurs, CRM ou dépendance à un fournisseur de formulaire.
- Gestes tactiles complexes ; le clic/tap et les contrôles explicites couvrent l'usage mobile initial.

## Decisions

### Contenu Astro et Sveltia

Utiliser `src/content/` pour les entrées Markdown des œuvres et `src/content/settings/*.yaml` pour les singletons. La collection `works` est validée par `src/content/config.ts`; les réglages globaux, accueil, à-propos, contact et navigation sont des schémas séparés. Sveltia édite exactement ces chemins et écrit les images dans `public/uploads/`.

Ce modèle supprime une API et fournit une validation au build. Les champs prévus sont exhaustifs, mais les valeurs par défaut (thème et image) restent dans le schéma pour que les fichiers puissent demeurer courts.

### Images à ratios libres

La grille utilise CSS columns (une colonne mobile, deux tablette, trois ordinateur) et des cartes avec `break-inside: avoid`. L'image conserve `width: 100%; height: auto`; le mode `contain` utilise un fond neutre et `object-fit: contain`, `cover` est une exception éditoriale explicite, et `natural` ne fixe pas de cadre. Cette maçonnerie CSS évite l'algorithme JavaScript et tout crop par défaut.

Astro `Image` produit les tailles et formats responsives quand le fichier est local/importable. Les fichiers CMS dans `public/uploads` gardent un `<img>` avec `width`/`height` éditables si connus, `loading="lazy"`, `decoding="async"` et une image héroïque prioritaire. Les images restent ainsi compatibles avec la publication GitHub Pages sans service image à l'exécution.

### Lightbox comme île Svelte unique

`WorkLightbox.svelte` reçoit la liste déjà rendue des œuvres et est hydratée avec `client:load`. Elle lit et écrit `?work=<slug>` à l'aide de `history.pushState`, écoute `popstate`, puis ouvre l'œuvre ciblée au chargement. Les cartes restent de vrais liens `href="?work=slug"` : sans JavaScript, l'œuvre reste identifiée par une URL et la grille est visible.

À l'ouverture, le composant mémorise l'élément déclencheur, place le focus sur Fermer, ajoute `overflow: hidden` à `body`, piège Tab dans le dialogue et traite Échap/Gauche/Droite. À la fermeture il retire le paramètre, restaure le scroll et le focus. L'image est limitée par `max-width` et `max-height` et utilise `object-fit: contain`; les métadonnées passent sous l'image sur mobile et en panneau latéral au-delà de 900px.

### Structure et thème

`BaseLayout` charge les données globales, injecte des variables CSS (`--background`, `--text`, `--muted`, `--line`, familles de police) et enveloppe Header, main et Footer. Les quatre pages ne portent que l'assemblage de composants. La navigation ne rend que les éléments activés et respecte l'ordre du CMS. Les styles sont CSS local/global simple, avec une transition courte désactivée par `prefers-reduced-motion`.

### Formulaire, SEO et publication

Le formulaire HTML n'existe que si `form_enabled` et `form_endpoint` sont renseignés. Il soumet vers cet endpoint configurable ; le site ne met en œuvre aucune logique serveur ni CRM. Les métadonnées titre/description/Open Graph viennent des réglages par page ou globaux. `@astrojs/sitemap`, `robots.txt` et JSON-LD `Person` donnent les bases SEO.

La publication GitHub Actions installe, build puis déploie `dist/`. `public/CNAME` contient le domaine choisi par l'artiste ; le DNS est documenté avec un enregistrement adapté à GitHub Pages. Sveltia est servi sous `/admin/` avec backend GitHub et le dépôt/branche configurables dans `public/admin/config.yml`.

## Risks / Trade-offs

- [Images CMS dans `public/` non transformées par Astro] → limiter les dimensions et poids à l'upload, conserver les originaux hors dépôt, documenter les tailles cibles ; migrer les originaux dans `src/assets` seulement si le flux éditorial le justifie.
- [Formulaire sans endpoint défini] → masquer le formulaire et garder l'e-mail clair lorsque cette option est activée.
- [URL avec query string moins esthétique qu'un hash] → conserver `?work=` car `history` et `popstate` gèrent proprement précédent/suivant ; aucune route supplémentaire n'est créée.
- [Sveltia requiert une autorisation GitHub] → configurer l'accès du dépôt et la branche avant remise à l'artiste ; le site public reste statique.
- [Contrastes choisis dans le CMS insuffisants] → fournir des valeurs par défaut conformes et documenter que toute personnalisation doit conserver le contraste WCAG AA.

## Migration Plan

1. Initialiser Astro et ajouter les fichiers de contenu avec exemples.
2. Construire les pages et composants, puis valider build et navigation clavier.
3. Ajouter `/admin/`, le workflow Pages, le sitemap, robots et le `CNAME` avec un domaine de substitution documenté.
4. Déployer sur une branche de test, connecter le domaine et vérifier HTTPS, les URLs partageables et le formulaire.

Un rollback revient au dernier déploiement GitHub Pages valide ; les contenus sont versionnés dans Git.

## Open Questions

- Domaine final et branche de publication GitHub Pages.
- Endpoint de formulaire choisi par l'artiste et politique de traitement des données associée.
- Polices finales : garder les piles système par défaut ou ajouter les fichiers de police autorisés.
