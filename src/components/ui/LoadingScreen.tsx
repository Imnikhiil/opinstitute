"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f5f5f7]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-brand-100 border-t-brand-600"
              />
              <Image
                src="/logos/op-institute-logo.png"
                alt="O.P. Institute of Studies"
                width={72}
                height={72}
                priority
                className="w-16 h-16 object-contain rounded-full bg-white/95 p-1"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-display font-bold text-brand-900">
                O.P. Institute of Studies
              </h2>
              <p className="text-[#666666] text-sm mt-1">Since 2003 · OP Kids Pre School</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
