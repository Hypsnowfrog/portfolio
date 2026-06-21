## ADDED Requirements

### Requirement: Routes publiques de galerie
Le système SHALL publier uniquement les routes `/`, `/oeuvres/`, `/a-propos/` et `/contact/` pour l'expérience publique principale.

#### Scenario: Navigation active
- **WHEN** un visiteur suit un élément de navigation activé
- **THEN** la route correspondante rend son contenu éditorial dans le layout commun

### Requirement: Accueil configurable
Le système SHALL rendre une introduction et une œuvre mise en avant, ainsi qu'une section d'œuvres récentes optionnelle, à partir des réglages CMS.

#### Scenario: Désactivation des œuvres récentes
- **WHEN** recent_section_enabled est false
- **THEN** la section d'œuvres récentes n'est pas rendue

### Requirement: Pages À propos et Contact éditables
Le système SHALL rendre portrait, biographie, démarche et CV chronologique sur À propos, puis coordonnées et formulaire conditionnel sur Contact.

#### Scenario: Formulaire désactivé
- **WHEN** form_enabled est false
- **THEN** la page Contact ne rend pas de formulaire et conserve les coordonnées autorisées
