# Checklist Implementasi Website Portofolio Bana Budhiana

Dokumen ini digunakan untuk melacak kemajuan implementasi proyek website portofolio profesional Bana Budhiana berdasarkan **PRD-Bana-Budhiana.md**.

---

## Ringkasan Lingkungan & Konfigurasi
- **URL Publik Lokal:** `http://localhost:9007`
- **Web Container:** `frankenphp`
- **Database Container:** `mariadb`
- **Database Name:** `bbudhiana_site`
- **Database User:** `bana`
- **Database Host:** `mariadb`
- **Database Password:** `Bunciono12345!`
- **Arah Desain:** *Soft editorial technology* (100% Light mode, sans-serif, aksen teal `#0F766E`, latar `#F8FAFC`, WCAG 2.2 AA)

---

## Fase 1: Inisialisasi & Bootstrap Aplikasi (P0)
- [x] 1.1 Scaffold proyek Laravel dengan starter kit React + TypeScript + Inertia.js di folder proyek via container `frankenphp`.
- [x] 1.2 Konfigurasi environment `.env` (koneksi MariaDB, `APP_URL=http://localhost:9007`, database session/cache/queue driver).
- [x] 1.3 Verifikasi koneksi database dan status response web server `http://localhost:9007` (HTTP 200).
- [x] 1.4 Nonaktifkan registrasi akun publik pada sistem autentikasi (hanya admin tunggal).

---

## Fase 2: Sistem Desain & Token UI (P0)
- [x] 2.1 Konfigurasi token desain Tailwind CSS (`#F8FAFC`, `#FFFFFF`, `#172B3A`, `#475569`, `#0F766E`, `#115E59`, `#E3F3EF`, `#DDE5EA`).
- [x] 2.2 Eliminasi seluruh kelas `dark:` dan switcher tema bawaan starter kit (enforce 100% light theme).
- [x] 2.3 Buat layout dasar publik dengan header semantik, navigasi sticky (`scroll-margin-top`), monogram `BB`, skip-to-content link, dan accessible mobile menu.
- [x] 2.4 Siapkan UI primitives: Tombol, Card kontemporer, Badge, Input form, dan Footer semantik.

---

## Fase 3: Skema Basis Data & Model Domain (P0)
- [x] 3.1 Buat migrasi tabel `users` (admin), `profiles`, `experiences`, `skill_groups`, `skills`, `projects`, `project_skill`, `project_media`, `media`, `social_links`, `contact_messages`, `content_revisions`, dan `site_settings`.
- [x] 3.2 Terapkan aturan integritas: pengalaman mendukung tahun tanpa bulan buatan, `is_current` untuk status "sekarang", slug unik proyek.
- [x] 3.3 Buat Eloquent Model dengan relationship, attribute casting, dan scope query untuk status `published`.
- [x] 3.4 Buat Seeder awal terverifikasi:
  - Profil Bana Budhiana (nama, headline "Senior Software and AI Engineer").
  - Pengalaman "Senior Software and AI Engineer" (2026–sekarang, draft/confirmed, tanpa perusahaan/bulan fiktif).
  - Akun admin awal (prosedur aman tanpa kredensial publik default).

---

## Fase 4: Halaman Publik & Inertia SSR (P0)
- [x] 4.1 Halaman Beranda (`/`):
  - [x] Hero section (H1 nama, peran, CTA utama "Lihat Proyek", CTA sekunder "Hubungi Saya", monogram BB).
  - [x] Seksi Tentang (`/#about`).
  - [x] Seksi Proyek Unggulan (maks. 3 studi kasus terpublikasi).
  - [x] Seksi Garis Waktu Pengalaman (`/#experience`) urut terbaru ke terlama.
  - [x] Seksi Kompetensi (`/#skills`) terkelompok rapi tanpa skor/persentase kemampuan palsu.
  - [x] Seksi Formulir Kontak (`/#contact`).
