# Website Firma Hukum Profesional + CMS Admin Dashboard

Website profil firma hukum profesional berbasis **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, dan **PostgreSQL**, dilengkapi dengan **CMS Dashboard** untuk pengelolaan konten dinamis dan permohonan konsultasi hukum secara langsung.

---

## 🏛️ Desain & Identitas Visual
- **Gaya Desain**: Editorial, formal, minimalis, dan elegan (*Trusted Legal Partner*).
- **Tipografi**: Heading serif editorial (*Cormorant Garamond* / *Playfair Display*), body teks (*Inter*).
- **Palet Warna**:
  - Primary Navy: `#0D2635`
  - Dark Navy: `#081B28`
  - Off White: `#F7F5EF`
  - Gold / Beige: `#B29A68`
  - Light Beige: `#E9E2D2`
  - Text Dark: `#17232B`
  - Text Muted: `#6B6B67`

---

## 🚀 Fitur Utama

### 1. Website Publik
- **Beranda (`/`)**:
  - Sticky Navbar dengan Logo dinamis & CTA konsultasi emas
  - Hero Banner dengan foto arsitektur peradilan dan dark overlay navy
  - Section Tentang Kami (rasio 4:3, komitmen integritas)
  - Bidang Praktik / Layanan Hukum (grid 3 kolom, line-art icons)
  - Tim Profesional (3 advokat utama dengan layout 35% kiri & 65% kanan)
  - Mengapa Memilih Kami (background navy gelap, 4 butir keunggulan 01-04)
  - **Section Konsultasi Hukum**: Formulir interaktif dengan validasi Server Action & Zod
  - Insight & Artikel Hukum (layout editorial: 1 artikel besar + 2 artikel samping)
  - Tanya Jawab (FAQ) Accordion
  - Strong CTA Section penutup
  - Footer komprehensif dengan jam operasional, alamat kantor SCBD, tautan sosial media, dan hak cipta
- **Tentang Kami (`/tentang-kami`)**: Visi, misi, filosofi penanganan perkara, nilai fundamental firma.
- **Layanan (`/layanan`) & Detail (`/layanan/[slug]`)**: Penjelasan komprehensif bidang praktik, ruang lingkup asistensi, dan sidebar konsultasi cepat.
- **Tim (`/tim`) & Profil (`/tim/[slug]`)**: Seluruh jajaran advokat, foto rasio 1:1, biografi, riwayat pendidikan, dan spesialisasi.
- **Artikel (`/artikel`) & Baca (`/artikel/[slug]`)**: Arsip artikel dengan filter kategori, cover 16:9, tanggal terbit, nama penulis, dan disclaimer hukum.
- **Tanya Jawab (`/faq`)**: Accordion FAQ terstruktur.
- **Kontak (`/kontak`)**: Alamat SCBD, nomor kantor, WhatsApp resmi, email, jam kerja, dan formulir konsultasi.
- **SEO Ready**: `sitemap.xml`, `robots.txt`, dan open graph dynamic metadata.

### 2. CMS / Admin Dashboard
- **Keamanan & Autentikasi**: Proteksi middleware berbasis HTTP-Only Cookie dan JWT (`jose`), hashing password dengan `bcryptjs`.
- **Dashboard Utama (`/admin`)**: Metrik statistik jumlah permohonan, status baru masuk, layanan aktif, artikel, dan daftar permohonan terkini.
- **Konsultasi Masuk (`/admin/consultations`)**:
  - Filter status: *Semua, Baru Masuk, Dihubungi, Dalam Proses, Selesai, Dibatalkan*
  - Pencarian data berdasarkan nama, nomor telepon, email, dan isi pesan
  - Pengubahan status seketika (Server Action)
  - Modal detail pesan dan tombol langsung hubungi klien via WhatsApp
- **Kelola Konten CMS**:
  - **General Settings (`/admin/settings`)**: Identitas firma, kontak kantor, media sosial, dan meta SEO.
  - **Hero Banner (`/admin/hero`)**: Judul H1, foto latar belakang, dan tombol CTA.
  - **Tentang Kami (`/admin/about`)**: Teks narasi, foto kantor 4:3, tombol selengkapnya.
  - **Layanan Hukum (`/admin/services`)**: CRUD bidang praktik lengkap dengan pemilihan icon, slug, dan urutan.
  - **Tim Profesional (`/admin/team`)**: CRUD profil advokat dengan upload foto 1:1.
  - **Keunggulan (`/admin/why-choose-us`)**: CRUD header keunggulan dan poin nilai diferensiasi 01-04.
  - **Section Konsultasi (`/admin/consultation-section`)**: Pengaturan teks ajakan konsultasi pada beranda.
  - **Artikel / Insight (`/admin/articles`)**: CRUD artikel lengkap dengan cover image, slug otomatis, kategori, dan status DRAFT/PUBLISHED.
  - **Tanya Jawab (`/admin/faq`)**: CRUD pertanyaan dan jawaban accordion.
  - **Akun Admin (`/admin/account`)**: Ubah nama admin dan perbarui kata sandi.
  - **Upload Gambar**: Terintegrasi ke `/api/upload` yang menyimpan file di `/public/uploads/` dan mencatat metadata di database `media`.

---

## 🔑 Kredensial Default Admin
- **Halaman Login**: `/admin/login`
- **Email**: `admin@firmalaw.id`
- **Password**: `admin123`

---

## ⚙️ Cara Menjalankan Project

### 1. Prasyarat
- Node.js versi 18+ (disarankan Node 20+)
- PostgreSQL server

### 2. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env` dan sesuaikan koneksi database Anda:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/firma_hukum?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
AUTH_SECRET="firma-hukum-super-secret-jwt-key-2026-auth"
```

### 3. Migrasi & Seed Database
```bash
# Generate Prisma client
npx prisma generate

# Sinkronkan schema ke PostgreSQL
npx prisma db push

# Jalankan seeder konten awal (admin, layanan, tim, artikel, FAQ, settings)
npm run seed
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban Anda di [http://localhost:3000](http://localhost:3000).
- Website publik: [http://localhost:3000](http://localhost:3000)
- Admin CMS: [http://localhost:3000/admin](http://localhost:3000/admin)
