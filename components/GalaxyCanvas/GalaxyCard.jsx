'use client';
import { motion } from 'framer-motion';

export default function GalaxyCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-10 text-white shadow-2xl"
    >
      {children}
    </motion.div>
  );
}
