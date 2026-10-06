import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import ArticlesClient from "./ArticlesClient";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.articleCategory.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div>
      <AdminHeader
        title="Artikel & Insight Hukum"
        description="Kelola publikasi edukasi yuridis, opini advokat, regulasi bisnis, dan artikel penanganan perkara"
      />
      <div className="p-6 sm:p-8 max-w-7xl">
        <ArticlesClient initialArticles={articles} categories={categories} />
      </div>
    </div>
  );
}
