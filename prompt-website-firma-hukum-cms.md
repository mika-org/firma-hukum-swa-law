# PROMPT — WEBSITE FIRMA HUKUM + CMS
## Next.js + Prisma + PostgreSQL

Buat aplikasi website firma hukum profesional menggunakan:

- Next.js terbaru dengan App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- `.env` untuk konfigurasi database
- Responsive desktop, tablet, dan mobile
- CMS/Admin Dashboard sederhana
- Authentication untuk admin
- Jangan menggunakan Docker
- Struktur kode rapi dan mudah dikembangkan

---

# 1. REFERENSI DESAIN

Gunakan seluruh gambar referensi yang diberikan sebagai acuan utama desain.

Gaya visual:

- Premium
- Profesional
- Elegan
- Minimalis
- Tidak terlihat seperti template AI
- Tidak terlalu banyak card
- Tidak menggunakan gradient berlebihan
- Tidak menggunakan border warna-warni
- Whitespace cukup
- Tipografi formal dan editorial
- Warna dominan navy gelap, putih/off-white, dan gold/beige
- Shadow sangat halus
- Responsive mobile
- Gold hanya sebagai aksen

Website harus memberikan kesan:

> Trusted Legal Partner

Bukan seperti website SaaS, startup teknologi, atau template landing page generik.

---

# 2. PALET WARNA

Gunakan:

- Primary Navy: `#0D2635`
- Dark Navy: `#081B28`
- Off White: `#F7F5EF`
- White: `#FFFFFF`
- Gold / Beige: `#B29A68`
- Light Beige: `#E9E2D2`
- Text Dark: `#17232B`
- Text Muted: `#6B6B67`

Hindari:

- Biru terang
- Ungu
- Hijau neon
- Gradient berlebihan
- Warna aksen terlalu banyak

---

# 3. TYPOGRAPHY

Heading:

- Playfair Display
atau
- Cormorant Garamond

Body:

- Inter
atau
- Manrope

Heading harus terasa editorial, elegan, dan premium.

---

# 4. PUBLIC WEBSITE

Buat halaman:

```text
/
├── /
├── /tentang-kami
├── /layanan
├── /layanan/[slug]
├── /tim
├── /tim/[slug]
├── /artikel
├── /artikel/[slug]
├── /faq
└── /kontak
```

---

# 5. NAVBAR

Desktop:

```text
[LOGO]        Beranda
              Tentang Kami
              Layanan
              Tim
              Artikel
              FAQ

                         [Konsultasi Sekarang]
```

Navbar:

- Background putih
- Sticky saat scroll
- Tinggi sekitar 64–72px
- Logo kiri
- Menu tengah
- CTA kanan
- CTA menggunakan gold/beige
- Border bawah sangat subtle

Logo sementara:

```text
Nama Brand
Firma Hukum & Konsultan
```

Logo dan nama dapat diubah melalui CMS.

---

# 6. MOBILE NAVBAR

Mobile:

```text
[LOGO]                         [MENU]
```

Hamburger menu berisi:

- Beranda
- Tentang Kami
- Layanan
- Tim
- Artikel
- FAQ
- Konsultasi Sekarang

Pastikan tidak ada horizontal scrolling.

---

# 7. HERO BANNER

Hero merupakan bagian visual paling kuat.

Gunakan:

- Foto gedung pengadilan / legal architecture
- Background image dapat diganti melalui CMS
- Dark overlay navy pada sisi kiri
- Gambar tetap terlihat jelas pada sisi kanan

Contoh:

```text
------------------------------------------------
|                                              |
| Your Trusted Legal Partner                   |
|                                              |
| Solusi Hukum yang Tepat                      |
| untuk Melindungi Masa                        |
| Depan Anda                                   |
|                                              |
| Pendampingan hukum profesional bagi          |
| individu, perusahaan, dan pelaku usaha       |
|                                              |
| [ Konsultasi Sekarang ]  Pelajari lebih lanjut
|                                              |
------------------------------------------------
```

Content:

Eyebrow:
`Your Trusted Legal Partner`

Heading:
`Solusi Hukum yang Tepat untuk Melindungi Masa Depan Anda`

Description:
`Pendampingan hukum profesional bagi individu, perusahaan, dan pelaku usaha.`

Primary button:
`Konsultasi Sekarang`

Secondary:
`Pelajari lebih lanjut`

Hero:

- Tinggi desktop sekitar 500–620px
- Mobile menjadi vertical
- Overlay mobile lebih kuat
- Heading mobile sekitar 36–42px
- Button mobile full width atau hampir full width

