"use client";

import { useActionState } from "react";
import { updateAboutSection } from "@/actions/settings";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface AboutData {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
}

export default function AboutForm({ initialData }: { initialData: AboutData | null }) {
  const [state, formAction, isPending] = useActionState(updateAboutSection, null);

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
          Eyebrow <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="eyebrow"
          required
          defaultValue={initialData?.eyebrow || "Tentang Kami"}
          className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      {/* Heading Title */}
      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Judul Section <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          defaultValue={initialData?.title || "Mendampingi Setiap Langkah Hukum Anda"}
          className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
          Deskripsi & Komitmen Firma <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={
            initialData?.description ||
            "Kami adalah firma hukum yang memberikan pendampingan strategis dengan mengutamakan integritas, ketelitian, dan kepentingan klien. Kami percaya bahwa setiap kasus memiliki cerita, dan setiap klien berhak mendapatkan solusi hukum terbaik."
          }
          className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
        />
      </div>

      {/* Image (4:3) */}
      <ImageUpload
        name="imageUrl"
        label="Foto Kantor / Legal Law Books (Rasio 4:3)"
        currentValue={initialData?.imageUrl}
        helpText="Foto meja pengacara, patung keadilan, atau buku hukum profesional (Rekomendasi: 800x600 px)."
      />

      {/* Button Text & URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
            Teks Tombol
          </label>
          <input
            type="text"
            name="buttonText"
            required
            defaultValue={initialData?.buttonText || "Pelajari Selengkapnya"}
            className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
            Tautan URL Tombol
          </label>
          <input
            type="text"
            name="buttonUrl"
            required
            defaultValue={initialData?.buttonUrl || "/tentang-kami"}
            className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded"
          />
        </div>
      </div>

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
          Tampilkan Section Tentang Kami pada Beranda
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
          <span>{isPending ? "Menyimpan..." : "Simpan Tentang Kami"}</span>
        </button>
      </div>
    </form>
  );
}
