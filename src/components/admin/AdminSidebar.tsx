"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/actions/auth";
import {
  LayoutDashboard,
  Settings,
  Image,
  Info,
  Briefcase,
  Users,
  Award,
  MessageSquare,
  FileText,
  HelpCircle,
  Mail,
  UserCheck,
  LogOut,
  ExternalLink,
  Scale,
} from "lucide-react";

interface AdminSidebarProps {
  newConsultationsCount?: number;
}

export default function AdminSidebar({ newConsultationsCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuSections = [
    {
      title: "Utama",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        {
          label: "Konsultasi Masuk",
          href: "/admin/consultations",
          icon: Mail,
          badge: newConsultationsCount > 0 ? newConsultationsCount : undefined,
        },
      ],
    },
    {
      title: "Konten Website",
      items: [
        { label: "General Settings", href: "/admin/settings", icon: Settings },
        { label: "Hero Banner", href: "/admin/hero", icon: Image },
        { label: "Tentang Kami", href: "/admin/about", icon: Info },
        { label: "Layanan Hukum", href: "/admin/services", icon: Briefcase },
        { label: "Tim Profesional", href: "/admin/team", icon: Users },
        { label: "Keunggulan", href: "/admin/why-choose-us", icon: Award },
        { label: "Section Konsultasi", href: "/admin/consultation-section", icon: MessageSquare },
        { label: "Artikel / Insight", href: "/admin/articles", icon: FileText },
        { label: "Tanya Jawab (FAQ)", href: "/admin/faq", icon: HelpCircle },
      ],
    },
    {
      title: "Pengaturan",
      items: [
        { label: "Akun Admin", href: "/admin/account", icon: UserCheck },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-navy-dark text-gray-300 flex flex-col shrink-0 min-h-screen border-r border-navy-light/60">
      {/* Brand Logo */}
      <div className="h-20 px-6 flex items-center gap-3 border-b border-navy-light/60">
        <div className="w-9 h-9 rounded bg-navy-primary flex items-center justify-center text-gold border border-gold/40">
          <Scale className="w-4 h-4" />
        </div>
        <div>
          <span className="font-editorial text-lg font-bold text-white leading-tight block">
            Firma CMS
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gold font-medium">
            Admin Dashboard
          </span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1.5">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {section.title}
            </span>
            <div className="space-y-1 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-colors ${
                      active
                        ? "bg-navy-primary text-gold border-l-2 border-gold font-semibold"
                        : "hover:bg-navy-primary/50 hover:text-white text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? "text-gold" : "text-gray-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gold text-navy-dark rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-navy-light/60 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded text-xs text-gray-400 hover:text-white hover:bg-navy-primary/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
            <span>Lihat Website</span>
          </span>
          <span className="text-[10px] text-gold">Live</span>
        </Link>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
