## ADDED Requirements

### Requirement: Automatic artwork image dimensions
The CMS SHALL populate positive `image_width` and `image_height` values from an image selected for a new or updated artwork before the editor saves it.

#### Scenario: New image selected
- **WHEN** an editor selects a readable artwork image
- **THEN** the CMS fills both dimension fields with that image's intrinsic pixel dimensions

#### Scenario: Image metadata cannot be read
- **WHEN** the selected image cannot be decoded by the browser
- **THEN** the CMS preserves any existing values, reports the problem, and permits the editor to provide valid dimensions manually

### Requirement: Editable validated fallback
The CMS SHALL retain visible, editable positive-integer dimension fields and the content build SHALL continue to reject missing or invalid values.

#### Scenario: Manual correction
- **WHEN** an editor changes an automatically populated dimension
- **THEN** the saved artwork uses the corrected positive integer values
