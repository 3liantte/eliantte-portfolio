'use client';

import { motion } from 'framer-motion';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiHtml5 } from 'react-icons/si';
import { MdFactory, MdLocalHospital, MdBusinessCenter } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

const industryStyles = {
  personal: {
    color: 'bg-purple-100 text-purple-700',
    icon: <MdBusinessCenter className="w-4 h-4" />,
  },
  manufacturing: {
    color: 'bg-blue-100 text-blue-700',
    icon: <MdFactory className="w-4 h-4" />,
  },
  healthcare: {
    color: 'bg-green-100 text-green-700',
    icon: <MdLocalHospital className="w-4 h-4" />,
  },
};

const projects = [
  {
    title: "3D Parallax Portfolio",
    description: "A creative animated portfolio built with React Three Fiber.",
    icon: <SiReact className="h-6 w-6 text-blue-500" />,
    link: "https://your-portfolio-link.com",
    sourceCode: "https://github.com/koketso/galaxy-portfolio",
    demo: "https://koketso.dev",
    tags: ["React", "Three.js", "Framer Motion"],
    industry: { label: "Personal Branding", category: "personal" },
  },
  {
    title: "Helm Textile Mills",
    description: "Vue-based platform for tracking production and logistics.",
    icon: <SiNextdotjs className="h-6 w-6 text-white" />,
    link: null,
    externalLink: "https://helmtex.co.za",
    clientLogo: "/logos/helmlogo.png",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    industry: { label: "Textile Manufacturing", category: "manufacturing" },
  },
  {
    title: "Helm Textile Mills",
    description: "Vue-based platform for tracking production and logistics.",
    icon: <SiNextdotjs className="h-6 w-6 text-white" />,
    link: null,
    externalLink: "https://helmtex.co.za",
    clientLogo: "/logos/helmlogo.png",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    industry: { label: "Textile Manufacturing", category: "manufacturing" },
  },
  {
    title: "3D Parallax Portfolio",
    description: "A creative animated portfolio built with React Three Fiber.",
    icon: <SiReact className="h-6 w-6 text-blue-500" />,
    link: "https://your-portfolio-link.com",
    sourceCode: "https://github.com/koketso/galaxy-portfolio",
    demo: "https://koketso.dev",
    tags: ["React", "Three.js", "Framer Motion"],
    industry: { label: "Personal Branding", category: "personal" },
  },

  {
    title: "3D Parallax Portfolio",
    description: "A creative animated portfolio built with React Three Fiber.",
    icon: <SiReact className="h-6 w-6 text-blue-500" />,
    link: "https://your-portfolio-link.com",
    sourceCode: "https://github.com/koketso/galaxy-portfolio",
    demo: "https://koketso.dev",
    tags: ["React", "Three.js", "Framer Motion"],
    industry: { label: "Personal Branding", category: "personal" },
  },
  {
    title: "Helm Textile Mills",
    description: "Vue-based platform for tracking production and logistics.",
    icon: <SiNextdotjs className="h-6 w-6 text-white" />,
    link: null,
    externalLink: "https://helmtex.co.za",
    clientLogo: "/logos/helmlogo.png",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    industry: { label: "Textile Manufacturing", category: "manufacturing" },
  },

  
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const colors = ["white", "blue", "purple"];
    const generated = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setStars(generated);
  }, []);

  return (
    <section id="projects" className="relative min-h-screen bg-black text-white px-8 py-20 overflow-hidden">
      {/* 🌌 Twinkling Star Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: "2px",
              height: "2px",
              backgroundColor: star.color,
              animation: "twinkle 3s infinite",
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>

      {/* ✨ Glow Overlay */}
      <div className="absolute bg-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative group p-6 bg-white/5 shadow-lg rounded-xl border border-white/10 backdrop-blur cursor-pointer transition-all"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative z-20 flex items-center gap-4">
                    <div className="p-2 rounded-full bg-gray-800 border">{project.icon}</div>
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                  </div>

                  <p className="text-md mt-3 text-gray-300">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-gray-700 text-gray-200 px-2 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {!project.link && (
                    <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
                      <FiLock className="h-4 w-4" />
                      Private Repository
                    </div>
                  )}
                  {project.link && (
                    <>
                      <div className="mt-4 text-xs text-green-500 flex items-center gap-1">
                        <FiUnlock className="h-4 w-4" />
                        Open Source
                      </div>
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-900 text-[10px] sm:text-xs font-semibold shadow-lg animate-glow">
                        <FaGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Open Source</span>
                      </div>
                    </>
                  )}
                </motion.div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className="flex flex-col items-center">
                  {project.clientLogo && (
                    <img
                      src={project.clientLogo}
                      alt={`${project.title} logo`}
                      className="h-28 w-28"
                    />
                  )}

                  <DialogTitle className="text-xl font-bold text-center mb-2">
                    {project.title}
                  </DialogTitle>

                  {project.industry && (
                    <div className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full font-medium mb-4
                      ${industryStyles[project.industry.category]?.color || "bg-gray-200 text-gray-700"}`}>
                      {industryStyles[project.industry.category]?.icon}
                      {project.industry.label}
                    </div>
                  )}

                  {project.link ? (
                    <>
                      <DialogDescription className="text-gray-500 text-center mb-4">
                        This project is public. You can view the live demo or check out the source code.
                      </DialogDescription>

                      <div className="flex gap-4 flex-wrap justify-center">
                        <TooltipProvider>
                          {project.sourceCode && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={project.sourceCode}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
                                >
                                  View Source Code
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View the GitHub repository</p>
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {project.demo && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                >
                                  Visit Website
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Visit the live deployed site</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TooltipProvider>
                      </div>
                    </>
                  ) : (
                    <>
                      <DialogDescription className="text-gray-500 text-center">
                        This project is private and not publicly accessible.<br />
                        You can contact me for details or visit the client&apos;s website below.
                      </DialogDescription>

                      {project.externalLink && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={project.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-6 px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
                              >
                                Visit Client Website
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Opens the client&pos;s live site in a new tab</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </>
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
