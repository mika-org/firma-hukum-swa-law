import Link from "next/link";
import { Scale, MapPin, Phone, Mail, Clock } from "lucide-react";

interface FooterProps {
  settings: {
    firmName: string;
    tagline?: string | null;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    openingHours?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
    youtube?: string | null;
  };
  services: Array<{
    name: string;
    slug: string;
  }>;
}

export default function Footer({ settings, services }: FooterProps) {
  return (
    <footer className="bg-navy-dark text-white border-t border-navy-light pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-navy-primary flex items-center justify-center text-gold border border-gold/40">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-bold tracking-tight text-white leading-tight">
                  {settings.firmName}
                </h3>
                <p className="text-[11px] font-medium tracking-widest text-gold uppercase">
                  {settings.tagline || "Trusted Legal Partner"}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed pt-2">
              Firma hukum profesional yang mengedepankan integritas, ketelitian yuridis, dan komitmen penuh untuk memberikan solusi hukum terbaik bagi individu dan korporasi.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded bg-navy-primary/80 border border-white/10 flex items-center justify-center text-gray-300 hover:text-gold hover:border-gold transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded bg-navy-primary/80 border border-white/10 flex items-center justify-center text-gray-300 hover:text-gold hover:border-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded bg-navy-primary/80 border border-white/10 flex items-center justify-center text-gray-300 hover:text-gold hover:border-gold transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded bg-navy-primary/80 border border-white/10 flex items-center justify-center text-gray-300 hover:text-gold hover:border-gold transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="font-editorial text-lg font-semibold text-gold mb-4 tracking-wide">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-gold transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-gold transition-colors">
                  Bidang Praktik
                </Link>
              </li>
              <li>
                <Link href="/tim" className="hover:text-gold transition-colors">
                  Tim Profesional
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="hover:text-gold transition-colors">
                  Artikel & Insight
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-gold transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Hukum */}
          <div>
            <h4 className="font-editorial text-lg font-semibold text-gold mb-4 tracking-wide">
              Bidang Praktik
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="hover:text-gold transition-colors line-clamp-1"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak & Kantor */}
          <div className="space-y-3">
            <h4 className="font-editorial text-lg font-semibold text-gold mb-4 tracking-wide">
              Kantor & Kontak
            </h4>
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
              <span>{settings.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>{settings.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>{settings.email}</span>
            </div>
            {settings.openingHours && (
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{settings.openingHours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 {settings.firmName}. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/kontak" className="hover:text-gold transition-colors">
              Peta Lokasi
            </Link>
            <Link href="/admin/login" className="hover:text-gold transition-colors opacity-70 hover:opacity-100">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
