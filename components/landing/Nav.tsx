'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

const navLinks = [
  { label: 'Para Tiendas', href: '#tiendas' },
  { label: 'Para Productores', href: '#productores' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Cómo funciona', href: '#como-funciona' },
]

const uneteOptions = [
  {
    label: 'Para Tiendas',
    desc: 'Monetiza tu espacio en anaquel',
    href: '/registro-tienda',
    color: '#E8FF47',
  },
  {
    label: 'Para Marcas',
    desc: 'Entra al retail físico sin barreras',
    href: '/registro-productor',
    color: '#FF6B35',
  },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'rgba(10,10,15,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo size="md" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-suu-muted hover:text-suu-text transition-colors duration-200 font-dm text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Únete dropdown + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop Únete dropdown */}
          <div ref={dropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-pill font-syne font-bold text-sm transition-all duration-200"
              style={{ background: '#F0EFE8', color: '#0A0A0F' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = ''
              }}
            >
              Únete
              <ChevronDown
                size={14}
                style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-card overflow-hidden"
                  style={{
                    background: '#13131A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  {uneteOptions.map((opt, i) => (
                    <Link
                      key={opt.label}
                      href={opt.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex flex-col gap-0.5 px-4 py-3.5 transition-colors duration-150"
                      style={{
                        borderBottom: i < uneteOptions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = ''
                      }}
                    >
                      <span className="font-syne font-bold text-sm" style={{ color: opt.color }}>
                        {opt.label}
                      </span>
                      <span className="font-dm text-suu-muted" style={{ fontSize: '12px' }}>
                        {opt.desc}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-suu-text p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10,10,15,0.98)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-suu-text font-dm text-base py-1 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-2">
                {uneteOptions.map((opt) => (
                  <Link
                    key={opt.label}
                    href={opt.href}
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-pill font-syne font-bold text-sm text-black"
                    style={{ background: opt.color }}
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
