'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

type SlotStatus = 'active' | 'libre'

interface Slot {
  brand: string
  category: string
  color: string
  price: string
  priceNum: number
  status: SlotStatus
}

const SLOTS: Slot[] = [
  { brand: 'Bebidas frías', category: 'Hidratación · Sports', color: '#7FDBCA', price: '$800', priceNum: 800, status: 'active' },
  { brand: 'Snacks naturales', category: 'Alimentos · Healthy', color: '#FFB347', price: '$1,200', priceNum: 1200, status: 'active' },
  { brand: 'Cosmética natural', category: 'Cuidado personal', color: '#C9A8E8', price: '$800', priceNum: 800, status: 'active' },
  { brand: 'Slot libre', category: 'Disponible para tu marca', color: 'transparent', price: '$800', priceNum: 800, status: 'libre' },
]

const MONTHLY_TOTAL = SLOTS.filter((s) => s.status === 'active').reduce((sum, s) => sum + s.priceNum, 0)
const ANNUAL_TOTAL = MONTHLY_TOTAL * 12

const fmx = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

const statCards = [
  {
    label: 'INGRESO MENSUAL',
    value: fmx(MONTHLY_TOTAL),
    note: 'MXN · tarifa fija mensual',
    accent: '#E8FF47' as const,
  },
  {
    label: 'INVERSIÓN PROPIA',
    value: '$0',
    note: 'Sin inventario, sin riesgo',
    accent: '#F0EFE8' as const,
  },
  {
    label: 'PROYECTADO ANUAL',
    value: fmx(ANNUAL_TOTAL),
    note: 'MXN · estimación referencial',
    accent: '#F0EFE8' as const,
  },
]

export function SlotVisual() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: '#0A0A0F', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.span
            variants={fadeUp}
            className="font-dm font-medium block mb-3"
            style={{ color: '#E8FF47', fontSize: '12px', letterSpacing: '2px' }}
          >
            EL PRODUCTO
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-syne font-extrabold text-suu-text"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1.5px', lineHeight: 1.1 }}
          >
            Así se ve un slot
            <br />
            <span style={{ color: '#E8FF47' }}>en el anaquel.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-dm text-suu-muted mt-4 max-w-xl"
            style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.6 }}
          >
            Tu espacio libre dividido en slots. Cada slot es un acuerdo directo con una marca.
            Tú decides cuántos, con quién y a qué precio.
          </motion.p>
        </motion.div>

        {/* Shelf visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-2 pl-1">
            <span className="font-dm text-suu-muted" style={{ fontSize: '11px', letterSpacing: '2px' }}>
              ANAQUEL EJEMPLO · 4 SLOTS · 3M LINEALES
            </span>
          </div>

          {/* Shelf card */}
          <div
            className="rounded-card overflow-hidden mb-6"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#13131A' }}
          >
            {/* Top rail */}
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)' }} />

            {/* Slots grid */}
            <div className="grid grid-cols-2 md:grid-cols-4">
              {SLOTS.map((slot, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative flex flex-col gap-3 p-5"
                  style={{
                    borderRight: i < SLOTS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    minHeight: '152px',
                    opacity: slot.status === 'libre' ? 0.45 : 1,
                  }}
                >
                  {/* Slot number */}
                  <span
                    className="absolute top-3 right-4 font-syne font-extrabold"
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.12)',
                      fontFamily: 'var(--font-space-mono)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Active status dot */}
                  {slot.status === 'active' && (
                    <div
                      className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full"
                      style={{ background: '#4CAF50' }}
                    />
                  )}

                  {/* Color bar */}
                  <div className="mt-3">
                    <div
                      className="rounded-sm"
                      style={{
                        width: '6px',
                        height: '36px',
                        background: slot.status === 'libre' ? 'rgba(255,255,255,0.08)' : slot.color,
                        border: slot.status === 'libre' ? '1px dashed rgba(255,255,255,0.15)' : 'none',
                      }}
                    />
                  </div>

                  {/* Brand info */}
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className="font-syne font-bold text-suu-text" style={{ fontSize: '13px' }}>
                      {slot.brand}
                    </span>
                    <span className="font-dm text-suu-muted" style={{ fontSize: '11px', lineHeight: 1.4 }}>
                      {slot.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-syne font-bold"
                      style={{
                        fontSize: '14px',
                        color: slot.status === 'libre' ? 'rgba(255,255,255,0.25)' : '#E8FF47',
                        fontFamily: 'var(--font-space-mono)',
                      }}
                    >
                      {slot.price}
                    </span>
                    <span className="font-dm text-suu-muted" style={{ fontSize: '10px' }}>
                      /mes
                    </span>
                  </div>

                  {/* Libre overlay */}
                  {slot.status === 'libre' && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ pointerEvents: 'none' }}
                    >
                      <span
                        className="font-dm font-medium"
                        style={{
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.25)',
                          letterSpacing: '2px',
                          background: '#13131A',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px dashed rgba(255,255,255,0.1)',
                        }}
                      >
                        DISPONIBLE
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Shelf footer */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4CAF50' }} />
                <span className="font-dm text-suu-muted" style={{ fontSize: '12px' }}>
                  3 de 4 slots activos
                </span>
              </div>
              <span
                className="font-syne font-bold"
                style={{ fontSize: '15px', color: '#E8FF47', fontFamily: 'var(--font-space-mono)' }}
              >
                {fmx(MONTHLY_TOTAL)} / mes
              </span>
            </div>
          </div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            {statCards.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="flex flex-col gap-2 p-5 rounded-card"
                style={{
                  background: stat.accent === '#E8FF47' ? 'rgba(232,255,71,0.04)' : '#13131A',
                  border: `1px solid ${stat.accent === '#E8FF47' ? 'rgba(232,255,71,0.12)' : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <span
                  className="font-dm text-suu-muted"
                  style={{ fontSize: '11px', letterSpacing: '1px' }}
                >
                  {stat.label}
                </span>
                <span
                  className="font-syne font-extrabold"
                  style={{
                    fontSize: '28px',
                    color: stat.accent,
                    fontFamily: 'var(--font-space-mono)',
                  }}
                >
                  {stat.value}
                </span>
                <span className="font-dm text-suu-muted" style={{ fontSize: '12px' }}>
                  {stat.note}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <Link
              href="#calculadora"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-pill font-syne font-bold text-sm text-black transition-all duration-200"
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
              Calcular con tus números →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
