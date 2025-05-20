'use client';
import { motion } from 'framer-motion';
import { HoverEffect } from './ui/card-hover-effect';
import {
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiGit,
} from "react-icons/si";


const skills = [
  {
    title: "React",
    description: "The foundation of my frontend work — reusable, fast, and declarative.",
    icon: <SiReact className="h-6 w-6 text-cyan-400" />,
    link: "https://reactjs.org",
  },
  {
    title: "Next.js",
    description: "Production-ready framework I trust for speed, SEO, and scalability.",
    icon: <SiNextdotjs className="h-6 w-6 text-white" />,
    link: "https://nextjs.org",
  },
  {
    title: "Three.js",
    description: "Where I explore interactive 3D experiences on the web.",
    icon: <SiThreedotjs className="h-6 w-6 text-purple-300" />,
    link: "https://threejs.org",
  },
  {
    title: "Tailwind CSS",
    description: "I craft responsive, modern UIs — all without leaving my markup.",
    icon: <SiTailwindcss className="h-6 w-6 text-sky-400" />,
    link: "https://tailwindcss.com",
  },
  {
    title: "Framer Motion",
    description: "My go-to for smooth, expressive animations in React apps.",
    icon: <SiFramer className="h-6 w-6 text-pink-400" />,
    link: "https://www.framer.com/motion/",
  },
  {
    title: "JavaScript (ES6+)",
    description: "My native language for building everything from logic to layout.",
    icon: <SiJavascript className="h-6 w-6 text-yellow-400" />,
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "TypeScript",
    description: "I use it to add structure and confidence to large codebases.",
    icon: <SiTypescript className="h-6 w-6 text-blue-500" />,
    link: "https://www.typescriptlang.org",
  },
  {
    title: "Node.js",
    description: "I power backend logic and APIs with Node’s fast runtime.",
    icon: <SiNodedotjs className="h-6 w-6 text-green-500" />,
    link: "https://nodejs.org",
  },
  {
  title: "Git",
  description: "Version control I rely on daily to collaborate, commit, and ship with confidence.",
  icon: <SiGit className="h-6 w-6 text-orange-500" />,
  link: "https://git-scm.com",
  },
];

export default function AboutSection() {
  return (
<section
  id="about"
  className="min-h-screen bg-black text-white px-6 sm:px-12 py-24 flex flex-col items-center justify-center"
>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-3xl text-center mb-16"
  >
    <h2 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-[0_0_12px_#ffffff44]">
      About Me
    </h2>
    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
      I'm Koketso, a frontend developer passionate about creating visually stunning, interactive
      digital experiences. I focus on performance, polish, and user emotion through code.
    </p>
  </motion.div>

  {/* Skill Matrix */}
  <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <HoverEffect items={skills}/>
      </motion.div>
  </div>
</section>
  );
}
