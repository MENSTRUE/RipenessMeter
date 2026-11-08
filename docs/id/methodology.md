# Metodologi penelitian

## Alur eksperimen

1. Inventarisasi citra dan anotasi YOLO; validasi makna label asli.
2. Karantina file BananaImageBD identik SHA-256 yang memiliki konflik label tahap asli; kelompokkan gambar identik sebelum stratified split sumber utama.
3. Ekstraksi crop objek YOLO yang valid; pertahankan split gambar induk.
4. Temukan **kandidat** duplikat byte/perseptual lintas split, karantina sampel terdampak, ekspor manifest. Pencocokan kemiripan bukan pengenalan identitas buah.
5. Latih MobileNetV3-Small pretrained ImageNet dengan dua dataset serta sampling seimbang tingkat sumber.
6. Pilih checkpoint terbaik hanya berdasarkan macro-F1 validasi; simpan checkpoint **sebelum** pengujian held-out akhir.
7. Hitung confusion matrix, accuracy/macro-F1 per sumber, bootstrap gambar induk, serta dokumentasi contoh kesalahan.

## Konfigurasi dan praproses

Seed 42; tiga kelas `unripe, ripe, overripe`; input model 224×224; transform train mencakup resize 256, random resized crop (skala 0,77–1,0), flip horizontal, color jitter ringan, tensor, normalisasi ImageNet. Evaluasi menggunakan resize 256×256 lalu center crop deterministik 224×224. AdamW learning rate **2e-4**, batch **32**, maksimum **35 epoch**, patience **7**, cosine scheduler dan label smoothing **0,03** pada notebook V3. Batas training 90 menit dapat menghentikan proses di batas epoch. WeightedRandomSampler menyetarakan kontribusi sumber, tanpa menambah data buatan atau mengubah label. Notebook tetap rujukan eksperimen utama.

## Validitas data

Model mengklasifikasikan foto atau crop pisang tunggal; **tidak** menghasilkan bounding box. Identitas sumber dan gambar induk dipertahankan di reports. Risiko: penyederhanaan label, keterbatasan screening kemiripan, latar/domain, kondisi kamera, serta belum adanya ID biologis buah yang independen.

**Bukti:** [`../../notebooks/ripenessmeter.ipynb`](../../notebooks/ripenessmeter.ipynb), [`../../reports/run_config.json`](../../reports/run_config.json), [`../../reports/dataset_audit.json`](../../reports/dataset_audit.json).
