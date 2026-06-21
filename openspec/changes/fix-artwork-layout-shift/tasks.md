## 1. Dimensions des œuvres

- [x] 1.1 Ajouter `image_width` et `image_height` positifs au schéma de contenu et aux champs Sveltia CMS.
- [x] 1.2 Renseigner les dimensions intrinsèques pour chaque image d'œuvre existante.

## 2. Rendu stable

- [x] 2.1 Transmettre les dimensions aux attributs `width` et `height` de `ResponsiveArtworkImage`.
- [x] 2.2 Vérifier que les variantes contain, cover et natural conservent leurs styles actuels.

## 3. Vérification

- [x] 3.1 Exécuter le build et vérifier, sous réseau ralenti, que les cartes de `/oeuvres/` ne se déplacent plus au chargement.
