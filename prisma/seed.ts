import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database for Firma Hukum CMS...");

  // 1. Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@firmalaw.id" },
    update: {
      name: "Administrator",
      password: hashedPassword,
    },
    create: {
      email: "admin@firmalaw.id",
      name: "Administrator",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✓ Admin user created:", admin.email);

  // 2. Site Settings
  const siteSetting = await prisma.siteSetting.upsert({
    where: { id: "default-settings" },
    update: {},
    create: {
      id: "default-settings",
      firmName: "Firma Hukum Swa Law",
      tagline: "Firma Hukum & Konsultan Hukum Terpercaya",
      email: "kontak@swalaw.id",
      phone: "+62 21 5289 7700",
      whatsapp: "+62 811 8899 7722",
      address: "Treasury Tower Lantai 28, SCBD District 8, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190",
      mapsUrl: "https://maps.google.com/?q=SCBD+Jakarta",
      openingHours: "Senin - Jumat: 08:30 - 17:30 WIB",
      instagram: "https://instagram.com/swalaw",
      linkedin: "https://linkedin.com/company/swalaw",
      facebook: "https://facebook.com/swalaw",
      youtube: "https://youtube.com/@swalaw",
      metaTitle: "Firma Hukum Swa Law — Trusted Legal Partner",
      metaDescription: "Firma hukum independen yang memberikan pendampingan strategis dan solusi hukum terpercaya bagi korporasi nasional, multinasional, dan individu.",
    },
  });
  console.log("✓ Site settings initialized");

  // 3. Hero Section
  await prisma.heroSection.upsert({
    where: { id: "default-hero" },
    update: {},
    create: {
      id: "default-hero",
      eyebrow: "Your Trusted Legal Partner",
      title: "Solusi Hukum yang Tepat untuk Melindungi Masa Depan Anda",
      description: "Pendampingan hukum profesional bagi individu, perusahaan, dan pelaku usaha dengan integritas tinggi dan dedikasi penuh.",
      primaryButtonText: "Konsultasi Sekarang",
      primaryButtonUrl: "/#konsultasi",
      secondaryButtonText: "Pelajari Lebih Lanjut",
      secondaryButtonUrl: "/tentang-kami",
      backgroundImage: "/images/hero-legal.jpg",
      isActive: true,
    },
  });
  console.log("✓ Hero section initialized");

  // 4. About Section
  await prisma.aboutSection.upsert({
    where: { id: "default-about" },
    update: {},
    create: {
      id: "default-about",
      eyebrow: "Tentang Kami",
      title: "Mendampingi Setiap Langkah Hukum Anda",
      description: "Kami adalah firma hukum yang memberikan pendampingan strategis dengan mengutamakan integritas, ketelitian, dan kepentingan klien. Kami percaya bahwa setiap kasus memiliki cerita, dan setiap klien berhak mendapatkan solusi hukum terbaik.",
      imageUrl: "/images/about-legal.jpg",
      buttonText: "Pelajari Selengkapnya",
      buttonUrl: "/tentang-kami",
      isActive: true,
    },
  });
  console.log("✓ About section initialized");

  // 5. Services
  const servicesData = [
    {
      name: "Hukum Perusahaan & Bisnis",
      slug: "hukum-perusahaan-bisnis",
      shortDescription: "Pendampingan komprehensif untuk tata kelola perusahaan, akuisisi, merger, kepatuhan regulasi, dan transaksi komersial strategis.",
      description: "Layanan hukum korporasi kami mencakup pendirian badan usaha, restrukturisasi permodalan, perizinan berusaha berbasis risiko (OSS-RBA), penyusunan shareholder agreement, merger & acquisition, hingga audit kepatuhan hukum (legal due diligence) bagi korporasi maupun startup skala berkembang.",
      icon: "briefcase",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Hukum Perdata & Sengketa Kontrak",
      slug: "hukum-perdata-sengketa-kontrak",
      shortDescription: "Penyelesaian sengketa wanprestasi, perbuatan melawan hukum (PMH), pertanahan, dan mediasi keperdataan bernilai tinggi.",
      description: "Kami mendampingi klien dalam negosiasi pra-litigasi, mediasi formal, perumusan somasi, gugatan keperdataan di Pengadilan Negeri, banding, kasasi, hingga peninjauan kembali (PK) di Mahkamah Agung, dengan fokus mitigasi risiko dan pengamanan aset klien.",
      icon: "scale",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Hukum Pidana & White-Collar Crime",
      slug: "hukum-pidana-white-collar-crime",
      shortDescription: "Pendampingan profesional dalam proses penyidikan, penuntutan perkara pidana umum dan tindak pidana korporasi / keuangan.",
      description: "Bantuan hukum mendalam mulai dari tahap penyelidikan di Kepolisian, Kejaksaan, hingga persidangan di Pengadilan. Spesialisasi pada tindak pidana perbankan, penipuan investasi, perlindungan data, pencemaran nama baik digital (UU ITE), dan tindak pidana ekonomi.",
      icon: "shield",
      sortOrder: 3,
      isActive: true,
    },
    {
      name: "Legal Drafting & Analisis Kontrak",
      slug: "legal-drafting-analisis-kontrak",
      shortDescription: "Penyusunan perjanjian bilateral/multilateral, non-disclosure agreement (NDA), klausul perlindungan hak cipta, dan review kontrak berkala.",
      description: "Memastikan seluruh klausul perjanjian melindungi hak hukum klien, meminimalisir celah multitafsir, dan mematuhi asas kebebasan berkontrak sesuai Pasal 1338 KUHPerdata serta peraturan sektoral terkait di Republik Indonesia.",
      icon: "file-text",
      sortOrder: 4,
      isActive: true,
    },
    {
      name: "Hukum Ketenagakerjaan & Hubungan Industrial",
      slug: "hukum-ketenagakerjaan-hubungan-industrial",
      shortDescription: "Solusi harmonis terkait peraturan perusahaan (PP), perjanjian kerja bersama (PKB), audit kepatuhan ketenagakerjaan, dan mitigasi PHK.",
      description: "Membimbing divisi Human Capital dalam merancang kontrak kerja waktu tertentu (PKWT/PKWTT), outsourcing, kepatuhan BPJS Ketenagakerjaan, mediasi di Dinas Tenaga Kerja, hingga litigasi di Pengadilan Hubungan Industrial (PHI).",
      icon: "users",
      sortOrder: 5,
      isActive: true,
    },
    {
      name: "Konsultasi Hukum & Legal Opinion",
      slug: "konsultasi-hukum-legal-opinion",
      shortDescription: "Pemberian pendapat hukum tertulis (Legal Opinion) yang objektif, mendalam, dan berbasis kepastian hukum positif Indonesia.",
      description: "Kajian yuridis independen sebelum klien mengambil keputusan bisnis krusial, investasi luar negeri, transaksi properti bernilai signifikan, maupun langkah hukum litigasi yang memerlukan evaluasi kekuatan bukti.",
      icon: "message-square",
      sortOrder: 6,
      isActive: true,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✓ ${servicesData.length} Services initialized`);

  // 6. Team Members
  const teamData = [
    {
      name: "Agus Mulyana, S.H., M.H.",
      slug: "agus-mulyana",
      position: "Managing Partner",
      specialization: "Corporate & Commercial Law",
      experience: "15+ Tahun Pengalaman",
      bio: "Agus Mulyana adalah pendiri sekaligus Managing Partner yang memiliki rekam jejak panjang dalam mendampingi restrukturisasi korporasi multinasional, joint venture sektor energi, dan kepatuhan perbankan di Indonesia. Beliau terdaftar sebagai anggota Peradi dan Asosiasi Kurator dan Pengurus Indonesia.",
      education: "Sarjana Hukum (Universitas Indonesia), Magister Hukum Bisnis (Universitas Gadjah Mada)",
      photo: "/images/team-agus.jpg",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Rahmat Hidayat, S.H.",
      slug: "rahmat-hidayat",
      position: "Senior Associate",
      specialization: "Litigation & Dispute Resolution",
      experience: "9+ Tahun Pengalaman",
      bio: "Rahmat berfokus pada advokasi litigasi perdata perbankan, sengketa kepemilikan tanah skala besar, dan perkara arbitrase niaga di BANI. Memiliki ketajaman analisis bukti dan strategi negosiasi yang berorientasi pada penyelesaian cepat.",
      education: "Sarjana Hukum (Universitas Padjadjaran)",
      photo: "/images/team-rahmat.jpg",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Deni Saturnus, S.H.",
      slug: "deni-saturnus",
      position: "Associate Lawyer",
      specialization: "Employment & Labor Law",
      experience: "10+ Tahun Pengalaman",
      bio: "Deni berpengalaman luas dalam mendampingi sengketa hubungan industrial di berbagai kawasan industri Jabodetabek dan Jawa Barat. Kerap menjadi narasumber seminar ketenagakerjaan mengenai kepatuhan regulasi ketenagakerjaan pasca UU Cipta Kerja.",
      education: "Sarjana Hukum (Universitas Diponegoro)",
      photo: "/images/team-deni.jpg",
      sortOrder: 3,
      isActive: true,
    },
    {
      name: "Kartika Sari, S.H., LL.M.",
      slug: "kartika-sari",
      position: "Partner",
      specialization: "International Trade & Intellectual Property",
      experience: "12+ Tahun Pengalaman",
      bio: "Kartika memimpin divisi kekayaan intelektual dan perdagangan internasional. Banyak menangani sengketa merek internasional, hak paten teknologi, dan perlindungan data pribadi (PDP) bagi perusahaan digital terkemuka.",
      education: "Sarjana Hukum (Universitas Airlangga), LL.M in International Commercial Law (Leiden University)",
      photo: "/images/team-kartika.jpg",
      sortOrder: 4,
      isActive: true,
    },
  ];

  for (const t of teamData) {
    await prisma.teamMember.upsert({
      where: { slug: t.slug },
      update: t,
      create: t,
    });
  }
  console.log(`✓ ${teamData.length} Team members initialized`);

  // 7. Why Choose Us Section & Items
  const whyChooseUs = await prisma.whyChooseUs.upsert({
    where: { id: "default-why-choose-us" },
    update: {},
    create: {
      id: "default-why-choose-us",
      eyebrow: "Mengapa Memilih Kami",
      title: "Nilai Lebih yang Kami Tawarkan",
      imageUrl: "/images/why-us.jpg",
      isActive: true,
    },
  });

  const whyChooseUsItems = [
    {
      id: "why-item-1",
      whyChooseUsId: whyChooseUs.id,
      title: "Pendekatan Hukum yang Terstruktur",
      description: "Analisis mendalam dengan metodologi riset yuridis yang komprehensif untuk menghasilkan solusi hukum yang presisi dan minim risiko.",
      icon: "scale",
      sortOrder: 1,
      isActive: true,
    },
    {
      id: "why-item-2",
      whyChooseUsId: whyChooseUs.id,
      title: "Komunikasi yang Transparan",
      description: "Laporan perkembangan perkara berkala secara transparan sehingga klien selalu memahami posisi dan tahapan hukum yang berjalan.",
      icon: "message-square",
      sortOrder: 2,
      isActive: true,
    },
    {
      id: "why-item-3",
      whyChooseUsId: whyChooseUs.id,
      title: "Integritas dan Kerahasiaan",
      description: "Menjunjung tinggi kode etik advokat dan kerahasiaan seluruh dokumen serta data sensitif klien tanpa kompromi.",
      icon: "shield",
      sortOrder: 3,
      isActive: true,
    },
    {
      id: "why-item-4",
      whyChooseUsId: whyChooseUs.id,
      title: "Berorientasi pada Solusi",
      description: "Fokus pada efisiensi waktu dan hasil terbaik yang memberikan kepastian hukum dan mendukung kelangsungan tujuan bisnis Anda.",
      icon: "target",
      sortOrder: 4,
      isActive: true,
    },
  ];

  for (const item of whyChooseUsItems) {
    await prisma.whyChooseUsItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log("✓ Why Choose Us initialized with 4 items");

  // 8. Consultation Section
  await prisma.consultationSection.upsert({
    where: { id: "default-consultation-section" },
    update: {},
    create: {
      id: "default-consultation-section",
      eyebrow: "Konsultasi Hukum",
      title: "Jadwalkan Konsultasi Anda",
      description: "Ceritakan kebutuhan hukum Anda. Tim advokat kami akan menganalisis latar belakang permasalahan dan menghubungi Anda dalam waktu 1x24 jam kerja.",
      buttonText: "Kirim Permintaan Konsultasi",
      isActive: true,
    },
  });
  console.log("✓ Consultation section initialized");

  // 9. Article Categories & Articles
  const catBisnis = await prisma.articleCategory.upsert({
    where: { slug: "hukum-bisnis" },
    update: {},
    create: { name: "Hukum Bisnis & Korporasi", slug: "hukum-bisnis" },
  });

  const catPerdata = await prisma.articleCategory.upsert({
    where: { slug: "hukum-perdata" },
    update: {},
    create: { name: "Hukum Perdata & Kontrak", slug: "hukum-perdata" },
  });

  const catKetenagakerjaan = await prisma.articleCategory.upsert({
    where: { slug: "ketenagakerjaan" },
    update: {},
    create: { name: "Ketenagakerjaan & HR", slug: "ketenagakerjaan" },
  });

  const catRegulasi = await prisma.articleCategory.upsert({
    where: { slug: "regulasi-kebijakan" },
    update: {},
    create: { name: "Regulasi & Kepatuhan", slug: "regulasi-kebijakan" },
  });

  const articlesData = [
    {
      title: "Panduan Hukum Korporasi: Mitigasi Risiko Klausul Kontrak Bisnis di Era Digital",
      slug: "panduan-hukum-korporasi-mitigasi-risiko-klausul-kontrak-bisnis",
      categoryId: catBisnis.id,
      excerpt: "Menganalisis klausul ganti rugi, pembatasan tanggung jawab (limitation of liability), dan yurisdiksi penyelesaian sengketa untuk mencegah kerugian finansial perusahaan.",
      content: `Penyusunan perjanjian komersial yang solid merupakan garis pertahanan terdepan dalam menjaga kelangsungan bisnis. Banyak entitas bisnis menandatangani kontrak standar tanpa menelaah secara teliti klausul pembatasan tanggung jawab, ketentuan wanprestasi, dan mekanisme penyelesaian sengketa.

Dalam praktik hukum bisnis Indonesia, asas kebebasan berkontrak yang diatur dalam Pasal 1338 KUHPerdata memberikan fleksibilitas luas bagi para pihak. Namun demikian, pembatasan tanggung jawab tidak boleh bertentangan dengan ketertiban umum dan kesusilaan (Pasal 1337 KUHPerdata).

Tiga klausul krusial yang wajib diaudit:
1. Klausul Kerahasiaan (Non-Disclosure & Data Protection): Menjamin perlindungan rahasia dagang dan mematuhi UU Perlindungan Data Pribadi (UU PDP).
2. Klausul Force Majeure: Mengakomodasi ketidakpastian geopolitik, regulasi baru pemerintah, dan kegagalan sistemik teknologi secara adil.
3. Klausul Penyelesaian Sengketa (Dispute Resolution): Menentukan secara tegas pilihan forum penyelesaian, baik melalui arbitrase (BANI/SIAC) maupun pengadilan niaga.

Konsultasikan draft perjanjian strategis perusahaan Anda kepada advokat hukum korporasi berpengalaman sebelum penandatanganan final dilakukan.`,
      featuredImage: "/images/article-1.jpg",
      author: "Agus Mulyana, S.H., M.H.",
      publishedAt: new Date("2026-03-15T09:00:00Z"),
      status: "PUBLISHED",
    },
    {
      title: "Tahapan dan Strategi Penyelesaian Sengketa Perdata Melalui Mediasi",
      slug: "tahapan-dan-strategi-penyelesaian-sengketa-perdata-melalui-mediasi",
      categoryId: catPerdata.id,
      excerpt: "Bagaimana mediasi pra-peradilan dan mediasi formal di pengadilan dapat menghemat waktu, menjaga reputasi bisnis, serta mengamankan hak keperdataan klien.",
      content: `Mediasi merupakan alternatif penyelesaian sengketa yang semakin diutamakan oleh para pelaku usaha di Indonesia. Berdasarkan Peraturan Mahkamah Agung (PERMA) No. 1 Tahun 2016, seluruh perkara gugatan perdata wajib menempuh proses mediasi sebelum persidangan pokok perkara dimulai.

Keuntungan Mediasi:
- Kerahasiaan Terjaga: Berbeda dengan sidang pengadilan yang terbuka untuk umum, proses mediasi tertutup sehingga menjaga nama baik dan rahasia dagang para pihak.
- Efisiensi Biaya dan Waktu: Mediasi yang berhasil menghasilkan Akta Perdamaian (Dading) yang memiliki kekuatan eksekutorial sama dengan putusan hakim berkekuatan hukum tetap (inkracht).
- Solusi Win-Win: Para pihak dapat merumuskan skema kompromi komersial yang fleksibel tanpa harus ada pihak yang dinyatakan mutlak kalah.

Strategi Kunci Keberhasilan Mediasi:
Persiapkan dokumen pembuktian awal yang kokoh dan buat batas toleransi konsesi hukum sebelum memasuki meja perundingan bersama mediator bersertifikat.`,
      featuredImage: "/images/article-2.jpg",
      author: "Rahmat Hidayat, S.H.",
      publishedAt: new Date("2026-03-20T10:30:00Z"),
      status: "PUBLISHED",
    },
    {
      title: "Memahami Hak dan Kewajiban Pemberi Kerja Terkait Regulasi Ketenagakerjaan",
      slug: "memahami-hak-kewajiban-pemberi-kerja-regulasi-ketenagakerjaan",
      categoryId: catKetenagakerjaan.id,
      excerpt: "Panduan praktis bagi manajemen dan HR mengenai ketentuan kompensasi PKWT, pesangon efisiensi perusahaan, dan penyusunan Peraturan Perusahaan yang sah.",
      content: `Dinamika hukum ketenagakerjaan di Indonesia menuntut manajemen perusahaan untuk selalu memperbarui klausul perjanjian kerja dan Peraturan Perusahaan (PP). Kesalahan dalam penafsiran regulasi ketenagakerjaan dapat menimbulkan konsekuensi sanksi administratif dan potensi gugatan perselisihan hak di Pengadilan Hubungan Industrial (PHI).

Aspek Esensial yang Perlu Diperhatikan:
1. Uang Kompensasi PKWT: Pemberi kerja wajib memberikan uang kompensasi kepada pekerja kontrak pada saat berakhirnya masa kerja PKWT, dihitung secara proporsional.
2. Formulasi Uang Pesangon: Kebijakan efisiensi korporasi wajib didasarkan pada alasan yang sah menurut hukum dengan kalkulasi pesangon dan uang penghargaan masa kerja yang akurat.
3. Kepatuhan Standar Keselamatan (K3): Pemenuhan jaminan sosial kesehatan dan kecelakaan kerja melalui sistem jaminan ketenagakerjaan nasional.

Harmonisasi hubungan industrial dimulai dari kontrak kerja yang adil, jelas, dan berkepastian hukum.`,
      featuredImage: "/images/article-3.jpg",
      author: "Deni Saturnus, S.H.",
      publishedAt: new Date("2026-03-25T14:15:00Z"),
      status: "PUBLISHED",
    },
    {
      title: "Prosedur Kepatuhan Hukum Perlindungan Data Pribadi (UU PDP) bagi Perusahaan",
      slug: "prosedur-kepatuhan-hukum-perlindungan-data-pribadi-bagi-perusahaan",
      categoryId: catRegulasi.id,
      excerpt: "Kewajiban penunjukan Data Protection Officer (DPO), penyesuaian consent form, dan sanksi denda administratif yang wajib diantisipasi oleh korporasi.",
      content: `Pemberlakuan penuh Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) menandai era baru tanggung jawab korporasi di Indonesia. Setiap badan hukum yang memproses data pribadi konsumen, karyawan, atau mitra bisnis diklasifikasikan sebagai Pengendali atau Prosesor Data Pribadi.

Langkah Kepatuhan Prioritas:
- Audit Pemetaan Data (Data Mapping): Mengidentifikasi seluruh arus data pribadi yang dikumpulkan, disimpan, dan ditransfer.
- Pembaharuan Dokumen Kebijakan Privasi: Menjamin adanya persetujuan eksplisit (explicit consent) yang transparan dan dapat ditarik kembali oleh subjek data.
- Protokol Tanggap Insiden Kebocoran Data: Menyiapkan rencana mitigasi darurat dalam kurun waktu 3x24 jam kepada otoritas berwenang jika terjadi kegagalan sistem perlindungan data.`,
      featuredImage: "/images/article-4.jpg",
      author: "Kartika Sari, S.H., LL.M.",
      publishedAt: new Date("2026-03-28T11:00:00Z"),
      status: "PUBLISHED",
    },
    {
      title: "Langkah Strategis Restrukturisasi Utang dan PKPU bagi Kelangsungan Bisnis",
      slug: "langkah-strategis-restrukturisasi-utang-dan-pkpu-kelangsungan-bisnis",
      categoryId: catBisnis.id,
      excerpt: "Mengenal mekanisme Penundaan Kewajiban Pembayaran Utang (PKPU) sebagai instrumen penyelamatan usaha debitur dari ancaman kepailitan.",
      content: `Di tengah fluktuasi ekonomi global, banyak perseroan menghadapi tantangan likuiditas jangka pendek. Mekanisme Penundaan Kewajiban Pembayaran Utang (PKPU) di Pengadilan Niaga seringkali disalahpahami sebagai proses kepailitan, padahal hakikat utamanya adalah pemberian kesempatan reorganisasi dan negosiasi proposal perdamaian utang.

Tahapan Kritis PKPU:
1. PKPU Sementara (maksimal 45 hari): Waktu di mana debitur bersama pengurus menyusun rencana perdamaian dan verifikasi piutang kreditur.
2. PKPU Tetap (hingga 270 hari): Forum pembahasan mendalam skema perpanjangan tenor, potongan bunga (haircut), atau konversi utang menjadi saham.
3. Homologasi Pengadilan: Pengesahan perdamaian oleh majelis hakim niaga yang mengikat seluruh kreditur konkruen maupun separatis.`,
      featuredImage: "/images/article-5.jpg",
      author: "Agus Mulyana, S.H., M.H.",
      publishedAt: new Date("2026-04-01T08:00:00Z"),
      status: "PUBLISHED",
    },
    {
      title: "Aspek Yuridis Pengalihan Aset dan Kepemilikan Properti Komersial",
      slug: "aspek-yuridis-pengalihan-aset-dan-kepemilikan-properti-komersial",
      categoryId: catPerdata.id,
      excerpt: "Pentingnya legal due diligence terhadap sertifikat tanah, kesesuaian tata ruang (RDTR), dan validitas hak tanggungan sebelum transaksi properti.",
      content: `Transaksi pengalihan properti bernilai tinggi membutuhkan verifikasi legal mendalam guna menghindari sengketa hak milik di kemudian hari. Pemeriksaan keabsahan sertifikat (HGB, Hak Milik, atau HPL) di Kantor Pertanahan setempat (BPN) adalah keharusan mutlak.

Hal yang Wajib Diperiksa:
- Riwayat Kepemilikan: Menyelidiki apakah terdapat sengketa waris, blokir pengadilan, atau sita jaminan yang belum terhapus.
- Kesesuaian Tata Ruang: Memastikan rencana pemanfaatan lahan komersial sesuai dengan Rencana Detil Tata Ruang (RDTR) pemerintah daerah setempat.
- Pembayaran Pajak Transaksi: Validasi BPHTB dan PPh Final sebelum penandatanganan Akta Jual Beli (AJB) di hadapan PPAT.`,
      featuredImage: "/images/article-6.jpg",
      author: "Rahmat Hidayat, S.H.",
      publishedAt: new Date("2026-04-03T13:45:00Z"),
      status: "PUBLISHED",
    },
  ];

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }
  console.log(`✓ ${articlesData.length} Articles initialized`);

  // 10. FAQs
  const faqsData = [
    {
      question: "Apa saja layanan hukum yang tersedia di firma kami?",
      answer: "Kami melayani penanganan hukum yang komprehensif, mulai dari Hukum Perusahaan & Korporasi, Hukum Perdata dan Sengketa Kontrak, Hukum Pidana & White-Collar Crime, Ketenagakerjaan & Hubungan Industrial, Legal Drafting, hingga pemberian Legal Opinion berkekuatan analisis mendalam.",
      sortOrder: 1,
      isActive: true,
    },
    {
      question: "Bagaimana tata cara menjadwalkan konsultasi awal?",
      answer: "Anda dapat mengisi formulir jadwal konsultasi pada halaman website kami atau langsung menghubungi WhatsApp resmi kami. Tim administrasi kami akan mengonfirmasi jadwal pertemuan, baik tatap muka di kantor SCBD Jakarta maupun secara daring via video conference.",
      sortOrder: 2,
      isActive: true,
    },
    {
      question: "Apakah konsultasi hukum dapat dilakukan secara daring / online?",
      answer: "Ya, kami memfasilitasi konsultasi daring menggunakan platform Zoom atau Google Meet yang aman bagi klien di luar Jakarta maupun di luar negeri, setelah dokumen pendukung awal kami verifikasi.",
      sortOrder: 3,
      isActive: true,
    },
    {
      question: "Bagaimana skema penentuan honorarium / biaya jasa hukum?",
      answer: "Penetapan honorarium disesuaikan secara transparan berdasarkan kompleksitas kasus, waktu penanganan, dan nilai sengketa. Kami menyediakan opsi Retainer Fee (bulanan untuk korporasi), Hourly Rate, Lump Sum (per penanganan perkara), ataupun Success Fee sesuai kesepakatan tertulis dalam Letter of Engagement.",
      sortOrder: 4,
      isActive: true,
    },
    {
      question: "Apakah kerahasiaan informasi dan dokumen klien terjamin secara hukum?",
      answer: "Pasti. Berdasarkan UU No. 18 Tahun 2003 tentang Advokat dan Kode Etik Advokat Indonesia, seluruh advokat kami wajib menjaga kerahasiaan informasi yang diperoleh dari klien sehubungan dengan penanganan perkara, didukung dengan perjanjian Non-Disclosure Agreement (NDA).",
      sortOrder: 5,
      isActive: true,
    },
    {
      question: "Dokumen apa saja yang perlu disiapkan sebelum konsultasi pertama?",
      answer: "Untuk konsultasi sengketa atau kontrak, mohon siapkan salinan perjanjian terkait, surat korespondensi / somasi (jika ada), bukti-bukti pembayaran atau transaksi, serta kronologis singkat kejadian agar tim kami dapat memberikan kajian awal yang akurat.",
      sortOrder: 6,
      isActive: true,
    },
  ];

  for (let i = 0; i < faqsData.length; i++) {
    const f = faqsData[i];
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: f });
    } else {
      await prisma.faq.create({ data: f });
    }
  }
  console.log(`✓ ${faqsData.length} FAQs initialized`);

  // 11. Initial sample Consultation Request for Admin demonstration
  const sampleService = await prisma.service.findFirst({ where: { slug: "hukum-perusahaan-bisnis" } });
  const sampleRequest = await prisma.consultationRequest.findFirst({ where: { phone: "+6281299887766" } });
  if (!sampleRequest && sampleService) {
    await prisma.consultationRequest.create({
      data: {
        name: "Budi Santoso",
        phone: "+6281299887766",
        email: "budi.santoso@perusahaanmaju.co.id",
        serviceId: sampleService.id,
        message: "Selamat siang, kami membutuhkan pendampingan legal due diligence untuk rencana akuisisi entitas anak usaha baru di bidang logistik. Mohon informasi jadwal temu.",
        status: "NEW",
      },
    });
    console.log("✓ Sample consultation request created");
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
