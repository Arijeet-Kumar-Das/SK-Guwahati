"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  whatsapp: string;
}

export default function WhatsAppButton({ whatsapp }: WhatsAppButtonProps) {
  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-green-600 text-white shadow-lg shadow-brand-green-600/20 transition-all duration-200 hover:bg-brand-green-700 hover:shadow-brand-green-600/25"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}
