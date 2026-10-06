import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AboutProps {
  about: {
    eyebrow: string;
    title: string;
    description: string;
    imageUrl?: string | null;
    buttonText: string;
    buttonUrl: string;
  };
}

export default function AboutSection({ about }: AboutProps) {
  const imgSrc = about.imageUrl || "/images/about-legal.jpg";

  return (
    <section className="bg-off-white py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Sisi Kiri: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              {about.eyebrow}
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-primary leading-[1.2]">
              {about.title}
            </h2>

            <p className="text-base text-text-muted leading-relaxed whitespace-pre-line">
              {about.description}
            </p>

            <div className="pt-2">
              <Link
                href={about.buttonUrl || "/tentang-kami"}
                className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider font-semibold border border-navy-primary text-navy-primary bg-transparent hover:bg-navy-primary hover:text-white rounded transition-all duration-200"
              >
                <span>{about.buttonText}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Sisi Kanan: Legal Image (4:3 aspect ratio) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden shadow-sm border border-border-subtle bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt="Tentang Kantor Hukum Kami"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-gold/20 rounded-md pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
