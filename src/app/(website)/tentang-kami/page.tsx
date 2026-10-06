import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Shield, Award, Users, Scale, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findFirst();
  return {
    title: `Tentang Kami | ${setting?.firmName || "Firma Hukum"}`,
    description: "Profil, visi, misi, dan nilai-nilai fundamental firma hukum kami dalam mendampingi klien.",
  };
}

export default async function AboutPage() {
  const [about, team, settings] = await Promise.all([
    prisma.aboutSection.findFirst({ where: { isActive: true } }),
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
    prisma.siteSetting.findFirst(),
  ]);

  const imgSrc = about?.imageUrl || "/images/about-legal.jpg";

  return (
    <div>
      {/* Page Header */}
      <section className="bg-navy-dark py-16 lg:py-24 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Tentang Firma Hukum
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Mendampingi dengan Integritas, Ketelitian, dan Keunggulan
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Mengenal lebih dekat dedikasi, filosofi penanganan perkara, serta jajaran advokat profesional di {settings?.firmName || "Firma Hukum Swa Law"}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Philosophy & History */}
      <section className="bg-white py-20 lg:py-28 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
                Filosofi Kami
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-navy-primary leading-tight">
                {about?.title || "Mendampingi Setiap Langkah Hukum Anda"}
              </h2>
              <p className="text-base text-text-muted leading-relaxed whitespace-pre-line">
                {about?.description ||
                  "Kami adalah firma hukum yang memberikan pendampingan strategis dengan mengutamakan integritas, ketelitian, dan kepentingan klien. Kami percaya bahwa setiap kasus memiliki cerita, dan setiap klien berhak mendapatkan solusi hukum terbaik."}
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-text-dark font-medium">
                    Kepatuhan ketat terhadap Kode Etik Advokat dan standar profesionalisme tinggi.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-text-dark font-medium">
                    Pendekatan solutif berbasis analisis risiko menyeluruh guna menghemat waktu dan biaya klien.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-text-dark font-medium">
                    Hubungan kemitraan jangka panjang berlandaskan keterbukaan dan kepercayaan penuh.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-border-subtle shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt="Kantor Hukum Kami"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Fundamental Firma */}
      <section className="bg-off-white py-20 lg:py-24 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Nilai Fundamental
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-navy-primary">
              Prinsip yang Menggerakkan Setiap Langkah Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-border-subtle p-7 rounded-md space-y-3">
              <div className="w-10 h-10 rounded bg-navy-primary text-gold flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-navy-primary">Integritas Tak Berkompromi</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Menempatkan kebenaran faktual dan kejujuran yuridis di atas segalanya demi kehormatan profesi.
              </p>
            </div>

            <div className="bg-white border border-border-subtle p-7 rounded-md space-y-3">
              <div className="w-10 h-10 rounded bg-navy-primary text-gold flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-navy-primary">Ketelitian & Presisi</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Setiap dokumen, pasal, dan bukti dianalisis mendalam guna menutup celah kelemahan perkara.
              </p>
            </div>

            <div className="bg-white border border-border-subtle p-7 rounded-md space-y-3">
              <div className="w-10 h-10 rounded bg-navy-primary text-gold flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-navy-primary">Fokus Pada Klien</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Mendengarkan dengan seksama dan menyesuaikan strategi litigasi maupun non-litigasi dengan tujuan bisnis Anda.
              </p>
            </div>

            <div className="bg-white border border-border-subtle p-7 rounded-md space-y-3">
              <div className="w-10 h-10 rounded bg-navy-primary text-gold flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-navy-primary">Kerahasiaan Mutlak</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Perlindungan data dan informasi rahasia klien terjamin berdasarkan hukum dan protokol keamanan ketat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Preview */}
      <section className="bg-white py-20 lg:py-28 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
                Kepemimpinan
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-navy-primary">
                Advokat Senior Kami
              </h2>
            </div>
            <Link
              href="/tim"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy-primary hover:text-gold transition-colors"
            >
              <span>Lihat Seluruh Anggota Tim</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Link
                key={member.id}
                href={`/tim/${member.slug}`}
                className="group block bg-[#FAFAF7] border border-border-subtle rounded-md overflow-hidden hover:border-gold/60 transition-all duration-200"
              >
                <div className="relative aspect-square w-full bg-navy-dark overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo || "/images/team-agus.jpg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-editorial text-lg font-bold text-navy-primary group-hover:text-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                    {member.position}
                  </p>
                  <p className="text-xs text-text-muted line-clamp-1 pt-1">
                    {member.specialization}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-navy-dark py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
            Siap Berdiskusi Bersama Kami?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Jadwalkan konsultasi awal Anda untuk membicarakan kebutuhan hukum korporasi maupun sengketa perorangan.
          </p>
          <div className="pt-2">
            <Link
              href="/#konsultasi"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-gold hover:bg-gold-dark text-white rounded transition-colors"
            >
              Jadwalkan Konsultasi Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
