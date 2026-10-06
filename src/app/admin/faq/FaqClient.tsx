"use client";

import { useState } from "react";
import { createFaq, updateFaq, deleteFaq } from "@/actions/faq";
import { Plus, Edit2, Trash2, X } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

export default function FaqClient({ initialFaqs }: { initialFaqs: FaqItem[] }) {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setSortOrder(faqs.length + 1);
    setIsActive(true);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (f: FaqItem) => {
    setEditingFaq(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setSortOrder(f.sortOrder);
    setIsActive(f.isActive);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);
    formData.append("sortOrder", String(sortOrder));
    formData.append("isActive", isActive ? "true" : "false");

    try {
      let res;
      if (editingFaq) {
        res = await updateFaq(editingFaq.id, null, formData);
      } else {
        res = await createFaq(null, formData);
      }

      if (res?.error) {
        setFormError(res.error);
        setIsSubmitting(false);
        return;
      }

      window.location.reload();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setFormError(msg);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pertanyaan FAQ ini?")) return;
    try {
      await deleteFaq(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch {
      alert("Gagal menghapus FAQ");
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md border border-border-subtle">
        <span className="text-xs text-text-muted">
          Total: <strong className="text-navy-primary">{faqs.length}</strong> pertanyaan FAQ
        </span>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Tambah Pertanyaan FAQ</span>
        </button>
      </div>

      {/* FAQ Table */}
      <div className="bg-white border border-border-subtle rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF7] text-text-dark border-b border-border-subtle uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Urutan</th>
                <th className="py-3 px-5">Pertanyaan</th>
                <th className="py-3 px-5">Jawaban Singkat</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {faqs.map((f) => (
                <tr key={f.id} className="hover:bg-off-white/40 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-text-muted">
                    {f.sortOrder}
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-navy-primary max-w-xs">
                    {f.question}
                  </td>
                  <td className="py-3.5 px-5 text-text-muted line-clamp-2 max-w-sm">
                    {f.answer}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        f.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {f.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(f)}
                      className="p-1.5 text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(f.id)}
                      className="p-1.5 text-red-600 hover:text-red-700 rounded border border-border-subtle hover:border-red-300 transition-colors"
                      title="Hapus FAQ"
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

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-navy-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                {editingFaq ? "Edit Pertanyaan FAQ" : "Tambah Pertanyaan FAQ Baru"}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-navy-primary mt-1">
                Formulir Tanya Jawab
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
                  Pertanyaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Contoh: Bagaimana cara menjadwalkan konsultasi awal?"
                  className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Jawaban Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Penjelasan jelas mengenai alur, syarat dokumen, atau skema tarif..."
                  className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="faqIsActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-navy-primary rounded border-border-subtle"
                  />
                  <label htmlFor="faqIsActive" className="text-xs font-semibold text-text-dark">
                    Tampilkan di Website
                  </label>
                </div>
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
                  {isSubmitting ? "Menyimpan..." : "Simpan FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
