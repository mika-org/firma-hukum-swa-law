"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
            Pertanyaan Umum
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-primary">
            Tanya Jawab Seputar Layanan
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto">
            Temukan jawaban atas pertanyaan yang sering diajukan klien mengenai prosedur penanganan perkara dan konsultasi hukum.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="border border-border-subtle rounded-md overflow-hidden transition-colors bg-[#FAFAF7]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-editorial text-lg sm:text-xl font-bold text-navy-primary hover:text-gold transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full border border-border-subtle flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-navy-primary text-white border-navy-primary" : "text-text-muted"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-text-muted leading-relaxed border-t border-border-subtle/40 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
