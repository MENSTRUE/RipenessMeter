# Research notebooks — Day 34

[`ripenessmeter.ipynb`](ripenessmeter.ipynb) is the V3 Kaggle research workflow. It expects the Kaggle input at `/kaggle/input/datasets/loliwibu/ripenessmeter-dataset` and GPU T4. Internet was enabled during V3 run to fetch ImageNet-pretrained MobileNetV3-Small weights. Outputs are written to `/kaggle/working/RipenessMeter_Day34_V3_FINAL` and separate `*_RECOVERY.zip` and `*_RESULTS.zip` files.

Execution order: inspect source inventory and label classes → quarantine native conflicts → extract valid YOLO-labeled crops → screen exact and perceptual cross-split candidates → save audit manifests → train/validate, selecting best epoch on validation macro-F1 only → export recovery archive → perform held-out per-source tests → export final reports/plots/artifact ZIP. V3 log: epoch 7 selected, 1,388 samples after screening (1,055/168/165); see report JSON for exact values. V2 remains a separate prior experiment; do not replace its reported numbers or use V3 test for retuning. 

Re-run with original dataset versions, recorded seed 42 and relevant package versions; exact bitwise reproducibility is not guaranteed on GPU. The notebook copies no original dataset files into this Git repository. The manifest records local Kaggle paths and is not a browser-accessible dataset download link.

[Methodology](../docs/en/methodology.md) · [Experiment record](../docs/en/experiments.md) · [Reproducibility](../docs/en/reproducibility.md)
