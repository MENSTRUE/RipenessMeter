# Model card — RipenessMeter V3

## Identity and task

Model: **MobileNetV3-Small** (Torchvision, ImageNet weights then supervised fine-tuning); task: 3-way RGB banana image classification. Order: `unripe`, `ripe`, `overripe`; 224×224 image tensor. Intended for educational research, demo workflows and human-reviewed visual screening. **Not** for lab maturity testing, safety certification, autonomous grading or multi-object detection.

## Data, training and validation

Trained on BananaImageBD V2 (four native stages, merged into three) and valid object crops from Annotated Banana Ripeness Stage V1. Original-class conflict and cross-split candidate-similarity quarantine applied; final sample counts **1,055 train / 168 val / 165 test**. Best **epoch 7** selected by validation macro-F1 **0.9770**. Classifier uses training augmentation; inference uses deterministic ImageNet normalization. See [methodology](methodology.md).

## Performance

BananaImageBD test (98 images): accuracy **93.88%**, macro-F1 **91.87%**. AnnotatedBanana test (67 crops): accuracy **100%**, macro-F1 **100%**; source-conditioned, not proof of novel camera/banana generalization. BananaImageBD class *ripe* F1 **0.8333**, highlighting errors hidden by aggregate performance. No calibrated confidence or fully independent biological subject benchmark is available. [Evaluation](evaluation.md).

## API use and safeguards

Trusted checkpoint supplied locally, never loaded from arbitrary uploads; FastAPI validates bytes, pixel count, MIME and decoded formats. Output score is uncalibrated softmax; `uncertain` below 0.75 is a UI heuristic, not a formal uncertainty estimate. Example JSON schema and endpoints in [`../../backend/README.md`](../../backend/README.md).

## Potential harms and restrictions

Misclassification can lead to premature discarding or wrong harvest/sorting decisions; background/domain variation, merged physical stages and near-duplicate leakage risks are material. Keep human inspection and disclose limitations. Images are decoded in memory in current local server; cloud/privacy security not established. Code licensed MIT; dataset and derived visual rights remain separate. [Limitations](limitations.md).
