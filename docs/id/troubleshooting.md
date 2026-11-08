# Troubleshooting — workflow lokal

| Gejala | Kemungkinan sebab | Pemeriksaan / solusi aman |
|---|---|---|
| UI terbuka tetapi `Model offline` | Proxy salah atau model API belum siap | `Invoke-RestMethod http://127.0.0.1:8011/api/v1/ready`; cek `frontend/vite.config.ts` ke 8011; restart Vite 5181 |
| Port error `10048` | Port sedang dipakai layanan lain | `Get-NetTCPConnection -LocalPort 8011 -State Listen`; periksa OwningProcess, jangan hentikan aplikasi lain sembarangan |
| `/health` memuat `paypal_connected` | Salah backend: MilestonePay ada di 8000 | Pakai backend RipenessMeter 8011; endpoint `/health` saja tidak memastikan identitas layanan |
| `/ready` 404 | Salah backend atau route lama | Buka `http://127.0.0.1:8011/docs`; endpoint semestinya `/api/v1/ready` |
| `/ready` bernilai false | Checkpoint hilang/tidak kompatibel/tidak terpercaya | Cek `models/best.pt`, field `checkpoint`/`error`, dan SHA-256 versus `reports/run_config.json` |
| Predict 503 | Gagal memuat model saat startup | Betulkan checkpoint, restart backend; jangan gunakan prediksi dummy |
| Gambar 413 / 415 / 422 | Byte/piksel terlalu besar, format salah, gambar rusak | Gunakan JPEG/PNG/WebP valid di bawah 8 MiB |
| Port frontend berbeda | Vite lain aktif atau konfigurasi tidak strict | Vite repo memakai `5181`, `strictPort=true`; buka `http://127.0.0.1:5181` |
| Build npm gagal | TypeScript, dependensi, atau Node | Jalankan `npm install`, `npm run build` di `frontend/`, baca error aktual |
| Skrip PowerShell diblokir | Execution policy lokal | `Set-ExecutionPolicy -Scope Process Bypass -Force`; jalankan skrip sesuai dokumentasi |

## Smoke check end-to-end

```powershell
cd "D:\porto\100 day\day 34\RipenessMeter"
Invoke-RestMethod http://127.0.0.1:8011/api/v1/health
Invoke-RestMethod http://127.0.0.1:8011/api/v1/ready
Invoke-RestMethod http://127.0.0.1:5181/api/v1/ready
Get-FileHash .\models\best.pt -Algorithm SHA256
```

Kedua endpoint readiness seharusnya mengidentifikasi RipenessMeter dan mengembalikan `ready=true` dengan metadata backend yang sama. Uji inference membutuhkan **foto pisang valid milik pengguna**, bukan respons API mock. API status 200 membuktikan jalur perangkat lunak bekerja, bukan ketepatan klasifikasi.
