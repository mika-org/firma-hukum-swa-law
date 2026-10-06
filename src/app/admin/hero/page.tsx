import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import HeroForm from "./HeroForm";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const hero = await prisma.heroSection.findFirst();

  return (
    <div>
      <AdminHeader
        title="Hero Banner"
        description="Kelola teks tajuk utama, foto latar arsitektur pengadilan, tombol CTA, dan status visibilitas hero"
      />
      <div className="p-6 sm:p-8 max-w-4xl">
        <HeroForm initialData={hero} />
      </div>
    </div>
  );
}
