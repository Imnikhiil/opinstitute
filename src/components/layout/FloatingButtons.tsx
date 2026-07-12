"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { motion } from "framer-motion";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <motion.a
        href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I would like to enquire about admissions at OP Institute.`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>

      <motion.a
        href={`tel:${siteConfig.phone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 hover:shadow-xl transition-shadow"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>
  );
}
