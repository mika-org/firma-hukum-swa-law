import Link from "next/link";
import { Briefcase, Scale, Shield, FileText, Users, MessageSquare, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  icon?: string | null;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case "briefcase":
        return <Briefcase className="w-7 h-7 text-gold" strokeWidth={1.5} />;
      case "scale":
      case "scales":
        return <Scale className="w-7 h-7 text-gold" strokeWidth={1.5} />;
      case "shield":
        return <Shield className="w-7 h-7 text-gold" strokeWidth={1.5} />;
      case "file-text":
        return <FileText className="w-7 h-7 text-gold" strokeWidth={1.5} />;
      case "users":
        return <Users className="w-7 h-7 text-gold" strokeWidth={1.5} />;
      default:
        return <MessageSquare className="w-7 h-7 text-gold" strokeWidth={1.5} />;
    }
  };

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Layanan Hukum
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-primary leading-tight">
              Bidang Praktik Kami
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md leading-relaxed">
            Kami menyediakan layanan hukum yang komprehensif untuk memenuhi berbagai kebutuhan korporasi maupun perorangan dengan standar integritas tertinggi.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const formattedNumber = String(index + 1).padStart(2, "0");
            return (
              <div
                key={service.id}
                className="group bg-[#FAFAF7] border border-border-subtle rounded-md p-7 flex flex-col justify-between hover:border-gold/60 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded bg-white border border-border-subtle/80 group-hover:border-gold/40 transition-colors">
                      {getIcon(service.icon)}
                    </div>
                    <span className="font-editorial text-xl font-bold text-border-subtle group-hover:text-gold transition-colors">
                      {formattedNumber}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-navy-primary mb-3 group-hover:text-gold transition-colors leading-snug">
                    {service.name}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-6">
                    {service.shortDescription || "Pendampingan hukum profesional dan terstruktur sesuai regulasi hukum positif Indonesia."}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between">
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy-primary group-hover:text-gold transition-colors"
                  >
                    <span>Pelajari Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/layanan"
            className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider font-semibold border border-border-subtle hover:border-navy-primary text-navy-primary rounded transition-colors"
          >
            Lihat Seluruh Bidang Praktik
          </Link>
        </div>
      </div>
    </section>
  );
}
