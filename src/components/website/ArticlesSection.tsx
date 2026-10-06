import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string | null;
  publishedAt?: Date | null;
  author: string;
  category?: {
    name: string;
    slug: string;
  } | null;
}

interface ArticlesSectionProps {
  articles: ArticleItem[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (articles.length === 0) return null;

  const featured = articles[0];
  const sideArticles = articles.slice(1, 3);

  const formatDate = (d?: Date | null) => {
    if (!d) return "Maret 2026";
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Publikasi & Analisis
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-primary leading-tight">
              Insight & Artikel Hukum
            </h2>
          </div>
          <Link
            href="/artikel"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy-primary hover:text-gold transition-colors"
          >
            <span>Lihat Semua Artikel</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>

        {/* Editorial Layout: Big featured on left (7 cols) + 2 side articles on right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Featured Article */}
          <div className="lg:col-span-7">
            <Link
              href={`/artikel/${featured.slug}`}
              className="group block bg-[#FAFAF7] border border-border-subtle rounded-md overflow-hidden hover:border-gold/60 transition-all duration-200 h-full flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-navy-dark overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.featuredImage || "/images/article-1.jpg"}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {featured.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-navy-dark/90 text-gold text-[11px] font-semibold tracking-wider uppercase rounded backdrop-blur-sm">
                      {featured.category.name}
                    </span>
                  )}
                </div>

                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      {formatDate(featured.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gold" />
                      {featured.author}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-navy-primary group-hover:text-gold transition-colors leading-snug">
                    {featured.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-6 pt-2">
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy-primary group-hover:text-gold transition-colors">
                  Baca Selengkapnya
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </span>
              </div>
            </Link>
          </div>

          {/* Right Column: 2 Stacked Side Articles */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {sideArticles.map((art) => (
              <Link
                key={art.id}
                href={`/artikel/${art.slug}`}
                className="group block bg-[#FAFAF7] border border-border-subtle rounded-md p-6 hover:border-gold/60 transition-all duration-200 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    {art.category ? (
                      <span className="text-gold font-semibold uppercase tracking-wider">
                        {art.category.name}
                      </span>
                    ) : (
                      <span className="text-gold font-semibold uppercase tracking-wider">
                        Hukum
                      </span>
                    )}
                    <span className="text-text-muted">
                      {formatDate(art.publishedAt)}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-navy-primary group-hover:text-gold transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-navy-primary group-hover:text-gold transition-colors">
                  <span>Baca Analisis</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
