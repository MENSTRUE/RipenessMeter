# Kesiapan deployment dan keamanan

## Terverifikasi vs rencana

**Ada di repository:** kode FastAPI/React, pengaturan port lokal, setup lewat PowerShell, endpoint readiness dan validasi upload. **Belum diverifikasi:** hosting HTTPS publik, CI/CD, load test, autentikasi, kebijakan privasi, audit keamanan, monitoring, dan disaster recovery. Jangan disebut siap produksi.

## Deployment development

Dari root repo, pastikan `models/best.pt` terpercaya ada, lalu jalankan skrip setup/start PowerShell. Backend `127.0.0.1:8011`, UI `127.0.0.1:5181`. Gunakan `/api/v1/ready` untuk memastikan checkpoint termuat; `http://127.0.0.1:8011/docs` berisi spesifikasi API. Proxy Vite meneruskan `/api` relatif ke backend. `npm run build` menghasilkan aset statis namun belum menyiapkan routing API produksi.

## Checklist produksi (belum diimplementasikan)

- Gunakan reverse proxy HTTPS dengan limit ukuran/timeout, rate limiting dan pembatasan concurrency; mitigasi decompression bomb dan unggahan besar.
- Tetapkan `CORS_ORIGINS`, aturan secret, TLS, autentikasi/otorisasi jika diperlukan; jangan membuka server dev `--reload` ke Internet.
- Simpan checkpoint di registry terpercaya, validasi SHA-256 dan kompatibilitas paket saat deploy; sertakan provenans dan hak lisensi.
- Tambahkan telemetry terstruktur dengan minimalisasi penyimpanan foto; nyatakan kebijakan retensi/hapus, jangan menjanjikan fitur yang belum ada.
- Tambahkan health/readiness probe, penanganan offline UX, reproduksi build, audit keamanan, accessibility, load test, dan rollback.
- Validasi pada foto kamera/lokasi yang berbeda dan wajibkan peninjauan manusia sebelum keputusan operasional.

## Fakta privasi

Backend saat ini membaca byte upload di memori dan tidak secara eksplisit menyimpan foto; frontend membuat object URL preview lokal sementara. Pengamatan ini hanya berdasarkan kode yang diaudit, tidak mencakup log proxy/jaringan atau hosting hipotetis. Kebijakan retensi produksi **belum tersedia**.
