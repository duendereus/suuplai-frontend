'use client'

import { useState } from 'react'
import { NavRegistro } from '@/components/registro/NavRegistro'
import { HeroStripTienda } from '@/components/registro/HeroStripTienda'
import { FormTienda } from '@/components/registro/FormTienda'
import { InfoSideTienda } from '@/components/registro/InfoSideTienda'
import { CalendarEmbed } from '@/components/registro/CalendarEmbed'

export default function RegistroTiendaPage() {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#F7F5F0' }}>
      <NavRegistro tipo="tienda" />
      <HeroStripTienda />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          {/* Sticky form */}
          <div className="lg:sticky lg:top-6">
            <FormTienda onSuccess={() => setShowCalendar(true)} />
          </div>
          {/* Info side */}
          <InfoSideTienda />
        </div>
      </main>

      {showCalendar && <CalendarEmbed tipo="tienda" />}
    </div>
  )
}
