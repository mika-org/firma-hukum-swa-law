import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import TeamClient from "./TeamClient";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <AdminHeader
        title="Tim Profesional"
        description="Kelola daftar advokat, mitra pengelola (Managing Partner), associate, biografi, dan foto profil resmi"
      />
      <div className="p-6 sm:p-8 max-w-7xl">
        <TeamClient initialTeam={team} />
      </div>
    </div>
  );
}
