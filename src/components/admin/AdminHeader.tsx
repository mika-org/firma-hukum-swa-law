import Link from "next/link";
import { User, ExternalLink, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  userEmail?: string;
  userName?: string;
}

export default function AdminHeader({
  title,
  description,
  userEmail = "admin@firmalaw.id",
  userName = "Administrator",
}: AdminHeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between">
      <div>
        <h1 className="font-editorial text-2xl font-bold text-navy-primary leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-navy-primary border border-border-subtle hover:border-gold rounded transition-colors"
        >
          <span>Buka Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-gold" />
        </Link>

        <div className="flex items-center gap-3 pl-3 border-l border-border-subtle">
          <div className="w-8 h-8 rounded-full bg-navy-primary text-gold flex items-center justify-center font-bold text-xs">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block text-left text-xs">
            <span className="font-semibold text-navy-primary block leading-tight">
              {userName}
            </span>
            <span className="text-[11px] text-text-muted">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
