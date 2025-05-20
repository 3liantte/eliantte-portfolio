'use client';

import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi';
import { SiReact, SiThreejs, SiVuedotjs, SiNextdotjs } from 'react-icons/si';
import { MdFactory, MdLocalHospital, MdBusinessCenter } from 'react-icons/md';

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
    title: '3D Parallax Portfolio',
    description: 'A creative animated portfolio built with React Three Fiber.',
    icon: <SiReact className="h-6 w-6 text-blue-500" />,
    link: 'https://your-portfolio-link.com',
    tags: ['React', 'Three.js', 'Framer Motion'],
    industry: { label: 'Personal Branding', category: 'personal' },
  },
  {
    title: 'Helm Textile Mills',
    description: 'Vue-based platform for tracking production and logistics.',
    icon: <SiVuedotjs className="h-6 w-6 text-green-500" />,
    link: null,
    externalLink: 'https://helmtex.co.za',
    clientLogo: '/logos/helmlogo.png',
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    industry: { label: 'Textile Manufacturing', category: 'manufacturing' },
  },
];

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

import { useState } from 'react';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="min-h-screen bg-gray-100 text-black px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, index) =>
            project.link ? (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="relative group p-6 bg-white shadow-lg rounded-xl border overflow-hidden transition-all"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none z-10">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-glitch" />
                </div>

                <div className="relative z-20 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-gray-100 border">{project.icon}</div>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                </div>

                <p className="text-md mt-3 relative z-20 text-gray-700">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-sm relative z-20">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ) : (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="relative group p-6 bg-white shadow-lg rounded-xl border overflow-hidden opacity-90 cursor-pointer transition-all"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative z-20 flex items-center gap-4">
                      <div className="p-2 rounded-full bg-gray-100 border">{project.icon}</div>
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                    </div>

                    <p className="text-md mt-3 relative z-20 text-gray-700">{project.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2 text-sm relative z-20">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-xs text-gray-500 flex items-center gap-1 relative z-20">
                      <FiLock className="h-4 w-4" />
                      Private Repository
                    </div>
                  </motion.div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader className="flex flex-col items-center">
                    {/* ✅ Client Logo */}
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
                    
                    {/* ✅ Industry Tag */}
                    {project.industry && (
                      <div className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full font-medium mb-4
                        ${industryStyles[project.industry.category]?.color || 'bg-gray-200 text-gray-700'}
                      `}>
                        {industryStyles[project.industry.category]?.icon}
                        {project.industry.label}
                      </div>
                    )}

                    {/* ✅ Project Description */}       
                    <DialogDescription className="text-gray-500 text-center">
                      This project is private and not publicly accessible.<br />
                      You can contact me for details or visit the client&apos;s website below.
                    </DialogDescription>

                    {/* ✅ Tooltip + External Link */}
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
                            <p>Opens the client's live site in a new tab</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
