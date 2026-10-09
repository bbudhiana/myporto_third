# Product Requirements Document
# Website Portofolio Profesional Bana Budhiana

**Versi:** 1.0 • **Tanggal:** 8 Oktober 2026 • **Bahasa dokumen:** Indonesia  
**Status:** Siap menjadi acuan implementasi; migrasi biografi memerlukan verifikasi sumber.  
**Pemilik produk:** Bana Budhiana  
**Referensi sumber yang diminta:** https://bbudhiana.indoez.com  
**Teknologi wajib:** Laravel 13.x, React, TypeScript, Tailwind CSS terbaru yang kompatibel, dan MariaDB.

## 1. Ringkasan dan batas bukti

Website ini dirancang sebagai portofolio profesional yang menjelaskan identitas, pengalaman, kompetensi, serta kontribusi Bana Budhiana melalui konten ringkas dan studi kasus yang dapat dipertanggungjawabkan. Pengunjung harus dapat memahami fokus profesinya, menilai relevansi pengalaman, dan menemukan jalur kontak tanpa menelusuri halaman yang panjang atau antarmuka yang rumit. Arah visualnya adalah terang, lembut, bersih, mudah dibaca, dan modern; dark mode tidak termasuk kebutuhan produk.

**[FAKTA—instruksi pengguna]** Nama yang digunakan adalah Bana Budhiana. Pengalaman baru yang wajib ditambahkan adalah **Senior Software and AI Engineer**, periode **2026–sekarang**. Nama perusahaan, bulan mulai, status kepegawaian, lokasi, teknologi AI yang benar-benar digunakan, serta hasil pekerjaan belum diberikan. Instruksi pengguna menjadi dasar entri ini, bukan bukti independen mengenai pekerjaan tersebut.

**[PERLU VERIFIKASI]** Situs sumber tidak dapat dibaca melalui jalur akses yang tersedia ketika dokumen ini disusun. Karena itu, PRD ini tidak mengklaim telah mengaudit tampilan lama atau menyalin seluruh isi situs tersebut. Riwayat pekerjaan sebelumnya, pendidikan, proyek, foto, CV, alamat surel, dan tautan sosial harus diambil dari sumber itu ketika akses tersedia atau dari materi yang diberikan pemilik. Profil publik lain dengan nama yang sama tidak dipakai untuk mengisi biografi karena keterkaitan identitasnya belum dikonfirmasi.

**[OPINI—keputusan produk]** Seluruh ketentuan desain, arsitektur, prioritas, anggaran performa, dan alur pengelolaan di bawah adalah rekomendasi implementasi. Angka target bukan hasil pengukuran website lama. **[HIPOTESIS]** Penyajian kompetensi yang diikuti bukti proyek dan CTA yang jelas dapat membantu calon kolaborator menilai kecocokan; hipotesis ini harus dievaluasi melalui pengujian pengguna dan data setelah peluncuran.

Label verifikasi merupakan metadata editorial. Label tersebut tidak boleh muncul sebagai teks mentah pada website produksi. Konten yang belum layak publikasi disembunyikan atau tetap berstatus draft.

## 2. Tujuan produk, audiens, dan pengukuran

Tujuan utama adalah menghasilkan profil profesional yang kredibel, bukan sekadar halaman dekoratif. Pengalaman senior harus terlihat melalui konteks keputusan teknis, peran aktual, dan bukti hasil kerja. Klaim keahlian tidak boleh bergantung pada persentase kemampuan atau angka pencapaian yang tidak memiliki sumber.

| Audiens | Pertanyaan utama | Dukungan produk | Tindakan yang diharapkan |
|---|---|---|---|
| Recruiter dan hiring manager | Apakah pengalaman dan kompetensinya relevan? | Ringkasan peran, timeline, CV, studi kasus | Mengunduh CV atau menghubungi |
| Founder dan calon klien | Masalah apa yang dapat dibantu? | Fokus layanan, pendekatan kerja, proyek | Mengirim konteks kebutuhan |
| Engineering leader | Bagaimana kualitas keputusan teknisnya? | Arsitektur, trade-off, tanggung jawab, bukti | Membaca studi kasus lalu berdiskusi |
| Rekan profesional | Bagaimana memulai kolaborasi? | Profil, tautan profesional, kontak | Mengirim pesan |
| Pemilik portofolio | Bagaimana memperbarui konten dengan aman? | Admin sederhana dengan draft dan preview | Memperbarui serta menerbitkan konten |

| Indikator | Definisi operasional | Target atau metode evaluasi |
|---|---|---|
| Kejelasan identitas | Peserta menyebut nama, peran, dan fokus setelah melihat hero | Minimal 4 dari 5 peserta uji formatif; bukan estimasi populasi |
| Kemudahan kontak | Peserta menemukan dan membuka kontak tanpa arahan | Minimal 4 dari 5 peserta dalam 30 detik |
| Integritas publikasi | Proporsi entri publik dengan sumber atau persetujuan pemilik | 100% sebelum peluncuran |
| Konversi kontak | Submit valid yang tersimpan / sesi manusia yang terukur | Baseline 30 hari; target peningkatan ditentukan sesudah baseline |
| Ketertarikan pada bukti | Sesi yang membuka studi kasus / sesi halaman beranda | Pantau 30 hari; tidak mengarang benchmark |
| Keandalan formulir | Pesan valid tersimpan dan kegagalan notifikasi dapat ditangani | Lulus skenario integrasi dan antrean sebelum rilis |

Event analitik tidak boleh berisi nama pengirim, alamat surel, isi pesan, token, atau data pribadi lain. Pengukuran bisnis bersifat P1 dan tidak menghalangi MVP apabila penyedia analitik belum dipilih.

## 3. Ruang lingkup dan prioritas

P0 berarti wajib untuk MVP, P1 berarti peningkatan setelah fondasi stabil, dan P2 berarti opsi yang memerlukan keputusan terpisah. CMS ringan termasuk rekomendasi P0 agar pengalaman dan proyek bisa diperbarui tanpa mengubah kode.

| Prioritas | Cakupan |
|---|---|
| P0 | Beranda, profil, pengalaman, kompetensi, daftar dan detail proyek, kontak, CV bila tersedia, halaman privasi, 404/500 |
| P0 | Admin pemilik tunggal, autentikasi, pengelolaan konten, media terbatas, draft/preview/publish, pesan masuk |
| P0 | Responsif, light-only, aksesibilitas, SSR halaman publik, SEO dasar, keamanan, backup, pengujian |
| P1 | Bahasa Inggris, analitik privasi, artikel/wawasan, penjadwalan publikasi, redirect slug melalui admin |
| P2 | Integrasi kalender, pencarian konten, testimonial terverifikasi, demo AI yang disetujui |

