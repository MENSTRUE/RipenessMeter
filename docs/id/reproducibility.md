# Reproduksibilitas dan integritas artefak

## Lingkungan

Log Kaggle V3 mencatat Python **3.13.16**, Torch **2.11.0+cu130**, Tesla T4 (sesuai eksekusi saat itu; image paket bisa berubah). Setup backend lokal menargetkan Python **3.11**; package frontend mencantumkan React 19, TypeScript ~5.6, Vite ^6. Gunakan constraints dan lockfile; jangan mengklaim lingkungan Kaggle dan lokal identik bit-per-bit. Mount dataset: `/kaggle/input/datasets/loliwibu/ripenessmeter-dataset`. Seed V3 **42**, MobileNetV3-Small pretrained ImageNet memerlukan Internet atau bobot cache terpercaya untuk retraining.

## Protokol eksperimen

Jalankan `notebooks/ripenessmeter.ipynb` berurutan pada GPU; verifikasi inventaris sumber 820/673, kelas asli, jumlah bounding box valid, karantina audit, manifest split, serta assert jumlah sampel **sebelum** training. Seleksi checkpoint berdasarkan macro-F1 validasi dan membuat ZIP recovery sebelum evaluasi test. Output: checkpoint, manifest, metrik JSON/CSV, gambar visual, serta dua ZIP RECOVERY/RESULTS di `/kaggle/working`. Pertahankan hasil V2 sebagai jejak baseline. Periksa integritas CRC output.

## Verifikasi artefak

`reports/run_config.json` mencatat SHA-256 checkpoint `8c6fccb462e6a427aada769ed90b531f6f06e9ed2fadb991c2683eedc1cd881f` dan epoch 7. Repo GitHub tidak menyimpan `.pt`. Setelah mengunduh model dari hasil Kaggle milikmu:

```powershell
Get-FileHash .\models\best.pt -Algorithm SHA256
```

Bandingkan hash; jangan menandai valid tanpa hasil cocok. CPU/CUDA dan operasi acak bisa menghasilkan sedikit perbedaan saat ulang training. Pertahankan split asli dan jangan tuning menggunakan test. `training_manifest.csv` berisi path sistem Kaggle, bukan tautan unduhan sumber; gunakan bersama JSON provenans.

## Reproduksi aplikasi lokal

Jalankan `scripts/SETUP_RIPENESSMETER.ps1` (pytest + build TS/Vite), lalu `scripts/START_RIPENESSMETER.ps1`; periksa `http://127.0.0.1:8011/api/v1/ready` dan UI `http://127.0.0.1:5181`. Startup berhasil ≠ prediksi benar: uji gambar baru berlabel untuk evaluasi.
