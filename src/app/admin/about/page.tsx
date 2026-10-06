import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import AboutForm from "./AboutForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const about = await prisma.aboutSection.findFirst();

  return (
    <div>
      <AdminHeader
        title="Section Tentang Kami"
        description="Kelola teks perkenalan, narasi komitmen integritas, foto kantor 4:3, dan tautan tombol selengkapnya"
      />
      <div className="p-6 sm:p-8 max-w-4xl">
        <AboutForm initialData={about} />
      </div>
    </div>
  );
}