Di luar cakupan MVP: chatbot AI publik, pembayaran, akun pengunjung, komentar, marketplace, aplikasi mobile native, multi-tenant, dan sistem rekrutmen. Jabatan AI Engineer tidak dengan sendirinya membuat website membutuhkan fitur AI runtime. Penggunaan AI untuk membantu pengembangan berbeda dari penyediaan AI sebagai fitur produk.

## 4. Arsitektur informasi dan alur utama

Beranda memakai pola editorial satu halaman dengan tautan ke detail proyek. Ini mengurangi fragmentasi untuk pengunjung baru, sedangkan halaman studi kasus menyediakan kedalaman yang diperlukan pembaca teknis.

| URL | Fungsi | Ketentuan indeks |
|---|---|---|
| `/` | Hero, tentang, proyek unggulan, pengalaman, kompetensi, kontak | Index |
| `/#about` | Profil singkat dan pendekatan kerja | Bagian beranda |
| `/#experience` | Timeline pengalaman terbaru ke terlama | Bagian beranda |
| `/#skills` | Kompetensi terkelompok | Bagian beranda |
| `/projects` | Seluruh proyek publik dan filter kategori | Index; query filter memakai canonical dasar |
| `/projects/{slug}` | Studi kasus proyek | Index hanya jika published |
| `/#contact` | Formulir dan kanal kontak | Bagian beranda |
| `/resume` | Unduhan PDF CV aktif | Tidak masuk sitemap; header noindex |
| `/privacy` | Penggunaan data kontak | Index |
| `/login` | Masuk admin | Noindex |
| `/admin/*` | Pengelolaan privat dan preview | Autentikasi wajib; noindex |

Alur recruiter: beranda → ringkasan profesi → pengalaman terbaru → CV atau kontak. Alur calon klien: beranda → proyek unggulan → studi kasus → CTA diskusi dengan nama proyek sebagai konteks opsional. Alur pemilik: login → edit draft → preview → verifikasi konten → publish → cek halaman publik.

Navigasi desktop memuat Tentang, Proyek, Pengalaman, Kompetensi, dan Hubungi. Nama atau monogram BB kembali ke beranda. Navigasi mobile memakai tombol menu berlabel, mendukung Escape, pengembalian fokus, dan penutupan setelah memilih tautan. Header sticky harus memperhitungkan `scroll-margin-top` agar judul bagian tidak tertutup.

## 5. Strategi konten dan naskah awal

### 5.1 Hero dan profil

H1 adalah **Bana Budhiana**. Baris profesi menggunakan **Senior Software and AI Engineer**. Usulan kalimat pendukung: “Merancang perangkat lunak dan solusi AI dengan fokus pada kebutuhan bisnis, keandalan sistem, dan kemudahan pengembangan.” Kalimat ini adalah positioning yang harus disetujui pemilik sebelum diterbitkan, bukan bukti pencapaian.

CTA utama adalah **Lihat Proyek**, sedangkan CTA sekunder adalah **Hubungi Saya**. Tautan **Unduh CV** hanya ditampilkan jika PDF final tersedia. Jangan menampilkan badge “Available for work”, angka tahun pengalaman, jumlah klien, logo perusahaan, atau jumlah proyek tanpa data yang dikonfirmasi.

Profil singkat final harus disusun setelah isi website sumber tersedia. Kerangka editorialnya adalah bidang keahlian → jenis masalah yang ditangani → pendekatan kerja → tujuan kolaborasi. Maksimum tiga paragraf pendek; pendidikan dan sertifikasi hanya muncul jika datanya telah diverifikasi.

### 5.2 Pengalaman baru yang wajib dimasukkan

**Jabatan:** Senior Software and AI Engineer  
**Periode tampilan:** 2026–sekarang  
**Perusahaan/organisasi:** INDEPENDEN  
**Bulan mulai, lokasi, dan jenis hubungan kerja:** Tangerang dan Jakarta, Freelance

**Usulan deskripsi utama—memerlukan persetujuan pemilik:**

> Mengembangkan perangkat lunak dan integrasi AI dengan menerjemahkan kebutuhan bisnis menjadi solusi teknis yang terstruktur, andal, dan mudah dipelihara. Lingkup peran mencakup perancangan arsitektur aplikasi, pengembangan layanan backend dan antarmuka pengguna, serta integrasi model AI ke dalam alur kerja yang relevan. Pendekatan engineering menekankan kualitas kode, keamanan data, pengujian, dan evaluasi keluaran AI agar solusi dapat digunakan secara bertanggung jawab dalam konteks operasional.

**Usulan rincian tanggung jawab—pilih hanya yang sesuai pekerjaan aktual:**

- Merancang dan mengembangkan aplikasi end-to-end dengan batas tanggung jawab komponen, kontrak data, dan proses pengujian yang jelas.
- Mengevaluasi penggunaan LLM, retrieval-augmented generation, atau otomatisasi berbasis AI berdasarkan kebutuhan, sensitivitas data, biaya, latensi, dan kualitas keluaran.
- Mengintegrasikan layanan AI dengan API serta sumber data yang berizin, disertai validasi, observabilitas, dan penanganan kegagalan.
- Melakukan code review, dokumentasi keputusan arsitektur, dan perbaikan proses delivery untuk menjaga konsistensi kualitas pengembangan.
- Berkolaborasi dengan pemangku kepentingan untuk menentukan prioritas, menerjemahkan kebutuhan, dan menilai hasil implementasi.

Deskripsi di atas meyakinkan melalui cakupan dan disiplin kerja, bukan klaim keberhasilan yang dibuat-buat. Jangan otomatis menerbitkan tanggung jawab RAG, kepemimpinan tim, atau platform tertentu sebelum pemilik menyatakan relevansinya. Jangan menambahkan “meningkatkan efisiensi 40%”, “melayani jutaan pengguna”, atau “memimpin transformasi AI” tanpa bukti. Bila belum ada persetujuan deskripsi, entri boleh menampilkan jabatan dan tahun sesuai instruksi pengguna dengan uraian disembunyikan.

