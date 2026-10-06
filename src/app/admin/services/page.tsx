import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <AdminHeader
        title="Layanan Hukum"
        description="Kelola seluruh bidang praktik hukum, deskripsi perkara, urutan tampilan kartu, dan ikon layanan"
      />
      <div className="p-6 sm:p-8 max-w-7xl">
        <ServicesClient initialServices={services} />
      </div>
    </div>
  );
}
