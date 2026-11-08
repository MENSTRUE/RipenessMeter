# Limitations and claim boundaries

## Dataset and measurement

- Source-native **Green + Semi-ripe** is deliberately collapsed into operational **unripe**. This is a business taxonomy, not a universal agronomic standard.
- BananaImageBD has 820 originals, AnnotatedBanana 673 original annotated images; V3 uses **1,388 classification examples after quarantine**, not all original images as independent subjects.
- 97 cross-split candidate visual pairs and 92 quarantine samples were automatically flagged. Similarity heuristics may yield false positives and negatives. Biological plant/fruit identity, camera, farm and acquisition session disjointness remain unverified.
- External annotations become **single-banana crops**; model does not perform detection or grading of a crowded scene.

## Evaluation

- Test 98 images / 67 crops is small. Observed 100% for AnnotatedBanana does **not** imply certainty; source-conditioned bootstrap CI [1,1] excludes external shift.
- Test data may have been inspected during iterative project development across versions; do not market it as an untouched independent blind deployment benchmark.
- Softmax is not calibrated correctness probability; threshold 0.75 is a rule of thumb.
- No field-photo benchmark, distribution-shift stress testing, formal robustness, fairness analysis, or quantification of cost of false ripe predictions.

## Software and operations

- Local working prototype; public production hosting and threat modeling are unverified. Missing rate limiting, authentication, observability, compliance and capacity testing.
- Checkpoint binary is untracked in GitHub. README cannot certify the user has the V3 artifact until local SHA-256 comparison.
- License rights for code, datasets and derived visual examples differ. Confirm publisher terms before redistribution.

## Claims allowed / prohibited

Allowed: *V3 achieved 91.87% macro-F1 on 98 BananaImageBD held-out images; 100% macro-F1 on 67 published-split AnnotatedBanana object crops.* Not allowed: *100% accurate on all bananas, certified for farms/markets, field-tested worldwide, detects any number of bananas, independently verified zero leakage.*

Next: new-site/phone blinded evaluation, human review of candidate duplicates, calibration curve/ECE, robustness under lighting changes, deployment security review.