Pekerjaan lama yang masih bertanda “sekarang” tidak otomatis ditutup pada 2025 atau 2026. Pekerjaan paralel dimungkinkan; status setiap entri harus dikonfirmasi secara terpisah.

### 5.3 Studi kasus dan kompetensi

Setiap proyek memuat judul, ringkasan, konteks masalah, peran pribadi, batas kontribusi, solusi, keputusan teknis, trade-off, teknologi yang benar-benar digunakan, bukti atau hasil, dan media yang boleh dipublikasikan. Hasil dapat berupa keluaran fungsional yang terdokumentasi; angka tidak wajib. Jika proyek terikat kerahasiaan, gunakan uraian yang disetujui dan hilangkan nama klien serta data sensitif.

Kelompok kompetensi yang disarankan adalah Software Engineering, AI Engineering, Architecture & Delivery, dan Data & Infrastructure. Keanggotaan teknologi pada setiap kelompok tetap [PERLU VERIFIKASI]. Stack untuk membangun website ini tidak boleh otomatis dipresentasikan sebagai pengalaman profesional pemilik. Jangan memakai progress bar “Laravel 95%” atau label “expert” tanpa definisi yang dapat diuji.

### 5.4 Matriks sumber dan migrasi

| Konten | Dasar saat ini | Perlakuan implementasi |
|---|---|---|
| Nama | Instruksi pengguna | Seed sebagai data terkonfirmasi pengguna |
| Jabatan dan periode baru | Instruksi pengguna | Seed; tampilkan tahun tanpa bulan buatan |
| Deskripsi jabatan baru | Usulan editorial dokumen ini | Draft sampai disetujui |
| Pengalaman sebelum 2026 | Situs sumber belum terbaca | Jangan membuat entri fiktif |
| Perusahaan jabatan baru | Belum diberikan | Nullable; sembunyikan baris organisasi |
| Proyek, hasil, dan teknologi | Belum dapat diverifikasi | Data fixture hanya di lingkungan pengembangan |
| Foto, logo, screenshot, CV | Belum tersedia | Gunakan inisial di preview; tidak membuat foto orang |
| Kontak dan sosial | Belum terverifikasi | Tidak membentuk email dari domain/nama |

Ketika akses sumber tersedia, inventarisasi setiap bagian, catat URL asal dan tanggal akses, bandingkan ejaan serta periode, tandai konflik, kemudian minta pemilik menyelesaikan konflik konten yang material. Jangan menyalin data sensitif atau materi pihak ketiga hanya karena tersedia secara publik. Pertahankan URL lama yang bernilai dengan redirect 301 setelah inventaris URL selesai.

## 6. Sistem desain UI/UX

### 6.1 Arah visual

**[OPINI—arah desain]** Gunakan gaya “soft editorial technology”: latar off-white, tipografi tegas, ruang putih luas, garis pembatas halus, dan aksen teal. Tata letak asimetris digunakan pada hero desktop, sedangkan bagian baca panjang memakai kolom yang stabil. Kartu modular boleh digunakan untuk proyek dan kompetensi, tetapi jangan membuat semua bagian menjadi bento grid yang menyulitkan urutan baca. Ini merupakan pilihan desain kontemporer, bukan klaim empiris bahwa satu gaya adalah tren paling populer.

Website selalu menggunakan tema terang, termasuk ketika sistem operasi pengguna memakai dark mode. Hapus theme switcher dan varian dark bawaan starter kit. Permukaan lembut tidak berarti teks berkontras rendah. Tidak ada latar hitam, neon, animasi ketik, carousel otomatis, scroll hijacking, efek 3D berat, atau glassmorphism yang mengurangi keterbacaan.

### 6.2 Token desain

| Token | Nilai awal | Fungsi |
|---|---|---|
| `background` | `#F8FAFC` | Kanvas utama |
| `surface` | `#FFFFFF` | Kartu dan formulir |
| `surface-soft` | `#F0F7F6` | Penekanan bagian tertentu |
| `text-primary` | `#172B3A` | Judul dan isi utama |
| `text-secondary` | `#475569` | Deskripsi sekunder |
| `accent` | `#0F766E` | CTA dan tautan |
| `accent-hover` | `#115E59` | Hover/active |
| `accent-soft` | `#E3F3EF` | Badge dan latar aksen |
| `border-decorative` | `#DDE5EA` | Pemisah noninteraktif |
| `border-control` | `#64748B` | Batas input yang perlu terlihat |
| `danger` | `#B91C1C` | Kesalahan dengan ikon dan teks |
| `focus` | `#1D4ED8` | Outline fokus keyboard |

Nilai warna adalah titik awal, bukan sertifikasi aksesibilitas. Ukur seluruh pasangan teks/latar, state interaktif, dan focus ring pada implementasi. Border dekoratif tidak boleh menjadi satu-satunya petunjuk adanya kontrol.

Gunakan satu keluarga sans-serif yang mudah dibaca, misalnya Inter yang di-host sendiri bila lisensinya telah diperiksa, dengan fallback `ui-sans-serif, system-ui, sans-serif`. Bobot yang dibutuhkan 400, 500, 600, dan 700; subset karakter secukupnya. Body 16–18 px dengan line-height 1,6–1,75; lebar paragraf sekitar 60–75 karakter. H1 responsif sekitar 40–64 px, H2 28–40 px, dan H3 20–24 px. Gunakan `clamp()` agar skala tidak melonjak pada viewport perantara.

Gunakan spacing kelipatan 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96. Container maksimal 1.200 px; padding horizontal 20 px pada mobile dan 32 px pada desktop. Jarak antarbagian 56–72 px pada mobile dan 88–112 px pada desktop. Radius kartu 16–20 px, input dan tombol 10–12 px. Shadow ringan hanya untuk hierarki atau interaksi, bukan semua elemen.

### 6.3 Komposisi halaman

Hero desktop memakai pembagian sekitar 7:5 antara teks dan potret profesional. Potret bersifat opsional; bila belum tersedia, gunakan komposisi tipografi dan monogram BB, bukan foto stok yang menyerupai pemilik. Tampilkan identitas dan CTA tanpa memaksa tinggi hero satu viewport. Mobile menampilkan teks serta CTA lebih dahulu, baru visual pendukung.

