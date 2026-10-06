import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findFirst();
  return {
    title: `Artikel & Insight Hukum | ${setting?.firmName || "Firma Hukum"}`,
    description: "Kajian yuridis, edukasi hukum, dan analisis regulasi bisnis terkini di Indonesia.",
  };
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const { kategori, q } = await searchParams;

  const whereClause: {
    status: string;
    category?: { slug: string };
    OR?: Array<{ title?: { contains: string; mode: "insensitive" }; content?: { contains: string; mode: "insensitive" } }>;
  } = {
    status: "PUBLISHED",
  };

  if (kategori) {
    whereClause.category = { slug: kategori };
  }

  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
    ];
  }

  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where: whereClause,
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    }),
    prisma.articleCategory.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  const formatDate = (d?: Date | null) => {
    if (!d) return "Maret 2026";
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-navy-dark py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Publikasi & Analisis
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Insight & Artikel Hukum
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Kajian mendalam para advokat kami mengenai regulasi perundang-undangan terbaru, mitigasi risiko komersial, dan dinamika peradilan di Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Kategori */}
      <section className="bg-white border-b border-border-subtle py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/artikel"
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                !kategori
                  ? "bg-navy-primary text-white"
                  : "bg-off-white text-text-muted hover:text-navy-primary"
              }`}
            >
              Semua Kategori
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/artikel?kategori=${c.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  kategori === c.slug
                    ? "bg-navy-primary text-white"
                    : "bg-off-white text-text-muted hover:text-navy-primary"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Articles */}
      <section className="bg-off-white py-16 lg:py-24 border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16 bg-white border border-border-subtle rounded-md">
              <p className="font-editorial text-2xl text-navy-primary mb-2">
                Belum ada artikel pada kategori ini.
              </p>
              <p className="text-sm text-text-muted mb-6">
                Silakan pilih kategori lainnya atau kembali ke seluruh artikel.
              </p>
              <Link
                href="/artikel"
                className="inline-flex items-center px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-navy-primary text-white rounded"
              >
                Tampilkan Semua Artikel
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art) => (
                <Link
                  key={art.id}
                  href={`/artikel/${art.slug}`}
                  className="group bg-white border border-border-subtle rounded-md overflow-hidden hover:border-gold transition-all duration-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full bg-navy-dark overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={art.featuredImage || "/images/article-1.jpg"}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {art.category && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-navy-dark/90 text-gold text-[10px] font-semibold tracking-wider uppercase rounded backdrop-blur-sm">
                          {art.category.name}
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          {formatDate(art.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gold" />
                          {art.author}
                        </span>
                      </div>

                      <h2 className="font-editorial text-xl font-bold text-navy-primary group-hover:text-gold transition-colors leading-snug">
                        {art.title}
                      </h2>

                      <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy-primary group-hover:text-gold transition-colors">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
