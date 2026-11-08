# Provenans dataset

## Sumber, fungsi, dan jejak data

**BananaImageBD V2** — <https://data.mendeley.com/datasets/ptfscwtnyz/2>. Notebook V3 mencatat **820 gambar asli** dengan kelas Green, Semi-ripe, Ripe, dan Overripe. Dua berkas yang kontennya identik menurut SHA-256 tetapi label tahap aslinya saling bertentangan dikarantina; tersisa **818** sebelum pemeriksaan kemiripan visual lintas split. Pemetaan target: **Green + Semi-ripe → unripe; Ripe → ripe; Overripe → overripe**. Penggabungan ini adalah definisi operasional produk, bukan bukti kedua tahap biologis identik.

**Annotated Banana Ripeness Stage V1** — <https://data.mendeley.com/datasets/56c75hvm7r/1>. Memuat **673** gambar induk beranotasi bounding box YOLO ternormalisasi. Notebook menerima **662** crop dari **661** gambar induk dan menolak **12** kotak tidak valid. Setiap crop mempertahankan pembagian train/validation/test gambar induknya; tidak dilakukan pembagian ulang pada tingkat crop.

## Split dan audit duplikat

V3 memeriksa **1.480** kandidat sebelum penyaringan perseptual dan mempertahankan **1.388** sampel (train 1.055; validasi 168; test 165), dengan **92** sampel dikarantina terkait **97** pasangan kandidat kemiripan lintas split. Aturan visual menggabungkan jarak dHash 64 bit ≤2 dan MAE RGB 32×32 ternormalisasi ≤0,065, ditambah pemeriksaan SHA-256 persis. Konflik byte persis lintas split: **0** menurut `dataset_audit.json`; kandidat visual **bukan** verifikasi identitas buah. Independensi tingkat buah/lokasi **belum diverifikasi**.

## Lisensi dan ketentuan

JSON provenans mencatat CC BY 4.0 pada kedua sumber **sebagaimana dilaporkan halaman sumber**; verifikasi kembali persyaratan atribusi penerbit sebelum menyebarkan foto atau dataset turunannya. Lisensi MIT kode tidak otomatis mencakup foto dataset. Jangan commit gambar mentah atau metadata sensitif. Tanggal audit tercatat **2026-11-08 UTC**.

**Bukti:** [`../../reports/dataset_provenance.json`](../../reports/dataset_provenance.json), [`dataset_audit.json`](../../reports/dataset_audit.json), [`external_box_audit.json`](../../reports/external_box_audit.json), [`training_manifest.csv`](../../reports/training_manifest.csv).
