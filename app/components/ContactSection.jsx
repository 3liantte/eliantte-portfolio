'use client';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section className="min-h-screen bg-black text-white px-8 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-xl w-full"
      >
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <p className="mb-6">Have a cool project or want to connect? Drop me a message.</p>
        <a
          href="mailto:koketso@example.com"
          className="inline-block mt-4 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
        >
          Send Email
        </a>
      </motion.div>
    </section>
  );
}
