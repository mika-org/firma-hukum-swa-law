"use server";

import { prisma } from "@/lib/prisma";
import { FaqSchema, getFirstZodError } from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function createFaq(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = FaqSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  await prisma.faq.create({
    data: validated.data,
  });

  revalidatePath("/faq");
  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { success: true, message: "FAQ berhasil ditambahkan." };
}

export async function updateFaq(id: string, prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = FaqSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  await prisma.faq.update({
    where: { id },
    data: validated.data,
  });

  revalidatePath("/faq");
  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { success: true, message: "FAQ berhasil diperbarui." };
}

export async function deleteFaq(id: string) {
  await requireAuth();
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/faq");
  revalidatePath("/");
  revalidatePath("/admin/faq");
  return { success: true };
}