Proyek unggulan terdiri dari maksimal tiga kartu berisi gambar dengan rasio konsisten, kategori, judul, ringkasan dua atau tiga baris, peran, dan tautan studi kasus. Pengalaman memakai timeline vertikal: tahun, jabatan, organisasi jika tersedia, serta uraian singkat. Pengalaman terbaru diberi penekanan ringan tanpa menutupi entri lain.

Kompetensi memakai kelompok teks atau chip dengan konteks, bukan cloud logo tanpa penjelasan. Kontak memakai judul ajakan yang spesifik, formulir ringkas, dan kanal alternatif yang telah diverifikasi. Footer berisi nama, tahun berjalan, navigasi privasi, dan tautan profesional yang tersedia.

### 6.4 Responsivitas dan perilaku

| Lebar uji | Perilaku minimum |
|---|---|
| 320–639 px | Satu kolom; tombol tidak terpotong; menu ringkas; tidak ada horizontal scroll |
| 640–1023 px | Satu atau dua kolom sesuai panjang isi; ukuran baca tetap nyaman |
| 1024–1439 px | Hero dua kolom; proyek sampai tiga kolom; navigasi lengkap bila muat |
| ≥1440 px | Lebar konten dibatasi; ruang luar bertambah, bukan panjang baris |

Transisi hover/focus sekitar 150–200 ms. Animasi masuk opsional maksimum 300 ms, hanya opacity/transform ringan, dan harus dinonaktifkan lewat `prefers-reduced-motion`. Konten tidak boleh menunggu animasi agar terlihat. Semua aksi harus bisa dipahami tanpa hover.

## 7. Kebutuhan fungsional dan acceptance criteria

| ID | Requirement | Kriteria penerimaan |
|---|---|---|
| FR-01 | Identitas dan hero | Nama dan peran tampil sebagai teks HTML; satu H1; dua CTA menuju tujuan yang benar |
| FR-02 | Profil | Konten dapat diedit; paragraf tidak kosong; konten unverified tidak tampil |
| FR-03 | Timeline | Urut tahun/bulan terbaru; tahun tanpa bulan tetap ditampilkan sebagai tahun; current menghasilkan “sekarang” |
| FR-04 | Pengalaman baru | Judul persis “Senior Software and AI Engineer”; mulai 2026; tidak membuat perusahaan atau bulan |
| FR-05 | Daftar proyek | Hanya published; filter kategori dapat direset; state kosong jelas; tidak ada kartu palsu |
| FR-06 | Studi kasus | URL slug unik; peran dan konteks wajib; draft memberi 404 kepada publik; CTA kembali dan kontak tersedia |
| FR-07 | Kompetensi | Kelompok dan urutan dapat diedit; label tidak menyatakan skor kemampuan buatan |
| FR-08 | CV | PDF hanya jika tersedia dan disetujui; endpoint mengirim file unduhan; tombol disembunyikan jika tidak tersedia |
| FR-09 | Formulir kontak | Validasi client dan server; pesan tersimpan sebelum sukses ditampilkan; error tidak menghapus isi |
| FR-10 | Kanal alternatif | Email/sosial hanya dari data disetujui; URL dibatasi protokol aman |
| FR-11 | Admin | Semua route admin terlindungi autentikasi dan policy; pendaftaran publik tidak tersedia |
| FR-12 | Pengelolaan konten | CRUD, urutan, preview privat, publish/unpublish; validasi tetap berjalan di server |
| FR-13 | Media | Hanya tipe/ukuran diizinkan; alt text wajib untuk gambar informatif; nama penyimpanan acak |
| FR-14 | SEO | Metadata unik, canonical absolut, sitemap hanya URL publik, status HTTP benar |
| FR-15 | Kegagalan | 404/500 ramah; tidak membocorkan stack trace; tersedia navigasi kembali |

Filter proyek memakai query `?category=...` agar dapat dibagikan dan mendukung tombol Back. Tampilkan semua proyek bila jumlahnya kecil; gunakan pagination server-side 9 item per halaman ketika jumlah bertambah. Pencarian teks tidak diperlukan untuk MVP.

### 7.1 Formulir kontak

| Field | Aturan |
|---|---|
| Nama | Wajib, trim, 2–100 karakter |
| Email | Wajib, format email, maksimum 254 karakter |
| Perusahaan | Opsional, maksimum 150 karakter |
| Tujuan | Wajib; kerja sama, peluang profesional, atau lainnya |
| Pesan | Wajib, 20–5.000 karakter; diperlakukan sebagai teks |
| Persetujuan pemrosesan | Wajib, tidak dicentang otomatis; tautan privasi terlihat |
| Honeypot | Bukan input yang mengganggu keyboard/screen reader; diproses server |
| Submission token | Nilai sekali submit untuk mencegah duplikasi dari retry |

State formulir adalah idle → validating → submitting → success atau error. Tombol submit dinonaktifkan selama permintaan berjalan, disertai teks “Mengirim…”. Kesalahan per field terhubung melalui `aria-describedby`; ringkasan kegagalan diumumkan melalui live region. Pesan sukses berbunyi “Pesan Anda sudah tersimpan. Terima kasih telah menghubungi saya.” Jangan menjanjikan waktu balasan atau menyatakan email telah dibaca.

Server menerapkan CSRF dan pembatasan awal 5 submit per 10 menit per IP; ambang merupakan konfigurasi yang ditinjau setelah observasi. Terapkan batas tambahan berbasis hash email untuk mengurangi penyalahgunaan, dengan retensi minimal. Respons rate limit menjelaskan kapan dapat mencoba lagi. CAPTCHA hanya ditambahkan bila spam nyata memerlukan kontrol tambahan.

Pesan disimpan secara transaksional, lalu notifikasi admin dikirim melalui queue setelah commit. Kegagalan email tidak menghapus pesan dan tidak meminta pengunjung mengirim ulang. Queue mencoba ulang secara terbatas, mencatat kegagalan, dan menyediakan tindakan retry admin. Tidak ada balasan otomatis kepada pengunjung pada MVP untuk mengurangi risiko abuse email.

### 7.2 Admin dan publikasi

Admin pemilik tunggal dapat mengelola profil, pengalaman, kompetensi, proyek, media, CV, SEO, dan pesan masuk. Akun pertama dibuat lewat prosedur operasional aman, tanpa password default pada seeder. Gunakan autentikasi bawaan Laravel yang sesuai starter kit dan MFA sebelum akses produksi.

