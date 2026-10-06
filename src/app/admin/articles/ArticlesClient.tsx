"use client";

import { useState } from "react";
import { createArticle, updateArticle, deleteArticle } from "@/actions/articles";
import ImageUpload from "@/components/admin/ImageUpload";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus, Edit2, Trash2, X, ExternalLink, Calendar, User } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string | null;
  categoryId?: string | null;
  author: string;
  publishedAt?: Date | null;
  status: string;
  category?: Category | null;
}

export default function ArticlesClient({
  initialArticles,
  categories,
}: {
  initialArticles: ArticleItem[];
  categories: Category[];
}) {
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [author, setAuthor] = useState("Tim Advokat");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle("");
    setSlug("");
    setCategoryId(categories[0]?.id || "");
    setAuthor("Tim Firma Hukum");
    setExcerpt("");
    setContent("");
    setStatus("PUBLISHED");
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (a: ArticleItem) => {
    setEditingArticle(a);
    setTitle(a.title);
    setSlug(a.slug);
    setCategoryId(a.categoryId || "");
    setAuthor(a.author);
    setExcerpt(a.excerpt);
    setContent(a.content);
    setStatus(a.status as "DRAFT" | "PUBLISHED");
    setFormError(null);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingArticle) {
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

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("categoryId", categoryId);
    formData.set("author", author);
    formData.set("excerpt", excerpt);
    formData.set("content", content);
    formData.set("status", status);

    try {
      let res;
      if (editingArticle) {
        res = await updateArticle(editingArticle.id, null, formData);
      } else {
        res = await createArticle(null, formData);
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
    if (!confirm("Hapus artikel ini secara permanen?")) return;
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Gagal menghapus artikel");
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md border border-border-subtle">
        <span className="text-xs text-text-muted">
          Total: <strong className="text-navy-primary">{articles.length}</strong> artikel publikasi
        </span>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-border-subtle rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF7] text-text-dark border-b border-border-subtle uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Cover</th>
                <th className="py-3 px-5">Judul Artikel</th>
                <th className="py-3 px-5">Kategori</th>
                <th className="py-3 px-5">Penulis</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Tanggal</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-off-white/40 transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-14 h-9 rounded bg-navy-dark overflow-hidden border border-border-subtle shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={art.featuredImage || "/images/article-1.jpg"}
                        alt={art.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-navy-primary max-w-sm line-clamp-2">
                    {art.title}
                  </td>
                  <td className="py-3.5 px-5 text-gold font-medium">
                    {art.category?.name || "Umum"}
                  </td>
                  <td className="py-3.5 px-5 text-text-muted whitespace-nowrap">
                    {art.author}
                  </td>
                  <td className="py-3.5 px-5">
                    <StatusBadge status={art.status} />
                  </td>
                  <td className="py-3.5 px-5 text-gray-400 whitespace-nowrap">
                    {art.publishedAt
                      ? new Date(art.publishedAt).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap space-x-2">
                    {art.status === "PUBLISHED" && (
                      <Link
                        href={`/artikel/${art.slug}`}
                        target="_blank"
                        className="p-1.5 inline-block text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                        title="Buka Halaman Artikel"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => openEditModal(art)}
                      className="p-1.5 text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                      title="Edit Artikel"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(art.id)}
                      className="p-1.5 text-red-600 hover:text-red-700 rounded border border-border-subtle hover:border-red-300 transition-colors"
                      title="Hapus Artikel"
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
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-navy-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                {editingArticle ? "Edit Artikel Hukum" : "Publikasikan Artikel Baru"}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-navy-primary mt-1">
                {editingArticle ? editingArticle.title : "Formulir Penulisan Opini / Artikel"}
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
                  Judul Artikel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Contoh: Mitigasi Risiko Klausul Kontrak Bisnis di Era Digital"
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
                  placeholder="panduan-hukum-korporasi-mitigasi-risiko"
                  className="w-full h-10 px-3 text-sm font-mono bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Kategori Artikel
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Nama Penulis (Author)
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Agus Mulyana, S.H."
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Status Publikasi
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  >
                    <option value="PUBLISHED">PUBLISHED (Terbit)</option>
                    <option value="DRAFT">DRAFT (Konsep)</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Upload */}
              <ImageUpload
                name="featuredImage"
                label="Cover / Featured Image Artikel (16:9)"
                currentValue={editingArticle?.featuredImage}
                helpText="Rekomendasi rasio 16:9 (Contoh: 1200x675 px)."
              />

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Ringkasan / Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat yang menarik minat pembaca..."
                  className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Isi Konten Artikel <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan analisis hukum, pasal acuan, solusi yuridis secara editorial..."
                  className="w-full p-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary font-mono text-xs"
                />
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
                  {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
