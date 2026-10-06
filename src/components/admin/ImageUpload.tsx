"use client";

import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ImageUploadProps {
  name: string;
  label?: string;
  currentValue?: string | null;
  helpText?: string;
}

export default function ImageUpload({
  name,
  label = "Upload Gambar",
  currentValue = "",
  helpText = "Format didukung: JPG, PNG, WEBP. Maks 5MB.",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(currentValue || "");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size < 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file melebihi 5MB.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Gagal upload gambar");
      }

      setPreview(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan upload";
      setError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Hidden input keeping the URL value for form submission */}
      <input type="hidden" name={name} value={preview} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-dashed border-border-subtle rounded-md bg-[#FAFAF7]">
        {/* Preview Container */}
        <div className="relative w-28 h-20 rounded border border-border-subtle overflow-hidden bg-navy-dark shrink-0 flex items-center justify-center">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* Action button and status */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-navy-primary bg-white border border-border-subtle hover:border-gold rounded transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Mengunggah...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-gold" />
                  <span>Pilih File Gambar</span>
                </>
              )}
            </button>

            {preview && (
              <span className="text-[11px] text-green-700 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                Tersimpan
              </span>
            )}
          </div>

          <p className="text-[11px] text-text-muted">{helpText}</p>
          {preview && (
            <p className="text-[10px] text-gray-400 font-mono truncate max-w-xs sm:max-w-md">
              URL: {preview}
            </p>
          )}

          {error && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
