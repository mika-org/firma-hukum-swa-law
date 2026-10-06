"use client";

import { useState } from "react";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/actions/team";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Edit2, Trash2, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface MemberItem {
  id: string;
  name: string;
  slug: string;
  position: string;
  photo?: string | null;
  specialization: string;
  experience: string;
  bio?: string | null;
  education?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function TeamClient({ initialTeam }: { initialTeam: MemberItem[] }) {
  const [team, setTeam] = useState<MemberItem[]>(initialTeam);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [position, setPosition] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [education, setEducation] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingMember(null);
    setName("");
    setSlug("");
    setPosition("Associate Lawyer");
    setSpecialization("");
    setExperience("5+ Tahun Pengalaman");
    setBio("");
    setEducation("");
    setSortOrder(team.length + 1);
    setIsActive(true);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (m: MemberItem) => {
    setEditingMember(m);
    setName(m.name);
    setSlug(m.slug);
    setPosition(m.position);
    setSpecialization(m.specialization);
    setExperience(m.experience);
    setBio(m.bio || "");
    setEducation(m.education || "");
    setSortOrder(m.sortOrder);
    setIsActive(m.isActive);
    setFormError(null);
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingMember) {
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
    formData.set("name", name);
    formData.set("slug", slug);
    formData.set("position", position);
    formData.set("specialization", specialization);
    formData.set("experience", experience);
    formData.set("bio", bio);
    formData.set("education", education);
    formData.set("sortOrder", String(sortOrder));
    formData.set("isActive", isActive ? "true" : "false");

    try {
      let res;
      if (editingMember) {
        res = await updateTeamMember(editingMember.id, null, formData);
      } else {
        res = await createTeamMember(null, formData);
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
    if (!confirm("Apakah Anda yakin ingin menghapus data advokat ini?")) return;
    try {
      await deleteTeamMember(id);
      setTeam((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Gagal menghapus advokat");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md border border-border-subtle">
        <span className="text-xs text-text-muted">
          Total: <strong className="text-navy-primary">{team.length}</strong> advokat terdaftar
        </span>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Tambah Advokat Baru</span>
        </button>
      </div>

      {/* Team Table */}
      <div className="bg-white border border-border-subtle rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF7] text-text-dark border-b border-border-subtle uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Foto</th>
                <th className="py-3 px-5">Nama Advokat</th>
                <th className="py-3 px-5">Jabatan</th>
                <th className="py-3 px-5">Spesialisasi</th>
                <th className="py-3 px-5">Pengalaman</th>
                <th className="py-3 px-5">Urutan</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-off-white/40 transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-10 h-10 rounded bg-navy-dark overflow-hidden border border-border-subtle">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.photo || "/images/team-agus.jpg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-navy-primary">
                    {member.name}
                  </td>
                  <td className="py-3.5 px-5 text-gold font-medium">
                    {member.position}
                  </td>
                  <td className="py-3.5 px-5 text-text-muted">
                    {member.specialization}
                  </td>
                  <td className="py-3.5 px-5 text-gray-500 whitespace-nowrap">
                    {member.experience}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-text-muted">
                    {member.sortOrder}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        member.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {member.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap space-x-2">
                    <Link
                      href={`/tim/${member.slug}`}
                      target="_blank"
                      className="p-1.5 inline-block text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                      title="Lihat Profil"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => openEditModal(member)}
                      className="p-1.5 text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                      title="Edit Advokat"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member.id)}
                      className="p-1.5 text-red-600 hover:text-red-700 rounded border border-border-subtle hover:border-red-300 transition-colors"
                      title="Hapus Advokat"
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
                {editingMember ? "Ubah Profil Advokat" : "Tambah Advokat Baru"}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-navy-primary mt-1">
                {editingMember ? editingMember.name : "Formulir Tim Advokat"}
              </h3>
            </div>

            {formError && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Nama & Gelar <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Contoh: Agus Mulyana, S.H., M.H."
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
                    placeholder="agus-mulyana"
                    className="w-full h-10 px-3 text-sm font-mono bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Jabatan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Managing Partner / Senior Associate"
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Spesialisasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="Corporate & Commercial Law"
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                    Lama Pengalaman <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="12+ Tahun Pengalaman"
                    className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <ImageUpload
                name="photo"
                label="Foto Profil Advokat (Aspect Ratio 1:1)"
                currentValue={editingMember?.photo}
                helpText="Gunakan foto formal berdasi/blazer dengan rasio 1:1 (Contoh: 600x600 px)."
              />

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Latar Belakang Pendidikan
                </label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="Sarjana Hukum (UI), Magister Hukum (UGM)"
                  className="w-full h-10 px-3 text-sm bg-white border border-border-subtle rounded text-text-dark focus:outline-none focus:border-navy-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">
                  Biografi & Rekam Jejak Singkat
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Deskripsi pengalaman advokat, organisasi profesi (PERADI/AKPI), dan keahlian spesifik..."
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
                    id="teamIsActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-navy-primary rounded border-border-subtle"
                  />
                  <label htmlFor="teamIsActive" className="text-xs font-semibold text-text-dark">
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
                  {isSubmitting ? "Menyimpan..." : "Simpan Advokat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