Semua content hero harus berasal dari CMS.

---

# 8. SECTION TENTANG KAMI

Setelah Hero Banner, tampilkan section Tentang Kami.

Background:

`#F7F5EF`

Layout desktop:

```text
-------------------------------------------------------
|                                                     |
|  Tentang Kami                 [IMAGE]              |
|                                                     |
|  Mendampingi Setiap            [Legal image]       |
|  Langkah Hukum Anda            [4:3 ratio]         |
|                                                     |
|  Kami adalah firma hukum                           |
|  yang memberikan                                    |
|  pendampingan strategis...                          |
|                                                     |
|  [Pelajari Selengkapnya]                            |
|                                                     |
-------------------------------------------------------
```

## LEFT CONTENT

Eyebrow:

`Tentang Kami`

Heading:

```text
Mendampingi Setiap
Langkah Hukum Anda
```

Description:

> Kami adalah firma hukum yang memberikan pendampingan strategis dengan mengutamakan integritas, ketelitian, dan kepentingan klien. Kami percaya bahwa setiap kasus memiliki cerita, dan setiap klien berhak mendapatkan solusi hukum terbaik.

Button:

`Pelajari Selengkapnya`

Button:

- Background transparan / putih
- Border navy tipis
- Text navy
- Tidak terlalu rounded
- Padding compact
- Hover background navy + text putih

## RIGHT CONTENT

Gunakan gambar legal profesional:

- Meja kerja pengacara
- Buku hukum
- Patung Lady Justice
- Ruang kantor hukum
- Dokumen hukum

Image:

- Aspect ratio sekitar 4:3
- Object-fit cover
- Tidak menggunakan border tebal
- Tidak menggunakan shadow berlebihan

---

# 9. CMS — TENTANG KAMI

Menu:

```text
Website
└── Tentang Kami
```

Field:

```text
eyebrow
title
description
image
button_text
button_url
is_active
```

Database:

```text
about_sections

id
eyebrow
title
description
image_url
button_text
button_url
is_active
created_at
updated_at
```

Admin dapat mengubah seluruh content tanpa source code.

---

# 10. SECTION BIDANG PRAKTIK / LAYANAN HUKUM

Setelah Tentang Kami langsung tampilkan:

Eyebrow:

`Layanan Hukum`

Heading:

`Bidang Praktik Kami`

Description:

> Kami menyediakan layanan hukum yang komprehensif untuk memenuhi berbagai kebutuhan Anda.

Layout:

```text
-------------------------------------------------------
|                                                     |
| Layanan Hukum                 Kami menyediakan      |
| Bidang Praktik Kami           layanan hukum...      |
|                                                     |
| [CARD] [CARD] [CARD]                               |
|                                                     |
-------------------------------------------------------
```

## SERVICE CARDS

Desktop: 3 kolom

Tablet: 2 kolom

Mobile: 1 kolom

Contoh:

### 01 — Hukum Perusahaan & Bisnis

Pendampingan hukum untuk perusahaan, startup, dan transaksi bisnis.

### 02 — Hukum Perdata

Penyelesaian sengketa perdata dan perjanjian.

### 03 — Hukum Pidana

Pendampingan dalam proses hukum pidana.

Card:

- Background `#FAFAF7`
- Border `1px solid #D8D5CC`
- Border radius 6–8px
- Shadow sangat tipis atau tanpa shadow
- Padding sekitar 24px
- Tinggi seragam

Jangan menggunakan:

- Gradient
- Shadow tebal
- Border warna-warni
- Rounded corner berlebihan

---

# 11. SERVICE CARD ICON

Gunakan icon line-art sederhana.

Contoh:

- Hukum Perusahaan & Bisnis → briefcase
- Hukum Perdata → scales
- Hukum Pidana → shield

Icon:

`#B29A68`

Ukuran:

28–32px

Jangan gunakan icon 3D atau icon warna-warni.

---

# 12. CMS — LAYANAN HUKUM

Menu:

```text
Website
└── Layanan Hukum
```

CRUD:

- Create
- Read
- Update
- Delete

Field:

```text
name
slug
short_description
description
icon
image
sort_order
is_active
```

Contoh:

```text
name:
Hukum Perusahaan & Bisnis

slug:
hukum-perusahaan-bisnis

short_description:
Pendampingan hukum untuk perusahaan, startup, dan transaksi bisnis

sort_order:
1

is_active:
true
```

Service detail:

`/layanan/[slug]`

