'use client';
import { useScroll, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
      }}
      className="fixed top-0 left-0 h-1 bg-blue-500 z-[100]"
    />
  );
}
