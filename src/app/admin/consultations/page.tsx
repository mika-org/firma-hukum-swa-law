import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import ConsultationsClient from "./ConsultationsClient";

export const dynamic = "force-dynamic";

export default async function AdminConsultationsPage() {
  const requests = await prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      service: {
        select: { id: true, name: true },
      },
    },
  });

  return (
    <div>
      <AdminHeader
        title="Konsultasi Masuk"
        description="Kelola dan tindak lanjuti seluruh permohonan konsultasi hukum dari pengunjung website"
      />
      <div className="p-6 sm:p-8 max-w-7xl">
        <ConsultationsClient initialRequests={requests} />
      </div>
    </div>
  );
}
