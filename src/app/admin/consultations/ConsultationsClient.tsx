"use client";

import { useState } from "react";
import { updateConsultationStatus, deleteConsultation } from "@/actions/consultation";
import StatusBadge from "@/components/admin/StatusBadge";
import { Search, Eye, Trash2, X, Phone, Mail, Calendar, MessageSquare, ExternalLink } from "lucide-react";

interface RequestItem {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: string;
  createdAt: Date;
  service: {
    id: string;
    name: string;
  } | null;
}

export default function ConsultationsClient({
  initialRequests,
}: {
  initialRequests: RequestItem[];
}) {
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const statuses = [
    { value: "ALL", label: "Semua" },
    { value: "NEW", label: "Baru Masuk" },
    { value: "CONTACTED", label: "Dihubungi" },
    { value: "IN_PROGRESS", label: "Dalam Proses" },
    { value: "COMPLETED", label: "Selesai" },
    { value: "CANCELLED", label: "Dibatalkan" },
  ];

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    try {
      await updateConsultationStatus(id, newStatus);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      }
    } catch {
      alert("Gagal mengubah status");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data permohonan konsultasi ini?")) {
      return;
    }
    try {
      await deleteConsultation(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
      if (selectedRequest?.id === id) {
        setSelectedRequest(null);
      }
    } catch {
      alert("Gagal menghapus data");
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchStatus = filterStatus === "ALL" || req.status === filterStatus;
    const matchSearch =
      searchQuery === "" ||
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.phone.includes(searchQuery) ||
      (req.email && req.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      req.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-md border border-border-subtle">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {statuses.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setFilterStatus(s.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                filterStatus === s.value
                  ? "bg-navy-primary text-gold"
                  : "text-text-muted hover:text-navy-primary hover:bg-off-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama, nomor, pesan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-border-subtle rounded-md text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-navy-primary"
          />
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white border border-border-subtle rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF7] text-text-dark border-b border-border-subtle uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Nama Klien</th>
                <th className="py-3 px-5">Kontak</th>
                <th className="py-3 px-5">Bidang Hukum</th>
                <th className="py-3 px-5">Ringkasan Pesan</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Tanggal</th>
                <th className="py-3 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-text-muted">
                    Tidak ada data permohonan konsultasi yang cocok.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-off-white/40 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-navy-primary">
                      {req.name}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="font-mono text-text-dark">{req.phone}</div>
                      {req.email && <div className="text-[11px] text-text-muted">{req.email}</div>}
                    </td>
                    <td className="py-3.5 px-5 text-text-dark">
                      {req.service?.name || "Konsultasi Umum"}
                    </td>
                    <td className="py-3.5 px-5 max-w-xs text-text-muted line-clamp-1 truncate">
                      {req.message}
                    </td>
                    <td className="py-3.5 px-5">
                      <select
                        value={req.status}
                        disabled={isUpdating === req.id}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className="text-xs bg-white border border-border-subtle rounded px-2 py-1 focus:outline-none focus:border-navy-primary"
                      >
                        <option value="NEW">Baru Masuk</option>
                        <option value="CONTACTED">Dihubungi</option>
                        <option value="IN_PROGRESS">Dalam Proses</option>
                        <option value="COMPLETED">Selesai</option>
                        <option value="CANCELLED">Dibatalkan</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-5 text-gray-400 whitespace-nowrap">
                      {new Date(req.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(req)}
                        className="p-1.5 text-navy-primary hover:text-gold rounded border border-border-subtle hover:border-gold transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(req.id)}
                        className="p-1.5 text-red-600 hover:text-red-700 rounded border border-border-subtle hover:border-red-300 transition-colors"
                        title="Hapus Permohonan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Konsultasi */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-navy-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                Detail Permohonan Konsultasi
              </span>
              <h3 className="font-editorial text-2xl font-bold text-navy-primary mt-1">
                {selectedRequest.name}
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-text-dark bg-[#FAFAF7] p-4 rounded-md border border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Status:</span>
                <StatusBadge status={selectedRequest.status} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-muted">Bidang Hukum:</span>
                <span className="font-semibold text-navy-primary">
                  {selectedRequest.service?.name || "Konsultasi Umum"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-muted">Nomor Telepon:</span>
                <a
                  href={`tel:${selectedRequest.phone}`}
                  className="font-mono text-navy-primary font-bold hover:underline"
                >
                  {selectedRequest.phone}
                </a>
              </div>

              {selectedRequest.email && (
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Email:</span>
                  <a
                    href={`mailto:${selectedRequest.email}`}
                    className="text-navy-primary hover:underline"
                  >
                    {selectedRequest.email}
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-text-muted">Tanggal Dikirim:</span>
                <span>
                  {new Date(selectedRequest.createdAt).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-text-dark uppercase tracking-wider block">
                Pesan / Kronologis Kebutuhan Hukum:
              </span>
              <div className="p-4 rounded-md bg-white border border-border-subtle text-xs text-text-muted leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                {selectedRequest.message}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4 border-t border-border-subtle">
              <a
                href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, "")}?text=Halo%20Bpk/Ibu%20${encodeURIComponent(selectedRequest.name)},%20kami%20dari%20Firma%20Hukum%20ingin%20menindaklanjuti%20permohonan%20konsultasi%20Anda.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-green-700 hover:bg-green-800 text-white rounded transition-colors"
              >
                <span>Hubungi via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-xs font-semibold text-text-muted hover:text-navy-primary"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
