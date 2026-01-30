'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const educationData = [
  {
    id: 1,
    period: '2022 - 2024',
    title: 'Intermediate (Class XII)',
    institution: 'Sri Venkateswara Junior College, Jangareddigudem',
    board: 'Board of Intermediate Education, Andhra Pradesh',
    stream: 'MPC (Mathematics, Physics, Chemistry)',
    result: 'A Grade',
    marks: '864 / 1000',
    subjects: ['Mathematics (A & B)', 'Physics', 'Chemistry', 'English', 'Sanskrit'],
    color: 'purple',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    id: 2,
    period: '2020 - 2022',
    title: 'Secondary School Certificate (SSC - Class X)',
    institution: 'Govt. High School, Koyyalagudem, West Godavari District',
    board: 'Board of Secondary Education, Andhra Pradesh',
    stream: null,
    result: 'First Division',
    marks: '410 / 600',
    subjects: ['Telugu - 74', 'Hindi - 61', 'English - 87', 'Mathematics - 64', 'General Science - 72', 'Social Studies - 52'],
    color: 'pink',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

const journeyData = [
  {
    year: '2024',
    title: 'Web Development Internship',
    description: 'Gained practical experience working on real-world projects and collaborating with senior developers.',
    icon: '💼',
  },
  {
    year: '2023 - Present',
    title: 'University Degree',
    description: 'Pursuing Bachelor\'s degree in Computer Science, diving deep into algorithms, data structures, and software engineering.',
    icon: '🎓',
  },
  {
    year: '2022 - 2024',
    title: 'Intermediate Education',
    description: 'Completed MPC stream with A Grade, building strong foundations in Mathematics and Science.',
    icon: '📚',
  },
]

export default function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent-pink bg-accent-pink/10 rounded-full border border-accent-pink/20">
            Education
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Academic </span>
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50">
            Building a strong foundation through quality education
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="group relative"
            >
              <div className="relative p-6 md:p-8 glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-500">
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-${edu.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-accent-${edu.color}/20 text-accent-${edu.color}`}>
                      {edu.icon}
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full bg-accent-${edu.color}/10 text-accent-${edu.color} border border-accent-${edu.color}/20`}>
                      {edu.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {edu.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    {edu.institution}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-white/50">
                      <span className="text-white/70">Board:</span> {edu.board}
                    </p>
                    {edu.stream && (
                      <p className="text-sm text-white/50">
                        <span className="text-white/70">Stream:</span> {edu.stream}
                      </p>
                    )}
                  </div>

                  {/* Result Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 border border-white/10">
                      <span className="text-xs text-white/60">Result</span>
                      <p className="text-lg font-bold gradient-text">{edu.result}</p>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-cyan/20 to-accent-blue/20 border border-white/10">
                      <span className="text-xs text-white/60">Marks</span>
                      <p className="text-lg font-bold text-white">{edu.marks}</p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Key Subjects</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-1 text-xs text-white/60 bg-white/5 rounded-md"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white text-center mb-12">
            My Journey
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-pink to-accent-cyan hidden md:block" />

            <div className="space-y-8 md:space-y-0">
              {journeyData.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                  className={`relative md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink -translate-x-1/2 hidden md:block">
                    <div className="absolute inset-1 rounded-full bg-dark-950" />
                  </div>

                  <div className="p-6 glass rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm font-medium text-accent-purple">{item.year}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-white/50">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
