"use server";

import { prisma } from "@/lib/prisma";
import {
  SiteSettingsSchema,
  HeroSectionSchema,
  AboutSectionSchema,
  WhyChooseUsSchema,
  WhyChooseUsItemSchema,
  ConsultationSectionSchema,
  getFirstZodError,
} from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function updateSiteSettings(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    firmName: formData.get("firmName") as string,
    tagline: (formData.get("tagline") as string) || "Trusted Legal Partner",
    logoUrl: (formData.get("logoUrl") as string) || null,
    faviconUrl: (formData.get("faviconUrl") as string) || null,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    whatsapp: formData.get("whatsapp") as string,
    address: formData.get("address") as string,
    mapsUrl: (formData.get("mapsUrl") as string) || null,
    openingHours: (formData.get("openingHours") as string) || "Senin - Jumat: 08:30 - 17:30 WIB",
    instagram: (formData.get("instagram") as string) || null,
    linkedin: (formData.get("linkedin") as string) || null,
    facebook: (formData.get("facebook") as string) || null,
    youtube: (formData.get("youtube") as string) || null,
    metaTitle: formData.get("metaTitle") as string,
    metaDescription: formData.get("metaDescription") as string,
    ogImageUrl: (formData.get("ogImageUrl") as string) || null,
  };

  const validated = SiteSettingsSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.siteSetting.findFirst();
  if (existing) {
    await prisma.siteSetting.update({
      where: { id: existing.id },
      data: validated.data,
    });
  } else {
    await prisma.siteSetting.create({
      data: validated.data,
    });
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Pengaturan umum berhasil disimpan." };
}

export async function updateHeroSection(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    eyebrow: formData.get("eyebrow") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    primaryButtonText: formData.get("primaryButtonText") as string,
    primaryButtonUrl: formData.get("primaryButtonUrl") as string,
    secondaryButtonText: formData.get("secondaryButtonText") as string,
    secondaryButtonUrl: formData.get("secondaryButtonUrl") as string,
    backgroundImage: (formData.get("backgroundImage") as string) || null,
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = HeroSectionSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.heroSection.findFirst();
  if (existing) {
    await prisma.heroSection.update({
      where: { id: existing.id },
      data: validated.data,
    });
  } else {
    await prisma.heroSection.create({
      data: validated.data,
    });
  }

  revalidatePath("/");
  return { success: true, message: "Hero Banner berhasil disimpan." };
}

export async function updateAboutSection(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    eyebrow: formData.get("eyebrow") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    imageUrl: (formData.get("imageUrl") as string) || null,
    buttonText: formData.get("buttonText") as string,
    buttonUrl: formData.get("buttonUrl") as string,
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = AboutSectionSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.aboutSection.findFirst();
  if (existing) {
    await prisma.aboutSection.update({
      where: { id: existing.id },
      data: validated.data,
    });
  } else {
    await prisma.aboutSection.create({
      data: validated.data,
    });
  }

  revalidatePath("/");
  revalidatePath("/tentang-kami");
  return { success: true, message: "Section Tentang Kami berhasil disimpan." };
}

export async function updateWhyChooseUs(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    eyebrow: formData.get("eyebrow") as string,
    title: formData.get("title") as string,
    imageUrl: (formData.get("imageUrl") as string) || null,
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = WhyChooseUsSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.whyChooseUs.findFirst();
  if (existing) {
    await prisma.whyChooseUs.update({
      where: { id: existing.id },
      data: validated.data,
    });
  } else {
    await prisma.whyChooseUs.create({
      data: validated.data,
    });
  }

  revalidatePath("/");
  return { success: true, message: "Section Keunggulan berhasil disimpan." };
}

export async function saveWhyChooseUsItem(id: string | null, prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    icon: (formData.get("icon") as string) || "scales",
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = WhyChooseUsItemSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const parent = await prisma.whyChooseUs.findFirst();
  if (!parent) {
    return { error: "Section Keunggulan belum diinisialisasi." };
  }

  if (id) {
    await prisma.whyChooseUsItem.update({
      where: { id },
      data: validated.data,
    });
  } else {
    await prisma.whyChooseUsItem.create({
      data: {
        ...validated.data,
        whyChooseUsId: parent.id,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/why-choose-us");
  return { success: true, message: "Item keunggulan berhasil disimpan." };
}

export async function deleteWhyChooseUsItem(id: string) {
  await requireAuth();
  await prisma.whyChooseUsItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/why-choose-us");
  return { success: true };
}

export async function updateConsultationSection(prevState: unknown, formData: FormData) {
  await requireAuth();

  const raw = {
    eyebrow: formData.get("eyebrow") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    buttonText: formData.get("buttonText") as string,
    isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
  };

  const validated = ConsultationSectionSchema.safeParse(raw);
  if (!validated.success) {
    return { error: getFirstZodError(validated.error) };
  }

  const existing = await prisma.consultationSection.findFirst();
  if (existing) {
    await prisma.consultationSection.update({
      where: { id: existing.id },
      data: validated.data,
    });
  } else {
    await prisma.consultationSection.create({
      data: validated.data,
    });
  }

  revalidatePath("/");
  return { success: true, message: "Section Konsultasi berhasil disimpan." };
}
