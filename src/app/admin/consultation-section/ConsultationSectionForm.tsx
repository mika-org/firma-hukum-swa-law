"use client";

import { useActionState } from "react";
import { updateConsultationSection } from "@/actions/settings";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface SectionData {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  isActive: boolean;
}

export default function ConsultationSectionForm({
  initialData,
}: {
  initialData: SectionData | null;
}) {
  const [state, formAction, isPending] = useActionState(updateConsultationSection, null);

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

      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Eyebrow <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="eyebrow"
          required
          defaultValue={initialData?.eyebrow || "Konsultasi Hukum"}
          className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Judul Section <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          defaultValue={initialData?.title || "Jadwalkan Konsultasi Anda"}
          className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Deskripsi Petunjuk Pengisian <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={
            initialData?.description ||
            "Ceritakan kebutuhan hukum Anda. Tim kami akan menghubungi Anda untuk informasi lebih lanjut."
          }
          className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Teks Tombol Kirim <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="buttonText"
          required
          defaultValue={initialData?.buttonText || "Kirim Permintaan Konsultasi"}
          className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="consIsActive"
          name="isActive"
          defaultChecked={initialData?.isActive !== false}
          className="w-4 h-4 text-navy-primary rounded border-border-subtle"
        />
        <label htmlFor="consIsActive" className="text-xs font-semibold text-text-dark">
          Tampilkan Formulir Konsultasi pada Beranda
        </label>
      </div>

      <div className="flex justify-end pt-4 border-t border-border-subtle">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4 text-gold" />
          <span>{isPending ? "Menyimpan..." : "Simpan Pengaturan"}</span>
        </button>
      </div>
    </form>
  );
}
