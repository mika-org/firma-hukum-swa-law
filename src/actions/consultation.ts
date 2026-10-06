"use server";

import { prisma } from "@/lib/prisma";
import { ConsultationSchema, getFirstZodError } from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function submitConsultation(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || "",
      serviceId: formData.get("serviceId") as string,
      message: formData.get("message") as string,
    };

    const validated = ConsultationSchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        error: getFirstZodError(validated.error),
      };
    }

    await prisma.consultationRequest.create({
      data: {
        name: validated.data.name,
        phone: validated.data.phone,
        email: validated.data.email || null,
        serviceId: validated.data.serviceId || null,
        message: validated.data.message,
        status: "NEW",
      },
    });

    revalidatePath("/admin/consultations");
    return {
      success: true,
      message: "Terima kasih. Permintaan konsultasi Anda telah diterima. Tim kami akan menghubungi Anda dalam waktu dekat.",
    };
  } catch (err) {
    console.error("Error submitting consultation:", err);
    return {
      success: false,
      error: "Terjadi kesalahan sistem saat mengirim permohonan. Silakan coba kembali atau hubungi WhatsApp kami.",
    };
  }
}

export async function updateConsultationStatus(id: string, status: string) {
  await requireAuth();
  await prisma.consultationRequest.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/consultations");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteConsultation(id: string) {
  await requireAuth();
  await prisma.consultationRequest.delete({
    where: { id },
  });
  revalidatePath("/admin/consultations");
  revalidatePath("/admin");
  return { success: true };
}
