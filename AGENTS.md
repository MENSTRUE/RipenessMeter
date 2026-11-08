# AGENTS.md — RipenessMeter

## Project Rules

1. Preserve the root repository structure.
2. Do not create a tracked datasets/ directory.
3. Do not commit private data or API credentials.
4. Never fabricate model metrics.
5. Keep held-out test data out of model selection.
6. Document all dataset sources and licensing.
7. Audit label conflicts and data leakage.
8. Keep original and derived annotations traceable.
9. Export reproducible model metadata.
10. Clearly disclose model limitations.

## ML Standards

- Fix random seeds where possible.
- Validate image and label integrity.
- Separate training, validation, and testing.
- Prefer grouping by original image or subject.
- Track all quarantined data.
- Report per-source and per-class performance.
- Preserve previous experiment checkpoints.
- Do not overstate causal or field generalization.

## Engineering Standards

- Python for backend and ML.
- React/Vite for frontend.
- Never hardcode secrets.
- Add automated tests.
- Keep code modular and documented.