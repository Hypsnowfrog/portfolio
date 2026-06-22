## ADDED Requirements

### Requirement: Generated artwork image dimensions
The build SHALL derive positive intrinsic `image_width` and `image_height` values from each artwork's local image before Astro validates or renders the collection.

#### Scenario: Supported image file
- **WHEN** an artwork references a readable local upload
- **THEN** its frontmatter contains the image's intrinsic positive pixel width and height before the Astro build proceeds

#### Scenario: Unreadable image file
- **WHEN** an artwork image is missing or metadata cannot be read
- **THEN** the metadata step fails and prevents the site from building

### Requirement: Year-first artwork ordering
The system SHALL sort artwork by year descending, then by `created_at` descending when the year is equal, and SHALL not use `order`.

#### Scenario: Different artwork years
- **WHEN** two artworks have different years
- **THEN** the one with the later year is displayed first regardless of creation timestamp

#### Scenario: Same artwork year
- **WHEN** two artworks have the same year and different creation timestamps
- **THEN** the one with the later timestamp is displayed first

#### Scenario: Legacy artwork without a date
- **WHEN** a legacy artwork has no `created_at` field and its creation commit is available
- **THEN** the metadata step records that commit timestamp in its frontmatter
