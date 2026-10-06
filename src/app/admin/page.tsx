import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";
import {
  Mail,
  Briefcase,
  Users,
  FileText,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalConsultations,
    newConsultations,
    totalServices,
    totalTeam,
    totalArticles,
    recentRequests,
  ] = await Promise.all([
    prisma.consultationRequest.count(),
    prisma.consultationRequest.count({ where: { status: "NEW" } }),
    prisma.service.count({ where: { isActive: true } }),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.consultationRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { service: true },
    }),
  ]);

  const stats = [
    {
      label: "Konsultasi Baru",
      value: newConsultations,
      href: "/admin/consultations",
      icon: Mail,
      highlight: newConsultations > 0,
    },
    {
      label: "Total Permohonan",
      value: totalConsultations,
      href: "/admin/consultations",
      icon: Clock,
    },
    {
      label: "Layanan Aktif",
      value: totalServices,
      href: "/admin/services",
      icon: Briefcase,
    },
    {
      label: "Anggota Tim",
      value: totalTeam,
      href: "/admin/team",
      icon: Users,
    },
    {
      label: "Artikel Terbit",
      value: totalArticles,
      href: "/admin/articles",
      icon: FileText,
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Dashboard Utama"
        description="Ringkasan data permohonan konsultasi dan statistik konten firma hukum"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                href={s.href}
                className={`p-5 rounded-md border transition-all duration-200 block ${
                  s.highlight
                    ? "bg-amber-50/70 border-amber-300 hover:border-amber-400"
                    : "bg-white border-border-subtle hover:border-gold"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      s.highlight ? "bg-amber-100 text-amber-800" : "bg-off-white text-navy-primary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-editorial text-2xl font-bold text-navy-primary block">
                  {s.value}
                </span>
                <span className="text-xs text-text-muted">{s.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Konsultasi Masuk Terbaru */}
        <div className="bg-white border border-border-subtle rounded-md overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-border-subtle flex items-center justify-between">
            <div>
              <h2 className="font-editorial text-xl font-bold text-navy-primary">
                Permohonan Konsultasi Terbaru
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                5 permohonan terakhir yang masuk melalui formulir website
              </p>
            </div>
            <Link
              href="/admin/consultations"
              className="inline-flex items-center text-xs font-semibold text-gold hover:text-gold-dark transition-colors"
            >
              <span>Kelola Semua Konsultasi</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {recentRequests.length === 0 ? (
            <div className="p-8 text-center text-text-muted text-sm">
              Belum ada permohonan konsultasi yang masuk.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF7] text-text-dark border-b border-border-subtle uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-5">Nama Klien</th>
                    <th className="py-3 px-5">Kontak</th>
                    <th className="py-3 px-5">Bidang Hukum</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5">Tanggal</th>
                    <th className="py-3 px-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60">
                  {recentRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-off-white/50 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-navy-primary">
                        {req.name}
                      </td>
                      <td className="py-3.5 px-5 text-text-muted">
                        <div>{req.phone}</div>
                        {req.email && <div className="text-[11px] text-gray-400">{req.email}</div>}
                      </td>
                      <td className="py-3.5 px-5 text-text-dark">
                        {req.service?.name || "Konsultasi Umum"}
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="py-3.5 px-5 text-gray-400">
                        {new Date(req.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <Link
                          href={`/admin/consultations?id=${req.id}`}
                          className="text-xs font-semibold text-navy-primary hover:text-gold"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick CMS Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/settings"
            className="p-6 bg-white border border-border-subtle rounded-md hover:border-gold transition-colors space-y-2"
          >
            <h3 className="font-editorial text-lg font-bold text-navy-primary">
              Informasi Firma & Kontak
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Perbarui nama kantor, alamat SCBD, nomor WhatsApp, jam operasional, dan meta SEO.
            </p>
          </Link>

          <Link
            href="/admin/services"
            className="p-6 bg-white border border-border-subtle rounded-md hover:border-gold transition-colors space-y-2"
          >
            <h3 className="font-editorial text-lg font-bold text-navy-primary">
              Kelola Bidang Praktik
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Tambah bidang hukum baru, ubah deskripsi perkara, urutan tampilan, dan icon.
            </p>
          </Link>

          <Link
            href="/admin/articles"
            className="p-6 bg-white border border-border-subtle rounded-md hover:border-gold transition-colors space-y-2"
          >
            <h3 className="font-editorial text-lg font-bold text-navy-primary">
              Publikasikan Artikel
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Tulis opini hukum, regulasi terkini, dan analisis yuridis untuk edukasi publik.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
