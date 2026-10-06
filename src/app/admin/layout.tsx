import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If user is not logged in (e.g. on /admin/login), render children without sidebar
  if (!session) {
    return <>{children}</>;
  }

  const newConsultationsCount = await prisma.consultationRequest.count({
    where: { status: "NEW" },
  });

  return (
    <div className="flex min-h-screen bg-[#F4F2EB] text-text-dark">
      <AdminSidebar newConsultationsCount={newConsultationsCount} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
