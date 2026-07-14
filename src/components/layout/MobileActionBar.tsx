"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, GraduationCap } from "lucide-react";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export function MobileActionBar() {
  const siteConfig = useSiteConfig();
  const pathname = usePathname();
  const isKids = pathname.startsWith("/op-kids");
  const phone = isKids ? siteConfig.kidsPhone : siteConfig.phone;
  const wa = isKids ? siteConfig.kidsWhatsapp : siteConfig.whatsapp;
  const waText = isKids
    ? "Hi, I would like to enquire about OP Kids Pre School."
    : "Hi, I would like to enquire about admissions at OP Institute.";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl safe-area-pb">
      <div className="grid grid-cols-3 divide-x divide-gray-200/80 dark:divide-white/10">
        <a
          href={`tel:${phone}`}
          className={`flex flex-col items-center justify-center gap-1 py-3 active:bg-brand-50 dark:active:bg-brand-950/30 transition ${
            isKids ? "text-kids-600" : "text-brand-600"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            Call
          </span>
        </a>

        <a
          href={`https://wa.me/${wa}?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[#25D366] active:bg-green-50 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            WhatsApp
          </span>
        </a>

        <Link
          href="/admissions"
          className={`flex flex-col items-center justify-center gap-1 py-3 text-white transition ${
            isKids
              ? "bg-kids-500 active:bg-kids-600"
              : "bg-brand-600 active:bg-brand-700"
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            Enquire
          </span>
        </Link>
      </div>
    </div>
  );
}