Urutan:

`sort_order ASC`

---

# 13. SECTION TIM PROFESIONAL

Setelah Bidang Praktik, tampilkan:

Eyebrow:

`Tim Profesional`

Heading:

```text
Advokat Berpengalaman
di Bidangnya
```

Description:

> Tim kami terdiri dari para profesional hukum dengan pengalaman di berbagai bidang dan komitmen penuh untuk memberikan solusi terbaik bagi Anda.

Button:

`Lihat Semua Anggota`

Background:

`#F7F5EF`

---

# 14. TEAM LAYOUT

Desktop:

```text
---------------------------------------------------------
|                                                     |
| Tim Profesional       [FOTO] [FOTO] [FOTO]         |
|                                                     |
| Advokat               Agus       Rahmat     Deni    |
| Berpengalaman         Mulyana    Hidayat    Saturnus|
| di Bidangnya                                         |
|                                                     |
| Description             Partner    Associate Lawyer |
|                                                     |
| [Lihat Semua Anggota]                               |
---------------------------------------------------------
```

Bagian kiri:

35–38%

Bagian kanan:

62–65%

Tampilkan 3 anggota utama pada homepage.

---

# 15. TEAM MEMBER

Contoh:

```text
Agus Mulyana, S.H., M.H.
Managing Partner

Corporate & Commercial Law
12+ tahun pengalaman
```

```text
Rahmat Hidayat, S.H.
Senior Associate

Litigation & Dispute Resolution
8+ tahun pengalaman
```

```text
Deni Saturnus, S.H
Associate Lawyer

Employment & Labor Law
10+ tahun pengalaman
```

Foto:

- Portrait
- Aspect ratio 1:1
- Object-fit cover
- Tidak menggunakan border
- Tidak menggunakan overlay berlebihan

Nama:

Serif / semi-serif

Informasi:

Sans-serif, kecil, muted.

---

# 16. CMS — TIM PROFESIONAL

Menu:

```text
Website
└── Tim
```

CRUD Team Member.

Field:

```text
name
slug
position
photo
specialization
experience
bio
education
sort_order
is_active
```

Homepage:

- Hanya tampilkan anggota `is_active = true`
- Urutkan `sort_order ASC`
- Tampilkan 3 anggota pertama

Jika lebih dari 3:

Button:

`Lihat Semua Anggota`

Menuju:

`/tim`

---

# 17. HALAMAN SEMUA TIM

Route:

`/tim`

Desktop:

4 kolom

Tablet:

2 kolom

Mobile:

1–2 kolom tergantung ukuran layar.

Setiap anggota dapat diklik:

`/tim/[slug]`

Detail:

- Foto besar
- Nama
- Jabatan
- Spesialisasi
- Profil
- Pendidikan
- Pengalaman

---

# 18. SECTION MENGAPA MEMILIH KAMI

Setelah Tim, buat section:

Eyebrow:

`Mengapa Memilih Kami`

Heading:

`Nilai Lebih yang Kami Tawarkan`

Background:

`#0D2635`

Text:

- White
- Off-white

Accent:

`#B29A68`

---

# 19. WHY CHOOSE US LAYOUT

Desktop:

```text
---------------------------------------------------------
|                    |                                  |
|                    | Mengapa Memilih Kami             |
|      IMAGE         |                                  |
|                    | Nilai Lebih yang Kami Tawarkan   |
|                    |                                  |
|                    | 01                 02            |
|                    | Pendekatan         Komunikasi    |
|                    | Terstruktur        Transparan    |
|                    |                                  |
|                    | 03                 04            |
|                    | Integritas         Berorientasi  |
|                    |                                  |
---------------------------------------------------------
```

Image:

45%

Content:

55%

Mobile:

Image di atas, content di bawah.

---

# 20. WHY CHOOSE US ITEMS

Contoh:

### 01 — Pendekatan Hukum yang Terstruktur

> Analisis mendalam untuk solusi yang tepat.

### 02 — Komunikasi yang Transparan

> Selalu update setiap proses penanganan.

### 03 — Integritas dan Kerahasiaan

> Menjaga kepercayaan dan informasi klien.

### 04 — Berorientasi pada Solusi

> Fokus pada hasil dan kepentingan terbaik klien.

Gunakan icon line-art:

- Pendekatan → scales
- Komunikasi → message/chat
- Integritas → shield
- Solusi → target

Icon:

`#B29A68`

Gunakan lingkaran dengan border gold tipis jika diperlukan.

---

# 21. CMS — WHY CHOOSE US

