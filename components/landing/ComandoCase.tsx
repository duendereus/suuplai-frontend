'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const metrics = [
  { number: '20', color: '#E8FF47', label: 'puntos de venta activos' },
  { number: '$164,000', color: '#FF6B35', label: 'MXN generados/mes proyectados' },
  { number: '4', color: '#F0EFE8', label: 'marcas por punto de venta' },
]

export function ComandoCase() {
  return (
    <section className="py-24 px-6" style={{ background: '#0A0A0F' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="rounded-card p-10 md:p-14"
          style={{
            background: '#13131A',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeftWidth: '4px',
            borderLeftColor: '#FF6B35',
            borderLeftStyle: 'solid',
          }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span
              className="inline-flex items-center px-4 py-1.5 rounded-pill font-dm font-medium"
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '1px solid #FF6B35',
                color: '#FF6B35',
                fontSize: '12px',
                letterSpacing: '2px',
              }}
            >
              OPERANDO HOY EN CDMX
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-syne font-extrabold text-suu-text mb-3"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1.5px' }}
          >
            20 puntos activos.
            <br />
            El modelo funciona.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-dm text-suu-muted mb-12"
            style={{ fontSize: '18px', fontWeight: 300 }}
          >
            Nuestro primer canal ancla ya está operando en CDMX. 4 marcas por punto,
            pago mensual automático, entrega directa sin CEDIS.
          </motion.p>

          {/* Metrics */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
          >
            {metrics.map((m) => (
              <motion.div key={m.label} variants={fadeUp} className="flex flex-col gap-1">
                <span
                  className="font-syne font-extrabold"
                  style={{
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    color: m.color,
                    fontFamily: 'var(--font-space-mono)',
                    letterSpacing: '-1px',
                  }}
                >
                  {m.number}
                </span>
                <span className="font-dm text-suu-muted" style={{ fontSize: '14px' }}>
                  {m.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="font-dm text-suu-text"
            style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.7, maxWidth: '640px' }}
          >
            Espacio en refrigerador y anaquel en puntos de venta con alto tráfico. Cada punto
            aloja máximo 4 marcas pagando{' '}
            <strong className="font-medium">$1,000 MXN/mes + 12% sobre ventas</strong>.
            El productor entrega directo, sin CEDIS, sin intermediarios.
          </motion.p>

          {/* Badge CDMX */}
          <motion.div variants={fadeUp} className="mt-8">
            <span
              className="inline-flex items-center px-4 py-2 rounded-pill font-dm text-sm"
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '1px solid #FF6B35',
                color: '#FF6B35',
              }}
            >
              📍 Canal ancla activo — CDMX
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
