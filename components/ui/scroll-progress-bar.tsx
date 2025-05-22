'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-gradient-to-r from-purple-500 via-cyan-400 to-white origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
