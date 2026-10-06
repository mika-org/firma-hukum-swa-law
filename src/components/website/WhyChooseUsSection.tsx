import { Scale, MessageSquare, Shield, Target } from "lucide-react";

interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  sortOrder: number;
}

interface WhyChooseProps {
  data: {
    eyebrow: string;
    title: string;
    imageUrl?: string | null;
  };
  items: WhyChooseItem[];
}

export default function WhyChooseUsSection({ data, items }: WhyChooseProps) {
  const imgSrc = data.imageUrl || "/images/why-us.jpg";

  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case "scale":
      case "scales":
        return <Scale className="w-5 h-5 text-gold" />;
      case "message":
      case "message-square":
        return <MessageSquare className="w-5 h-5 text-gold" />;
      case "shield":
        return <Shield className="w-5 h-5 text-gold" />;
      case "target":
        return <Target className="w-5 h-5 text-gold" />;
      default:
        return <Scale className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <section className="bg-navy-primary py-20 lg:py-28 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (45%): Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-md overflow-hidden border border-gold/30 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt="Mengapa Memilih Kami"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-dark/20 mix-blend-multiply pointer-events-none" />
            </div>
          </div>

          {/* Right Column (55%): Content & 2x2 Grid */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
                {data.eyebrow}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {data.title}
              </h2>
            </div>

            {/* 4 Items in 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {items.map((item, idx) => {
                const num = String(idx + 1).padStart(2, "0");
                return (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy-dark border border-gold/40 flex items-center justify-center shrink-0">
                        {getIcon(item.icon)}
                      </div>
                      <span className="font-editorial text-lg font-bold text-gold">
                        {num}
                      </span>
                    </div>

                    <h3 className="font-editorial text-lg font-bold text-off-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
