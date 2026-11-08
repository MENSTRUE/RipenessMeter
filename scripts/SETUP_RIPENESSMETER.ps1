param([string]$ProjectRoot = (Split-Path $PSScriptRoot -Parent))
$ErrorActionPreference='Stop'
$Backend = Join-Path $ProjectRoot 'backend'
$Frontend = Join-Path $ProjectRoot 'frontend'
Push-Location $Backend
try {
  if (-not (Test-Path '.venv\Scripts\python.exe')) { py -3.11 -m venv .venv; if ($LASTEXITCODE -ne 0) { throw 'Cannot create virtualenv' } }
  & '.\.venv\Scripts\python.exe' -m pip install -r requirements.txt
  if ($LASTEXITCODE -ne 0) { throw 'Backend pip install failed' }
  & '.\.venv\Scripts\python.exe' -m pytest -q
  if ($LASTEXITCODE -ne 0) { throw 'Backend tests failed' }
} finally { Pop-Location }
Push-Location $Frontend
try {
  npm install
  if ($LASTEXITCODE -ne 0) { throw 'npm install failed' }
  npm run build
  if ($LASTEXITCODE -ne 0) { throw 'Frontend build failed' }
} finally { Pop-Location }
Write-Host 'Setup complete. Run .\scripts\START_RIPENESSMETER.ps1 from repository root.' -ForegroundColor Green
