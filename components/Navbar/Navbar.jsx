"use client";
import React, { useEffect, useState } from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { FolderOpen, FolderOpenDot, House, MessageCircle, MessageCircleDashed, MessageCircleMore, User } from "lucide-react";

const SECTIONS = ["home", "about", "projects", "contact"];

export function FloatingNavDemo() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      let closest = "home";
      let minDistance = Number.POSITIVE_INFINITY;

      // biome-ignore lint/complexity/noForEach: <explanation>
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = Math.abs(rect.top);
          if (offset < minDistance && rect.top < window.innerHeight) {
            minDistance = offset;
            closest = id;
          }
        }
      });

      setActiveSection(closest);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <House className="h-4 w-4" />,
      active: activeSection === "home",
    },
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4" />,
      active: activeSection === "about",
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <FolderOpenDot className="h-4 w-4" />,
      active: activeSection === "projects",
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <MessageCircleMore className="h-4 w-4" />,
      active: activeSection === "contact",
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
