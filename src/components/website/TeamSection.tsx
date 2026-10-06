import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TeamMemberItem {
  id: string;
  name: string;
  slug: string;
  position: string;
  photo?: string | null;
  specialization: string;
  experience: string;
}

interface TeamSectionProps {
  team: TeamMemberItem[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <section className="bg-off-white py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column (35-38%) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Tim Profesional
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-primary leading-tight">
              Advokat Berpengalaman di Bidangnya
            </h2>

            <p className="text-base text-text-muted leading-relaxed">
              Tim kami terdiri dari para profesional hukum dengan pengalaman di berbagai bidang dan komitmen penuh untuk memberikan solusi terbaik bagi Anda.
            </p>

            <div className="pt-4">
              <Link
                href="/tim"
                className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider font-semibold border border-navy-primary text-navy-primary hover:bg-navy-primary hover:text-white rounded transition-all duration-200"
              >
                <span>Lihat Semua Anggota</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Column (62-65%) - 3 members */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {team.slice(0, 3).map((member) => {
                const photoSrc = member.photo || "/images/team-agus.jpg";
                return (
                  <Link
                    key={member.id}
                    href={`/tim/${member.slug}`}
                    className="group block bg-white border border-border-subtle rounded-md overflow-hidden hover:border-gold/60 transition-all duration-200"
                  >
                    {/* 1:1 Aspect ratio photo */}
                    <div className="relative aspect-square w-full bg-navy-dark overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoSrc}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Member Details */}
                    <div className="p-5 space-y-2">
                      <h3 className="font-editorial text-lg font-bold text-navy-primary group-hover:text-gold transition-colors leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                        {member.position}
                      </p>
                      <div className="pt-2 border-t border-border-subtle/50 text-xs text-text-muted space-y-1">
                        <p className="line-clamp-1">{member.specialization}</p>
                        <p className="text-gray-400">{member.experience}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
