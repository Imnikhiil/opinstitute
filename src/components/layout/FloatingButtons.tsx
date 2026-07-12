"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
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
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-3"
        >
          <motion.a
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I would like to enquire about admissions at OP Institute.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative" />
          </motion.a>

          <motion.a
            href={`tel:${siteConfig.phone}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/40"
            aria-label="Call us"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