Menu:

```text
Website
└── Keunggulan
```

Model:

```text
why_choose_us

id
eyebrow
title
image_url
is_active
created_at
updated_at
```

Items:

```text
why_choose_us_items

id
why_choose_us_id
title
description
icon
sort_order
is_active
created_at
updated_at
```

Admin dapat mengubah:

- Heading
- Description
- Image
- Value items
- Icon
- Urutan

---

# 22. SECTION KONSULTASI HUKUM

Setelah section **"Mengapa Memilih Kami"**, tampilkan section konsultasi hukum berdasarkan referensi gambar.

Section ini menjadi area conversion utama sebelum bagian Artikel / Insight atau dapat ditempatkan sebelum section content lanjutan sesuai kebutuhan layout.

Background:

`#F7F5EF`

Layout desktop:

```text
---------------------------------------------------------------
|                                                             |
|  Konsultasi Hukum          |  [ FORM KONSULTASI ]          |
|                             |                               |
|  Jadwalkan Konsultasi Anda  |  Nama Lengkap                |
|                             |  [________________________]  |
|  Ceritakan kebutuhan hukum  |                               |
|  Anda. Tim kami akan        |  Nomor Telepon | Bidang      |
|  menghubungi Anda untuk     |  [____________] | [_______] |
|  informasi lebih lanjut.    |                               |
|                             |  Lorem ipsum / Pesan          |
|                             |  [________________________]  |
|                             |                               |
|                             |  [Kirim Permintaan]           |
---------------------------------------------------------------
```

## LEFT CONTENT

Eyebrow:

`Konsultasi Hukum`

Heading:

```text
Jadwalkan Konsultasi Anda
```

Description:

> Ceritakan kebutuhan hukum Anda. Tim kami akan menghubungi Anda untuk informasi lebih lanjut.

Gunakan heading serif yang besar dan elegan.

Text body menggunakan sans-serif.

---

# 23. FORM KONSULTASI

Form berada di sisi kanan desktop.

Field:

### Nama Lengkap

Placeholder:

`Isi Nama Lengkap`

### Nomor Telepon

Placeholder:

`Isi Nomor Telepon Aktif`

### Bidang Hukum yang Dibutuhkan

Dropdown:

`Pilih Bidang Hukum`

Options mengambil data dari tabel `services`.

### Pesan

Textarea:

`Ceritakan kebutuhan hukum Anda`

### Button

`Kirim Permintaan Konsultasi`

---

# 24. CONSULTATION FORM DESIGN

Form harus terlihat clean dan profesional.

Gunakan:

- Background putih
- Border `#B8B5AD`
- Border radius 6–8px
- Input height sekitar 42–48px
- Padding 12–14px
- Label kecil dan jelas
- Focus border navy
- Focus ring sangat subtle
- Button navy atau gold
- Tidak menggunakan shadow tebal

Desktop:

```text
Form width:
45–50%
```

Content kiri:

```text
45–50%
```

Gap:

32–64px

---

# 25. CONSULTATION FORM RESPONSIVE

Desktop:

```text
LEFT CONTENT        RIGHT FORM
45%                 55%
```

Tablet:

```text
LEFT CONTENT
RIGHT FORM
```

Mobile:

```text
Konsultasi Hukum

Jadwalkan Konsultasi Anda

Description

Nama Lengkap
[________________]

Nomor Telepon
[________________]

Bidang Hukum
[________________]

Pesan
[________________]

[Kirim Permintaan Konsultasi]
```

Form harus full width pada mobile.

Jangan sampai input menyebabkan horizontal scrolling.

---

# 26. CMS — KONSULTASI HUKUM

Menu:

```text
Website
└── Konsultasi
```

Admin dapat mengatur:

```text
eyebrow
title
description
button_text
is_active
```

Model:

```text
consultation_sections

id
eyebrow
title
description
button_text
is_active
created_at
updated_at
```

Field form tidak perlu disimpan di CMS sebagai konfigurasi terpisah karena field utamanya tetap:

- Nama
- Nomor Telepon
- Bidang Hukum
- Pesan

Daftar bidang hukum mengambil data dari `services`.

---

# 27. DATABASE — CONSULTATION REQUEST

Simpan permintaan konsultasi dari website.

Model:

```text
consultation_requests

id
name
phone
email
service_id
message
status
created_at
updated_at
```

Status:

```text
NEW
CONTACTED
IN_PROGRESS
COMPLETED
CANCELLED
```

Relasi:

```text
consultation_requests
        |
        └── service_id
                ↓
             services
```

