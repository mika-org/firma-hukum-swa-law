"use client";

import { useState, useActionState } from "react";
import { updateWhyChooseUs, saveWhyChooseUsItem, deleteWhyChooseUsItem } from "@/actions/settings";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, Plus, Edit2, Trash2, X, CheckCircle2, AlertCircle } from "lucide-react";

interface Item {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
}

interface WhyChooseProps {
  data: {
    id: string;
    eyebrow: string;
    title: string;
    imageUrl?: string | null;
    isActive: boolean;
    items: Item[];
  } | null;
}

export default function WhyChooseClient({ data }: WhyChooseProps) {
  const [sectionState, formAction, isPending] = useActionState(updateWhyChooseUs, null);
  const [items, setItems] = useState<Item[]>(data?.items || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Item form states
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemIcon, setItemIcon] = useState("scales");
  const [itemSort, setItemSort] = useState(0);
  const [itemActive, setItemActive] = useState(true);
  const [itemError, setItemError] = useState<string | null>(null);
  const [isSavingItem, setIsSavingItem] = useState(false);

  const openAddItem = () => {
    setEditingItem(null);
    setItemTitle("");
    setItemDesc("");
    setItemIcon("scales");
    setItemSort(items.length + 1);
    setItemActive(true);
    setItemError(null);
    setModalOpen(true);
  };

  const openEditItem = (item: Item) => {
    setEditingItem(item);
    setItemTitle(item.title);
    setItemDesc(item.description);
    setItemIcon(item.icon);
    setItemSort(item.sortOrder);
    setItemActive(item.isActive);
    setItemError(null);
    setModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingItem(true);
    setItemError(null);

    const formData = new FormData();
    formData.append("title", itemTitle);
    formData.append("description", itemDesc);
    formData.append("icon", itemIcon);
    formData.append("sortOrder", String(itemSort));
    formData.append("isActive", itemActive ? "true" : "false");

    try {
      const res = await saveWhyChooseUsItem(editingItem ? editingItem.id : null, null, formData);
      if (res?.error) {
        setItemError(res.error);
        setIsSavingItem(false);
        return;
      }
      window.location.reload();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setItemError(msg);
      setIsSavingItem(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Hapus item nilai keunggulan ini?")) return;
    try {
      await deleteWhyChooseUsItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      alert("Gagal menghapus item");
    }
  };

  return (
    <div className="space-y-10">
      {/* Form Utama Section */}
      <form action={formAction} className="bg-white p-6 sm:p-8 rounded-md border border-border-subtle space-y-6 shadow-sm">
        <h2 className="font-editorial text-xl font-bold text-navy-primary border-b border-border-subtle pb-3">
          1. Header Section & Gambar Pendukung
        </h2>

        {sectionState?.success && (
          <div className="p-4 rounded bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>{sectionState.message}</span>
          </div>
        )}

        {sectionState?.error && (
          <div className="p-4 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{sectionState.error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Eyebrow <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="eyebrow"
              required
              defaultValue={data?.eyebrow || "Mengapa Memilih Kami"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Judul Utama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              defaultValue={data?.title || "Nilai Lebih yang Kami Tawarkan"}
              className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
            />
          </div>
        </div>

        <ImageUpload
          name="imageUrl"
          label="Foto Ilustrasi Keunggulan (Sisi Kiri)"
          currentValue={data?.imageUrl}
          helpText="Foto ruang perpustakaan hukum atau dokumen penting beresolusi tinggi."
        />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="whyIsActive"
              name="isActive"
              defaultChecked={data?.isActive !== false}
              className="w-4 h-4 text-navy-primary rounded border-border-subtle"
            />
            <label htmlFor="whyIsActive" className="text-xs font-semibold text-text-dark">
              Tampilkan Section pada Beranda
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors disabled:opacity-60"
          >
            <Save className="w-4 h-4 text-gold" />
            <span>{isPending ? "Menyimpan..." : "Simpan Header"}</span>
          </button>
        </div>
      </form>

      {/* Bagian Poin-Poin Nilai (4 Items) */}
      <div className="bg-white p-6 sm:p-8 rounded-md border border-border-subtle space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <h2 className="font-editorial text-xl font-bold text-navy-primary">
              2. Butir Nilai Keunggulan (Poin Diferensiasi)
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Daftar poin terstruktur yang ditampilkan berdampingan di samping gambar
            </p>
          </div>

          <button
            type="button"
            onClick={openAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gold hover:bg-gold-dark text-white rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Poin</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="p-5 border border-border-subtle rounded-md bg-[#FAFAF7] space-y-2 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="font-editorial text-base font-bold text-gold">
                  {String(idx + 1).padStart(2, "0")} — {item.icon}
                </span>
                <div className="space-x-1">
                  <button
                    type="button"
                    onClick={() => openEditItem(item)}
                    className="p-1 text-navy-primary hover:text-gold"
                    title="Edit Poin"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                    title="Hapus Poin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-editorial text-base font-bold text-navy-primary">
                {item.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Item */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-navy-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-editorial text-xl font-bold text-navy-primary">
              {editingItem ? "Edit Poin Keunggulan" : "Tambah Poin Keunggulan Baru"}
            </h3>

            {itemError && (
              <div className="p-3 rounded bg-red-50 text-red-700 text-xs">
                {itemError}
              </div>
            )}

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  Judul Poin <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  placeholder="Contoh: Pendekatan Hukum yang Terstruktur"
                  className="w-full h-9 px-3 text-xs bg-white border border-border-subtle rounded focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  Deskripsi Poin <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  placeholder="Analisis mendalam untuk solusi yang tepat..."
                  className="w-full p-2.5 text-xs bg-white border border-border-subtle rounded focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1">
                    Ikon Poin
                  </label>
                  <select
                    value={itemIcon}
                    onChange={(e) => setItemIcon(e.target.value)}
                    className="w-full h-9 px-2 text-xs bg-white border border-border-subtle rounded"
                  >
                    <option value="scales">Scales (Timbangan)</option>
                    <option value="message">Message (Komunikasi)</option>
                    <option value="shield">Shield (Integritas)</option>
                    <option value="target">Target (Solusi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1">
                    Urutan
                  </label>
                  <input
                    type="number"
                    value={itemSort}
                    onChange={(e) => setItemSort(Number(e.target.value))}
                    className="w-full h-9 px-2 text-xs bg-white border border-border-subtle rounded"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-text-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingItem}
                  className="px-5 py-1.5 text-xs uppercase tracking-wider font-semibold bg-navy-primary text-white rounded disabled:opacity-60"
                >
                  {isSavingItem ? "Menyimpan..." : "Simpan Poin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
