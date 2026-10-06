"use client";

import { useActionState } from "react";
import { updateSiteSettings } from "@/actions/settings";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

interface SettingsData {
  id: string;
  firmName: string;
  tagline?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapsUrl?: string | null;
  openingHours?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl?: string | null;
}

export default function SettingsForm({
  initialData,
}: {
  initialData: SettingsData | null;
}) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, null);

  return (
    <form action={formAction} className="space-y-8">
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

      {/* Bagian 1: Identitas & Logo */}
      <div className="bg-white p-6 sm:p-8 rounded-md border border-border-subtle space-y-6 shadow-sm">
        <h2 className="font-editorial text-xl font-bold text-navy-primary border-b border-border-subtle pb-3">
          1. Identitas Brand & Logo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Nama Firma Hukum <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firmName"
              required
              defaultValue={initialData?.firmName || "Firma Hukum Swa Law"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Tagline / Slogan
            </label>
            <input
              type="text"
              name="tagline"
              defaultValue={initialData?.tagline || "Firma Hukum & Konsultan"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>
        </div>

        <ImageUpload
          name="logoUrl"
          label="Logo Utama (Opsional)"
          currentValue={initialData?.logoUrl}
          helpText="Format PNG atau SVG dengan background transparan direkomendasikan."
        />
      </div>

      {/* Bagian 2: Kontak & Kantor SCBD */}
      <div className="bg-white p-6 sm:p-8 rounded-md border border-border-subtle space-y-6 shadow-sm">
        <h2 className="font-editorial text-xl font-bold text-navy-primary border-b border-border-subtle pb-3">
          2. Kontak Resmi & Alamat Kantor
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Email Resmi <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue={initialData?.email || "kontak@firmalaw.id"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Nomor Telepon Kantor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              required
              defaultValue={initialData?.phone || "+62 21 5289 7700"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Nomor WhatsApp Konsultasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="whatsapp"
              required
              defaultValue={initialData?.whatsapp || "+62 811 8899 7722"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
            Alamat Kantor Lengkap <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            required
            rows={2}
            defaultValue={initialData?.address || "Treasury Tower Lantai 28, SCBD District 8, Jakarta Selatan 12190"}
            className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Google Maps URL
            </label>
            <input
              type="url"
              name="mapsUrl"
              defaultValue={initialData?.mapsUrl || "https://maps.google.com/?q=SCBD+Jakarta"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Jam Operasional
            </label>
            <input
              type="text"
              name="openingHours"
              defaultValue={initialData?.openingHours || "Senin - Jumat: 08:30 - 17:30 WIB"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>
        </div>
      </div>

      {/* Bagian 3: Media Sosial */}
      <div id="social" className="bg-white p-6 sm:p-8 rounded-md border border-border-subtle space-y-6 shadow-sm">
        <h2 className="font-editorial text-xl font-bold text-navy-primary border-b border-border-subtle pb-3">
          3. Media Sosial Resmi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              name="instagram"
              defaultValue={initialData?.instagram || ""}
              placeholder="https://instagram.com/firmalaw"
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              defaultValue={initialData?.linkedin || ""}
              placeholder="https://linkedin.com/company/firmalaw"
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              name="facebook"
              defaultValue={initialData?.facebook || ""}
              placeholder="https://facebook.com/firmalaw"
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              YouTube Channel URL
            </label>
            <input
              type="url"
              name="youtube"
              defaultValue={initialData?.youtube || ""}
              placeholder="https://youtube.com/@firmalaw"
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>
        </div>
      </div>

      {/* Bagian 4: SEO Metadata */}
      <div className="bg-white p-6 sm:p-8 rounded-md border border-border-subtle space-y-6 shadow-sm">
        <h2 className="font-editorial text-xl font-bold text-navy-primary border-b border-border-subtle pb-3">
          4. SEO & Mesin Pencari
        </h2>

        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
            Meta Title Default <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="metaTitle"
            required
            defaultValue={initialData?.metaTitle || "Firma Hukum Swa Law — Trusted Legal Partner"}
            className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
            Meta Description Default <span className="text-red-500">*</span>
          </label>
          <textarea
            name="metaDescription"
            required
            rows={3}
            defaultValue={
              initialData?.metaDescription ||
              "Firma hukum profesional yang memberikan pendampingan strategis dan solusi hukum terpercaya bagi individu dan korporasi."
            }
            className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
          />
        </div>

        <ImageUpload
          name="ogImageUrl"
          label="OG Image (Share Thumbnail) Opsional"
          currentValue={initialData?.ogImageUrl}
          helpText="Gambar yang muncul saat link website dibagikan ke WhatsApp, LinkedIn, atau Twitter (1200x630 px)."
        />
      </div>

      {/* Submit Action */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors shadow-sm disabled:opacity-60"
        >
          <Save className="w-4 h-4 text-gold" />
          <span>{isPending ? "Menyimpan..." : "Simpan Pengaturan"}</span>
        </button>
      </div>
    </form>
  );
}
