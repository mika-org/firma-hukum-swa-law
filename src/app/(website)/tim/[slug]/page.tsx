import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Briefcase, Award, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await prisma.teamMember.findUnique({
    where: { slug },
  });

  if (!member) return { title: "Profil Tidak Ditemukan" };

  return {
    title: `${member.name} | Tim Profesional`,
    description: `${member.name} - ${member.position} di bidang ${member.specialization}.`,
  };
}

export default async function TeamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await prisma.teamMember.findUnique({
    where: { slug },
  });

  if (!member || !member.isActive) {
    notFound();
  }

  const otherMembers = await prisma.teamMember.findMany({
    where: { isActive: true, NOT: { id: member.id } },
    take: 3,
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-dark py-12 lg:py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tim"
            className="inline-flex items-center text-xs uppercase tracking-wider text-gold hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            <span>Kembali ke Tim Profesional</span>
          </Link>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {member.name}
          </h1>
          <p className="text-sm sm:text-base text-gold uppercase tracking-widest font-semibold mt-1">
            {member.position}
          </p>
        </div>
      </section>

      {/* Main Profile */}
      <section className="bg-white py-16 lg:py-24 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Foto Besar di Kiri (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-square w-full rounded-md overflow-hidden border border-border-subtle shadow-md bg-navy-dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo || "/images/team-agus.jpg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Info Box */}
              <div className="bg-[#FAFAF7] border border-border-subtle p-6 rounded-md space-y-4 text-sm">
                <div>
                  <span className="text-xs uppercase font-semibold text-gold block">
                    Spesialisasi
                  </span>
                  <span className="font-medium text-text-dark">
                    {member.specialization}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-gold block">
                    Pengalaman Praktik
                  </span>
                  <span className="font-medium text-text-dark">
                    {member.experience}
                  </span>
                </div>
              </div>

              {/* Consultation Button */}
              <Link
                href="/#konsultasi"
                className="w-full block text-center py-3.5 px-6 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors shadow-sm"
              >
                Konsultasikan Perkara Bersama Beliau
              </Link>
            </div>

            {/* Konten Profil di Kanan (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Bio / Profil */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
                  Profil Profesional
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-navy-primary mb-4">
                  Biografi & Pendekatan Hukum
                </h2>
                <div className="text-text-muted text-base leading-relaxed whitespace-pre-line">
                  {member.bio ||
                    `${member.name} merupakan advokat berintegritas tinggi dengan rekam jejak mendalam dalam menangani berbagai macam perkara strategis di bidang ${member.specialization}. Beliau berkomitmen memperjuangkan kepastian hukum dan perlindungan maksimal bagi seluruh kepentingan klien.`}
                </div>
              </div>

              {/* Pendidikan */}
              {member.education && (
                <div className="pt-6 border-t border-border-subtle/80 space-y-3">
                  <div className="flex items-center gap-2 text-navy-primary">
                    <GraduationCap className="w-5 h-5 text-gold" />
                    <h3 className="font-editorial text-xl font-bold">
                      Latar Belakang Pendidikan
                    </h3>
                  </div>
                  <p className="text-sm text-text-muted pl-7 leading-relaxed">
                    {member.education}
                  </p>
                </div>
              )}

              {/* Pengalaman & Keahlian */}
              <div className="pt-6 border-t border-border-subtle/80 space-y-3">
                <div className="flex items-center gap-2 text-navy-primary">
                  <Briefcase className="w-5 h-5 text-gold" />
                  <h3 className="font-editorial text-xl font-bold">
                    Pengalaman & Rekam Jejak
                  </h3>
                </div>
                <p className="text-sm text-text-muted pl-7 leading-relaxed">
                  Telah aktif berpraktik selama lebih dari {member.experience} mendampingi berbagai sengketa hukum dan transaksi korporasi berskala nasional.
                </p>
              </div>

              {/* Other Members Preview */}
              <div className="pt-8 border-t border-border-subtle/80">
                <h3 className="font-editorial text-xl font-bold text-navy-primary mb-4">
                  Rekan Advokat Lainnya
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {otherMembers.map((m) => (
                    <Link
                      key={m.id}
                      href={`/tim/${m.slug}`}
                      className="group p-3 border border-border-subtle rounded-md hover:border-gold transition-colors bg-[#FAFAF7] block text-center"
                    >
                      <span className="font-editorial text-sm font-bold text-navy-primary group-hover:text-gold block line-clamp-1">
                        {m.name}
                      </span>
                      <span className="text-[11px] text-gold uppercase tracking-wider block mt-0.5">
                        {m.position}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
