## ADDED Requirements

### Requirement: Clear valid artwork status
The CMS SHALL present one required status dropdown with exactly `Disponible`, `Vendu`, `Collection privée`, and `Non disponible` as valid values.

#### Scenario: Status selected
- **WHEN** an editor saves an artwork after selecting a status
- **THEN** the saved value is accepted by the artwork content schema

#### Scenario: No status selected
- **WHEN** an editor attempts to save an artwork without a status
- **THEN** the CMS prevents the save instead of writing an empty status

### Requirement: CMS-managed editorial fields
The CMS SHALL not expose generated image dimensions, manual display order, or a duplicate availability field.

#### Scenario: New artwork form
- **WHEN** an editor opens the artwork creation form
- **THEN** it shows neither dimension fields, an order field, nor an availability toggle

#### Scenario: Timestamp omitted from CMS
- **WHEN** an editor creates an artwork
- **THEN** the CMS does not expose or write a creation timestamp
