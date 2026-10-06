import { prisma } from "@/lib/prisma";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";

export const revalidate = 60; // ISR cache revalidation

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, services] = await Promise.all([
    prisma.siteSetting.findFirst(),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { name: true, slug: true },
    }),
  ]);

  const fallbackSettings = {
    firmName: settings?.firmName || "Firma Hukum Swa Law",
    tagline: settings?.tagline || "Firma Hukum & Konsultan",
    logoUrl: settings?.logoUrl || null,
    address: settings?.address || "SCBD District 8, Jakarta Selatan",
    phone: settings?.phone || "+62 21 5289 7700",
    whatsapp: settings?.whatsapp || "+62 811 8899 7722",
    email: settings?.email || "kontak@firmalaw.id",
    openingHours: settings?.openingHours || "Senin - Jumat: 08:30 - 17:30 WIB",
    instagram: settings?.instagram || null,
    linkedin: settings?.linkedin || null,
    facebook: settings?.facebook || null,
    youtube: settings?.youtube || null,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        firmName={fallbackSettings.firmName}
        tagline={fallbackSettings.tagline}
        logoUrl={fallbackSettings.logoUrl}
      />
      <main className="flex-1">{children}</main>
      <Footer settings={fallbackSettings} services={services} />
    </div>
  );
}
