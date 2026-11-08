# AGENTS.md — RipenessMeter engineering operating rules

## Purpose and boundaries

Maintain an auditable three-class banana ripeness **classification** prototype. Existing code and reports, not marketing language, are the source of truth. Current stack: PyTorch/Torchvision, FastAPI, React/TypeScript/Vite. This file governs root; component AGENTS files only specialize it.

## Source-of-truth priority

1. Actual code/configuration and repository tree.
2. Versioned `reports/*.json`, per-source CSV results, notebook code and checkpoint metadata.
3. Source dataset publications and explicitly recorded license terms.
4. Markdown docs, which MUST be reconciled with the above, not treated as more authoritative.

## Invariants

- Preserve `notebooks/`, `models/`, `reports/`, `assets/`, `backend/`, `frontend/`, `docs/`, `scripts/`.
- Never add raw dataset archives or model binaries to Git; no tracked `datasets/` directory.
- Do not change dataset labels, train/validation/test boundaries, thresholds, split logic or notebook results merely to raise metrics.
- All code changes must be reviewed for impact on reproducibility, backend contracts, frontend assumptions, tests and documentation.
- Do not delete experiment V2/V3 lineage or replace test values without a new audited run.

## Model and scientific integrity

- Local trusted checkpoint: `models/best.pt`, `MobileNetV3-Small`, `['unripe','ripe','overripe']`, image size 224.
- Verify checksum against `reports/run_config.json` when asserting checkpoint identity. GitHub currently does not track the binary, so remote documentation must not claim the checksum verifies an absent file.
- Input uses Resize(256×256) → CenterCrop(224) → ToTensor → ImageNet normalization. Don't silently change preprocessing.
- The 4-class native-to-3-class merger is an operational design choice, not scientific identity.
- Validation-only champion selection; keep held-out data out of tuning.
- Distinguish sample/crop counts from distinct banana identities; keep source and parent lineage.
- Perceptual duplicate **candidates** require manual judgment; no biological subject independence guarantee.
- Cite `reports/evaluation_by_source.json` for test numbers. Never invent class performance or deployment claims.
- Confidence values are uncalibrated softmax scores; do not describe them as reliability or uncertainty estimates with known calibration.

## Backend engineering

- Preserve `GET /api/v1/health`, `/ready`, `/classes`; `POST /api/v1/predict` multipart field `image`.
- Reject unsupported formats, empty payloads, excessive bytes/pixels, invalid image data; preserve safe `torch.load(weights_only=True)`.
- Never download arbitrary model weights or deserialize untrusted checkpoints in request handlers.
- Preserve separate backend port 8011 for local development; port 8000 belongs to another local project.
- Add/update pytest coverage for behavior changes. Review CORS origins when configuring a new origin; avoid wildcard in authenticated production contexts.

## Frontend engineering

- Vite dev server port 5181; proxy `/api` to `http://127.0.0.1:8011` (verify in `frontend/vite.config.ts`).
- Accurate status: distinguish API health from checkpoint readiness. Maintain explicit error handling and request timeout.
- Do not invent confidence bars or mock result values when live inference fails.
- Keep file size and type validation, keyboard access, and mobile layout. Test `npm run build` before release.

## Security, privacy, assets

- Do not commit `.env`, keys, secrets, datasets, `.pt` binaries or third-party images lacking redistribution rights.
- Browser uploads are processed by local API currently; production hosting requires threat modeling, upload caps, DoS protection, access control and privacy policy.
- Only embed existing repository screenshots/plots with accurate relative paths and contextual captions. Never fabricate a screenshot.
- Root LICENSE is MIT for repository software; dataset terms are separate.

## Bilingual docs and workflow

- Keep `docs/en/` and `docs/id/` in equivalent substantive scope. Update root README, component docs and both languages together.
- Before change: inspect tree, `git status`, source file, report and any linked image.
- During change: write focused diff; preserve working directories; avoid breaking local model path.
- After change: run backend pytest, frontend build, check linked assets and relative references, verify README numbers against JSON, `git diff --check`.
- Commit examples: `docs: synchronize bilingual RipenessMeter documentation`, `fix(api): ...`, `test: ...`.

## Definition of Done

Docs/implementation claims match files; backend API/tests and frontend build are checked where runnable; metrics match artifacts; links resolve; model binary is not committed; limitations/unknowns are explicit; no destructive operation occurs outside the approved scope.

## Before → Now → Next

Before: V2 exploratory dual-source baseline. Now: V3 candidate near-duplicate quarantine, source-stratified test reports, working local UI/API. Next: independent subject/site evaluation, score calibration, hosting hardening and end-to-end automated tests.
