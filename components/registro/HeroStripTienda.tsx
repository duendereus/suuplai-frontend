'use client'

import { motion } from 'framer-motion'

const ACCENT = '#E8FF47'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const stats = [
  { number: '$8,200', label: 'MXN promedio por sucursal al mes' },
  { number: '20', label: 'Sucursales activas ya en CDMX' },
  { number: '4', label: 'Marcas máximo por espacio' },
  { number: 'Días', label: 'Para activar tu primer slot' },
]

export function HeroStripTienda() {
  return (
    <section
      className="py-20 px-6"
      style={{
        background: '#0A0A0F',
        backgroundImage: `radial-gradient(ellipse 55% 45% at 65% 55%, rgba(232,255,71,0.05) 0%, transparent 70%)`,
        borderBottom: '1px solid rgba(240,239,232,0.06)',
      }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-5"
        >
          <motion.span
            variants={fadeUp}
            className="font-dm font-medium"
            style={{ fontSize: '11px', letterSpacing: '0.18em', color: ACCENT }}
          >
            PARA TIENDAS INDEPENDIENTES
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-syne font-extrabold"
            style={{
              fontSize: 'clamp(34px, 5vw, 56px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              color: '#F0EFE8',
            }}
          >
            Tu espacio libre.
            <br />
            Tu dinero extra.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-dm max-w-md"
            style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.65, color: 'rgba(240,239,232,0.65)' }}
          >
            Regístrate gratis y empieza a recibir propuestas de marcas curadas que quieren estar en
            tu tienda. Sin complicaciones, sin inventario, sin riesgo.
          </motion.p>

          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 font-dm"
              style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(240,239,232,0.5)', lineHeight: 1.6 }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
              Registro gratuito · sin compromiso · sin inventario
            </span>
          </motion.div>
        </motion.div>

        {/* Right column: stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col gap-2 p-6 rounded-card"
              style={{
                background: '#13131A',
                border: '1px solid rgba(232,255,71,0.1)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(232,255,71,0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232,255,71,0.1)' }}
            >
              <span
                className="font-syne font-extrabold"
                style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', color: ACCENT, lineHeight: 1 }}
              >
                {stat.number}
              </span>
              <span
                className="font-dm"
                style={{ fontSize: '12px', lineHeight: 1.45, color: 'rgba(240,239,232,0.5)', fontWeight: 300 }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
