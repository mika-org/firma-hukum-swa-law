import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Scale, PhoneCall } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) return { title: "Layanan Tidak Ditemukan" };

  return {
    title: `${service.name} | Bidang Praktik`,
    description: service.shortDescription || service.description?.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service || !service.isActive) {
    notFound();
  }

  const allServices = await prisma.service.findMany({
    where: { isActive: true, NOT: { id: service.id } },
    take: 5,
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-navy-dark py-16 lg:py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 max-w-3xl">
            <Link
              href="/layanan"
              className="inline-flex items-center text-xs uppercase tracking-wider text-gold hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              <span>Kembali ke Seluruh Layanan</span>
            </Link>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {service.name}
            </h1>

            {service.shortDescription && (
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {service.shortDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="bg-white py-16 lg:py-24 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
                  Ulasan Praktik
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-navy-primary mb-6">
                  Pendekatan Strategis & Ruang Lingkup Layanan
                </h2>
                <div className="text-text-muted text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
                  {service.description || service.shortDescription}
                </div>
              </div>

              {/* Legal Assurance Points */}
              <div className="bg-off-white border border-border-subtle p-6 sm:p-8 rounded-md space-y-4">
                <h3 className="font-editorial text-xl font-bold text-navy-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span>Komitmen Penanganan Perkara Kami</span>
                </h3>
                <div className="space-y-2.5 text-sm text-text-dark">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Audit kepatuhan komprehensif terhadap peraturan perundang-undangan RI.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Perlindungan aset dan mitigasi kerugian finansial atau sanksi hukum.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>Advokat pendamping terdaftar resmi dan berpengalaman di ranah litigasi maupun non-litigasi.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Box Konsultasi Cepat */}
              <div className="bg-navy-primary text-white p-7 rounded-md space-y-5 shadow-lg border border-gold/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-navy-dark flex items-center justify-center text-gold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white">
                    Butuh Bantuan?
                  </h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Konsultasikan perkara {service.name.toLowerCase()} bersama advokat kami untuk menentukan langkah hukum yang tepat.
                </p>
                <div className="pt-2">
                  <Link
                    href="/#konsultasi"
                    className="block text-center w-full py-3 px-4 text-xs uppercase tracking-wider font-semibold bg-gold hover:bg-gold-dark text-white rounded transition-colors"
                  >
                    Jadwalkan Konsultasi
                  </Link>
                </div>
              </div>

              {/* Layanan Terkait */}
              <div className="bg-off-white border border-border-subtle p-6 rounded-md">
                <h4 className="font-editorial text-lg font-bold text-navy-primary mb-4 pb-2 border-b border-border-subtle">
                  Bidang Praktik Lainnya
                </h4>
                <ul className="space-y-3 text-sm">
                  {allServices.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/layanan/${s.slug}`}
                        className="text-text-dark hover:text-gold transition-colors flex items-center justify-between"
                      >
                        <span className="line-clamp-1">{s.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0 ml-2" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
