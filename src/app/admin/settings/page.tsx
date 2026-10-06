import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findFirst();

  return (
    <div>
      <AdminHeader
        title="General Settings"
        description="Kelola identitas firma, kontak resmi, alamat kantor SCBD, tautan media sosial, dan meta SEO"
      />
      <div className="p-6 sm:p-8 max-w-4xl">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