Admin dapat melihat consultation request dari CMS.

Menu:

```text
Admin
└── Konsultasi Masuk
```

---

# 28. CMS — KONSULTASI MASUK

Buat halaman:

`/admin/consultations`

Tampilkan DataTable:

```text
Nama
Nomor Telepon
Bidang Hukum
Pesan
Status
Tanggal
Action
```

Action:

- Lihat detail
- Ubah status
- Hapus jika diperlukan

Detail konsultasi:

```text
Nama
Nomor Telepon
Email
Bidang Hukum
Pesan
Tanggal Permintaan
Status
```

Status dapat diubah oleh admin.

---

# 29. VALIDASI CONSULTATION FORM

Gunakan Zod.

Validasi minimal:

```text
name:
required
minimal 2 karakter

phone:
required

service_id:
required

message:
required
minimal 10 karakter
```

Email:

optional tetapi jika diisi harus valid.

Tampilkan error validation dengan bahasa yang mudah dipahami.

Contoh:

`Nama lengkap wajib diisi.`

`Nomor telepon wajib diisi.`

`Silakan pilih bidang hukum.`

`Ceritakan kebutuhan hukum Anda minimal 10 karakter.`

---

# 30. CONSULTATION SUBMISSION

Saat user mengirim form:

1. Validasi data.
2. Simpan ke `consultation_requests`.
3. Tampilkan success state.
4. Reset form.
5. Berikan pesan:

> Terima kasih. Permintaan konsultasi Anda telah diterima. Tim kami akan menghubungi Anda dalam waktu dekat.

Jangan reload seluruh halaman jika tidak diperlukan.

Gunakan Server Action atau Route Handler.

Tambahkan loading state pada button:

`Mengirim...`

---

# 31. OPTIONAL WHATSAPP INTEGRATION

Siapkan struktur agar consultation request dapat dikembangkan ke WhatsApp.

Untuk versi awal:

- Simpan request ke database.
- Admin melihat request di CMS.

Jangan wajibkan integrasi WhatsApp pada tahap pertama.

Jika nantinya diaktifkan, nomor WhatsApp dan template pesan harus berasal dari `site_settings`.

---

# 32. HOMEPAGE FINAL FLOW — UPDATED

Homepage harus memiliki urutan:

```text
NAVBAR
   ↓
HERO BANNER
"Solusi Hukum yang Tepat
untuk Melindungi Masa Depan Anda"
   ↓
TENTANG KAMI
"Mendampingi Setiap Langkah Hukum Anda"
   ↓
BIDANG PRAKTIK
"Bidang Praktik Kami"
   ↓
TIM PROFESIONAL
"Advokat Berpengalaman di Bidangnya"
   ↓
MENGAPA MEMILIH KAMI
"Nilai Lebih yang Kami Tawarkan"
   ↓
KONSULTASI HUKUM
"Jadwalkan Konsultasi Anda"
   ↓
ARTIKEL / INSIGHT HUKUM
   ↓
FAQ
   ↓
CTA KONSULTASI
   ↓
FOOTER
```

Section konsultasi harus menjadi **conversion section** yang berbeda dari CTA sederhana.

CTA sederhana tetap boleh digunakan setelah FAQ sebagai penutup sebelum footer.

---

# 33. UPDATED CMS MENU

Struktur CMS menjadi:

```text
Dashboard

Website
├── General Settings
├── Hero
├── Tentang Kami
├── Layanan Hukum
├── Tim Profesional
├── Keunggulan
├── Konsultasi
├── Artikel
├── FAQ
├── Contact
└── Social Media

Konsultasi Masuk

Settings
└── Admin Account

Logout
```


# 22. ARTIKEL / INSIGHT HUKUM

Section:

`Insight & Artikel Hukum`

Tampilkan artikel terbaru.

Setiap artikel:

- Thumbnail
- Kategori
- Judul
- Tanggal
- Excerpt

Layout desktop:

Featured article besar di kiri + 2 artikel kecil di kanan.

Mobile:

Stack vertical.

Detail:

`/artikel/[slug]`

Isi:

- Judul
- Kategori
- Tanggal
- Author
- Featured image
- Content
- Related articles

Gunakan rich text editor di CMS.

---

# 23. CMS ARTIKEL

CRUD artikel.

Field:

```text
title
slug
excerpt
content
featured_image
category
author
published_at
status
```

Status:

```text
DRAFT
PUBLISHED
```

Artikel hanya muncul jika:

`status = PUBLISHED`

