# Model Card — RipenessMeter

## Task
Three-class banana ripeness classification.

## Architecture
MobileNetV3-Small.

## Framework
PyTorch / torchvision.

## Training
Dual-source supervised training with validation-only
checkpoint selection.

## Target Classes
- unripe
- ripe
- overripe

## Preprocessing
Resize/crop to 224 x 224 RGB and ImageNet normalization.

## Validation
Macro-F1 is the primary checkpoint selection metric.

## Evaluation
Held-out performance must be reported separately for
BananaImageBD and AnnotatedBanana.

Refer to Kaggle RESULTS artifacts for authoritative
numeric results.

## Known Risks
- Domain shift.
- Near-duplicate leakage.
- Operational label simplification.
- Potential lack of independent object identities.
- Poor performance on unseen acquisition conditions.

## Intended Use
Educational research and screening prototype.

## Not Intended For
Food safety certification or high-stakes automated sorting.