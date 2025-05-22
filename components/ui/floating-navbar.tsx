"use client";
import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({ navItems, className }: { navItems: any[]; className?: string }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] px-4 py-2 space-x-4 backdrop-blur-md rounded-full border border-white/10 shadow-lg bg-gradient-to-br from-purple-700/30 via-cyan-500/20 to-black/30",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={idx}
            href={navItem.link}
            onClick={(e) => handleSmoothScroll(e, navItem.link)}
            className={cn(
              "relative font-semibold px-4 py-1.5 rounded-full transition-all duration-200",
              navItem.active
                ? "bg-white text-black shadow-inner shadow-cyan-400/40"
                : "text-white/70 hover:text-white"
            )}
          >
            <div className="flex items-center gap-2">
              {navItem.icon}
              <span className="hidden sm:inline text-sm">{navItem.name}</span>
            </div>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
