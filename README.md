# Portfolio d'artiste

Site Astro statique pour GitHub Pages, éditable avec Sveltia CMS à `/admin/`.

## Démarrer

```sh
npm install
npm run dev
```

Le build de production est vérifié avec `npm run build`.

## Édition

- Les œuvres sont dans `src/content/works/` ; l'alt est obligatoire.
- Les réglages et pages sont dans `src/content/settings/`.
- Sveltia écrit les médias dans `public/uploads/`. Remplacez `REPLACE_WITH_OWNER/REPLACE_WITH_REPOSITORY` dans `public/admin/config.yml` avant de l'utiliser.
- Gardez les images sous 2500 px sur le grand côté et idéalement sous 2 Mo. Préparez-les en WebP/JPEG/PNG ; l'original haute définition reste hors du dépôt.
- `contain` préserve systématiquement l'œuvre. `cover` est l'exception volontaire ; `natural` n'impose aucun cadre.

## Formulaire

Le formulaire est absent tant que `form_enabled` est faux ou que `form_endpoint` est vide dans `contact.yaml`. Configurez un endpoint HTTPS accepté par votre politique de confidentialité, puis activez-le dans le CMS.

## GitHub Pages et domaine

1. Dans GitHub, activez Pages avec la source **GitHub Actions**.
2. Le workflow utilise par défaut l'URL Pages du dépôt (`https://OWNER.github.io/REPO`). Définissez la variable de dépôt `SITE_URL` uniquement si vous utilisez un domaine personnalisé.
3. Si vous utilisez un domaine personnalisé, copiez `public/CNAME.example` vers `public/CNAME` et gardez seulement le domaine final sur une ligne.
4. Ajoutez les enregistrements DNS indiqués par GitHub Pages, attendez leur propagation, puis activez *Enforce HTTPS* dans les réglages Pages.

Ne créez pas de `CNAME` avec un domaine fictif : GitHub Pages l'utiliserait réellement.
