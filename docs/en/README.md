# RipenessMeter — English documentation

Day 34/100 is a **local research prototype** for three-stage banana image classification, not a fruit detection or automated safety certification service. It has a verified V3 Kaggle experiment, source-specific reports, local FastAPI+React code and a committed UI screenshot. The checkpoint binary is kept outside GitHub. Begin with [main README](../../README.md) for overall results, assets and commands.

## Read by workflow

1. [Dataset provenance](dataset_provenance.md) — original sources, labels, accepted crops, licensing and duplicate audit.
2. [Methodology](methodology.md) — splits, preprocessing, architecture and hyperparameters.
3. [Experiments](experiments.md) — baseline lineage, validation-only champion and exported artifacts.
4. [Evaluation](evaluation.md) — held-out metrics, per-class errors, confidence intervals and confusion images.
5. [Model card](model_card.md) — intended use, responsible interpretation and restrictions.
6. [Architecture](architecture.md) — React/Vite ↔ FastAPI ↔ checkpoint, request and response contracts.
7. [Reproducibility](reproducibility.md) — Kaggle run, local setup, artifact hashing and version boundaries.
8. [Deployment](deployment.md) — development workflow and unimplemented security requirements.
9. [Troubleshooting](troubleshooting.md) — port collision, offline model, malformed image and setup failures.
10. [Limitations](limitations.md) — evidence-bound claims and the next evaluation priorities.

**Source hierarchy:** actual code, notebook and `reports` artifacts take precedence over older narrative documents. Translation: [Bahasa Indonesia](../id/README.md).