Slug otomatis dari title tetapi tetap bisa diedit.

---

# 24. FAQ

Buat accordion FAQ.

Contoh:

- Apa saja layanan hukum yang tersedia?
- Bagaimana cara melakukan konsultasi?
- Apakah konsultasi harus dilakukan secara langsung?
- Bagaimana biaya jasa hukum ditentukan?
- Apakah informasi klien dijamin kerahasiaannya?

FAQ dapat dikelola melalui CMS.

CRUD fields:

```text
question
answer
order
is_active
```

---

# 25. CONTACT / CONSULTATION

Halaman:

`/kontak`

Form:

```text
Nama
Nomor WhatsApp
Email
Jenis Layanan
Pesan
```

Button:

`Kirim Permintaan Konsultasi`

Informasi:

- Alamat kantor
- Nomor telepon
- WhatsApp
- Email
- Jam operasional

Semua berasal dari CMS.

---

# 26. CTA CONSULTATION

Buat CTA kuat sebelum footer.

Background:

Navy.

Heading:

`Butuh Pendampingan Hukum?`

Description:

`Konsultasikan kebutuhan hukum Anda bersama tim profesional kami.`

Button:

`Jadwalkan Konsultasi`

Button gold.

---

# 27. FOOTER

Footer menggunakan dark navy.

Kolom:

- Brand
- Navigasi
- Layanan
- Kontak
- Social Media

Bottom:

```text
© 2026 Nama Brand. All Rights Reserved.
```

Links:

- Privacy Policy
- Terms & Conditions

---

# 28. CMS / ADMIN DASHBOARD

Route:

`/admin`

Authentication:

`/admin/login`

Sidebar:

```text
Dashboard

Website
├── General Settings
├── Hero
├── Tentang Kami
├── Layanan Hukum
├── Tim Profesional
├── Keunggulan
├── Artikel
├── FAQ
├── Contact
└── Social Media

Settings
└── Admin Account

Logout
```

---

# 29. ADMIN DASHBOARD DESIGN

CMS:

- Clean
- Minimal
- Professional
- Sidebar
- Topbar
- Table
- Form
- Modal jika diperlukan

Warna:

- White
- Off-white
- Navy
- Gold sebagai accent

Hindari dashboard colorful dan template SaaS.

---

# 30. GENERAL SETTINGS

Admin dapat mengubah:

```text
Nama Firma
Tagline
Logo
Favicon
Email
Nomor Telepon
WhatsApp
Alamat
Google Maps URL
Jam Operasional
```

Social:

```text
Instagram
LinkedIn
Facebook
YouTube
```

SEO:

```text
Meta Title
Meta Description
OG Image
```

---

# 31. DATABASE

Gunakan PostgreSQL + Prisma.

Models minimal:

```text
users
site_settings
hero_sections
about_sections
services
team_members
why_choose_us
why_choose_us_items
consultation_sections
consultation_requests
articles
article_categories
faqs
contact_settings
social_links
media
```

Database naming wajib snake_case.

Contoh:

```text
site_settings
hero_sections
team_members
article_categories
why_choose_us_items
```

---

# 32. PRISMA

Gunakan Prisma ORM.

Contoh:

```prisma
model Service {
  id               String   @id @default(cuid())
  name             String
  slug             String   @unique
  shortDescription String?
  description      String?
  image            String?
  sortOrder        Int      @default(0)
  isActive         Boolean  @default(true)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@map("services")
}
```

Gunakan `@@map()` untuk memastikan nama tabel database menggunakan snake_case.

---

# 33. ENVIRONMENT

Gunakan `.env`.

Contoh:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/legal_firm"

NEXT_PUBLIC_SITE_URL="http://localhost:3000"

AUTH_SECRET="change-this-secret"

MEDIA_STORAGE_PATH="/var/www/storage-legal"
```

Buat:

`.env.example`

Jangan hardcode credentials.

---

# 34. IMAGE MANAGEMENT

CMS harus memiliki upload image untuk:

- Logo
- Hero
- About
- Service
- Team
- Why Choose Us
- Article
- OG Image

Jangan menyimpan binary image di PostgreSQL.

Database menyimpan:

```text
image_url
storage_path
```

File disimpan pada storage.

---

# 35. API / SERVER ACTION

Gunakan:

- Next.js Server Actions
atau
- Route Handlers

CRUD harus menggunakan server-side validation.

Gunakan:

`Zod`

Contoh:

```text
createService()
updateService()
deleteService()

createTeamMember()
updateTeamMember()
deleteTeamMember()

