'use client';

import { useEffect, useState } from 'react';

const rawMessages = [
  "Thanks for visiting my galaxy. ✨",
  "Exploring creativity one pixel at a time. 👨‍🚀",
  "May your ideas orbit far beyond the stars. 🪐",
  "Signal closed. Awaiting the next transmission. 📡",
  "Crafted with code and cosmic coffee. ☕🚀",
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Footer() {
  const [messages, setMessages] = useState([]);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [fade, setFade] = useState(true);
  const [stars, setStars] = useState([]);

  // Shuffle footer messages once on mount
  useEffect(() => {
    setMessages(shuffle(rawMessages));
  }, []);

  // Rotate message every 4s with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentMsg((prev) => (prev + 1) % rawMessages.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages]);

  // Generate stars only on client
  useEffect(() => {
    const colors = ['white', 'blue', 'purple'];
    const generated = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setStars(generated);
  }, []);

  return (
    <footer className="relative bg-black text-gray-400 px-6 py-10 border-t border-white/10 overflow-hidden">
      {/* 🌌 Star Particles */}
      <div className="absolute inset-0 z-0">
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

      {/* Text Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center text-sm space-y-2">
        <p className={`italic transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          {messages[currentMsg]}
        </p>
        <p className="text-gray-500">© {new Date().getFullYear()} Koketso. All rights reserved.</p>
      </div>
    </footer>
  );
}
