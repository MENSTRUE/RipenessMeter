# Dataset provenance

## Sources, purpose and lineage

**BananaImageBD V2** — <https://data.mendeley.com/datasets/ptfscwtnyz/2>. The V3 notebook inventoried **820 original files** across Green, Semi-ripe, Ripe and Overripe. Two files with conflicting native stage labels on the same SHA-256 content were quarantined, leaving **818** before cross-split perceptual screening. Mapping is **Green + Semi-ripe → unripe; Ripe → ripe; Overripe → overripe**. This is a simplification for the product's three-class goal; it must not be presented as a scientific equivalence of the stages.

**Annotated Banana Ripeness Stage V1** — <https://data.mendeley.com/datasets/56c75hvm7r/1>. **673** original images with YOLO normalized bounding-box labels. The notebook accepts **662** crops drawn from **661** image parents and rejects **12** invalid boxes. Each crop inherits the parent image's published train/validation/test split; no crop-level resplitting occurs.

## Split and duplicate assessment

V3 screened **1,480** candidates before perceptual screening and retained **1,388** (train 1,055; validation 168; test 165), quarantining **92** samples associated with **97** cross-split visual candidate pairs. Its approximate visual rule combines 64-bit dHash distance ≤2 with normalized 32×32 RGB MAE ≤0.065, in addition to exact SHA-256. Exact cross-split byte pairs: **0** in `dataset_audit.json`; the reported visual flags are *candidates*, not confirmed identities. Subject/farm identity independence is **not verified**.

## Licenses and usage conditions

The source provenance JSON records CC BY 4.0 for both sources **as reported on source pages**; verify current publisher terms/attribution before copying images or distributing derivative datasets. Code's MIT license covers repository code, not source photos. Never commit raw images or personally sensitive capture metadata. Audit date recorded in `reports/dataset_provenance.json`: **2026-11-08 UTC**.

**Evidence:** [`../../reports/dataset_provenance.json`](../../reports/dataset_provenance.json), [`dataset_audit.json`](../../reports/dataset_audit.json), [`external_box_audit.json`](../../reports/external_box_audit.json), [`training_manifest.csv`](../../reports/training_manifest.csv).