Status editorial adalah `draft`, `published`, dan `archived`; status bukti terpisah berupa `unverified`, `source_verified`, atau `owner_confirmed`. Publikasi harus ditolak bila field wajib kosong, sumber/persetujuan tidak tersedia, atau konten mengandung placeholder. Preview memerlukan autentikasi dan tidak menggunakan tautan publik yang dapat ditebak.

Perubahan konten published harus melalui draft revisi. MVP menggunakan snapshot JSON versi sebelum perubahan dan satu working draft; versi publik aktif tetap ditampilkan sampai publish berikutnya. Publish dilakukan dalam transaksi dan menginvalidasi cache setelah commit. Admin dapat memulihkan snapshot tanpa mengedit database secara manual. Pesan masuk memiliki status unread, read, archived, atau spam; hapus merupakan tindakan konfirmasi.

## 8. Arsitektur teknis dan kebijakan versi

**[FAKTA—dokumentasi resmi]** Laravel 13 mensyaratkan PHP minimal 8.3; starter kit React resmi menggabungkan React, TypeScript, Inertia, dan Tailwind. Dokumentasi Laravel juga mencantumkan dukungan MariaDB. Landasan tersebut mendukung penggunaan satu aplikasi Laravel sebagai backend, router, dan pengelola konten, dengan React untuk UI melalui Inertia (Laravel, n.d.-a, n.d.-b, n.d.-c).

| Lapisan | Keputusan |
|---|---|
| Backend | Laravel `^13.0`; patch stabil yang kompatibel dikunci dalam `composer.lock` |
| PHP | Versi minor yang didukung Laravel 13 dan hosting; minimum 8.3; uji ekstensi saat setup |
| Frontend | React 19.x dari starter kit resmi; pin versi aktual di lockfile |
| Integrasi | Inertia dari starter kit Laravel 13; halaman publik memakai SSR |
| Tipe | TypeScript strict; versi stabil kompatibel dengan starter kit dan tooling |
| Styling | Tailwind CSS 4.x; rilis stabil terbaru kompatibel saat bootstrap, bukan prerelease |
| Build | Vite dan plugin resmi Tailwind; gunakan lockfile |
| Database | MariaDB pada rilis LTS yang masih didukung vendor saat provisioning; InnoDB dan utf8mb4 |
| Queue/cache | Database driver untuk skala awal; Redis hanya jika kebutuhan operasional membenarkan |
| Media | Storage Laravel; object storage opsional sesuai hosting; metadata di MariaDB |
| Email | SMTP atau layanan transactional melalui Laravel Mail; kredensial server-side |
| UI primitives | Komponen starter kit/shadcn jika sesuai; seluruh tema disesuaikan light-only |

Dokumentasi yang diperiksa menampilkan React 19.3 dan Tailwind 4.3, tetapi kompatibilitas dependency tetap harus diuji saat implementasi, bukan diasumsikan dari kesamaan versi mayor. “Terbaru” diartikan sebagai rilis stabil pada waktu bootstrap yang kompatibel dengan keseluruhan stack. Catat versi aktual PHP, Node, Composer, Laravel, Inertia, React, TypeScript, Tailwind, Vite, dan MariaDB dalam README. Jangan memakai tag `latest` pada deployment tanpa lockfile. Batas minimum dukungan database oleh framework bukan rekomendasi memakai database yang sudah tidak dipelihara.

Arsitektur berupa modular monolith. Permintaan publik → route/controller Laravel → query hanya konten published → DTO/props terpilih → render React melalui Inertia SSR → hydration di browser. Admin menggunakan session cookie first-party; tidak memerlukan token API yang disimpan di localStorage. REST API publik terpisah tidak diperlukan untuk MVP.

Node runtime diperlukan bila deployment menggunakan proses Inertia SSR. Hosting harus mendukung PHP, MariaDB, worker queue, scheduler, dan proses SSR. Jika hosting tidak mendukung SSR, keputusan hosting harus diselesaikan; jangan diam-diam menghapus SSR atau mengganti stack menjadi Next.js. SSR tidak menjamin peringkat pencarian, tetapi memastikan konten utama tersedia pada HTML respons awal.

Struktur kode yang disarankan:

```text
app/Http/Controllers/Public/
app/Http/Controllers/Admin/
app/Http/Requests/
app/Models/
app/Policies/
app/Actions/Content/
app/Jobs/
resources/js/components/ui/
resources/js/components/portfolio/
resources/js/layouts/
resources/js/pages/public/
resources/js/pages/admin/
resources/js/types/
resources/css/app.css
database/migrations/
database/seeders/
tests/Feature/
tests/Unit/
```

Nama direktori dapat mengikuti konvensi starter kit. Jangan menambah repository abstraction, microservices, state manager global, atau vector database tanpa kebutuhan nyata. Form state dikelola melalui mekanisme Inertia/React; konten utama tidak diduplikasi sebagai hardcoded array di frontend produksi.

## 9. Model data dan aturan integritas

Semua tabel domain menggunakan primary key, `created_at`, dan `updated_at`. Field editorial yang berulang mencakup `status`, `verification_status`, `source_url` nullable, `source_note` privat, `verified_at` nullable, `published_at` nullable, dan `sort_order`. Catatan sumber tidak dikirim sebagai props publik.

| Tabel | Field inti dan relasi |
|---|---|
| `users` | name, email unique, password hash, MFA; hanya akun admin yang diizinkan |
| `profiles` | display_name, headline, hero_summary, about_markdown, location nullable, public_email nullable, portrait_media_id nullable, resume_media_id nullable |
| `experiences` | title, organization nullable, employment_type nullable, location nullable, start_year, start_month nullable, end_year nullable, end_month nullable, is_current, description_markdown |
| `skill_groups` | name, description nullable, sort_order |
| `skills` | skill_group_id FK, name, context nullable, sort_order; tanpa proficiency percentage |
| `projects` | slug unique, title, excerpt, problem_markdown, role_summary, solution_markdown, tradeoffs_markdown nullable, outcomes_markdown nullable, category, featured, cover_media_id nullable, project_url nullable, repository_url nullable |
| `project_skill` | project_id FK, skill_id FK; unique pasangan |
| `project_media` | project_id FK, media_id FK, caption nullable, sort_order |
| `media` | disk, path unique, mime_type, bytes, width/height nullable, alt_text nullable, original_name privat, visibility |
| `social_links` | label, url, sort_order, enabled |
| `contact_messages` | name, email, company nullable, purpose, message, consent_at, privacy_notice_version, submission_token unique, status, notification_status |
| `content_revisions` | entity_type allowlist, entity_id, snapshot_json, editor_id, version, created_at; akses privat |
| `site_settings` | key unique, value JSON; allowlist key; tanpa secret aplikasi |

