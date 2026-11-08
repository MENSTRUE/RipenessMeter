# Dataset Provenance

## Source 1 — BananaImageBD V2

URL:
https://data.mendeley.com/datasets/ptfscwtnyz/2

Original labels:
Green, Semi-ripe, Ripe, Overripe

Operational mapping:
- Green -> unripe
- Semi-ripe -> unripe
- Ripe -> ripe
- Overripe -> overripe

Known issues:
- Conflicting annotations of identical image content.
- Possible visually similar bananas in different splits.

## Source 2 — Annotated Banana Ripeness Stage V1

URL:
https://data.mendeley.com/datasets/56c75hvm7r/1

Contains labeled bounding boxes.

Each eligible annotated object is cropped and assigned
its corresponding maturity-stage label.

Invalid boxes are excluded and recorded.

## Data Governance

- Preserve original source attribution.
- Verify license terms prior to redistribution.
- Never publish unlicensed raw images.
- Preserve split manifests and rejection logs.
- Do not describe perceptual-hash screening as proof
  of biological subject independence.