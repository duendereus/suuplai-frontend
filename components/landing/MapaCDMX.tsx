'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Dynamic import — Leaflet requiere browser APIs, no SSR
const MapaLeaflet = dynamic(
  () => import('./MapaLeaflet').then((m) => ({ default: m.MapaLeaflet })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: 'clamp(280px, 50vw, 420px)',
          borderRadius: '12px',
          background: '#13131A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="font-dm text-suu-muted" style={{ fontSize: '14px' }}>
          Cargando mapa…
        </span>
      </div>
    ),
  }
)

const categoryFilters = ['Alimentos', 'Cosméticos', 'Wellness', 'Moda']
const zoneFilters = ['Roma/Condesa', 'Polanco', 'Coyoacán', 'Santa Fe', 'Norte', 'Sur']

export function MapaCDMX() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeZone, setActiveZone] = useState<string | null>(null)

  return (
    <section className="py-24 px-6" style={{ background: '#0A0A0F' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span
              className="font-dm font-medium block mb-3"
              style={{ color: '#7A7A8A', fontSize: '12px', letterSpacing: '2px' }}
            >
              DÓNDE ESTAMOS
            </span>
            <h2
              className="font-syne font-extrabold text-suu-text"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-1.5px' }}
            >
              Encuentra tiendas en tu zona
            </h2>
            <p className="font-dm text-suu-muted mt-2" style={{ fontSize: '16px', fontWeight: 300 }}>
              20 slots activos hoy. Condesa, Roma, Polanco, Coyoacán, Santa Fe, Narvarte, Doctores.
            </p>
          </div>
          <span
            className="inline-flex items-center shrink-0 gap-2 px-4 py-2 rounded-pill font-dm font-medium"
            style={{
              background: 'rgba(232,255,71,0.1)',
              border: '1px solid #E8FF47',
              color: '#E8FF47',
              fontSize: '13px',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: '#E8FF47' }} />
            20 slots activos en CDMX
          </span>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="flex flex-col gap-3 mb-6"
        >
          <div className="flex gap-2 flex-wrap items-center">
            <span className="font-dm text-suu-muted" style={{ fontSize: '12px' }}>Categoría:</span>
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className="px-3 py-1.5 rounded-pill font-dm text-sm transition-all duration-200"
                style={{
                  background: activeCategory === cat ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.05)',
                  border: activeCategory === cat ? '1px solid #FF6B35' : '1px solid rgba(255,255,255,0.07)',
                  color: activeCategory === cat ? '#FF6B35' : '#7A7A8A',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap items-center overflow-x-auto pb-1">
            <span className="font-dm text-suu-muted shrink-0" style={{ fontSize: '12px' }}>Zona:</span>
            {zoneFilters.map((zone) => (
              <button
                key={zone}
                onClick={() => setActiveZone(activeZone === zone ? null : zone)}
                className="px-3 py-1.5 rounded-pill font-dm text-sm transition-all duration-200 shrink-0"
                style={{
                  background: activeZone === zone ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.05)',
                  border: activeZone === zone ? '1px solid #FF6B35' : '1px solid rgba(255,255,255,0.07)',
                  color: activeZone === zone ? '#FF6B35' : '#7A7A8A',
                }}
              >
                {zone}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Leaflet Map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}
        >
          <MapaLeaflet activeZone={activeZone} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-8 flex justify-center"
        >
          <a
            href="/registro-productor"
            className="inline-flex items-center px-8 py-4 rounded-pill font-syne font-bold text-base transition-all duration-200"
            style={{ border: '1px solid #FF6B35', color: '#FF6B35', background: 'transparent' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,53,0.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            Quiero un espacio en estas zonas →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
