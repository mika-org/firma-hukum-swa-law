import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Briefcase, Scale, Shield, FileText, Users, MessageSquare, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findFirst();
  return {
    title: `Bidang Praktik & Layanan Hukum | ${setting?.firmName || "Firma Hukum"}`,
    description: "Daftar komprehensif bidang praktik hukum kami untuk korporasi, bisnis, dan perorangan.",
  };
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case "briefcase":
        return <Briefcase className="w-8 h-8 text-gold" strokeWidth={1.5} />;
      case "scale":
      case "scales":
        return <Scale className="w-8 h-8 text-gold" strokeWidth={1.5} />;
      case "shield":
        return <Shield className="w-8 h-8 text-gold" strokeWidth={1.5} />;
      case "file-text":
        return <FileText className="w-8 h-8 text-gold" strokeWidth={1.5} />;
      case "users":
        return <Users className="w-8 h-8 text-gold" strokeWidth={1.5} />;
      default:
        return <MessageSquare className="w-8 h-8 text-gold" strokeWidth={1.5} />;
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-dark py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Layanan Komprehensif
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Bidang Praktik & Solusi Hukum Kami
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Kami mendampingi para pelaku usaha, institusi perbankan, dan individu dengan standar yuridis tertinggi dan kepatuhan regulasi mutakhir di Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Services */}
      <section className="bg-off-white py-20 lg:py-28 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const num = String(index + 1).padStart(2, "0");
              return (
                <div
                  key={service.id}
                  className="bg-white border border-border-subtle rounded-md p-8 flex flex-col justify-between hover:border-gold transition-colors duration-200 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded bg-off-white border border-border-subtle">
                        {getIcon(service.icon)}
                      </div>
                      <span className="font-editorial text-2xl font-bold text-border-subtle">
                        {num}
                      </span>
                    </div>

                    <h2 className="font-editorial text-2xl font-bold text-navy-primary leading-snug">
                      {service.name}
                    </h2>

                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {service.shortDescription ||
                        service.description?.slice(0, 140) + "..."}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border-subtle/50 mt-6">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy-primary hover:text-gold transition-colors"
                    >
                      <span>Pelajari Ruang Lingkup</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
