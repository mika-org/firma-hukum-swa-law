import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findFirst();
  return {
    title: `Tim Profesional & Advokat | ${setting?.firmName || "Firma Hukum"}`,
    description: "Profil advokat senior, partner, dan associate di firma hukum kami.",
  };
}

export default async function TeamPage() {
  const team = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-dark py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Para Profesional
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Tim Advokat & Konsultan Hukum
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Didukung oleh para praktisi hukum berpengalaman yang memiliki dedikasi tinggi, integritas moral, dan keahlian spesifik pada masing-masing bidang praktik.
            </p>
          </div>
        </div>
      </section>

      {/* Team 4-columns Grid */}
      <section className="bg-off-white py-20 lg:py-28 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Link
                key={member.id}
                href={`/tim/${member.slug}`}
                className="group block bg-white border border-border-subtle rounded-md overflow-hidden hover:border-gold transition-all duration-200 shadow-sm"
              >
                <div className="relative aspect-square w-full bg-navy-dark overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo || "/images/team-agus.jpg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-2">
                  <h2 className="font-editorial text-xl font-bold text-navy-primary group-hover:text-gold transition-colors leading-snug">
                    {member.name}
                  </h2>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                    {member.position}
                  </p>
                  <div className="pt-2 border-t border-border-subtle/60 text-xs text-text-muted space-y-1">
                    <p className="font-medium text-text-dark">{member.specialization}</p>
                    <p className="text-gray-400">{member.experience}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
