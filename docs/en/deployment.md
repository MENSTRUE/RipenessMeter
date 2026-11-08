# Deployment and security readiness

## Verified vs planned

**Verified in repository:** FastAPI and React app code, local port configuration, script-driven Windows setup, model readiness endpoint and request validation. **Not verified:** public HTTPS hosting, CI/CD, load tests, authentication, privacy policy, security review, monitoring and disaster recovery. Do not call this production-ready.

## Development deployment

From repository root, ensure trusted `models/best.pt` exists, then execute setup and start PowerShell scripts. Backend `127.0.0.1:8011`, UI `127.0.0.1:5181`. Use `/api/v1/ready` to confirm loaded checkpoint; open `http://127.0.0.1:8011/docs` for API specification. Vite proxy forwards relative `/api` calls to the backend. `npm run build` generates static frontend artifacts but does not configure production API routing.

## Production design checklist (not implemented)

- Host API behind an HTTPS reverse proxy with strict body-size/timeouts, rate limiting and request concurrency caps; protect against decompression bombs and high-memory uploads.
- Set explicit `CORS_ORIGINS`, secrets policy, TLS, authentication/authorization when needed; do not expose Python dev `--reload` server publicly.
- Store checkpoint in a trusted artifact registry, validate SHA-256 and package compatibility at deployment; attach provenance and rights notices.
- Add structured telemetry that minimizes personal photo retention; document retention/deletion and user notice rather than promising what is unimplemented.
- Add health vs readiness probes, fallback/degraded UX, deployment reproducibility, security audit, accessibility checks, load tests and rollback.
- Validate on distinct camera/site imagery and define manual review before operational decisions.

## Privacy facts

Current backend reads uploaded bytes into memory and does not explicitly save uploaded photo files; current frontend creates a temporary local preview object URL. This observation applies to the checked code only, not external network/proxy logs or hypothetical hosted infrastructure. Production retention policy is **not established**.
