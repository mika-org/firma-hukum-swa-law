import { z } from "zod";

export function getFirstZodError(error: z.ZodError): string {
  return error.issues?.[0]?.message || "Input tidak valid";
}

export const ConsultationSchema = z.object({
  name: z.string().min(2, "Nama lengkap wajib diisi minimal 2 karakter"),
  phone: z.string().min(8, "Nomor telepon/WhatsApp wajib diisi minimal 8 digit"),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  serviceId: z.string().min(1, "Silakan pilih bidang hukum"),
  message: z.string().min(10, "Ceritakan kebutuhan hukum Anda minimal 10 karakter"),
});

export const ServiceSchema = z.object({
  name: z.string().min(2, "Nama layanan minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
  shortDescription: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  icon: z.string().default("briefcase"),
  image: z.string().optional().nullable(),
  sortOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

export const TeamMemberSchema = z.object({
  name: z.string().min(2, "Nama anggota minimal 2 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter"),
  position: z.string().min(2, "Jabatan wajib diisi"),
  specialization: z.string().min(2, "Spesialisasi wajib diisi"),
  experience: z.string().min(2, "Pengalaman wajib diisi"),
  bio: z.string().optional().nullable(),
  education: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  sortOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

export const ArticleSchema = z.object({
  title: z.string().min(5, "Judul artikel minimal 5 karakter"),
  slug: z.string().min(5, "Slug artikel minimal 5 karakter"),
  excerpt: z.string().min(10, "Ringkasan artikel minimal 10 karakter"),
  content: z.string().min(20, "Konten artikel minimal 20 karakter"),
  featuredImage: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  author: z.string().default("Tim Firma Hukum"),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
});

export const FaqSchema = z.object({
  question: z.string().min(5, "Pertanyaan minimal 5 karakter"),
  answer: z.string().min(10, "Jawaban minimal 10 karakter"),
  sortOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

export const SiteSettingsSchema = z.object({
  firmName: z.string().min(2, "Nama firma wajib diisi"),
  tagline: z.string().default("Trusted Legal Partner"),
  logoUrl: z.string().optional().nullable(),
  faviconUrl: z.string().optional().nullable(),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(6, "Nomor telepon wajib diisi"),
  whatsapp: z.string().min(6, "Nomor WhatsApp wajib diisi"),
  address: z.string().min(5, "Alamat wajib diisi"),
  mapsUrl: z.string().optional().nullable(),
  openingHours: z.string().default("Senin - Jumat: 08:30 - 17:30 WIB"),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  metaTitle: z.string().min(3, "Meta title wajib diisi"),
  metaDescription: z.string().min(10, "Meta description wajib diisi"),
  ogImageUrl: z.string().optional().nullable(),
});

export const HeroSectionSchema = z.object({
  eyebrow: z.string().min(2),
  title: z.string().min(5),
  description: z.string().min(10),
  primaryButtonText: z.string().min(2),
  primaryButtonUrl: z.string().min(1),
  secondaryButtonText: z.string().min(2),
  secondaryButtonUrl: z.string().min(1),
  backgroundImage: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export const AboutSectionSchema = z.object({
  eyebrow: z.string().min(2),
  title: z.string().min(5),
  description: z.string().min(10),
  imageUrl: z.string().optional().nullable(),
  buttonText: z.string().min(2),
  buttonUrl: z.string().min(1),
  isActive: z.boolean().default(true),
});

export const WhyChooseUsSchema = z.object({
  eyebrow: z.string().min(2),
  title: z.string().min(5),
  imageUrl: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export const WhyChooseUsItemSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  icon: z.string().default("scales"),
  sortOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

export const ConsultationSectionSchema = z.object({
  eyebrow: z.string().min(2),
  title: z.string().min(5),
  description: z.string().min(10),
  buttonText: z.string().min(2),
  isActive: z.boolean().default(true),
});

export const LoginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
