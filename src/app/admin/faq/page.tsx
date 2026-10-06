import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import FaqClient from "./FaqClient";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <AdminHeader
        title="Tanya Jawab (FAQ)"
        description="Kelola daftar pertanyaan dan jawaban seputar prosedur konsultasi, honorarium, dan layanan hukum"
      />
      <div className="p-6 sm:p-8 max-w-5xl">
        <FaqClient initialFaqs={faqs} />
      </div>
    </div>
  );
}
