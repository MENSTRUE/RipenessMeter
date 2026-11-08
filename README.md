# RipenessMeter

**Day 34/100 — Agriculture / Computer Vision**

A computer vision project for classifying banana ripeness
using MobileNetV3-Small and PyTorch.

## Problem

Manual ripeness inspection can be inconsistent and
time-consuming in agricultural sorting workflows.

## Objective

Classify banana images into three operational stages:

- Unripe
- Ripe
- Overripe

## Datasets

1. BananaImageBD V2
2. Annotated Banana Ripeness Stage V1

The primary dataset originally contains four maturity stages.
Green and Semi-ripe are mapped to the operational Unripe class.

The annotated dataset contains object bounding boxes.
Valid annotations are converted into classification crops.

## Machine Learning

- Framework: PyTorch
- Backbone: MobileNetV3-Small
- Input: 224 x 224 RGB
- Transfer learning: ImageNet pretrained weights
- Champion selection: validation macro-F1
- Evaluation: source-specific held-out tests

## Experiments

- V2: dual-source supervised baseline
- V3: extended exact/perceptual duplicate screening

V3 evaluates held-out samples independently of
checkpoint selection.

See reports and model card for detailed results,
audit assumptions, and limitations.

## Repository Structure

- notebooks/: reproducible Kaggle experiments
- models/: checkpoint metadata and model references
- reports/: evaluation and auditing outputs
- assets/: plots, examples, screenshots, diagrams
- backend/: future FastAPI inference application
- frontend/: future React application
- docs/: product and ML documentation
- scripts/: reproducibility utilities

## Limitations

- No proof of generalization to unseen farms or cameras.
- Visually similar objects may remain across datasets.
- Crop classification is not object detection.
- This is a research prototype, not a certified grading system.

## Dataset Policy

Raw datasets and large checkpoints are not committed.
All dataset sources and licensing must be documented.

## Status

Training and evaluation performed on Kaggle.
Application integration is planned.

## Author

Wafa Bila Syaefurokhman

GitHub: https://github.com/MENSTRUE