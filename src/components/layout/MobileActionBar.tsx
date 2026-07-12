"use client";

import Link from "next/link";
import { Phone, MessageCircle, GraduationCap } from "lucide-react";
import { siteConfig } from "@/data/site";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl safe-area-pb">
      <div className="grid grid-cols-3 divide-x divide-gray-200/80 dark:divide-white/10">
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-brand-600 active:bg-brand-50 dark:active:bg-brand-950/30 transition"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Call</span>
        </a>

        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I would like to enquire about admissions at OP Institute.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[#25D366] active:bg-green-50 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">WhatsApp</span>
        </a>

        <Link
          href="/admissions"
          className="flex flex-col items-center justify-center gap-1 py-3 bg-brand-600 text-white active:bg-brand-700 transition"
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Enquire</span>
        </Link>
      </div>
    </div>
  );
}