- [x] 4.2 Halaman Daftar Proyek (`/projects`):
  - [x] Grid proyek published dengan filter kategori query string `?category=...`.
  - [x] State kosong jika tidak ada proyek pada kategori terpilih.
- [x] 4.3 Halaman Studi Kasus Proyek (`/projects/{slug}`):
  - [x] Problem statement, role & responsibilities, technical decisions, trade-offs, and outcomes.
  - [x] Tombol kembali ke daftar proyek dan CTA kontak konteks proyek.
  - [x] Status draft menghasilkan 404 bagi pengunjung publik.
- [x] 4.4 Halaman Pendukung:
  - [x] Endpoint unduhan CV (`/resume`) aman (404 jika belum diunggah).
  - [x] Halaman Kebijakan Privasi (`/privacy`).
  - [x] Halaman error kustom 404 & 500 yang ramah tanpa kebocoran stack trace.
- [x] 4.5 Setup SSR Inertia & SEO (Metadata OpenGraph, structured data JSON-LD `Person`, `robots.txt`, `sitemap.xml`).

---

## Fase 5: Alur Formulir Kontak & Keamanan (P0)
- [x] 5.1 Validasi form sisi server (FormRequest) dan interaktif client: nama, email, perusahaan (opsional), tujuan, pesan, persetujuan privasi.
- [x] 5.2 Perlindungan anti-spam: Honeypot field dan rate limit (5 submit per 10 menit per IP).
- [x] 5.3 Token deduplikasi (submission token) untuk mencegah submit ganda akibat retry.
- [x] 5.4 Penyimpanan transaksional ke database `contact_messages`.
- [x] 5.5 Penanganan notifikasi via database queue (kegagalan kirim email tidak membatalkan pesan pengunjung).

---

## Fase 6: Panel Kelola Konten / Admin Sederhana (P0)
- [x] 6.1 Proteksi route `/admin/*` dengan autentikasi session dan middleware authorization.
- [x] 6.2 Manajemen Konten:
  - [x] Pengelolaan Profil & Tautan Sosial.
  - [x] Pengelolaan Pengalaman (tahun, bulan opsional, is_current, deskripsi).
  - [x] Pengelolaan Kompetensi (grup & item skill).
  - [x] Pengelolaan Proyek (CRUD, kategori, cover, status draft/publish).
  - [x] Pengelolaan Media & Upload CV (validasi MIME ketat: JPEG/PNG/WebP max 5MB, PDF max 10MB; tolak SVG/HTML).
- [x] 6.3 Mekanisme Editorial & Revisi:
  - [x] Alur `draft` -> `preview` privat -> `publish`.
  - [x] Snapshot riwayat versi konten (JSON revisi) untuk restore bila dibutuhkan.
- [x] 6.4 Manajemen Kotak Masuk (Inbox Pesan Kontak):
  - [x] Daftar pesan, detail pesan, status read/unread/archived, tindakan konfirmasi hapus.

---

## Fase 7: Pengujian, QA, & Hardening (P0)
- [x] 7.1 Automated Testing:
  - [x] Unit Test format tanggal pengalaman dan scope status publikasi.
  - [x] Feature Test alur kontak, validasi honeypot, rate limiting, dan proteksi draft proyek.
  - [x] Feature Test autentikasi admin dan proteksi otorisasi.
- [x] 7.2 Uji Aksesibilitas (WCAG 2.2 AA):
  - [x] Kontras warna teks, outline fokus keyboard yang jelas, skip navigation link.
- [x] 7.3 Uji Responsivitas:
  - [x] Pengujian layout pada viewport 320px, 375px, 768px, 1024px, dan 1440px tanpa horizontal scroll.
- [x] 7.4 Verifikasi Build Produksi:
  - [x] TypeScript check (`tsc --noEmit`) bebas error.
  - [x] Build aset Vite & Inertia SSR bebas error.
