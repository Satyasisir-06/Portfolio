'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const codingSkills = [
  { name: 'HTML/CSS', level: 90, color: 'from-orange-500 to-red-500' },
  { name: 'JavaScript', level: 75, color: 'from-yellow-400 to-orange-500' },
  { name: 'Python', level: 80, color: 'from-blue-400 to-blue-600' },
  { name: 'React/Next.js', level: 70, color: 'from-cyan-400 to-blue-500' },
  { name: 'TypeScript', level: 65, color: 'from-blue-500 to-indigo-600' },
  { name: 'Node.js', level: 60, color: 'from-green-400 to-green-600' },
]

const professionalSkills = [
  { name: 'Web Design', level: 95 },
  { name: 'Web Development', level: 85 },
  { name: 'UI/UX Design', level: 80 },
  { name: 'Problem Solving', level: 90 },
  { name: 'Graphic Design', level: 70 },
  { name: 'SEO Optimization', level: 60 },
]

const tools = [
  { name: 'VS Code', icon: '💻' },
  { name: 'Git/GitHub', icon: '🔧' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Tailwind CSS', icon: '🎯' },
  { name: 'Three.js', icon: '🌐' },
  { name: 'Docker', icon: '🐳' },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-pink/5 rounded-full blur-3xl -translate-y-1/2" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent-cyan bg-accent-cyan/10 rounded-full border border-accent-cyan/20">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Technical </span>
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50">
            Constantly evolving skillset with focus on modern web technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Coding Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-purple/20 text-accent-purple">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </span>
              Coding Skills
            </h3>
            <div className="space-y-6">
              {codingSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-white/80">{skill.name}</span>
                    <span className="text-sm text-white/50">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-pink/20 text-accent-pink">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Professional Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {professionalSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="relative p-4 glass rounded-xl group hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Circular Progress */}
                    <div className="relative w-16 h-16 mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-dark-700"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: '0 176' }}
                          animate={isInView ? { strokeDasharray: `${skill.level * 1.76} 176` } : { strokeDasharray: '0 176' }}
                          transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                        {skill.level}%
                      </span>
                    </div>
                    <span className="text-xs font-medium text-white/70">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.9 + i * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-3 glass rounded-full hover:bg-white/10 transition-colors cursor-default"
              >
                <span className="text-lg">{tool.icon}</span>
                <span className="text-sm font-medium text-white/80">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
