# Windows PowerShell scripts

[`SETUP_RIPENESSMETER.ps1`](SETUP_RIPENESSMETER.ps1) creates `backend/.venv` if absent using `py -3.11`, installs Python requirements, runs backend pytest, performs `npm install` and `npm run build`. It does not download a checkpoint, and does not create a backend server by itself.

[`START_RIPENESSMETER.ps1`](START_RIPENESSMETER.ps1) checks the Python virtual environment and `node_modules`, opens separate PowerShell processes for FastAPI and Vite, and prints **backend 8011 / frontend 5181**. The script does not check existing port ownership or model readiness; verify separately.

```powershell
cd "D:\porto\100 day\day 34\RipenessMeter"
Set-ExecutionPolicy -Scope Process Bypass -Force
.\scripts\SETUP_RIPENESSMETER.ps1
.\scripts\START_RIPENESSMETER.ps1
Invoke-RestMethod http://127.0.0.1:8011/api/v1/ready
```

Never kill all Python/Node processes to resolve a port conflict: a separate local MilestonePay project uses 8000. `git status` before committing to avoid accidentally including generated files. [Troubleshooting](../docs/en/troubleshooting.md).
