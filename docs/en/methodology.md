# Research methodology

## Workflow

1. Inventory and validate source images/YOLO annotations; verify native class semantics.
2. Quarantine SHA-256-identical BananaImageBD files with conflicting native labels; group exact originals before primary stratified splitting.
3. Extract eligible external YOLO object crops; inherit original image partition.
4. Detect cross-split exact and near-duplicate **candidates**, quarantine implicated samples and export manifests. Similarity screening is not identity recognition.
5. Train a MobileNetV3-Small ImageNet-pretrained classifier on both sources, with balanced sampling at source level.
6. Choose champion by validation macro-F1; save checkpoint **before** final source-specific held-out testing.
7. Compute per-class confusion, source-specific macro-F1/accuracy and parent-bootstrap uncertainty; retain failure imagery and predictions.

## Configuration and preprocessing

Random seed 42; 3 target classes `unripe, ripe, overripe`; 224×224 model input; train transformations include resize to 256, random resized crop (scale 0.77–1.0), horizontal flip, mild color jitter, tensor and ImageNet normalization. Evaluation uses 256×256 resize then deterministic 224×224 center crop. AdamW learning rate **2e-4**, batch **32**, up to **35 epochs**, patience **7**, cosine LR scheduler and label smoothing **0.03** in V3 notebook. A 90-minute notebook training time cap may stop at an epoch boundary. WeightedRandomSampler equalizes the overall source contributions; it does not create examples or alter labels. Notebook logic is the definitive experimental record.

## Data validity

The model predicts the ripeness class of a whole input or a labeled single-banana crop; it does **not** return bounding boxes. Metadata source and image parent are preserved in reports. Risks: label merger ambiguity, approximate duplicate screening, source-specific backgrounds, imaging conditions, and lack of independent biological banana IDs.

**Evidence:** [`../../notebooks/ripenessmeter.ipynb`](../../notebooks/ripenessmeter.ipynb), [`../../reports/run_config.json`](../../reports/run_config.json), [`../../reports/dataset_audit.json`](../../reports/dataset_audit.json).