Indeks minimum: status/published_at pada proyek dan pengalaman, featured/sort_order pada proyek, start_year pada pengalaman, serta status/created_at pada pesan. Foreign key dan aturan penghapusan harus eksplisit. Hapus media ditolak bila masih digunakan konten published; pivot dapat dihapus secara cascade, sedangkan aset fisik dibersihkan melalui pekerjaan terkontrol.

Tanggal pengalaman tidak boleh dipaksa menjadi `2026-01-01` jika hanya tahun yang diketahui. Simpan tahun dan bulan opsional. `is_current=true` mengharuskan end_year/end_month null. Jika akhir diketahui, urutannya tidak boleh mendahului awal. Jangan menghitung durasi presisi bulanan dari tahun saja. Timestamp sistem disimpan dalam UTC dan ditampilkan dalam Asia/Jakarta untuk admin; periode pengalaman mengikuti data tahun/bulan tanpa konversi zona waktu.

Konten Markdown disanitasi dengan raw HTML dinonaktifkan. Relasi proyek dan skill tidak boleh membuat skill draft terekspos pada proyek publik. DTO publik harus berupa allowlist field; serialisasi model mentah ke client dilarang.

## 10. Kontrak endpoint dan validasi

| Method/route | Respons utama | Kontrol |
|---|---|---|
| `GET /` | Inertia SSR props profil dan konten published | Cache publik tanpa session/CSRF pribadi |
| `GET /projects` | Daftar, kategori aktif, pagination | Query kategori tervalidasi |
| `GET /projects/{slug}` | Studi kasus published atau 404 | Draft tidak terungkap |
| `POST /contact` | Alur Inertia redirect dengan flash setelah simpan | FormRequest, CSRF, throttle, token deduplikasi |
| `GET /resume` | PDF unduhan atau 404 | File aktif approved; bukan path dari input |
| `GET /sitemap.xml` | Sitemap URL published | Tidak menyertakan preview/admin |
| `GET /robots.txt` | Instruksi crawler dan sitemap | Bukan pengganti autentikasi |
| `GET /admin/...` | Halaman admin | Auth, MFA, policy |
| `POST/PATCH/DELETE /admin/...` | Mutasi tervalidasi dan redirect | Auth, CSRF, policy, audit revisi |
| `POST /admin/{resource}/{id}/publish` | Publish tervalidasi | Resource allowlist; transaksi; cache invalidation |

Untuk permintaan form Inertia, gunakan pola validation error/redirect resmi yang sesuai versi terpasang, bukan mencampur respons JSON ad hoc. Klien non-Inertia yang didukung dapat menerima 422 untuk validasi, 429 untuk throttle, dan status HTTP lain sesuai kegagalan. Error 419 menjelaskan sesi kedaluwarsa dan memberi cara memuat ulang tanpa menjanjikan penyimpanan pesan yang belum terjadi.

Kontrak props TypeScript harus mencakup nullable field secara eksplisit. Tipe pengalaman memiliki `startYear: number`, `startMonth: number | null`, `endYear: number | null`, `endMonth: number | null`, dan `isCurrent: boolean`. Tautan opsional tidak dirender sebagai anchor kosong. Bila proyek tidak memiliki screenshot, gunakan cover tipografis yang jelas, bukan bukti visual hasil fabrikasi.

## 11. Aksesibilitas, SEO, dan performa

### 11.1 Aksesibilitas

Target adalah WCAG 2.2 level AA pada ruang lingkup halaman yang dibuat. Untuk teks biasa, gunakan rasio kontras minimal 4,5:1; teks besar minimal 3:1 sesuai definisi WCAG. Semua fitur harus dapat dioperasikan dengan keyboard, memiliki fokus terlihat, dan tetap dapat dibaca saat ukuran teks diperbesar 200% (World Wide Web Consortium, 2024).

Tambahkan skip link, landmark semantik, hierarki heading, label input persisten, alt text yang relevan, dan penanda link eksternal bila diperlukan. Target desain area sentuh adalah sekurang-kurangnya 44 × 44 CSS px; ini keputusan kenyamanan produk, bukan penyederhanaan seluruh ketentuan WCAG. Lakukan pemeriksaan reflow pada 320 CSS px serta zoom tinggi. Jangan menggunakan warna saja untuk status atau error. Uji otomatis dilengkapi navigasi keyboard dan screen reader; skor otomatis tidak membuktikan konformitas penuh.

### 11.2 SEO

Judul beranda yang disarankan: `Bana Budhiana | Senior Software and AI Engineer`. Meta description menggunakan ringkasan yang disetujui tanpa superlatif atau metrik palsu. Setiap proyek memiliki title, description, canonical, dan Open Graph tersendiri. Domain canonical final menggunakan `https://bbudhiana.indoez.com` hanya setelah kepemilikan dan rencana deployment dikonfirmasi.

Gunakan structured data `Person` untuk nama, URL, jobTitle, dan sameAs yang terverifikasi; `CreativeWork` dapat digunakan bila sesuai proyek. Jangan membuat rating, penghargaan, employer, atau alamat lengkap. Sitemap diperbarui saat publish/unpublish. Staging harus dilindungi akses dan noindex; produksi hanya dibuka setelah pemeriksaan metadata. URL yang berubah memerlukan pemetaan redirect 301 untuk menghindari tautan lama terputus.

### 11.3 Performa

| Ukuran | Target | Cara verifikasi |
|---|---|---|
| LCP | ≤2,5 detik | p75 data lapangan bila sampel memadai |
| INP | ≤200 ms | p75 data lapangan, dipisahkan mobile/desktop |
| CLS | ≤0,1 | p75 data lapangan |
| Lighthouse mobile | Performance ≥90, Accessibility ≥95, SEO ≥95 | Median 3 pengujian produksi-like dengan konfigurasi tercatat |
| JavaScript awal publik | Anggaran awal ≤200 KB gzip | Ukur aset route beranda; dokumentasikan jika perlu revisi |
| Transfer awal beranda | Anggaran awal ≤1 MB, tidak termasuk unduhan CV | Audit network pada cache kosong |

