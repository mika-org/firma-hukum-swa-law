"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitConsultation } from "@/actions/consultation";
import { CheckCircle2, AlertCircle, Send, PhoneCall, Clock } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
}

interface ConsultationProps {
  section: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
  };
  services: ServiceOption[];
}

export default function ConsultationSection({ section, services }: ConsultationProps) {
  const [state, formAction, isPending] = useActionState(submitConsultation, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <section id="konsultasi" className="bg-off-white py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sisi Kiri: Editorial Header & Informasi Pendukung (45%) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              {section.eyebrow}
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-primary leading-tight">
              {section.title}
            </h2>

            <p className="text-base text-text-muted leading-relaxed">
              {section.description}
            </p>

            {/* Quick Guarantees */}
            <div className="pt-4 space-y-4 border-t border-border-subtle/80">
              <div className="flex items-start gap-3 text-sm text-text-dark">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Respons Cepat 1x24 Jam Kerja</span>
                  <span className="text-xs text-text-muted">Tim advokat kami segera mengevaluasi ringkasan perkara Anda.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-text-dark">
                <PhoneCall className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Kerahasiaan Terjamin Penuh</span>
                  <span className="text-xs text-text-muted">Seluruh keterangan dilindungi kode etik advokat dan hukum yang berlaku.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Form Konsultasi Bersih & Profesional (55%) */}
          <div className="lg:col-span-7 bg-white border border-border-subtle rounded-md p-7 sm:p-10 shadow-sm">
            {state?.success ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-green-50 border border-green-200 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-navy-primary">
                  Permintaan Terkirim
                </h3>
                <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                  {state.message}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center text-xs uppercase font-semibold tracking-wider text-navy-primary hover:text-gold transition-colors"
                  >
                    Kirim Permintaan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} action={formAction} className="space-y-5">
                {state?.error && (
                  <div className="p-3.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{state.error}</span>
                  </div>
                )}

                {/* Nama Lengkap */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Isi Nama Lengkap"
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#B8B5AD] rounded-md text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-navy-primary focus:ring-1 focus:ring-navy-primary transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nomor Telepon / WA */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
                      Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Contoh: 081234567890"
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#B8B5AD] rounded-md text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-navy-primary focus:ring-1 focus:ring-navy-primary transition-colors"
                    />
                  </div>

                  {/* Email (Opsional) */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
                      Email (Opsional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="nama@email.com"
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#B8B5AD] rounded-md text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-navy-primary focus:ring-1 focus:ring-navy-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Bidang Hukum */}
                <div>
                  <label htmlFor="serviceId" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
                    Bidang Hukum yang Dibutuhkan <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    required
                    defaultValue=""
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#B8B5AD] rounded-md text-text-dark focus:outline-none focus:border-navy-primary focus:ring-1 focus:ring-navy-primary transition-colors"
                  >
                    <option value="" disabled>
                      Pilih Bidang Hukum
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pesan */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
                    Ceritakan Kebutuhan Hukum Anda <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Jelaskan secara ringkas latar belakang permasalahan atau dokumen yang ingin dikonsultasikan..."
                    className="w-full p-3.5 text-sm bg-white border border-[#B8B5AD] rounded-md text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-navy-primary focus:ring-1 focus:ring-navy-primary transition-colors resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors shadow-sm disabled:opacity-60"
                  >
                    {isPending ? (
                      <span>Mengirim...</span>
                    ) : (
                      <>
                        <span>{section.buttonText || "Kirim Permintaan Konsultasi"}</span>
                        <Send className="w-3.5 h-3.5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
