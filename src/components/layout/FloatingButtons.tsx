"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingButtons() {
  const siteConfig = useSiteConfig();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const isKids = pathname.startsWith("/op-kids");
  const phone = isKids ? siteConfig.kidsPhone : siteConfig.phone;
  const wa = isKids ? siteConfig.kidsWhatsapp : siteConfig.whatsapp;
  const waText = isKids
    ? "Hi, I would like to enquire about OP Kids Pre School."
    : "Hi, I would like to enquire about admissions at OP Institute.";

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3"
        >
          <motion.a
            href={`https://wa.me/${wa}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 relative" />
          </motion.a>

          <motion.a
            href={`tel:${phone}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full text-white flex items-center justify-center shadow-lg ${
              isKids
                ? "bg-kids-500 shadow-kids-500/40"
                : "bg-brand-600 shadow-brand-600/40"
            }`}
            aria-label="Call us"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
