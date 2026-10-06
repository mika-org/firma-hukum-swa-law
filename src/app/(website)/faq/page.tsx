import { prisma } from "@/lib/prisma";
import FaqSection from "@/components/website/FaqSection";
import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findFirst();
  return {
    title: `Tanya Jawab (FAQ) | ${setting?.firmName || "Firma Hukum"}`,
    description: "Pertanyaan yang sering diajukan mengenai konsultasi, tarif, proses penanganan perkara, dan kerahasiaan.",
  };
}

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([
    prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.siteSetting.findFirst(),
  ]);

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-dark py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Pusat Bantuan & Edukasi
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Panduan informasi cepat seputar prosedur pendampingan perkara, kerahasiaan dokumen, skema honorarium advokat, dan konsultasi tatap muka maupun daring.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Component */}
      <FaqSection faqs={faqs} />

      {/* Still Have Questions Box */}
      <section className="bg-off-white py-16 text-center border-b border-border-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-navy-primary">
            Masih Memiliki Pertanyaan Lain?
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Tim konsultan kami siap memberikan penjelasan terperinci mengenai tahapan dan kesiapan berkas perkara Anda.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#konsultasi"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors"
            >
              Kirim Formulir Konsultasi
            </Link>
            <Link
              href="/kontak"
              className="px-6 py-3 text-xs uppercase tracking-wider font-semibold border border-border-subtle hover:border-navy-primary text-navy-primary rounded transition-colors"
            >
              Hubungi Kantor Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
