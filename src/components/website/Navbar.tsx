"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scale } from "lucide-react";

interface NavbarProps {
  firmName?: string;
  tagline?: string;
  logoUrl?: string | null;
}

export default function Navbar({
  firmName = "Firma Hukum Swa Law",
  tagline = "Firma Hukum & Konsultan",
  logoUrl,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Layanan", href: "/layanan" },
    { label: "Tim", href: "/tim" },
    { label: "Artikel", href: "/artikel" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/kontak" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border-light"
          : "bg-white border-b border-border-light/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={firmName}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-navy-primary flex items-center justify-center text-gold border border-gold/40">
                <Scale className="w-5 h-5" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-editorial text-xl font-bold tracking-tight text-navy-primary group-hover:text-gold transition-colors leading-tight">
                {firmName}
              </span>
              <span className="text-[11px] font-medium tracking-widest text-text-muted uppercase">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  isActive(link.href)
                    ? "text-gold font-semibold"
                    : "text-text-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/#konsultasi"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-gold hover:bg-gold-dark text-white rounded transition-all duration-200 shadow-sm hover:shadow"
            >
              Konsultasi Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-navy-primary hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-border-subtle px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                  isActive(link.href)
                    ? "bg-off-white text-gold font-semibold"
                    : "text-text-dark hover:bg-off-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/#konsultasi"
                onClick={() => setIsOpen(false)}
                className="w-full text-center block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold bg-gold hover:bg-gold-dark text-white rounded transition-colors"
              >
                Konsultasi Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
