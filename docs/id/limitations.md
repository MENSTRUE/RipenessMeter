# Keterbatasan dan batas klaim

## Dataset dan pengukuran

- Kelas asli **Green + Semi-ripe** sengaja digabung sebagai **unripe** operasional. Ini taksonomi produk, bukan standar agronomi universal.
- BananaImageBD memiliki 820 gambar asli, AnnotatedBanana 673 gambar induk beranotasi; V3 menggunakan **1.388 contoh klasifikasi setelah karantina**, bukan seluruh gambar sebagai subjek independen.
- 97 pasangan kandidat kemiripan lintas split dan 92 sampel karantina ditandai otomatis. Heuristik dapat false positive/negative. Independensi identitas buah/tanaman, kamera, lokasi, dan sesi belum diverifikasi.
- Anotasi eksternal diubah menjadi **crop pisang tunggal**; model bukan detector untuk banyak objek pada satu foto.

## Evaluasi

- Test 98 gambar / 67 crop masih kecil. Skor 100% AnnotatedBanana **bukan** jaminan; bootstrap [1,1] tidak mencakup perubahan domain luar.
- Data test mungkin telah ditinjau selama pengembangan lintas versi; jangan memasarkan sebagai benchmark deployment independen yang sama sekali belum pernah dilihat.
- Softmax bukan probabilitas benar yang dikalibrasi; ambang 0,75 hanyalah heuristik.
- Belum ada benchmark foto lapangan, pengujian perubahan domain, robustness formal, analisis fairness, atau estimasi biaya salah prediksi ripe.

## Sistem dan operasi

- Prototipe lokal berjalan; hosting produksi publik dan threat modeling belum diverifikasi. Belum ada rate limiting, autentikasi, observabilitas, kepatuhan, atau load test.
- Checkpoint binary tidak dilacak GitHub. README tidak dapat memastikan pengguna memiliki artefak V3 sampai SHA-256 lokal dibandingkan.
- Hak kode, dataset, dan contoh gambar turunannya berbeda; periksa syarat penerbit sebelum redistribusi.

## Klaim yang boleh/tidak boleh

Boleh: *V3 mendapat macro-F1 91,87% pada 98 gambar test BananaImageBD; 100% pada 67 crop objek AnnotatedBanana sesuai split sumber.* Tidak boleh: *100% akurat pada semua pisang, bersertifikasi pasar/pertanian, teruji global, mendeteksi banyak pisang, diverifikasi bebas leakage identitas.*

Selanjutnya: uji buta kamera/lokasi baru, tinjau kandidat duplikat manual, kalibrasi/ECE, robustness pencahayaan, audit keamanan deployment.
