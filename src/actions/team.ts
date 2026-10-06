"use server";

import { prisma } from "@/lib/prisma";
import { TeamMemberSchema, getFirstZodError } from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function createTeamMember(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    position: formData.get("position") as string,
    specialization: formData.get("specialization") as string,
    experience: formData.get("experience") as string,
    bio: (formData.get("bio") as string) || null,
    education: (formData.get("education") as string) || null,
    photo: (formData.get("photo") as string) || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = TeamMemberSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.teamMember.findUnique({
    where: { slug: validated.data.slug },
  });
  if (existing) {
    return { error: "Slug anggota tim sudah terdaftar." };
  }

  await prisma.teamMember.create({
    data: validated.data,
  });

  revalidatePath("/tim");
  revalidatePath("/");
  revalidatePath("/admin/team");
  return { success: true, message: "Anggota tim berhasil ditambahkan." };
}

export async function updateTeamMember(id: string, prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    position: formData.get("position") as string,
    specialization: formData.get("specialization") as string,
    experience: formData.get("experience") as string,
    bio: (formData.get("bio") as string) || null,
    education: (formData.get("education") as string) || null,
    photo: (formData.get("photo") as string) || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = TeamMemberSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.teamMember.findFirst({
    where: { slug: validated.data.slug, NOT: { id } },
  });
  if (existing) {
    return { error: "Slug anggota tim sudah digunakan oleh entri lain." };
  }

  await prisma.teamMember.update({
    where: { id },
    data: validated.data,
  });

  revalidatePath("/tim");
  revalidatePath(`/tim/${validated.data.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/team");
  return { success: true, message: "Anggota tim berhasil diperbarui." };
}

export async function deleteTeamMember(id: string) {
  await requireAuth();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/tim");
  revalidatePath("/");
  revalidatePath("/admin/team");
  return { success: true };
}
