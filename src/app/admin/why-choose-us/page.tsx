import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import WhyChooseClient from "./WhyChooseClient";

export const dynamic = "force-dynamic";

export default async function AdminWhyChoosePage() {
  const whyChooseUs = await prisma.whyChooseUs.findFirst({
    include: {
      items: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return (
    <div>
      <AdminHeader
        title="Keunggulan (Mengapa Memilih Kami)"
        description="Kelola narasi nilai lebih firma, foto pendukung, serta poin-poin diferensiasi layanan"
      />
      <div className="p-6 sm:p-8 max-w-4xl">
        <WhyChooseClient data={whyChooseUs} />
      </div>
    </div>
  );
}
