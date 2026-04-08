'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCENT = '#E8FF47'
const ACCENT_TEXT = '#0A0A0F'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface FormData {
  nombre: string
  apellido: string
  email: string
  whatsapp: string
  nombreTienda: string
  tipoTienda: string
  colonia: string
  alcaldia: string
  metrosLineales: string
  trafico: string
  tipoEspacio: string
  categorias: string
  notas: string
  tipoPersona: string
  razonSocial: string
  rfc: string
  direccionFiscal: string
  aceptaComision: boolean
  aceptaTerminos: boolean
}

const INITIAL: FormData = {
  nombre: '', apellido: '', email: '', whatsapp: '',
  nombreTienda: '', tipoTienda: '', colonia: '', alcaldia: '',
  metrosLineales: '', trafico: '', tipoEspacio: '', categorias: '', notas: '',
  tipoPersona: '', razonSocial: '', rfc: '', direccionFiscal: '',
  aceptaComision: false, aceptaTerminos: false,
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-dm font-medium" style={{ fontSize: '13px', color: '#F0EFE8' }}>
        {label}{required && <span style={{ color: ACCENT }}> *</span>}
      </label>
      {children}
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <span
        className="font-dm font-medium shrink-0"
        style={{ fontSize: '10px', letterSpacing: '0.2em', color: ACCENT }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(232,255,71,0.2)' }} />
    </div>
  )
}

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = ['Datos', 'Pre-contrato', 'Verificar']
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const num = i + 1
        const done = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-syne font-bold shrink-0"
                style={{
                  fontSize: '12px',
                  background: done
                    ? 'rgba(232,255,71,0.15)'
                    : active
                    ? ACCENT
                    : 'transparent',
                  color: done
                    ? ACCENT
                    : active
                    ? ACCENT_TEXT
                    : 'rgba(240,239,232,0.3)',
                  border: done
                    ? '1.5px solid rgba(232,255,71,0.4)'
                    : active
                    ? 'none'
                    : '1.5px solid rgba(240,239,232,0.15)',
                  transition: 'all 0.3s ease',
                }}
              >
                {done ? '✓' : num}
              </div>
              <span
                className="font-dm font-medium"
                style={{
                  fontSize: '13px',
                  color: active ? '#F0EFE8' : done ? ACCENT : 'rgba(240,239,232,0.3)',
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-px mx-3"
                style={{
                  width: '36px',
                  background: step > num ? 'rgba(232,255,71,0.3)' : 'rgba(240,239,232,0.12)',
                  transition: 'background 0.3s ease',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF generation
// ─────────────────────────────────────────────────────────────────────────────

async function generatePDF(form: FormData): Promise<void> {
  const { default: jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })

  doc.setFillColor(10, 10, 15)
  doc.rect(0, 0, 210, 32, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(245, 197, 24)
  doc.text('suupl', 20, 21)
  const suuplW = doc.getTextWidth('suupl')
  doc.setTextColor(240, 239, 232)
  doc.text('ai', 20 + suuplW, 21)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(160, 160, 160)
  doc.text('Carta de Intención — Espacio en Anaquel', 190, 21, { align: 'right' })

  doc.setTextColor(100, 100, 100)
  doc.setFontSize(9)
  doc.text(`Ciudad de México, ${today}`, 20, 43)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(10, 10, 15)
  doc.text('CARTA DE INTENCIÓN DE PARTICIPACIÓN', 20, 54)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text('Programa de Monetización de Espacio en Anaquel — Suuplai', 20, 61)

  doc.setDrawColor(232, 255, 71)
  doc.setLineWidth(0.6)
  doc.line(20, 65, 190, 65)

  let y = 76

  function sectionTitle(text: string) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(10, 10, 15)
    doc.text(text, 20, y)
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(0.25)
    doc.line(20, y + 2, 190, y + 2)
    y += 11
  }

  function fieldRow(label: string, value: string) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(140, 140, 140)
    doc.text(label.toUpperCase(), 20, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(20, 20, 20)
    doc.text(value || '—', 72, y)
    y += 8
  }

  sectionTitle('I. DATOS DEL TITULAR')
  fieldRow('Nombre completo', `${form.nombre} ${form.apellido}`)
  fieldRow('Email', form.email)
  fieldRow('WhatsApp', form.whatsapp)
  fieldRow('Tipo de persona', form.tipoPersona)
  fieldRow('Razón social', form.razonSocial)
  fieldRow('RFC', form.rfc || '—')
  fieldRow('Dirección fiscal', form.direccionFiscal || '—')

  y += 3
  sectionTitle('II. DATOS DE LA TIENDA')
  fieldRow('Nombre de la tienda', form.nombreTienda)
  fieldRow('Tipo de negocio', form.tipoTienda)
  fieldRow('Colonia', form.colonia)
  fieldRow('Alcaldía / Ciudad', form.alcaldia)

  y += 3
  sectionTitle('III. ESPACIO DISPONIBLE')
  fieldRow('Metros lineales aprox.', form.metrosLineales || '—')
  fieldRow('Tráfico diario', form.trafico || '—')
  fieldRow('Tipo de espacio', form.tipoEspacio || '—')
  fieldRow('Categorías de interés', form.categorias || '—')

  y += 3
  sectionTitle('IV. TÉRMINOS DE PARTICIPACIÓN ACEPTADOS')

  doc.setFontSize(9)
  doc.setTextColor(60, 60, 60)
  const terms = [
    '1. Suuplai selecciona las marcas mediante un proceso de curaduría independiente.',
    '2. La tienda recibe un pago fijo mensual por el espacio rentado, más una comisión del 12% sobre ventas.',
    '3. La tienda no asume responsabilidad por el inventario exhibido por las marcas.',
    '4. Suuplai provee tablero de métricas mensual con ventas y rotación por producto.',
    '5. La relación puede darse por terminada con 15 días naturales de aviso previo.',
  ]
  terms.forEach((t) => {
    const lines = doc.splitTextToSize(t, 163)
    doc.text(lines, 20, y)
    y += lines.length * 5.5
  })

  y += 10
  if (y > 250) y = 250
  doc.setDrawColor(180, 180, 180)
  doc.setLineWidth(0.3)
  doc.line(20, y, 88, y)
  doc.line(112, y, 190, y)
  y += 6
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text(`${form.nombre} ${form.apellido}`, 20, y)
  doc.text('Representante Suuplai', 112, y)
  y += 4
  doc.text('Titular / Representante de la Tienda', 20, y)
  doc.text('AL GRANO DELI, S.A. DE C.V.', 112, y)

  doc.setFillColor(245, 245, 245)
  doc.rect(0, 285, 210, 12, 'F')
  doc.setFontSize(7)
  doc.setTextColor(160, 160, 160)
  doc.text('© 2026 AL GRANO DELI, S.A. DE C.V. · suuplai.com · hola@suuplai.com', 105, 292, { align: 'center' })

  const filename = `carta-intencion-suuplai-${form.nombreTienda.replace(/\s+/g, '-').toLowerCase()}.pdf`
  doc.save(filename)
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared input styles
// ─────────────────────────────────────────────────────────────────────────────

const inputBase: React.CSSProperties = {
  width: '100%',
  background: '#0A0A0F',
  border: '1px solid rgba(240,239,232,0.12)',
  borderRadius: '8px',
  padding: '12px 16px',
  fontFamily: 'var(--font-dm-sans)',
  fontWeight: 300,
  fontSize: '14px',
  color: '#F0EFE8',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

const placeholderColor = 'rgba(240,239,232,0.28)'

function onFocusYellow(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = ACCENT
}
function onBlurReset(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'rgba(240,239,232,0.12)'
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function FormTienda({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [otpGenerated, setOtpGenerated] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [otpError, setOtpError] = useState(false)

  const update =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const updateCheck =
    (key: 'aceptaTerminos' | 'aceptaComision') =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.checked }))

  const step1Valid =
    form.nombre && form.apellido && form.email && form.whatsapp &&
    form.nombreTienda && form.tipoTienda && form.colonia && form.alcaldia

  const step2Valid =
    form.tipoPersona && form.razonSocial && form.aceptaTerminos && form.aceptaComision

  const goToOTP = () => {
    const code = String(Math.floor(100000 + Math.random() * 900000))
    setOtpGenerated(code)
    setStep(3)
  }

  const resendOTP = () => {
    const code = String(Math.floor(100000 + Math.random() * 900000))
    setOtpGenerated(code)
    setOtpInput('')
    setOtpError(false)
  }

  const verifyOTP = () => {
    if (otpInput.trim() === otpGenerated) {
      setOtpError(false)
      submit()
    } else {
      setOtpError(true)
    }
  }

  const submit = () => {
    setLoading(true)
    void (async () => {
      const existing = JSON.parse(localStorage.getItem('suuplai_registros') || '[]') as unknown[]
      localStorage.setItem(
        'suuplai_registros',
        JSON.stringify([...existing, { tipo: 'tienda', timestamp: Date.now(), ...form }])
      )
      await generatePDF(form)
      setLoading(false)
      setSubmitted(true)
      onSuccess()
    })()
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center gap-6 py-20 text-center px-8 rounded-card"
          style={{ background: '#13131A', border: '1px solid rgba(240,239,232,0.08)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(232,255,71,0.12)', border: `1px solid rgba(232,255,71,0.3)` }}
          >
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
              <path d="M2 11L10 19L26 3" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2
            className="font-syne font-extrabold"
            style={{ fontSize: '28px', color: ACCENT, letterSpacing: '-0.5px' }}
          >
            ¡Listo, te registramos!
          </h2>
          <p
            className="font-dm max-w-sm"
            style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.6, color: 'rgba(240,239,232,0.7)' }}
          >
            Tu carta de intención se descargó automáticamente. Ahora agenda tu llamada de 20
            minutos aquí abajo.
          </p>
        </motion.div>
      ) : (
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
          className="p-8 md:p-12 rounded-card"
          style={{ background: '#13131A', border: '1px solid rgba(240,239,232,0.08)' }}
        >
          <StepIndicator step={step} />

          {/* ── STEP 1 ────────────────────────────────────────── */}
          {step === 1 && (
            <>
              <h2
                className="font-syne font-extrabold mb-2"
                style={{ fontSize: '26px', letterSpacing: '-0.5px', color: '#F0EFE8' }}
              >
                Registra tu tienda
              </h2>
              <p
                className="font-dm mb-8"
                style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(240,239,232,0.5)' }}
              >
                Cuéntanos sobre tu espacio. Sin contratos — solo queremos conocerte.
              </p>

              <div className="flex flex-col gap-5">
                <Divider label="DATOS DE CONTACTO" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombre" required>
                    <input type="text" value={form.nombre} onChange={update('nombre')} required
                      placeholder="Tu nombre" style={inputBase}
                      onFocus={onFocusYellow} onBlur={onBlurReset} />
                  </Field>
                  <Field label="Apellido" required>
                    <input type="text" value={form.apellido} onChange={update('apellido')} required
                      placeholder="Tu apellido" style={inputBase}
                      onFocus={onFocusYellow} onBlur={onBlurReset} />
                  </Field>
                </div>

                <Field label="Email" required>
                  <input type="email" value={form.email} onChange={update('email')} required
                    placeholder="tu@email.com" style={inputBase}
                    onFocus={onFocusYellow} onBlur={onBlurReset} />
                </Field>

                <Field label="WhatsApp" required>
                  <input type="tel" value={form.whatsapp} onChange={update('whatsapp')} required
                    placeholder="+52 55 1234 5678" style={inputBase}
                    onFocus={onFocusYellow} onBlur={onBlurReset} />
                </Field>

                <Divider label="TU TIENDA" />

                <Field label="Nombre de tu tienda" required>
                  <input type="text" value={form.nombreTienda} onChange={update('nombreTienda')} required
                    placeholder="El nombre que ven tus clientes" style={inputBase}
                    onFocus={onFocusYellow} onBlur={onBlurReset} />
                </Field>

                <Field label="Tipo de tienda" required>
                  <select value={form.tipoTienda} onChange={update('tipoTienda')} required
                    style={{ ...inputBase, appearance: 'none', cursor: 'pointer', color: form.tipoTienda ? '#F0EFE8' : placeholderColor }}
                    onFocus={onFocusYellow} onBlur={onBlurReset}>
                    <option value="" style={{ color: '#555' }}>Selecciona una opción</option>
                    <option style={{ color: '#111' }}>Gimnasio/estudio fitness</option>
                    <option style={{ color: '#111' }}>Café/cafetería</option>
                    <option style={{ color: '#111' }}>Tienda naturista/orgánica</option>
                    <option style={{ color: '#111' }}>Boutique de ropa</option>
                    <option style={{ color: '#111' }}>Librería/papelería</option>
                    <option style={{ color: '#111' }}>Farmacia independiente</option>
                    <option style={{ color: '#111' }}>Minisuper/abarrotes</option>
                    <option style={{ color: '#111' }}>Salón de belleza/spa</option>
                    <option style={{ color: '#111' }}>Coworking/oficina</option>
                    <option style={{ color: '#111' }}>Otro</option>
                  </select>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Colonia" required>
                    <input type="text" value={form.colonia} onChange={update('colonia')} required
                      placeholder="p. ej. Condesa" style={inputBase}
                      onFocus={onFocusYellow} onBlur={onBlurReset} />
                  </Field>
                  <Field label="Alcaldía / Ciudad" required>
                    <input type="text" value={form.alcaldia} onChange={update('alcaldia')} required
                      placeholder="p. ej. Cuauhtémoc" style={inputBase}
                      onFocus={onFocusYellow} onBlur={onBlurReset} />
                  </Field>
                </div>

                <Divider label="TU ESPACIO" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Metros lineales aprox.">
                    <select value={form.metrosLineales} onChange={update('metrosLineales')}
                      style={{ ...inputBase, appearance: 'none', cursor: 'pointer', color: form.metrosLineales ? '#F0EFE8' : placeholderColor }}
                      onFocus={onFocusYellow} onBlur={onBlurReset}>
                      <option value="" style={{ color: '#555' }}>Selecciona</option>
                      <option style={{ color: '#111' }}>Menos de 1m</option>
                      <option style={{ color: '#111' }}>1–2m</option>
                      <option style={{ color: '#111' }}>2–5m</option>
                      <option style={{ color: '#111' }}>5–10m</option>
                      <option style={{ color: '#111' }}>Más de 10m</option>
                    </select>
                  </Field>
                  <Field label="Tráfico diario aprox.">
                    <select value={form.trafico} onChange={update('trafico')}
                      style={{ ...inputBase, appearance: 'none', cursor: 'pointer', color: form.trafico ? '#F0EFE8' : placeholderColor }}
                      onFocus={onFocusYellow} onBlur={onBlurReset}>
                      <option value="" style={{ color: '#555' }}>Selecciona</option>
                      <option style={{ color: '#111' }}>Menos de 50</option>
                      <option style={{ color: '#111' }}>50–150</option>
                      <option style={{ color: '#111' }}>150–500</option>
                      <option style={{ color: '#111' }}>Más de 500</option>
                    </select>
                  </Field>
                </div>

                <Field label="Tipo de espacio">
                  <select value={form.tipoEspacio} onChange={update('tipoEspacio')}
                    style={{ ...inputBase, appearance: 'none', cursor: 'pointer', color: form.tipoEspacio ? '#F0EFE8' : placeholderColor }}
                    onFocus={onFocusYellow} onBlur={onBlurReset}>
                    <option value="" style={{ color: '#555' }}>Selecciona</option>
                    <option style={{ color: '#111' }}>Anaquel/estante</option>
                    <option style={{ color: '#111' }}>Refrigerador/refri</option>
                    <option style={{ color: '#111' }}>Mesa de exhibición</option>
                    <option style={{ color: '#111' }}>Espacio en mostrador</option>
                    <option style={{ color: '#111' }}>Varios tipos</option>
                  </select>
                </Field>

                <Field label="Categorías de interés">
                  <select value={form.categorias} onChange={update('categorias')}
                    style={{ ...inputBase, appearance: 'none', cursor: 'pointer', color: form.categorias ? '#F0EFE8' : placeholderColor }}
                    onFocus={onFocusYellow} onBlur={onBlurReset}>
                    <option value="" style={{ color: '#555' }}>Selecciona</option>
                    <option style={{ color: '#111' }}>Alimentos y bebidas</option>
                    <option style={{ color: '#111' }}>Cosméticos y skincare</option>
                    <option style={{ color: '#111' }}>Wellness y suplementos</option>
                    <option style={{ color: '#111' }}>Moda y accesorios</option>
                    <option style={{ color: '#111' }}>Cualquier categoría</option>
                  </select>
                </Field>

                <Field label="¿Algo que quieras contarnos?">
                  <textarea value={form.notas} onChange={update('notas')} rows={3}
                    placeholder="Tu cliente típico, qué esperas de Suuplai..."
                    style={{ ...inputBase, resize: 'vertical' }}
                    onFocus={onFocusYellow} onBlur={onBlurReset} />
                </Field>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!step1Valid}
                  className="w-full py-4 rounded-pill font-syne font-bold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  style={{ background: ACCENT, color: ACCENT_TEXT, border: 'none' }}
                  onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.opacity = '0.88' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                >
                  Continuar — Datos pre-contrato →
                </button>
              </div>
            </>
          )}

          {/* ── STEP 2 ────────────────────────────────────────── */}
          {step === 2 && (
            <>
              <h2
                className="font-syne font-extrabold mb-2"
                style={{ fontSize: '26px', letterSpacing: '-0.5px', color: '#F0EFE8' }}
              >
                Datos para tu carta de intención
              </h2>
              <p
                className="font-dm mb-8"
                style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(240,239,232,0.5)' }}
              >
                Generamos un PDF con estos datos para que tengas constancia del acuerdo.
              </p>

              <div className="flex flex-col gap-5">
                <Divider label="DATOS FISCALES" />

                <Field label="Tipo de persona" required>
                  <select value={form.tipoPersona} onChange={update('tipoPersona')} required
                    style={{ ...inputBase, appearance: 'none', cursor: 'pointer', color: form.tipoPersona ? '#F0EFE8' : placeholderColor }}
                    onFocus={onFocusYellow} onBlur={onBlurReset}>
                    <option value="" style={{ color: '#555' }}>Selecciona</option>
                    <option style={{ color: '#111' }}>Persona física</option>
                    <option style={{ color: '#111' }}>Persona moral</option>
                  </select>
                </Field>

                <Field label="Razón social / Nombre legal" required>
                  <input type="text" value={form.razonSocial} onChange={update('razonSocial')} required
                    placeholder="Como aparece en tu constancia de situación fiscal"
                    style={inputBase} onFocus={onFocusYellow} onBlur={onBlurReset} />
                </Field>

                <Field label="RFC">
                  <input type="text" value={form.rfc} onChange={update('rfc')}
                    placeholder="p. ej. ABCD890101XXX" maxLength={13}
                    style={inputBase} onFocus={onFocusYellow} onBlur={onBlurReset} />
                </Field>

                <Field label="Dirección fiscal">
                  <input type="text" value={form.direccionFiscal} onChange={update('direccionFiscal')}
                    placeholder="Calle, número, colonia, CP"
                    style={inputBase} onFocus={onFocusYellow} onBlur={onBlurReset} />
                </Field>

                <Divider label="TÉRMINOS DE PARTICIPACIÓN" />

                <div
                  className="rounded-card p-5 flex flex-col gap-3"
                  style={{ background: '#0A0A0F', border: '1px solid rgba(240,239,232,0.08)' }}
                >
                  <p className="font-dm font-medium" style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(240,239,232,0.4)' }}>
                    MODELO SUUPLAI — TIENDAS
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      'Suuplai cuida y selecciona las marcas que entran a tu tienda.',
                      'Recibes pago fijo mensual por espacio + 12% de comisión sobre ventas.',
                      'No manejas inventario — la marca repone directamente.',
                      'Tablero mensual de ventas y rotación por producto.',
                      'Puedes salir con 15 días de aviso. Sin permanencia forzada.',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: ACCENT }} />
                        <span className="font-dm" style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(240,239,232,0.65)', fontWeight: 300 }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.aceptaComision}
                    onChange={updateCheck('aceptaComision')}
                    className="mt-1 w-4 h-4 rounded shrink-0 cursor-pointer"
                    style={{ accentColor: ACCENT }}
                  />
                  <span className="font-dm" style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(240,239,232,0.65)', fontWeight: 300 }}>
                    Entiendo y acepto el modelo de 12% de comisión sobre ventas generadas en mi espacio.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.aceptaTerminos}
                    onChange={updateCheck('aceptaTerminos')}
                    className="mt-1 w-4 h-4 rounded shrink-0 cursor-pointer"
                    style={{ accentColor: ACCENT }}
                  />
                  <span className="font-dm" style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(240,239,232,0.65)', fontWeight: 300 }}>
                    He leído y acepto los{' '}
                    <a href="/terminos" target="_blank" style={{ color: ACCENT, textDecoration: 'underline' }}>
                      términos de uso
                    </a>{' '}
                    y el{' '}
                    <a href="/privacidad" target="_blank" style={{ color: ACCENT, textDecoration: 'underline' }}>
                      aviso de privacidad
                    </a>{' '}
                    de Suuplai.
                  </span>
                </label>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-pill font-syne font-bold text-base transition-all duration-200"
                    style={{ border: '1.5px solid rgba(240,239,232,0.15)', color: 'rgba(240,239,232,0.5)', background: 'transparent' }}
                  >
                    ← Atrás
                  </button>
                  <button
                    type="button"
                    onClick={goToOTP}
                    disabled={!step2Valid}
                    className="flex-1 py-4 rounded-pill font-syne font-bold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: ACCENT, color: ACCENT_TEXT, border: 'none' }}
                    onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.opacity = '0.88' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                  >
                    Verificar mi número →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3: OTP ───────────────────────────────────── */}
          {step === 3 && (
            <>
              <h2
                className="font-syne font-extrabold mb-2"
                style={{ fontSize: '26px', letterSpacing: '-0.5px', color: '#F0EFE8' }}
              >
                Verifica tu número
              </h2>
              <p
                className="font-dm mb-8"
                style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(240,239,232,0.5)' }}
              >
                Enviamos un código de 6 dígitos al WhatsApp{' '}
                <strong style={{ color: '#F0EFE8' }}>{form.whatsapp}</strong>.
              </p>

              <div
                className="rounded-card px-4 py-3 mb-6 flex items-center gap-3"
                style={{ background: 'rgba(232,255,71,0.07)', border: '1px solid rgba(232,255,71,0.2)' }}
              >
                <span style={{ fontSize: '18px' }}>📱</span>
                <span className="font-dm" style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(240,239,232,0.7)' }}>
                  <strong style={{ color: '#F0EFE8' }}>Demo:</strong> El código es{' '}
                  <strong style={{ color: ACCENT, fontSize: '15px', letterSpacing: '3px' }}>
                    {otpGenerated}
                  </strong>
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <Field label="Código de verificación" required>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otpInput}
                    onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6)); setOtpError(false) }}
                    placeholder="000000"
                    maxLength={6}
                    style={{
                      ...inputBase,
                      letterSpacing: '8px',
                      fontSize: '24px',
                      textAlign: 'center',
                      ...(otpError ? { borderColor: '#ef4444' } : {}),
                    }}
                    onFocus={onFocusYellow}
                    onBlur={onBlurReset}
                  />
                  {otpError && (
                    <p className="font-dm mt-1" style={{ fontSize: '13px', color: '#ef4444' }}>
                      Código incorrecto. Intenta de nuevo.
                    </p>
                  )}
                </Field>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-4 rounded-pill font-syne font-bold text-base transition-all duration-200"
                    style={{ border: '1.5px solid rgba(240,239,232,0.15)', color: 'rgba(240,239,232,0.5)', background: 'transparent' }}
                  >
                    ← Atrás
                  </button>
                  <button
                    type="button"
                    onClick={verifyOTP}
                    disabled={loading || otpInput.length < 6}
                    className="flex-1 py-4 rounded-pill font-syne font-bold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: loading ? 'rgba(232,255,71,0.7)' : ACCENT, color: ACCENT_TEXT, border: 'none' }}
                  >
                    {loading ? 'Generando tu carta...' : 'Confirmar y descargar carta →'}
                  </button>
                </div>

                <p className="font-dm text-center" style={{ fontSize: '13px', color: 'rgba(240,239,232,0.35)' }}>
                  ¿No recibiste el código?{' '}
                  <button
                    type="button"
                    onClick={resendOTP}
                    className="underline cursor-pointer"
                    style={{ color: ACCENT, background: 'none', border: 'none', padding: 0 }}
                  >
                    Reenviar
                  </button>
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
