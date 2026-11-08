# Product Requirements Document

## Product
RipenessMeter

## User
Farmers, agricultural sorting teams, and students.

## Problem
Visual banana ripeness grading can be inconsistent.

## MVP
Upload a banana image and receive:

- Predicted ripeness stage
- Model confidence
- Basic explanation and limitations

## Scope
Classification of a visible banana or labeled banana crop.

## Out of Scope
- Chemical maturity measurement
- Shelf-life prediction
- Automatic certification of food quality
- Multi-object detection without a detection model

## Acceptance Criteria
- Accept supported image formats.
- Validate uploads.
- Run inference using a documented checkpoint.
- Return predicted class and probability.
- Handle invalid images safely.
- Clearly identify results as estimates.