Ambang Core Web Vitals mengikuti dokumentasi web.dev; anggaran bundle dan target Lighthouse adalah keputusan proyek, bukan standar eksternal (Google, 2025). Uji laboratorium sebelum rilis tidak boleh dilaporkan sebagai bukti pencapaian p75 pengguna nyata.

Gambar menggunakan ukuran intrinsik, `srcset`, format modern dan fallback yang sesuai. Gambar hero yang menjadi LCP tidak di-lazy-load; media di bawah fold boleh lazy-load. Bundle admin dipisahkan dari bundle publik. Hindari video autoplay, widget sosial tertanam, dan library animasi besar. Gunakan eager loading query, cache konten published, serta invalidasi saat publikasi. Jangan menyimpan halaman admin, data pribadi, atau respons formulir dalam shared cache.

## 12. Keamanan, privasi, dan operasional

Semua input divalidasi server-side; otorisasi diuji terpisah dari autentikasi. Terapkan CSRF, cookie secure/HttpOnly/SameSite yang sesuai, rotasi sesi saat login, pembatasan login, sanitasi Markdown, dan pembatasan URL ke protokol yang diizinkan. Matikan debug di produksi. Secret disimpan pada environment server, tidak pada repository, props React, maupun tabel settings.

Upload gambar dibatasi JPEG, PNG, dan WebP maksimal 5 MB; CV hanya PDF maksimal 10 MB. Periksa MIME dari isi file, bukan ekstensi saja. SVG dan HTML upload tidak diperbolehkan pada MVP. Re-encode gambar, hilangkan metadata yang tidak perlu, dan pisahkan media draft dari media publik. Media privat tidak boleh dapat diakses hanya dengan mengetahui URL file. CV diperiksa manual untuk menghapus data pribadi yang tidak ingin dipublikasikan.

Formulir hanya mengumpulkan data yang diperlukan untuk menanggapi pesan. Halaman privasi menjelaskan tujuan, field yang dikumpulkan, penyimpanan, penerima notifikasi, masa retensi, dan jalur permintaan penghapusan. Default produk yang diusulkan adalah menghapus pesan setelah 180 hari kecuali pemilik menetapkan kebutuhan retensi lain; ini keputusan operasional yang harus disetujui, bukan klaim kepatuhan hukum. Retensi backup harus konsisten, dengan masa kedaluwarsa maksimal 30 hari setelah penghapusan dari basis data aktif. Log tidak boleh memuat isi pesan atau kredensial.

Deployment mencakup build frontend dan SSR, instalasi dependency dari lockfile, migrasi, konfigurasi cache, restart worker, health check, dan smoke test. Backup database serta media dilakukan harian dengan akses terbatas; target operasional awal RPO 24 jam dan RTO 4 jam, bergantung kemampuan hosting dan hasil latihan restore. Rollback kode hanya aman bila skema tetap kompatibel; migrasi destruktif memerlukan backup dan rencana pemulihan eksplisit.

Monitoring minimum mencakup health HTTP, koneksi database, worker queue, proses SSR, failed jobs, error aplikasi, serta usia backup terakhir. Jangan menganggap deploy berhasil hanya karena halaman depan terbuka. Simulasikan kegagalan email dan pastikan pesan tetap terlihat di admin.

## 13. Rencana implementasi untuk pengembangan berbantuan AI

Setiap fase menghasilkan perubahan yang dapat ditinjau dan bukti penerimaan. AI harus membaca PRD dan repository aktual sebelum menghasilkan kode; nama fungsi, API framework, atau file tidak boleh diasumsikan dari versi lama.

| Fase | Hasil kerja | Gerbang kelulusan |
|---|---|---|
| 0. Fondasi sumber | Inventaris konten, register verifikasi, keputusan hosting, matriks versi | Tidak ada biografi atau kontak palsu; dependency dapat di-resolve |
| 1. Bootstrap | Laravel 13 + starter React, TypeScript strict, Tailwind, MariaDB | Build, koneksi DB, migrasi, login admin, pendaftaran publik nonaktif |
| 2. Sistem desain | Token, layout terang, typography, tombol, kartu, form, menu | Review desktop/mobile dan keyboard; tidak ada mode gelap |
| 3. Domain dan CMS | Model, policy, validasi, revisi, draft/preview/publish, media | Draft terlindungi; publikasi dan cache konsisten |
| 4. Halaman publik | Beranda, proyek, detail, timeline, kompetensi, CV, privasi | SSR menampilkan konten utama; seluruh tautan valid |
| 5. Kontak | Penyimpanan pesan, throttle, queue notifikasi, admin inbox | Kegagalan email tidak menghilangkan pesan; retry tidak menduplikasi |
| 6. Hardening | SEO, aksesibilitas, optimasi, backup dan observabilitas | Uji wajib lulus; restore dan smoke test terdokumentasi |
| 7. Rilis | Konten disetujui, domain/TLS, redirect, konfigurasi produksi | Checklist rilis terpenuhi; pemilik memeriksa pengalaman dan kontak |

### Instruksi siap diberikan kepada AI pengembang

```text
Bangun website portofolio profesional Bana Budhiana berdasarkan PRD ini.
Gunakan Laravel 13.x, React, TypeScript strict, Tailwind CSS stabil terbaru
yang kompatibel, dan MariaDB. Gunakan starter kit React resmi serta Inertia;
SSR wajib untuk halaman publik. Verifikasi versi dan API melalui dokumentasi
resmi, lalu kunci dependency. Jangan mengganti teknologi inti.

Mulai dengan pemeriksaan repository, daftar keputusan dan data yang belum
tersedia, serta implementasi fase fondasi. Kerjakan bertahap menurut ID
requirement dan tunjukkan bukti acceptance criteria setiap fase.

UI harus terang, soft, clean, mudah dibaca, responsif, dan menggunakan token
desain PRD. Hapus dark mode. Jangan menambah chatbot, animasi berat, atau fitur
di luar cakupan. Jangan menggunakan data fixture sebagai konten produksi.

Tambahkan pengalaman “Senior Software and AI Engineer”, 2026–sekarang.
Deskripsi usulan disimpan sebagai draft sampai disetujui pemilik. Jangan
mengarang perusahaan, bulan mulai, hasil kuantitatif, atau riwayat lama.
Field yang tidak diketahui tetap nullable atau draft; jangan menampilkan
placeholder [PERLU VERIFIKASI] kepada pengunjung.

Implementasikan validasi server, policy, proteksi draft, media aman, contact
queue, dan pengujian kasus kegagalan. Dokumentasikan setup, versi aktual,
environment, build SSR, queue, scheduler, backup, dan rollback dalam README.
Laporkan keterbatasan dengan jujur dan jangan menyatakan tes lulus jika belum
dijalankan. Sebelum rilis, pastikan seluruh gerbang konten dan teknis lulus.
```

