# Frontend — React 19, TypeScript and Vite

**Status:** implemented local single-page analyzer. Source: [`src/App.tsx`](src/App.tsx), [`src/styles.css`](src/styles.css), [`vite.config.ts`](vite.config.ts), [`package.json`](package.json).

## User interface and behavior

The landing page provides a product introduction, an analyzer section and an explanatory section. Users can select or drop a single JPEG/PNG/WebP image (max **8 MiB**) and see a browser preview. On submit, the UI sends multipart `image` to `/api/v1/predict`, then displays predicted stage, uncalibrated softmax confidence and all three class scores. It supports reset, invalid-file messages, loading spinner, abort on selected-file change, 45-second request timeout, model readiness polling on initial render and manual refresh. No login, gallery/history, bulk analysis, browser-side model, or deployed telemetry is implemented.

## API integration

The source uses **relative `/api/v1/...` paths**; `vite.config.ts` proxies them to `http://127.0.0.1:8011`. Current frontend development port is **5181** with `strictPort=true`. Older README text mentioning 5173/8000 was stale. FastAPI readiness `ready` controls Analyze button state. A successful health response alone does not prove the model is loaded.

## Setup

```powershell
cd "D:\porto\100 day\day 34\RipenessMeter\frontend"
npm install
npm run build
npm run dev
```

Open `http://127.0.0.1:5181`. Backend must be running on 8011 with a readable trusted checkpoint. Run `npm run build` to compile TypeScript and produce a production bundle. Vite proxy is a **dev-server feature**; production hosting needs an equivalent reverse proxy or API URL configuration (not yet shipped).

## UX and security notes

File size/type checks in UI improve feedback but are not a security boundary; backend validates again. Preview object URLs are cleaned up. Score displays are **not probabilistic certainty**. Image handling currently occurs on local API without persistence; do not promise privacy guarantees for any future hosted version. Accessibility, responsive behavior, and browser support warrant further automated/manual testing.

[API contract](../backend/README.md) · [Architecture](../docs/en/architecture.md) · [Troubleshooting](../docs/en/troubleshooting.md)
