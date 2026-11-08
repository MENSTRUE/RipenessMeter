# Backend — FastAPI inference service

**Status:** implemented, locally runnable; public deployment not verified. Source of truth: [`app/main.py`](app/main.py), [`requirements.txt`](requirements.txt), [`tests/test_api.py`](tests/test_api.py).

## Responsibilities and architecture

`app.main` declares a single FastAPI service with startup lifespan checkpoint loading. The `MODEL` singleton is protected during inference by `MODEL_LOCK`. Load uses `torch.load(..., weights_only=True)` and strict `state_dict` validation, expecting MobileNetV3-Small classes `unripe`, `ripe`, `overripe`. `USE_CUDA=1` enables GPU if available; otherwise CPU. No database or persistent image storage is implemented.

## API contract

| Method | Path | Purpose | Outcome |
|---|---|---|---|
| GET | `/api/v1/health` | Process health | `status`, `service`, `model_ready`; status can be OK while model unavailable |
| GET | `/api/v1/ready` | Model load status | `ready`, `checkpoint`, `model`, `error`, `best_epoch`, `classes`, `device` (when loaded) |
| GET | `/api/v1/classes` | Operational labels | ordered classes and display names |
| POST | `/api/v1/predict` | Banana image inference | multipart field `image`; prediction JSON |

`POST /predict` response fields: `prediction` (class key), `confidence` (max softmax score), `probabilities` (`stage`, `probability` per class), `uncertain` (score below 0.75), `model`, sanitized `filename`, `disclaimer`. Softmax values are **not calibrated probabilities of correctness**. Failure codes include **400** empty, **413** too large, **415** unsupported MIME/encoding, **422** invalid decoded image, **503** checkpoint unavailable. FastAPI validation may return **422** for a missing form field.

## Image safety and preprocessing

Only JPEG, PNG and WebP MIME types; payload maximum `MAX_UPLOAD_MB` (default **8 MiB**); decoded image limit **25,000,000 pixels**; `ImageOps.exif_transpose` then RGB conversion; `Resize((256, 256))` → `CenterCrop(224)` → Tensor → normalize mean `(0.485,0.456,0.406)`, std `(0.229,0.224,0.225)`. This MUST remain aligned with V3 validation/test preprocessing. Invalid or untrusted uploaded content is rejected; potential resource-exhaustion and image decoder vulnerabilities still require deployment controls.

## Setup — local PowerShell

```powershell
cd "D:\porto\100 day\day 34\RipenessMeter\backend"
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8011
```

Place the **trusted** Kaggle V3 checkpoint in repository root `models/best.pt` first. API docs: `http://127.0.0.1:8011/docs`. Readiness: `http://127.0.0.1:8011/api/v1/ready`.

```powershell
curl.exe -X POST "http://127.0.0.1:8011/api/v1/predict" -F "image=@C:\path\to\banana.jpg"
```

## Configuration and known limits

`MODEL_PATH` overrides checkpoint location; `USE_CUDA` defaults to 0; `MAX_UPLOAD_MB` controls payload size; `CORS_ORIGINS` is a comma-separated allowlist (code default covers 5173, **not** necessarily the current 5181 dev origin). Browser requests through Vite proxy are same-origin; for direct browser calls from 5181, explicitly set an appropriate origin. No production auth, rate limiting, request tracing, request queue, persistent storage, or TLS termination. Configure those before Internet deployment.

## Troubleshooting

- `10048` bind error: 8011 already occupied; inspect process instead of killing unrelated backend.
- `/health` returns PayPal fields: you connected to the wrong project (port 8000).
- `/ready` `ready=false`: inspect `error`, `MODEL_PATH`, checkpoint V3 structure, and model SHA provenance.
- 503 prediction: API is up but model failed startup loading.
- Frontend offline while API ready: inspect `frontend/vite.config.ts` and Vite server port.

[Architecture](../docs/en/architecture.md) · [Deployment](../docs/en/deployment.md) · [Troubleshooting ID](../docs/id/troubleshooting.md)
