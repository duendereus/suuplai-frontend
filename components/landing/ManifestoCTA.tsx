'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export function ManifestoCTA() {
  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#0A0A0F' }}
    >
      {/* Radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 20% 60%, rgba(232,255,71,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 40%, rgba(255,107,53,0.06) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col items-center gap-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-syne font-extrabold text-suu-text"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              letterSpacing: '-2px',
              lineHeight: 1.05,
            }}
          >
            El anaquel ya no es
            <br />
            solo de los grandes.
            <br />
            <span style={{ color: '#FF6B35' }}>Es de quien llegue primero.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-dm text-suu-muted max-w-lg"
            style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.6 }}
          >
            Sé parte de los primeros{' '}
            <strong className="text-suu-text font-medium">100 espacios activos</strong> en CDMX.
            Hoy hay <strong className="text-suu-text font-medium">20</strong>. El cupo es limitado.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/registro-tienda"
              className="inline-flex items-center px-10 py-4 rounded-pill font-syne font-bold text-black text-base transition-all duration-200"
              style={{ background: '#E8FF47' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = ''
              }}
            >
              Quiero estar en los primeros 100
            </Link>
            <Link
              href="/registro-productor"
              className="inline-flex items-center px-10 py-4 rounded-pill font-syne font-bold text-base transition-all duration-200"
              style={{ border: '1px solid #FF6B35', color: '#FF6B35', background: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,107,53,0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = ''
              }}
            >
              Registrar mi marca →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
