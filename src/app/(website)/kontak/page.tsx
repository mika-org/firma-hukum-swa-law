import { prisma } from "@/lib/prisma";
import ConsultationSection from "@/components/website/ConsultationSection";
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findFirst();
  return {
    title: `Kontak & Jadwal Konsultasi | ${setting?.firmName || "Firma Hukum"}`,
    description: "Hubungi kantor firma hukum kami di Jakarta untuk janji temu, permohonan konsultasi perkara, atau kerja sama korporasi.",
  };
}

export default async function ContactPage() {
  const [settings, services, consultationSection] = await Promise.all([
    prisma.siteSetting.findFirst(),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
    prisma.consultationSection.findFirst({ where: { isActive: true } }),
  ]);

  const consultData = consultationSection || {
    eyebrow: "Formulir Konsultasi",
    title: "Sampaikan Kebutuhan Hukum Anda",
    description: "Isi data formulir berikut secara lengkap. Advokat kami akan menelaah latar belakang permasalahan Anda secara saksama.",
    buttonText: "Kirim Permintaan Konsultasi",
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-dark py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Hubungi Kami
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Kantor Pusat & Saluran Konsultasi
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Kami siap melayani kebutuhan pendampingan hukum Anda. Silakan hubungi kami melalui telepon, WhatsApp resmi, atau kunjungi kantor kami di Jakarta.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards Grid */}
      <section className="bg-white py-12 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Alamat */}
            <div className="bg-[#FAFAF7] border border-border-subtle p-6 rounded-md space-y-2">
              <div className="w-9 h-9 rounded bg-navy-primary text-gold flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-navy-primary">Alamat Kantor</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {settings?.address || "SCBD District 8, Jakarta Selatan 12190"}
              </p>
              {settings?.mapsUrl && (
                <a
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-gold hover:underline pt-1"
                >
                  Buka Google Maps <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>

            {/* Telepon */}
            <div className="bg-[#FAFAF7] border border-border-subtle p-6 rounded-md space-y-2">
              <div className="w-9 h-9 rounded bg-navy-primary text-gold flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-navy-primary">Telepon Kantor</h3>
              <p className="text-xs text-text-muted">
                {settings?.phone || "+62 21 5289 7700"}
              </p>
              <p className="text-[11px] text-gray-400">Senin - Jumat 08:30 - 17:30</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-[#FAFAF7] border border-border-subtle p-6 rounded-md space-y-2">
              <div className="w-9 h-9 rounded bg-navy-primary text-gold flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-navy-primary">WhatsApp Resmi</h3>
              <p className="text-xs text-text-muted">
                {settings?.whatsapp || "+62 811 8899 7722"}
              </p>
              <a
                href={`https://wa.me/${settings?.whatsapp?.replace(/[^0-9]/g, "") || "6281188997722"}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-semibold text-gold hover:underline pt-1"
              >
                Chat WhatsApp <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            {/* Email */}
            <div className="bg-[#FAFAF7] border border-border-subtle p-6 rounded-md space-y-2">
              <div className="w-9 h-9 rounded bg-navy-primary text-gold flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-navy-primary">Surel Elektronik</h3>
              <p className="text-xs text-text-muted">
                {settings?.email || "kontak@firmalaw.id"}
              </p>
              <p className="text-[11px] text-gray-400">Kirim berkas perkara / LOE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <ConsultationSection section={consultData} services={services} />
    </div>
  );
}
