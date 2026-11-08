# Kartu model — RipenessMeter V3

## Identitas dan tugas

Model: **MobileNetV3-Small** (Torchvision, bobot ImageNet lalu fine-tuning terawasi); tugas: klasifikasi foto pisang RGB menjadi tiga kelas. Urutan `unripe`, `ripe`, `overripe`; tensor gambar 224×224. Ditujukan untuk riset pendidikan, demo, dan skrining visual dengan peninjauan manusia. **Bukan** uji kematangan laboratorium, sertifikasi pangan, grading otonom, atau deteksi banyak objek.

## Data, training dan validasi

Menggunakan BananaImageBD V2 (empat kelas asli digabung menjadi tiga) serta crop objek valid dari Annotated Banana Ripeness Stage V1. Konflik label dan kandidat kemiripan lintas split dikarantina; final **1.055 train / 168 validasi / 165 test**. Champion **epoch 7** dipilih berdasarkan macro-F1 validasi **0,9770**. Training memakai augmentasi; inferensi memakai normalisasi ImageNet deterministik. Lihat [metodologi](methodology.md).

## Performa

Test BananaImageBD (98 gambar): accuracy **93,88%**, macro-F1 **91,87%**. Test AnnotatedBanana (67 crop): accuracy **100%**, macro-F1 **100%**; hanya berlaku pada sumber tersebut, bukan bukti generalisasi ke kamera/buah baru. Kelas *ripe* BananaImageBD memiliki F1 **0,8333**, menampakkan kesalahan yang tersamarkan metrik agregat. Tidak tersedia confidence terkalibrasi maupun benchmark independen tingkat identitas buah. [Evaluasi](evaluation.md).

## Pemakaian API dan proteksi

Checkpoint terpercaya disediakan lokal, tidak menerima unggahan bobot arbitrer; FastAPI memvalidasi ukuran, jumlah piksel, MIME, serta format dekode. Skor keluaran softmax belum dikalibrasi; label `uncertain` di bawah 0,75 hanyalah heuristik antarmuka. Skema JSON dan endpoint tersedia di [`../../backend/README.md`](../../backend/README.md).

## Risiko dan pembatasan

Kesalahan klasifikasi dapat memicu salah keputusan panen/sortir; variasi latar/domain, penyederhanaan kelas, dan risiko kemiripan lintas split signifikan. Manusia tetap memeriksa hasil. Pada server lokal, gambar didekode di memori; keamanan hosting belum dibuktikan. Kode MIT; hak dataset dan gambar turunan tetap terpisah. [Keterbatasan](limitations.md).
