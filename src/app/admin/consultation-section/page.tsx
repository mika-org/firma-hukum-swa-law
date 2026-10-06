import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import ConsultationSectionForm from "./ConsultationSectionForm";

export const dynamic = "force-dynamic";

export default async function AdminConsultationSectionPage() {
  const section = await prisma.consultationSection.findFirst();

  return (
    <div>
      <AdminHeader
        title="Section Konsultasi Hukum"
        description="Kelola teks ajakan permohonan konsultasi, deskripsi asistensi, dan label tombol formulir"
      />
      <div className="p-6 sm:p-8 max-w-4xl">
        <ConsultationSectionForm initialData={section} />
      </div>
    </div>
  );
}
