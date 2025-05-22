'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import GalaxyPoint from "../components/GalaxyCanvas/GalaxyPoints";
import { useEffect, useState } from 'react';
import AITerminal from "../components/AITerminal";
import GalaxyCard from "../components/GalaxyCanvas/GalaxyCard";

export default function HeroSection() {
  const [fade, setFade] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const value = Math.min(1, window.scrollY / 400);
      setFade(value);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* ⭐ FIXED Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 2] }}>
          <GalaxyPoint />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* 🌌 Scroll Fade Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black transition-opacity duration-300"
        style={{ opacity: fade }}
      />

      {/* 💡 Scrollable Content Layer */}
      <div className="relative z-30 flex items-center justify-center h-full px-4">
        <GalaxyCard>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-[0_0_10px_#ffffffaa]">
              Welcome to My Galaxy
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mt-2">
              Hi, I'm Koketso — a creative frontend developer exploring new frontiers in web design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 w-full max-w-2xl"
          >
            <AITerminal />
        </motion.div>
        </GalaxyCard>


      </div>

      {/* 🔻 Scroll Hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 text-white text-2xl animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        ↓
      </motion.div>
</section>  );
}
