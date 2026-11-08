# Troubleshooting — verified local workflow

| Symptom | Likely cause | Check / safe resolution |
|---|---|---|
| `Model offline` while UI loads | Wrong proxy target or API not ready | `Invoke-RestMethod http://127.0.0.1:8011/api/v1/ready`; verify `frontend/vite.config.ts` points to 8011; restart Vite on 5181 |
| Port `10048` bind error | An existing service occupies the selected port | `Get-NetTCPConnection -LocalPort 8011 -State Listen`; inspect OwningProcess, do not terminate unrelated apps |
| `/health` response contains `paypal_connected` | Wrong service — MilestonePay was listening on 8000 | Use RipenessMeter backend port 8011; never rely on `/health` path alone to identify service |
| `/ready` 404 | Connected to wrong backend or stale route | Visit `http://127.0.0.1:8011/docs`; expect RipenessMeter `/api/v1/ready` |
| `/ready` ready false | Missing, incompatible or untrusted checkpoint | Check local `models/best.pt`, `checkpoint`/`error` fields, SHA-256 vs `reports/run_config.json` |
| 503 on predict | Model startup loading failed | Fix checkpoint; restart backend; do not invent mock prediction |
| 413 / 415 / 422 image error | Large bytes/pixels, wrong file type, damaged photo | Use under 8 MiB JPEG/PNG/WebP valid image; keep original for debugging |
| Frontend dev port moved automatically | Another Vite server or non-strict configuration | The committed Vite config is `5181`, `strictPort=true`; use exactly `http://127.0.0.1:5181` |
| npm build failed | TypeScript, dependencies or Node environment | Run `npm install` then `npm run build` in `frontend/`, inspect exact error |
| PowerShell script blocked | Local execution policy | `Set-ExecutionPolicy -Scope Process Bypass -Force`; re-run documented scripts |

## End-to-end smoke check

```powershell
cd "D:\porto\100 day\day 34\RipenessMeter"
Invoke-RestMethod http://127.0.0.1:8011/api/v1/health
Invoke-RestMethod http://127.0.0.1:8011/api/v1/ready
Invoke-RestMethod http://127.0.0.1:5181/api/v1/ready
Get-FileHash .\models\best.pt -Algorithm SHA256
```

Both readiness requests should identify RipenessMeter and return `ready=true` with the same backend model metadata. Full inference test requires a **user-owned valid banana image**, not a mock API response. Check reports for genuine measured accuracy; API returning 200 proves functioning plumbing, not class correctness.
