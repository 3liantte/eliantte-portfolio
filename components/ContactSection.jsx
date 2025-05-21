'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GlobeDemo from "../components/GlobeDemo";
import { memo } from "react";
import { Label } from './ui/label';
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import confetti from 'canvas-confetti';
import { Button } from './ui/button';

const GlobeMemo = memo(GlobeDemo);

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const colors = ['white', 'blue', 'purple'];
    const generated = Array.from({ length: 60 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setStars(generated);
  }, []);

  return (
    <section id="contact" className="min-h-screen bg-black text-white px-6 py-24 relative overflow-hidden">
      <Toaster position="top-center" richColors closeButton />

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
              const form = e.target;
              setIsSending(true);

              fetch("https://formspree.io/f/mvgayjgd", {
                method: "POST",
                body: new FormData(form),
                headers: {
                  Accept: "application/json",
                },
              })
                .then((res) => {
                  setIsSending(false);
                  if (res.ok) {
                    setSent(true);
                    form.reset();
                    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    toast.success("Signal transmitted successfully!");
                  } else {
                    toast.error("Something went wrong. Please try again.");
                  }
                })
                .catch(() => {
                  setIsSending(false);
                  toast.error("Network error. Please try again.");
                });
            }}
            className="space-y-6"
          >
            <div>
              <Label className="block text-sm font-medium text-white">Name</Label>
              <input
                required
                name="name"
                type="text"
                className="w-full mt-1 bg-transparent border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-white">Email</Label>
              <input
                required
                name="email"
                type="email"
                className="w-full mt-1 bg-transparent border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-white">Message</Label>
              <textarea
                required
                name="message"
                rows={4}
                className="w-full mt-1 bg-transparent border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSending}
              className={`bg-cyan-500 text-black font-semibold px-6 py-2 rounded transition ${
                isSending ? 'opacity-60 cursor-not-allowed' : 'hover:bg-cyan-400'
              }`}
            >
              {isSending ? "Transmitting..." : "Transmit Signal"}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-green-400 font-mono text-lg"
          >
            <p>&gt;&gt; Signal transmitted successfully.</p>
            <p className="text-sm text-gray-400 mt-2 mb-6">Koketso will receive your message shortly.</p>
            <Button
              onClick={() => setSent(false)}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded font-semibold transition"
            >
              Send Another Message
            </Button>
          </motion.div>
        )}

        {/* Social Icons */}
        <div className="mt-10 flex justify-center gap-6 text-2xl text-white">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
            <FaGithub />
          </a>
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
            <FaTwitter />
          </a>
          <a href="mailto:koketso@example.com" className="hover:text-cyan-400 transition">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* ✨ Stars + Globe Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Stars */}
        <div className="absolute inset-0">
          {stars.map((star, index) => (
            <div
              key={index}
              className={`star ${star.color}`}
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.animationDelay,
              }}
            />
          ))}
        </div>

        {/* 3D Globe */}
        <GlobeMemo />
      </div>
    </section>
  );
}
