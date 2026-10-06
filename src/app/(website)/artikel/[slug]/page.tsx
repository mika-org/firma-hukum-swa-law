import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, ArrowRight, Share2 } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${article.title} | Insight Hukum`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!article || article.status !== "PUBLISHED") {
    notFound();
  }

  const relatedArticles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: article.id },
      ...(article.categoryId ? { categoryId: article.categoryId } : {}),
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });

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
      <section className="bg-navy-dark py-14 lg:py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/artikel"
            className="inline-flex items-center text-xs uppercase tracking-wider text-gold hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            <span>Kembali ke Semua Artikel</span>
          </Link>

          {article.category && (
            <span className="inline-block px-3 py-1 bg-navy-primary border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase rounded">
              {article.category.name}
            </span>
          )}

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-gray-300 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold" />
              {article.author}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content & Reading Experience */}
      <article className="bg-white py-14 lg:py-20 border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative aspect-[16/9] rounded-md overflow-hidden border border-border-subtle shadow-sm bg-navy-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt Lead */}
          <div className="p-6 bg-off-white border-l-4 border-gold rounded-r-md text-base sm:text-lg text-text-dark font-medium italic leading-relaxed">
            {article.excerpt}
          </div>

          {/* Body Content */}
          <div className="text-text-dark text-base sm:text-lg leading-relaxed space-y-6 whitespace-pre-line font-normal">
            {article.content}
          </div>

          {/* Legal Disclaimer Box */}
          <div className="p-6 border border-border-subtle rounded-md bg-[#FAFAF7] text-xs text-text-muted leading-relaxed space-y-2">
            <span className="font-bold text-navy-primary block uppercase tracking-wider">
              Pernyataan Sangkalan (Disclaimer):
            </span>
            <p>
              Artikel ini disediakan semata-mata untuk tujuan informasi umum dan edukasi yuridis, serta tidak dapat dianggap sebagai nasihat hukum formal atau pengganti konsultasi langsung dengan advokat berlisensi.
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="bg-off-white py-16 lg:py-20 border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-navy-primary mb-8">
              Artikel Terkait Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/artikel/${rel.slug}`}
                  className="group bg-white border border-border-subtle rounded-md p-6 hover:border-gold transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-gold uppercase tracking-wider">
                      {rel.category?.name || "Hukum"}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-navy-primary group-hover:text-gold transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center text-xs font-semibold text-navy-primary group-hover:text-gold">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
