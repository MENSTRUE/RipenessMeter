# RipenessMeter Day34 V3 FINAL · Model Card

- Architecture: MobileNetV3-small pretrained; fine-tuned on both BananaImageBD and Annotated Banana V1 crops.
- Target: three classes unripe/ripe/overripe. BananaImageBD Green + Semi-ripe merged into unripe as explicit operational policy.
- Primary source: 820 original whole-image examples minus conflict audit exclusions.
- External source: 673 original YOLO-labeled images yield object crops after strict bbox auditing; original train/val/test membership preserved.
- Champion checkpoint: epoch 7, validation macro-F1 0.9770; never selected on test.
- Per-domain evaluation: reports/evaluation_by_source.json.
- Risks: whole-image versus crop domain shift; near-duplicate cross-split candidates quarantined; biological subject identity still not guaranteed; external annotation noise; uncalibrated softmax.
- Usage: single banana image/crop screening, not fruit detection, not autonomous harvest decision.
- Input normalization: ImageNet RGB, resize 256 then center crop 224 at inference.
- Model: PyTorch only. TFLite/ONNX deployment requires conversion and parity verification.
- Source licenses: consult Mendeley dataset V2/V1 before redistribution; raw images not in this ZIP.
