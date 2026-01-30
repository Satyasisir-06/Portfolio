'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/satyasisir-06' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/satyasisir' },
  { name: 'Twitter', href: 'https://twitter.com/satyasisir' },
  { name: 'Instagram', href: 'https://instagram.com/satyasisir' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#home" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="gradient-text">Satya</span>
                <span className="text-white"> Sisir</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              Passionate developer creating innovative digital experiences. 
              Building the future, one line of code at a time.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-accent-purple/50 transition-all duration-300 text-xs font-medium"
                >
                  {social.name.charAt(0)}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {navLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              Copyright &copy; {currentYear} Satya Sisir. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavClick('#home')}
          className="absolute right-6 md:right-12 lg:right-20 bottom-16 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-lg shadow-accent-purple/25"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  )
}
