param([string]$ProjectRoot = (Split-Path $PSScriptRoot -Parent))
$Backend = Join-Path $ProjectRoot 'backend'
$Frontend = Join-Path $ProjectRoot 'frontend'
$Python = Join-Path $Backend '.venv\Scripts\python.exe'
if (-not (Test-Path $Python)) { throw 'Backend environment missing. Run SETUP_RIPENESSMETER.ps1 first.' }
if (-not (Test-Path (Join-Path $Frontend 'node_modules'))) { throw 'Frontend node_modules missing. Run SETUP_RIPENESSMETER.ps1 first.' }
Start-Process powershell.exe -ArgumentList @('-NoExit','-Command',"Set-Location '$Backend'; & '$Python' -m uvicorn app.main:app --host 127.0.0.1 --port 8011 --reload")
Start-Process powershell.exe -ArgumentList @('-NoExit','-Command',"Set-Location '$Frontend'; npm run dev")
Write-Host 'Backend: http://127.0.0.1:8011/docs | Frontend: http://127.0.0.1:5181' -ForegroundColor Green

