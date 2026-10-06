"use server";

import { prisma } from "@/lib/prisma";
import { ServiceSchema, getFirstZodError } from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function createService(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    shortDescription: (formData.get("shortDescription") as string) || null,
    description: (formData.get("description") as string) || null,
    icon: (formData.get("icon") as string) || "briefcase",
    image: (formData.get("image") as string) || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = ServiceSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.service.findUnique({
    where: { slug: validated.data.slug },
  });
  if (existing) {
    return { error: "Slug layanan sudah digunakan, silakan gunakan slug lain." };
  }

  await prisma.service.create({
    data: validated.data,
  });

  revalidatePath("/layanan");
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true, message: "Layanan berhasil ditambahkan." };
}

export async function updateService(id: string, prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    shortDescription: (formData.get("shortDescription") as string) || null,
    description: (formData.get("description") as string) || null,
    icon: (formData.get("icon") as string) || "briefcase",
    image: (formData.get("image") as string) || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = ServiceSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.service.findFirst({
    where: { slug: validated.data.slug, NOT: { id } },
  });
  if (existing) {
    return { error: "Slug layanan sudah digunakan oleh entri lain." };
  }

  await prisma.service.update({
    where: { id },
    data: validated.data,
  });

  revalidatePath("/layanan");
  revalidatePath(`/layanan/${validated.data.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true, message: "Layanan berhasil diperbarui." };
}

export async function deleteService(id: string) {
  await requireAuth();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/layanan");
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}