createArticle()
updateArticle()
deleteArticle()
```

---

# 36. AUTHENTICATION

Admin login:

```text
email
password
```

Password wajib di-hash.

Semua `/admin/*` harus protected kecuali:

`/admin/login`

Gunakan middleware / server-side protection.

---

# 37. SEO

Setiap halaman memiliki metadata.

Home:

```text
title:
Nama Firma — Trusted Legal Partner

description:
Firma hukum profesional yang memberikan solusi hukum strategis...
```

Artikel memiliki dynamic metadata.

Open Graph:

```text
og:title
og:description
og:image
og:url
```

Tambahkan:

```text
sitemap.xml
robots.txt
```

---

# 38. RESPONSIVE

WAJIB responsive.

Target:

```text
Desktop:
1440px
1280px

Tablet:
1024px
768px

Mobile:
430px
390px
375px
```

Tidak boleh ada horizontal scrolling.

Hero desktop:

Text + image.

Hero mobile:

Image + text.

Grid:

```text
Desktop → 3/4 columns
Tablet  → 2 columns
Mobile  → 1 column
```

Tentang Kami:

Desktop → 2 columns

Mobile → stack

Tim:

Desktop → 3 anggota homepage

Mobile → 1–2 kolom

Why Choose Us:

Desktop → image + content

Mobile → image atas + content bawah

---

# 39. UI COMPONENTS

Reusable website components:

```text
Navbar
MobileMenu
Button
SectionHeading
Hero
AboutSection
ServiceCard
TeamCard
WhyChooseUs
ArticleCard
FAQAccordion
CTASection
Footer
```

Admin:

```text
AdminSidebar
AdminHeader
DataTable
FormInput
FormTextarea
ImageUpload
RichTextEditor
ConfirmDialog
StatusBadge
```

---

# 40. ANIMATION

Gunakan animasi minimal.

Boleh menggunakan Framer Motion.

Animasi:

- Fade-in
- Slide-up
- Image reveal
- Hover

Jangan menggunakan:

- Excessive animation
- Bouncing
- Flashy transition
- Parallax berlebihan

Website harus terasa seperti firma hukum profesional.

---

# 41. ACCESSIBILITY

Pastikan:

- Semantic HTML
- Alt image
- Keyboard navigation
- Focus state
- aria-label
- Contrast baik
- Form label jelas

---

# 42. PERFORMANCE

Optimalkan:

- `next/image`
- Lazy loading
- Font optimization
- Dynamic import jika diperlukan

Gunakan Server Components sebanyak mungkin.

Jangan membuat semua component menjadi Client Component.

---

# 43. STRUKTUR PROJECT

Gunakan:

```text
src/
├── app/
│   ├── (website)/
│   │   ├── page.tsx
│   │   ├── tentang-kami/
│   │   ├── layanan/
│   │   ├── tim/
│   │   ├── artikel/
│   │   ├── faq/
│   │   └── kontak/
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── team/
│   │   ├── articles/
│   │   ├── faq/
│   │   └── settings/
│   │
│   └── api/
│
├── components/
│   ├── website/
│   ├── admin/
│   └── ui/
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validations/
│   └── utils.ts
│
├── actions/
│   ├── services.ts
│   ├── team.ts
│   ├── articles.ts
│   └── settings.ts
│
└── prisma/
    └── schema.prisma

public/
└── images/

.env
.env.example
```

---

# 44. HOMEPAGE FINAL FLOW

Homepage harus memiliki urutan:

```text
NAVBAR
   ↓
HERO BANNER
"Solusi Hukum yang Tepat
untuk Melindungi Masa Depan Anda"
   ↓
TENTANG KAMI
"Mendampingi Setiap Langkah Hukum Anda"
   ↓
BIDANG PRAKTIK
"Bidang Praktik Kami"
   ↓
TIM PROFESIONAL
"Advokat Berpengalaman di Bidangnya"
   ↓
MENGAPA MEMILIH KAMI
"Nilai Lebih yang Kami Tawarkan"
   ↓
ARTIKEL / INSIGHT HUKUM
   ↓
FAQ
   ↓
CTA KONSULTASI
   ↓
FOOTER
```

---

# 45. VISUAL TRANSITION

Gunakan pergantian background:

```text
Hero:
image + navy

Tentang:
off-white

Bidang Praktik:
white

Tim:
off-white

Mengapa Memilih Kami:
navy

Artikel:
off-white

FAQ:
white

CTA:
navy

Footer:
dark navy
```

Whitespace:

Desktop:
80–120px

Tablet:
64–80px

Mobile:
48–64px

Jangan menggunakan divider dekoratif berlebihan.

---

# 46. INITIAL CONTENT

Gunakan dummy content realistis.

Nama:

`Nama Brand`

Tagline:

`Trusted Legal Partner`

Hero:

`Solusi Hukum yang Tepat untuk Melindungi Masa Depan Anda`

About:

`Mendampingi Setiap Langkah Hukum Anda`

Services:

- Hukum Perusahaan & Bisnis
- Hukum Perdata
- Hukum Pidana
- Legal Drafting
- Hukum Ketenagakerjaan
- Konsultasi Hukum

Team:

Gunakan dummy lawyer profiles.

Contoh:

```text
Agus Mulyana, S.H., M.H.
Managing Partner
Corporate & Commercial Law
12+ tahun pengalaman
```

```text
Rahmat Hidayat, S.H.
Senior Associate
Litigation & Dispute Resolution
8+ tahun pengalaman
```

```text
Deni Saturnus, S.H
Associate Lawyer
Employment & Labor Law
10+ tahun pengalaman
```

Artikel:

Buat minimal 6 artikel dummy mengenai hukum.

FAQ:

Buat minimal 6 FAQ.

---

# 47. IMPLEMENTATION ORDER

Kerjakan bertahap:

## PHASE 1
Setup Next.js + TypeScript + Tailwind.

## PHASE 2
Setup Prisma + PostgreSQL.

## PHASE 3
Database schema.

## PHASE 4
Admin authentication.

## PHASE 5
CMS Dashboard.

## PHASE 6
CMS CRUD:

- Settings
- Hero
- About
- Services
- Team
- Why Choose Us
- Articles
- FAQ
- Contact

## PHASE 7
Public website.

## PHASE 8
Responsive mobile.

## PHASE 9
SEO.

## PHASE 10
Image upload.

## PHASE 11
Validation.

## PHASE 12
Testing dan final cleanup.

---

# 48. FINAL DESIGN RULE

Jangan membuat website seperti template landing page AI.

Hindari:

- Gradient background
- Terlalu banyak card
- Glassmorphism
- Icon berwarna-warni
- Dashboard colorful
- Shadow tebal
- Button terlalu besar
- Typography terlalu modern
- Layout SaaS
- Rounded corner berlebihan

Prioritaskan:

1. Typography
2. Photography
3. Whitespace
4. Alignment
5. Editorial layout
6. Navy + off-white + gold
7. Subtle interaction
8. Professional legal aesthetic

Section Tim harus terasa editorial, bukan kumpulan card biasa.

Section Mengapa Memilih Kami harus terasa seperti brand statement yang kuat.

Keseluruhan website harus terasa seperti:

> Premium Indonesian Law Firm

Karakter:

- Elegant
- Professional
- Trustworthy
- Calm
- Editorial
- Minimal
- Corporate

---

# 49. FINAL FUNCTIONAL REQUIREMENT

Jangan hanya membuat mockup.

Buat aplikasi yang benar-benar functional:

- Database terhubung
- Admin dapat login
- Admin dapat CRUD data
- Data CMS muncul di website
- Upload image bekerja
- Artikel dapat dipublish
- Service dapat dibuat dari CMS
- Team dapat dikelola
- Why Choose Us dapat dikelola
- FAQ dapat dikelola
- Settings website dapat diubah
- Responsive mobile
- SEO siap
- Production-ready structure

Website dapat dijalankan dengan:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Pastikan `.env.example` tersedia dan dokumentasikan setup PostgreSQL, migration, seed, admin account, storage, dan production deployment.

---

# 50. OUTPUT YANG DIHARAPKAN DARI CODING AGENT

Saat mulai mengerjakan project:

1. Analisis requirement ini.
2. Buat struktur project.
3. Buat Prisma schema.
4. Buat migration.
5. Buat seed data.
6. Buat authentication admin.
7. Buat CMS.
8. Buat public website.
9. Hubungkan seluruh content public website dengan database CMS.
10. Implementasikan upload image.
11. Implementasikan responsive mobile.
12. Implementasikan SEO.
13. Jalankan lint/type checking.
14. Perbaiki error.
15. Pastikan semua route utama dapat dibuka.
16. Berikan ringkasan file yang dibuat/diubah.
17. Berikan instruksi menjalankan project.

Jangan berhenti pada desain statis. Seluruh bagian yang disebutkan harus berfungsi dan terhubung.
