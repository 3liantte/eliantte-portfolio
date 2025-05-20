'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlobeDemo from "../components/GlobeDemo";


export default function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="min-h-screen bg-black text-white px-6 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-40 bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-transparent blur-2xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16 relative z-10"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Send a Signal</h2>
        <p className="text-gray-400 text-lg font-mono">Initiating secure transmission to Koketso's station...</p>
      </motion.div>

      {/* Contact Form */}
      <div className="relative z-10 max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur">
        {!sent ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-white">Name</label>
              <input
                required
                type="text"
                className="w-full mt-1 bg-transparent border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                required
                type="email"
                className="w-full mt-1 bg-transparent border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Message</label>
              <textarea
                required
                rows={4}
                className="w-full mt-1 bg-transparent border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-cyan-500 text-black font-semibold px-6 py-2 rounded hover:bg-cyan-400 transition"
            >
              Transmit Signal
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-green-400 font-mono text-lg"
          >
            <p>&gt;&gt; Signal transmitted successfully.</p>
            <p className="text-sm text-gray-400 mt-2">Koketso will receive your message shortly.</p>
          </motion.div>
        )}
      </div>
      {/* Add globe */}
      <div className="absolute inset-0 pointer-events-none">
        <GlobeDemo />
      </div>
      {/* Optional floating orb or planet */}
      <motion.div
        className="absolute bottom-10 right-10 z-0 w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 opacity-50 blur-2xl animate-pulse"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}
