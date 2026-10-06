"use client";

import { useState } from "react";
import { createService, updateService, deleteService } from "@/actions/services";
import { Plus, Edit2, Trash2, X, ExternalLink, Briefcase, Scale, Shield, FileText, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  icon?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function ServicesClient({ initialServices }: { initialServices: ServiceItem[] }) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form field states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("briefcase");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingService(null);
    setName("");
    setSlug("");
    setShortDesc("");
    setDesc("");
    setIcon("briefcase");
    setSortOrder(services.length + 1);
    setIsActive(true);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingService(s);
    setName(s.name);
    setSlug(s.slug);
    setShortDesc(s.shortDescription || "");
    setDesc(s.description || "");
    setIcon(s.icon || "briefcase");
    setSortOrder(s.sortOrder);
    setIsActive(s.isActive);
    setFormError(null);
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingService) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("shortDescription", shortDesc);
    formData.append("description", desc);
    formData.append("icon", icon);
    formData.append("sortOrder", String(sortOrder));
    formData.append("isActive", isActive ? "true" : "false");

    try {
      let res;
      if (editingService) {
        res = await updateService(editingService.id, null, formData);
      } else {
        res = await createService(null, formData);
      }

      if (res?.error) {
        setFormError(res.error);
        setIsSubmitting(false);
        return;
      }

      // Refresh page or update local state
      window.location.reload();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setFormError(msg);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan hukum ini?")) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Gagal menghapus layanan");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md border border-border-subtle">
        <span className="text-xs text-text-muted">
          Total: <strong className="text-navy-primary">{services.length}</strong> bidang praktik terdaftar
        </span>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white border border-border-subtle rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF7] text-text-dark border-b border-border-subtle uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Urutan</th>
                <th className="py-3 px-5">Nama Layanan</th>
                <th className="py-3 px-5">Slug Route</th>
                <th className="py-3 px-5">Ikon</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {services.map((item) => (
                <tr key={item.id} className="hover:bg-off-white/40 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-text-muted">
                    {item.sortOrder}
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-navy-primary">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-text-muted">
                    /layanan/{item.slug}
                  </td>
                  <td className="py-3.5 px-5 text-gold font-medium uppercase text-[11px]">
                    {item.icon || "briefcase"}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap space-x-2">
                    <Link
                      href={`/layanan/${item.slug}`}
                      target="_blank"
                      className="p-1.5 inline-block text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                      title="Lihat di Web"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                      title="Edit Layanan"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 hover:text-red-700 rounded border border-border-subtle hover:border-red-300 transition-colors"
                      title="Hapus Layanan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Create/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-navy-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                {editingService ? "Ubah Data Layanan" : "Tambah Bidang Praktik Baru"}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-navy-primary mt-1">
                {editingService ? editingService.name : "Formulir Layanan Hukum"}
              </h3>
            </div>

            {formError && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Nama Bidang Praktik <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Contoh: Hukum Perusahaan & Bisnis"
                  className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Slug URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="hukum-perusahaan-bisnis"
                  className="w-full h-10 px-3 text-sm font-mono bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Ikon Garis (Line Art)
                  </label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  >
                    <option value="briefcase">Briefcase (Bisnis)</option>
                    <option value="scale">Scales (Timbangan / Perdata)</option>
                    <option value="shield">Shield (Perisai / Pidana)</option>
                    <option value="file-text">File Text (Legal Drafting)</option>
                    <option value="users">Users (Ketenagakerjaan)</option>
                    <option value="message-square">Message (Konsultasi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Urutan Tampil (Sort Order)
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Ringkasan Singkat (Muncul di Kartu Depan)
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Pendampingan hukum untuk perusahaan, startup, dan transaksi bisnis."
                  className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Ulasan Lengkap (Halaman Detail)
                </label>
                <textarea
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Penjelasan komprehensif mengenai ruang lingkup asistensi hukum..."
                  className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modalIsActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-navy-primary rounded border-border-subtle"
                />
                <label htmlFor="modalIsActive" className="text-xs font-semibold text-text-dark">
                  Layanan Aktif dan Tampil di Website
                </label>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-text-muted hover:text-navy-primary"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Layanan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
