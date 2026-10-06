import { getSession } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import AccountForm from "./AccountForm";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage() {
  const session = await getSession();

  return (
    <div>
      <AdminHeader
        title="Akun Administrator"
        description="Kelola nama profil pengelola dan perbarui kata sandi akun admin CMS"
      />
      <div className="p-6 sm:p-8 max-w-2xl">
        <AccountForm userEmail={session?.email || "admin@firmalaw.id"} userName={session?.name || "Administrator"} />
      </div>
    </div>
  );
}
