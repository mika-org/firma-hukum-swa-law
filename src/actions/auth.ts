"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword, createSession, destroySession, requireAuth } from "@/lib/auth";
import { LoginSchema, getFirstZodError } from "@/lib/validations/schemas";
import { redirect } from "next/navigation";

export async function loginAdmin(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validated = LoginSchema.safeParse({ email, password });
  if (!validated.success) {
    return {
      error: getFirstZodError(validated.error),
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: validated.data.email },
  });

  if (!user) {
    return { error: "Email atau password yang Anda masukkan salah." };
  }

  const isMatch = await verifyPassword(validated.data.password, user.password);
  if (!isMatch) {
    return { error: "Email atau password yang Anda masukkan salah." };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  await destroySession();
  redirect("/admin/login");
}

export async function updateAdminProfile(prevState: unknown, formData: FormData) {
  const session = await requireAuth();
  const name = formData.get("name") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    return { error: "Akun admin tidak ditemukan" };
  }

  const updateData: { name?: string; password?: string } = {};
  if (name && name.length >= 2) {
    updateData.name = name;
  }

  if (newPassword) {
    if (newPassword.length < 6) {
      return { error: "Password baru minimal 6 karakter" };
    }
    const isCurrentMatch = await verifyPassword(currentPassword, user.password);
    if (!isCurrentMatch) {
      return { error: "Password saat ini tidak cocok" };
    }
    updateData.password = await hashPassword(newPassword);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  return { success: true, message: "Profil dan kredensial admin berhasil diperbarui." };
}
