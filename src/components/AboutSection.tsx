'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { label: 'Years Coding', value: '3+' },
  { label: 'Projects Completed', value: '20+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Coffee Cups', value: '500+' },
]

const highlights = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code following best practices and modern standards.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Problem Solver',
    description: 'Approaching challenges with analytical thinking and creative solutions.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Learner',
    description: 'Quick to adapt and master new technologies and frameworks.',
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent-purple bg-accent-purple/10 rounded-full border border-accent-purple/20">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Crafting Digital </span>
              <span className="gradient-text">Experiences</span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/50">
              Turning ideas into reality through code and creativity
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Left - Image/Visual */}
            <motion.div
              variants={itemVariants}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Decorative rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-accent-purple/20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 rounded-full border border-accent-pink/20"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-8 rounded-full border border-accent-cyan/20"
                />

                {/* Center content - Profile Photo */}
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-accent-purple/20 via-accent-pink/10 to-accent-cyan/20 p-1.5 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center overflow-hidden">
                    <motion.img
                      src="/profile.jpg"
                      alt="Satya Sisir"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-10 rounded-full bg-gradient-to-br from-accent-purple/30 via-accent-pink/20 to-accent-cyan/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 right-0 px-4 py-2 glass rounded-xl"
                >
                  <span className="text-sm text-white/80">Web Dev</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-10 left-0 px-4 py-2 glass rounded-xl"
                >
                  <span className="text-sm text-white/80">Designer</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Text */}
            <motion.div
              variants={itemVariants}
              className="order-1 lg:order-2 space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Passionate Student & Developer
              </h3>
              <p className="text-white/60 leading-relaxed">
                I am a passionate student with a deep interest in web development, coding, and software development. I am always exploring new technologies and focusing on building interactive, dynamic websites.
              </p>
              <p className="text-white/60 leading-relaxed">
                My coding expertise spans various languages, including HTML, CSS, JavaScript, and Python. Dedicated to sharpening my problem-solving abilities, I actively work on personal projects to enhance my skills.
              </p>
              <p className="text-white/60 leading-relaxed">
                With the goal of becoming a full-stack developer, I am committed to creating innovative and efficient solutions that make a difference.
              </p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-3 gap-4 pt-6">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 glass rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 mb-3 flex items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple group-hover:bg-accent-purple/20 transition-colors">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center p-6 glass rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
