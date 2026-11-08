# Experiment evidence — V3

These CSV/JSON files are committed experiment records. **Numbers must be read from files, not screenshots or model intuition.**

| Evidence | Location | Question answered |
|---|---|---|
| Model selection | `run_config.json`, `training_history.csv` | What epoch was selected on validation? |
| Dataset audit | `dataset_audit.json`, `training_manifest.csv` | What samples and splits were used? |
| Source provenance | `dataset_provenance.json` | Which dataset release and source URL? |
| Suspected duplicates | `cross_split_visual_duplicate_candidates.csv`, `quarantined_cross_split_samples.csv` | Which samples were quarantined? |
| Source label conflicts | `primary_label_conflicts.csv` | Which identical files had conflicting native labels? |
| YOLO bounding-box audit | `external_box_audit.json` | Validated crops and rejected labels |
| Per-source metrics | `evaluation_by_source.json` | Validation/test accuracy, F1 and per-class scores |
| Confidence intervals | `bootstrap_uncertainty_by_source.json` | Parent-image bootstrap estimates, not field generalization |
| Predictions | `test_*_predictions.csv`, `val_*_predictions.csv` | Sample-level decisions and errors |
| Confusion | `test_*_confusion.csv`, `val_*_confusion.csv` | Ground-truth vs predicted classes |
| Artifact lineage | `artifact_manifest.json` | Model hash and selected epoch |

Visual plots are stored separately in [`../assets/plots/`](../assets/plots/) and example images in [`../assets/examples/`](../assets/examples/); refer to the root README for direct rendered figures. `MODEL_CARD.md` is an additional historical report: use `docs/en/model_card.md` as human-facing consolidated explanation and retain report provenance. These records do not demonstrate that users in unseen farms will receive the same performance. Any changes to source JSON require a new audited experiment, not documentation edits.
