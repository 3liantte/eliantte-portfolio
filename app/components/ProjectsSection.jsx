'use client';
import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi';
import { SiReact, SiThreejs, SiVuedotjs } from 'react-icons/si';

const projects = [
  {
    title: '3D Parallax Portfolio',
    description: 'A creative animated portfolio built with React Three Fiber.',
    icon: <SiReact className="h-6 w-6 text-blue-500" />,
    link: 'https://your-portfolio-link.com',
    tags: ['React', 'Three.js', 'Framer Motion'],
  },
  {
    title: 'Textile Inventory System',
    description: 'Vue-based platform for tracking production and logistics.',
    icon: <SiVuedotjs className="h-6 w-6 text-green-500" />,
    link: null, // Now treated as private
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
  },
];

export default function ProjectsSection() {
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
                {/* Glitch Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none z-10">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-glitch" />
                </div>

                <div className="relative z-20 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-gray-100 border">{project.icon}</div>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                </div>

                <p className="text-md mt-3 relative z-20 text-gray-700">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-sm relative z-20">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ) : (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="relative group p-6 bg-white shadow-lg rounded-xl border overflow-hidden opacity-80 cursor-not-allowed transition-all"
              >
                <div className="relative z-20 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-gray-100 border">{project.icon}</div>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                </div>

                <p className="text-md mt-3 relative z-20 text-gray-700">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-sm relative z-20">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-xs text-gray-500 flex items-center gap-1 relative z-20">
                  <FiLock className="h-4 w-4" />
                  Private Repository
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
