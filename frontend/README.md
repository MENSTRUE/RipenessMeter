# RipenessMeter frontend

React 19 + TypeScript + Vite, responsive local model inference UI.

```powershell
npm install
npm run dev
```

Open http://localhost:5173 while backend is running on http://127.0.0.1:8000. The Vite proxy forwards `/api` to backend.

`npm run build` checks TypeScript and builds the production client. API should be proxied to the backend in deployment.
