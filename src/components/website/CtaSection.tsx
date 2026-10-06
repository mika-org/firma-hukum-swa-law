import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

interface CtaProps {
  whatsapp?: string;
}

export default function CtaSection({ whatsapp }: CtaProps) {
  const waClean = whatsapp?.replace(/[^0-9]/g, "") || "6281188997722";

  return (
    <section className="bg-navy-dark py-20 lg:py-24 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B29A68_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
          Pendampingan Hukum Tepercaya
        </span>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Butuh Pendampingan Hukum?
        </h2>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Konsultasikan kebutuhan hukum Anda bersama tim advokat profesional kami untuk mendapatkan strategi perlindungan hukum yang tepat dan berkepastian.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#konsultasi"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-wider font-semibold bg-gold hover:bg-gold-dark text-white rounded transition-all duration-200 shadow-lg hover:shadow-gold/20"
          >
            <span>Jadwalkan Konsultasi</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>

          <a
            href={`https://wa.me/${waClean}?text=Halo%20Firma%20Hukum,%20saya%20ingin%20berkonsultasi%20mengenai%20perkara%20hukum.`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs uppercase tracking-wider font-semibold border border-white/20 hover:border-gold hover:bg-white/5 text-gray-200 rounded transition-colors"
          >
            <Phone className="w-4 h-4 mr-2 text-gold" />
            <span>Hubungi WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