## 14. Rencana QA dan definisi selesai

| Area | Skenario wajib | Bukti yang diperlukan |
|---|---|---|
| Konten | Tahun tanpa bulan, pekerjaan paralel, perusahaan null | Timeline tidak membuat detail tambahan |
| Publikasi | Draft, published, archived, restore revisi | Publik hanya melihat versi published aktif |
| Keamanan | Pengunjung mencoba URL admin/preview dan mutasi | Akses ditolak; tidak ada kebocoran props/media |
| Kontak | Valid, invalid, duplikat, spam, timeout, email gagal | Pesan valid tersimpan sekali; feedback sesuai hasil |
| Media | File terlalu besar, ekstensi palsu, SVG, PDF valid | File tidak aman ditolak; file valid dapat dipakai |
| Responsif | 320, 375, 768, 1024, 1440 px | Screenshot dan cek overflow seluruh halaman utama |
| Aksesibilitas | Keyboard, fokus menu, error form, zoom, reduced motion | Audit otomatis dan catatan uji manual |
| SEO/SSR | HTML awal, canonical, OG, sitemap, 404 draft | Konten utama ada tanpa menunggu hydration |
| Database | Migrasi dan query pada MariaDB aktual | CI/integrasi memakai MariaDB, bukan hanya SQLite |
| Operasional | Queue berhenti, SSR gagal, restore backup | Deteksi, pemulihan, dan langkah penanganan terbukti |

Unit test difokuskan pada logika tanggal, status publikasi, dan validasi domain. Feature test Laravel meliputi policy, kontak, revisi, dan upload. E2E mencakup perjalanan membaca proyek dan mengirim pesan serta admin memublikasikan revisi. Gunakan tool uji frontend yang sesuai repository; hindari tes yang hanya menyalin detail implementasi.

Produk dianggap selesai bila semua P0 lulus; build produksi dan TypeScript tidak memiliki error; tidak ada defect kritis pada alur kontak/admin; tampilan sesuai arahan terang dan bersih; data publik disetujui; konten draft tidak bocor; CV dan kontak benar; SEO/SSR bekerja; target lab tercatat; backup dapat dipulihkan; dan dokumentasi operasional tersedia. Pencapaian KPI bisnis dinilai setelah peluncuran dan bukan syarat yang dapat diklaim sebelum ada data.

## 15. Risiko, dependensi, dan keputusan yang masih terbuka

| Risiko/dependensi | Dampak | Mitigasi/keputusan |
|---|---|---|
| Situs sumber belum dapat dibaca | Riwayat lama dan aset belum terisi | Gunakan salinan konten/screenshot/CV dari pemilik; jangan mengarang |
| Deskripsi peran AI terlalu luas | Salah merepresentasikan pengalaman | Konfirmasi tanggung jawab satu per satu sebelum publish |
| Perusahaan atau tanggal pekerjaan konflik | Timeline menyesatkan | Simpan presisi sumber; jangan otomatis menutup pekerjaan lama |
| Hosting tidak mendukung SSR/worker | Arsitektur tidak dapat dioperasikan | Validasi hosting pada fase 0 |
| “Versi terbaru” berubah | Build tidak konsisten | Catat tanggal bootstrap dan lockfile; upgrade terencana |
| Proyek/visual belum tersedia | Bukti profesional lemah | Prioritaskan studi kasus aktual; sembunyikan bagian kosong |
| Palette soft terlalu pudar | Keterbacaan turun | Ukur kontras semua state dan koreksi token |
| Formulir menerima spam | Inbox dan email terganggu | Honeypot, throttle, deduplikasi, monitoring |

Keputusan default untuk melanjutkan implementasi adalah bahasa Indonesia sebagai bahasa utama, CMS pemilik tunggal, light-only, Inertia SSR, dan tanpa fitur AI publik. Data yang masih dibutuhkan sebelum publikasi penuh adalah salinan isi situs lama, persetujuan deskripsi pekerjaan baru, informasi organisasi bila ingin ditampilkan, proyek yang boleh dipublikasikan, foto opsional, CV opsional, serta kanal kontak terverifikasi. Ketiadaan aset opsional tidak perlu menghalangi pengembangan struktur aplikasi.

## 16. Referensi dan catatan verifikasi

Referensi berikut menggunakan dokumentasi primer untuk klaim teknis dan standar; referensi tersebut bukan bukti biografi Bana Budhiana. Tanggal akses seluruh sumber daring adalah 8 Oktober 2026. Tidak ada klaim bahwa keputusan visual tertentu telah divalidasi oleh jurnal atau studi pengguna khusus website ini.

Google. (2025, May 7). *How the Core Web Vitals metrics thresholds were defined*. web.dev. https://web.dev/articles/defining-core-web-vitals-thresholds

Laravel. (n.d.-a). *Release notes: Laravel 13.x*. Retrieved October 8, 2026, from https://laravel.com/framework/docs/releases

Laravel. (n.d.-b). *Starter kits*. Retrieved October 8, 2026, from https://laravel.com/starter-kits

Laravel. (n.d.-c). *Database: Getting started*. Retrieved October 8, 2026, from https://laravel.com/framework/docs/database

Laravel. (n.d.-d). *Frontend*. Retrieved October 8, 2026, from https://laravel.com/framework/docs/frontend

React. (n.d.). *React versions*. Retrieved October 8, 2026, from https://react.dev/versions

Tailwind Labs. (n.d.-a). *Framework guides*. Retrieved October 8, 2026, from https://tailwindcss.com/docs/installation/framework-guides

Tailwind Labs. (n.d.-b). *Install Tailwind CSS with Laravel*. Retrieved October 8, 2026, from https://tailwindcss.com/docs/installation/framework-guides/laravel/vite

World Wide Web Consortium. (2024, December 12). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/

**Sumber biografi yang diminta, belum dapat diverifikasi:** https://bbudhiana.indoez.com. Alamat ini dicatat sebagai target migrasi, bukan sumber yang isinya telah berhasil dibaca.
