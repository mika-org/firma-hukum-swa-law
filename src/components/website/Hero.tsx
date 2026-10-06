import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface HeroProps {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
    backgroundImage?: string | null;
  };
}

export default function Hero({ hero }: HeroProps) {
  const bgImg = hero.backgroundImage || "/images/hero-legal.jpg";

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-navy-dark overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImg}
          alt="Supreme Court & Legal Architecture"
          className="w-full h-full object-cover object-right md:object-center opacity-40 mix-blend-luminosity"
        />
        {/* Gradient Overlay: Dark Navy dominant on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent md:hidden" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-primary/80 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Heading */}
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            {hero.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal max-w-xl">
            {hero.description}
          </p>

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={hero.primaryButtonUrl || "/#konsultasi"}
              className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-wider bg-gold hover:bg-gold-dark text-white rounded transition-all duration-200 shadow-lg hover:shadow-gold/20"
            >
              <span>{hero.primaryButtonText}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              href={hero.secondaryButtonUrl || "/layanan"}
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-white border border-gray-400/30 hover:border-gold hover:bg-white/5 rounded transition-all duration-200"
            >
              {hero.secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
