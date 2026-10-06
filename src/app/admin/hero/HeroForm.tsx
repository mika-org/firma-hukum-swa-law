"use client";

import { useActionState } from "react";
import { updateHeroSection } from "@/actions/settings";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface HeroData {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  backgroundImage?: string | null;
  isActive: boolean;
}

export default function HeroForm({ initialData }: { initialData: HeroData | null }) {
  const [state, formAction, isPending] = useActionState(updateHeroSection, null);

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

      {/* Eyebrow */}
      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Eyebrow / Sub-heading Atas <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="eyebrow"
          required
          defaultValue={initialData?.eyebrow || "Your Trusted Legal Partner"}
          className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      {/* Heading Title */}
      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Judul Utama (H1) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          defaultValue={initialData?.title || "Solusi Hukum yang Tepat untuk Melindungi Masa Depan Anda"}
          className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Deskripsi Ringkas <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={initialData?.description || "Pendampingan hukum profesional bagi individu, perusahaan, dan pelaku usaha."}
          className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div className="space-y-3 p-4 bg-[#FAFAF7] border border-border-subtle rounded-md">
          <span className="text-xs font-bold text-navy-primary block uppercase">
            Tombol Utama (Primary)
          </span>
          <div>
            <label className="block text-[11px] text-text-muted mb-1">Teks Tombol</label>
            <input
              type="text"
              name="primaryButtonText"
              required
              defaultValue={initialData?.primaryButtonText || "Konsultasi Sekarang"}
              className="w-full h-9 px-3 text-xs bg-white border border-border-subtle rounded"
            />
          </div>
          <div>
            <label className="block text-[11px] text-text-muted mb-1">Tautan URL</label>
            <input
              type="text"
              name="primaryButtonUrl"
              required
              defaultValue={initialData?.primaryButtonUrl || "/#konsultasi"}
              className="w-full h-9 px-3 text-xs bg-white border border-border-subtle rounded"
            />
          </div>
        </div>

        <div className="space-y-3 p-4 bg-[#FAFAF7] border border-border-subtle rounded-md">
          <span className="text-xs font-bold text-navy-primary block uppercase">
            Tombol Sekunder (Secondary)
          </span>
          <div>
            <label className="block text-[11px] text-text-muted mb-1">Teks Tombol</label>
            <input
              type="text"
              name="secondaryButtonText"
              required
              defaultValue={initialData?.secondaryButtonText || "Pelajari Lebih Lanjut"}
              className="w-full h-9 px-3 text-xs bg-white border border-border-subtle rounded"
            />
          </div>
          <div>
            <label className="block text-[11px] text-text-muted mb-1">Tautan URL</label>
            <input
              type="text"
              name="secondaryButtonUrl"
              required
              defaultValue={initialData?.secondaryButtonUrl || "/tentang-kami"}
              className="w-full h-9 px-3 text-xs bg-white border border-border-subtle rounded"
            />
          </div>
        </div>
      </div>

      {/* Background Image Upload */}
      <ImageUpload
        name="backgroundImage"
        label="Background Foto Gedung / Arsitektur Legal"
        currentValue={initialData?.backgroundImage}
        helpText="Rekomendasi rasio 16:9 atau resolusi minimal 1920x1080 px."
      />

      {/* Is Active Toggle */}
      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          defaultChecked={initialData?.isActive !== false}
          className="w-4 h-4 text-navy-primary rounded border-border-subtle"
        />
        <label htmlFor="isActive" className="text-xs font-semibold text-text-dark">
          Aktifkan Tampilan Hero Banner pada Beranda
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-border-subtle">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4 text-gold" />
          <span>{isPending ? "Menyimpan..." : "Simpan Hero Banner"}</span>
        </button>
      </div>
    </form>
  );
}
