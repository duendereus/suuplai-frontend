'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Constants ────────────────────────────────────────────────────────────────

const ROTATION_SPEED = 3500

const STATS = [
  { number: '$8,200', unit: 'MXN/mes', label: 'ingreso promedio por tienda activa en CDMX',           color: '#E8FF47' },
  { number: '4',      unit: 'marcas',  label: 'máximo por espacio — tu tienda no se satura',          color: '#E8FF47' },
  { number: 'Días',   unit: '',        label: 'para activar tu primer slot. No semanas, no meses',     color: '#E8FF47' },
  { number: '52%',    unit: '',        label: 'del consumo nacional pasa por tiendas como la tuya',    color: '#F0EFE8' },
  { number: '20',     unit: 'tiendas', label: 'ya activas en CDMX — espacio real, ingreso real',       color: '#E8FF47' },
  { number: '0',      unit: 'inv.',    label: 'no compras nada, no arriesgas nada — puro ingreso',     color: '#F0EFE8' },
  { number: '$3K',    unit: 'MXN/mes', label: 'por slot vs $50,000 que cobra una cadena grande',       color: '#FF6B35' },
  { number: '94%',    unit: 'menos',   label: 'costo de entrada vs Walmart, Liverpool o Chedraui',     color: '#FF6B35' },
  { number: '48h',    unit: '',        label: 'para confirmar si hay fit entre tu marca y una tienda', color: '#FF6B35' },
  { number: '4',      unit: 'marcas',  label: 'por espacio — tu producto se ve, no compite con cientos', color: '#FF6B35' },
  { number: '3',      unit: 'semanas', label: 'para saber en qué colonia rota mejor tu producto',      color: '#F0EFE8' },
  { number: '1.2M',   unit: 'tiendas', label: 'en México sin acceso a herramientas — tú llegas primero', color: '#F0EFE8' },
]

// 4 cards show different stats simultaneously, offset by 3 positions each
const CARD_OFFSETS = [0, 3, 6, 9]

// ─── Framer Motion variants ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

const statVariants = {
  enter:  { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

// ─── StatCard — defined outside Hero to avoid remount on every render ─────────

interface StatCardProps {
  stat: typeof STATS[0]
  tick: number
  cardIndex: number
}

function StatCard({ stat, tick, cardIndex }: StatCardProps) {
  const { color, number, unit, label } = stat

  // Border opacity: neutral stats get a dimmer border
  const borderHex = color === '#F0EFE8' ? 'rgba(240,239,232,0.15)' : `${color}30`

  return (
    <div
      className="relative flex flex-col rounded-card overflow-hidden"
      style={{
        background: '#13131A',
        border: `1px solid ${borderHex}`,
        minHeight: '148px',
        transition: 'border-color 0.4s ease',
      }}
    >
      {/* Progress bar — key changes each tick, restarting the CSS animation */}
      <div
        key={`pb-${tick}`}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          background: color,
          animation: `statProgress ${ROTATION_SPEED}ms linear forwards`,
          opacity: cardIndex === 0 ? 0.8 : 0.4,
        }}
      />

      {/* Animated content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`sc-${tick}-${cardIndex}`}
          variants={statVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="flex flex-col gap-2 p-6"
        >
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: 'clamp(24px, 3.2vw, 36px)',
                fontWeight: 700,
                color,
                lineHeight: 1,
              }}
            >
              {number}
            </span>
            {unit && (
              <span
                className="font-dm"
                style={{ fontSize: '11px', color, fontWeight: 400, opacity: 0.75 }}
              >
                {unit}
              </span>
            )}
          </div>
          <span
            className="font-dm"
            style={{
              fontSize: '12px',
              color: 'rgba(240,239,232,0.55)',
              lineHeight: 1.5,
              fontWeight: 300,
            }}
          >
            {label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const [tick, setTick]       = useState(0)
  const timerRef              = useRef<ReturnType<typeof setInterval>  | null>(null)
  const timeoutRef            = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setTick((t) => t + 1), ROTATION_SPEED)
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => {
      if (timerRef.current)   clearInterval(timerRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [startAutoplay])

  const activeDotIndex = tick % STATS.length
  const activeColor    = STATS[activeDotIndex].color

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
      style={{ background: '#0A0A0F' }}
    >
      {/* Radial glow backdrop — dual yellow + orange halos */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 50%, rgba(232,255,71,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 50%, rgba(255,107,53,0.07) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-pill mb-8"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <span className="w-2 h-2 rounded-full hero-badge-dot" />
          <span className="font-dm text-sm" style={{ color: 'rgba(240,239,232,0.7)' }}>
            Únete a la waitlist — acceso anticipado en CDMX
          </span>
        </motion.div>

        {/* H1 — "All of the Lights" color animation */}
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-syne font-extrabold mb-6"
          style={{
            fontSize: 'clamp(44px, 7vw, 88px)',
            letterSpacing: '-2px',
            lineHeight: 1.0,
          }}
        >
          <span className="hero-word-1">El anaquel</span>
          <br />
          <span className="hero-word-2">ya no es</span>{' '}
          <span className="hero-word-3">de los grandes.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-dm mb-10 max-w-lg"
          style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.6, color: 'rgba(240,239,232,0.65)' }}
        >
          Conectamos tiendas con espacio disponible y marcas que necesitan estar en el punto de
          venta. Sin slotting fees millonarios, sin meses de espera.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/registro-tienda"
            className="inline-flex items-center px-8 py-4 rounded-pill font-syne font-bold text-black text-base transition-all duration-200"
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
            Tengo una tienda
          </Link>
          <Link
            href="/registro-productor"
            className="inline-flex items-center px-8 py-4 rounded-pill font-syne font-bold text-base transition-all duration-200"
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
            Tengo una marca
          </Link>
        </motion.div>

        {/* Stats carousel — 4 cards rotating in parallel with 3-position offsets */}
        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full"
        >
          {CARD_OFFSETS.map((offset, cardIndex) => (
            <StatCard
              key={cardIndex}
              stat={STATS[(tick + offset) % STATS.length]}
              tick={tick}
              cardIndex={cardIndex}
            />
          ))}
        </motion.div>

        {/* Dots navigation — 12 dots, one per stat in the main card (offset 0) */}
        <motion.div
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex gap-1.5 flex-wrap justify-center mt-5"
          style={{ maxWidth: '220px' }}
        >
          {STATS.map((_, i) => {
            const isActive = i === activeDotIndex
            return (
              <button
                key={i}
                aria-label={`Estadística ${i + 1}`}
                onClick={() => {
                  if (timerRef.current)   clearInterval(timerRef.current)
                  if (timeoutRef.current) clearTimeout(timeoutRef.current)
                  setTick(i)
                  timeoutRef.current = setTimeout(startAutoplay, 6000)
                }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isActive ? activeColor : 'rgba(240,239,232,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transform: isActive ? 'scale(1.4)' : 'scale(1)',
                  transition: 'background 0.3s ease, transform 0.2s ease',
                }}
              />
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
