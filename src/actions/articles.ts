"use server";

import { prisma } from "@/lib/prisma";
import { ArticleSchema, getFirstZodError } from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function createArticle(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    featuredImage: (formData.get("featuredImage") as string) || null,
    categoryId: (formData.get("categoryId") as string) || null,
    author: (formData.get("author") as string) || "Tim Firma Hukum",
    status: (formData.get("status") as "DRAFT" | "PUBLISHED") || "PUBLISHED",
  };

  const validated = ArticleSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.article.findUnique({
    where: { slug: validated.data.slug },
  });
  if (existing) {
    return { error: "Slug artikel sudah digunakan, silakan buat slug lain." };
  }

  await prisma.article.create({
    data: {
      ...validated.data,
      publishedAt: validated.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/artikel");
  revalidatePath("/");
  revalidatePath("/admin/articles");
  return { success: true, message: "Artikel berhasil disimpan." };
}

export async function updateArticle(id: string, prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    featuredImage: (formData.get("featuredImage") as string) || null,
    categoryId: (formData.get("categoryId") as string) || null,
    author: (formData.get("author") as string) || "Tim Firma Hukum",
    status: (formData.get("status") as "DRAFT" | "PUBLISHED") || "PUBLISHED",
  };

  const validated = ArticleSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.article.findFirst({
    where: { slug: validated.data.slug, NOT: { id } },
  });
  if (existing) {
    return { error: "Slug artikel sudah digunakan oleh artikel lain." };
  }

  const current = await prisma.article.findUnique({ where: { id } });

  await prisma.article.update({
    where: { id },
    data: {
      ...validated.data,
      publishedAt:
        validated.data.status === "PUBLISHED"
          ? current?.publishedAt || new Date()
          : null,
    },
  });

  revalidatePath("/artikel");
  revalidatePath(`/artikel/${validated.data.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/articles");
  return { success: true, message: "Artikel berhasil diperbarui." };
}

export async function deleteArticle(id: string) {
  await requireAuth();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/artikel");
  revalidatePath("/");
  revalidatePath("/admin/articles");
  return { success: true };
}
