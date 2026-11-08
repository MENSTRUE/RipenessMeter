# RipenessMeter — Dokumentasi Bahasa Indonesia

Day 34/100 adalah **prototipe riset lokal** untuk klasifikasi foto pisang tiga kelas, bukan deteksi banyak buah maupun sertifikasi keamanan pangan otomatis. Tersedia eksperimen Kaggle V3, laporan per sumber, kode FastAPI+React lokal, dan screenshot antarmuka yang tersimpan di GitHub. File checkpoint binary tidak disimpan di GitHub. Mulai dari [README utama](../../README.md) untuk hasil, aset visual, dan command.

## Urutan membaca

1. [Provenans dataset](dataset_provenance.md) — sumber, label, crop valid, lisensi, dan audit duplikat.
2. [Metodologi](methodology.md) — split, preprocessing, model, dan hyperparameter.
3. [Eksperimen](experiments.md) — jejak baseline, pemilihan champion dari validasi, dan artefak.
4. [Evaluasi](evaluation.md) — test held-out, metrik per kelas, interval dan confusion matrix.
5. [Kartu model](model_card.md) — tujuan pemakaian, interpretasi, dan pembatasan.
6. [Arsitektur](architecture.md) — React/Vite ↔ FastAPI ↔ checkpoint, kontrak API.
7. [Reproduksibilitas](reproducibility.md) — Kaggle, setup lokal, hash artefak, versi.
8. [Deployment](deployment.md) — alur development dan kebutuhan keamanan yang belum selesai.
9. [Troubleshooting](troubleshooting.md) — port bentrok, model offline, file gambar invalid dan setup.
10. [Keterbatasan](limitations.md) — batas klaim dan prioritas eksperimen berikutnya.

**Hierarki sumber:** kode aktual, notebook, dan artefak `reports` lebih kuat dari narasi lama. Terjemahan: [English](../en/README.md).
