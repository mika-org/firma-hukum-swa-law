import { prisma } from "@/lib/prisma";
import Hero from "@/components/website/Hero";
import AboutSection from "@/components/website/AboutSection";
import ServicesSection from "@/components/website/ServicesSection";
import TeamSection from "@/components/website/TeamSection";
import WhyChooseUsSection from "@/components/website/WhyChooseUsSection";
import ConsultationSection from "@/components/website/ConsultationSection";
import ArticlesSection from "@/components/website/ArticlesSection";
import FaqSection from "@/components/website/FaqSection";
import CtaSection from "@/components/website/CtaSection";

export const revalidate = 60;

export default async function HomePage() {
  const [
    hero,
    about,
    services,
    team,
    whyChooseUs,
    consultationSection,
    articles,
    faqs,
    settings,
  ] = await Promise.all([
    prisma.heroSection.findFirst({ where: { isActive: true } }),
    prisma.aboutSection.findFirst({ where: { isActive: true } }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
    prisma.whyChooseUs.findFirst({
      where: { isActive: true },
      include: {
        items: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
    prisma.consultationSection.findFirst({ where: { isActive: true } }),
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
      take: 3,
    }),
    prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.siteSetting.findFirst(),
  ]);

  const heroData = hero || {
    eyebrow: "Your Trusted Legal Partner",
    title: "Solusi Hukum yang Tepat untuk Melindungi Masa Depan Anda",
    description: "Pendampingan hukum profesional bagi individu, perusahaan, dan pelaku usaha.",
    primaryButtonText: "Konsultasi Sekarang",
    primaryButtonUrl: "/#konsultasi",
    secondaryButtonText: "Pelajari Lebih Lanjut",
    secondaryButtonUrl: "/tentang-kami",
    backgroundImage: "/images/hero-legal.jpg",
  };

  const aboutData = about || {
    eyebrow: "Tentang Kami",
    title: "Mendampingi Setiap Langkah Hukum Anda",
    description: "Kami adalah firma hukum yang memberikan pendampingan strategis dengan mengutamakan integritas, ketelitian, dan kepentingan klien.",
    buttonText: "Pelajari Selengkapnya",
    buttonUrl: "/tentang-kami",
    imageUrl: "/images/about-legal.jpg",
  };

  const whyChooseData = whyChooseUs || {
    eyebrow: "Mengapa Memilih Kami",
    title: "Nilai Lebih yang Kami Tawarkan",
    imageUrl: "/images/why-us.jpg",
    items: [],
  };

  const consultData = consultationSection || {
    eyebrow: "Konsultasi Hukum",
    title: "Jadwalkan Konsultasi Anda",
    description: "Ceritakan kebutuhan hukum Anda. Tim kami akan menghubungi Anda untuk informasi lebih lanjut.",
    buttonText: "Kirim Permintaan Konsultasi",
  };

  return (
    <div>
      {/* 1. HERO BANNER */}
      <Hero hero={heroData} />

      {/* 2. TENTANG KAMI */}
      <AboutSection about={aboutData} />

      {/* 3. BIDANG PRAKTIK */}
      <ServicesSection services={services} />

      {/* 4. TIM PROFESIONAL */}
      <TeamSection team={team} />

      {/* 5. MENGAPA MEMILIH KAMI */}
      <WhyChooseUsSection data={whyChooseData} items={whyChooseData.items} />

      {/* 6. KONSULTASI HUKUM (CONVERSION SECTION) */}
      <ConsultationSection
        section={consultData}
        services={services.map((s) => ({ id: s.id, name: s.name }))}
      />

      {/* 7. ARTIKEL / INSIGHT HUKUM */}
      <ArticlesSection articles={articles} />

      {/* 8. FAQ */}
      <FaqSection faqs={faqs} />

      {/* 9. CTA KONSULTASI */}
      <CtaSection whatsapp={settings?.whatsapp} />
    </div>
  );
}
