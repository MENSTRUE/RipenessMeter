# Reproducibility and artifact integrity

## Environment

The Kaggle V3 execution log reports Python **3.13.16**, Torch **2.11.0+cu130**, Tesla T4 (recorded at execution; package/image may evolve). Local backend setup targets Python **3.11**; frontend package lists React 19, TypeScript ~5.6, Vite ^6. Use declared constraints and lockfile; don't claim Kaggle and local runtime are bitwise identical. Dataset mount: `/kaggle/input/datasets/loliwibu/ripenessmeter-dataset`. V3 seed **42**, ImageNet pretrained MobileNetV3-Small requires Internet or trusted cached model weights for retraining.

## Experimental protocol

Run `notebooks/ripenessmeter.ipynb` from top to bottom on GPU; verify exact 820/673 source inventories, original class names, valid bounding box counts, audit quarantine, group split manifest and sample count assertions **before** training. Model selection uses validation macro-F1 and stores a recovery archive before evaluating test. Output: V3 checkpoint, manifests, JSON/CSV metrics and image figures, and separate RECOVERY/RESULTS archives under `/kaggle/working`. Keep previous V2 outputs as baseline lineage. Verify all outputs and CRC.

## Artifact verification

`reports/run_config.json` records checkpoint SHA-256 `8c6fccb462e6a427aada769ed90b531f6f06e9ed2fadb991c2683eedc1cd881f` and epoch 7. The GitHub repo does not contain the `.pt` file. When downloading it from your own Kaggle results, run:

```powershell
Get-FileHash .\models\best.pt -Algorithm SHA256
```

Compare the digest; never mark it verified without a match. CPU and CUDA numerical differences and stochastic operations may alter exact result details on retraining. Reuse original splits and do not tune on held-out test. `training_manifest.csv` stores Kaggle filesystem paths, not downloadable source URLs; pair it with the provenance JSON.

## Local app reproducibility

Run `scripts/SETUP_RIPENESSMETER.ps1` (pytest + TypeScript/Vite build), then `scripts/START_RIPENESSMETER.ps1`; test `http://127.0.0.1:8011/api/v1/ready` and UI `http://127.0.0.1:5181`. Startup success ≠ test prediction correctness: use labeled new images for evaluation.
