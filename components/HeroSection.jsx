'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import GalaxyPoint from "../components/GalaxyCanvas/GalaxyPoints"; // ✅ new import
import { useEffect, useState } from 'react';
import AITerminal from "../components/AITerminal";
import GalaxyCard from "../components/GalaxyCanvas/GalaxyCard"; // ✅ new import

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
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center px-4">
      {/* Galaxy Background */}
      <Canvas className="absolute top-0 left-0 w-full h-full z-0" camera={{ position: [0, 0, 2] }}>
        <GalaxyPoint />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* GalaxyCard with welcome and terminal */}
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
        >
          <AITerminal />
        </motion.div>
      </GalaxyCard>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-6 z-10 text-white text-2xl animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        ↓
      </motion.div>

      {/* Scroll Fade */}
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-black transition-opacity duration-300"
        style={{ opacity: fade }}
      />
    </section>
  );
}
