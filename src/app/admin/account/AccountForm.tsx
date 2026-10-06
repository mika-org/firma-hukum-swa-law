"use client";

import { useActionState } from "react";
import { updateAdminProfile } from "@/actions/auth";
import { Save, CheckCircle2, AlertCircle, Lock, User } from "lucide-react";

export default function AccountForm({
  userEmail,
  userName,
}: {
  userEmail: string;
  userName: string;
}) {
  const [state, formAction, isPending] = useActionState(updateAdminProfile, null);

  return (
    <form action={formAction} className="bg-white p-6 sm:p-8 rounded-md border border-border-subtle space-y-6 shadow-sm">
      {state?.success && (
        <div className="p-4 rounded bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {state?.error && (
        <div className="p-4 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Profil User */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
            Alamat Email Akun
          </label>
          <input
            type="email"
            disabled
            value={userEmail}
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-border-subtle rounded text-gray-500 cursor-not-allowed font-mono"
          />
          <p className="text-[11px] text-text-muted mt-1">Email utama tidak dapat diubah sembarangan demi keamanan sistem.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
            Nama Pengguna
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={userName}
            className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
          />
        </div>
      </div>

      {/* Ganti Password */}
      <div className="pt-6 border-t border-border-subtle space-y-4">
        <h3 className="font-editorial text-lg font-bold text-navy-primary flex items-center gap-2">
          <Lock className="w-4 h-4 text-gold" />
          <span>Ganti Kata Sandi (Password)</span>
        </h3>
        <p className="text-xs text-text-muted">
          Kosongkan kolom sandi jika Anda hanya ingin memperbarui nama profil.
        </p>

        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
            Kata Sandi Saat Ini
          </label>
          <input
            type="password"
            name="currentPassword"
            placeholder="••••••••"
            className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
            Kata Sandi Baru (Minimal 6 Karakter)
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="••••••••"
            className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border-subtle flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-2.5 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4 text-gold" />
          <span>{isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
        </button>
      </div>
    </form>
  );
}
