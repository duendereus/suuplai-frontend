# Suuplai — Frontend

> **El anaquel ya no es de los grandes.**
> Conectamos tiendas independientes con marcas que necesitan presencia física — sin slotting fees millonarios, sin meses de espera.

Landing + flujos de registro para **Suuplai**, un marketplace B2B que convierte metros lineales de anaquel en slots rentables para productores (marcas) y monetiza espacio ocioso para tiendas (comercios independientes en CDMX).

---

## 🎯 Visión del proyecto

El retail mexicano está roto para las dos puntas:

- **Para las marcas pequeñas y medianas (productores):** entrar a cadenas grandes exige *slotting fees* de seis cifras, contratos blindados y meses de negociación. El resultado: el anaquel es un club cerrado dominado por las mismas 20 marcas de siempre.
- **Para las tiendas independientes:** tienen tráfico, tienen espacio, tienen comunidad — pero no tienen a quién venderle ese inventario de metros lineales. Cada centímetro ocioso es dinero que se va.

**Suuplai es el puente.** Convertimos el anaquel en un activo líquido: las tiendas publican sus *slots* (anaquel, refrigerador, mesa de exhibición, mostrador) y los productores los rentan por mes, con métricas de tráfico, ubicación y categoría. Sin intermediación opaca, sin contratos leoninos, con una comisión clara del 12%.

**La tesis:** el anaquel físico sigue siendo el canal de adquisición más poderoso que existe para producto de consumo — pero hoy solo lo pueden pagar las marcas con millones de dólares en la espalda. Suuplai democratiza ese acceso.

### Para quién construimos

| Audiencia | Qué gana |
|-----------|----------|
| **Tiendas** (gimnasios, cafés, boutiques, naturistas, farmacias, salones, coworkings) | Monetizan espacio ocioso con ingresos recurrentes + exposición a marcas frescas que atraen tráfico. |
| **Productores** (marcas DTC, emergentes, artesanales) | Entran al anaquel físico sin slotting fees, con segmentación por zona y categoría, y con datos reales de sell-through. |

### Momento del proyecto

Fase **pre-lanzamiento / waitlist**. La landing valida mercado y captura leads calificados. Backend y operaciones están en diseño (ver [BACKEND_SPEC.md](BACKEND_SPEC.md)). El piloto inicial se enfoca en **CDMX** (mapa de slots, caso Comando como prueba social).

---

## 🧱 Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, RSC)
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS 3 con tokens del brandbook (ver `tailwind.config.ts`)
- **UI primitives:** Radix UI (Accordion, Select, Tabs, Slot)
- **Animación:** Framer Motion
- **Íconos:** Lucide React
- **Mapa:** Leaflet + React-Leaflet (mapa de CDMX con puntos de slots)
- **PDF:** jsPDF (generación de resumen de registro para tiendas)
- **Email transaccional:** EmailJS (placeholder — migrará a backend real)
- **Fuentes:** Syne (display), DM Sans (texto), Space Mono (técnica/números)

---

## 🎨 Brand — sistema visual

El diseño sigue el **brandbook de Suuplai** (`comp_files/suuplai-brandbook.pdf`). Resumen ejecutivo de los tokens usados en código:

### Paleta (definida en [tailwind.config.ts](tailwind.config.ts))

| Token Tailwind | Hex | Uso |
|----------------|---------|-----|
| `suu-bg` | `#0A0A0F` | Fondo base (near-black, nunca negro puro) |
| `suu-surface` | `#13131A` | Cards y superficies elevadas |
| `suu-border` | `rgba(255,255,255,0.07)` | Separadores sutiles |
| `suu-text` | `#F0EFE8` | Texto principal (off-white cálido) |
| `suu-muted` | `#7A7A8A` | Texto secundario |
| `suu-tienda` | `#E8FF47` | **Amarillo lime** — color de la audiencia "tienda" |
| `suu-productor` | `#FF6B35` | **Naranja** — color de la audiencia "productor" |
| `suu-prod-light` | `#FF9A73` | Hover/acento productor |
| `suu-ai` | `#F5C518` | Acento para features con IA |

El dualismo **lime / naranja** es la firma visual del producto: cada audiencia tiene su color y los componentes de la landing refuerzan esa bifurcación (ver `AudienceSplit.tsx`).

### Tipografía

- **Syne** — display, headlines, CTAs. Geométrica, cortante, con personalidad.
- **DM Sans** — cuerpo, UI. Neutral y legible.
- **Space Mono** — números, métricas, tags técnicos. Refuerza el tono "dato duro".

### Tono de voz

Directo, sin rodeos, con tesis clara. "El anaquel ya no es de los grandes." No es una startup que pide permiso — es una que declara cómo debería funcionar el retail.

---

## 📁 Estructura

```
app/
├── page.tsx                  # Landing (14 secciones)
├── layout.tsx                # Root layout + fuentes + metadata SEO
├── globals.css
├── registro-tienda/          # Formulario 3 pasos + PDF
├── registro-productor/       # Waitlist de marcas
├── terminos/                 # Legal
└── privacidad/               # Legal

components/
├── landing/                  # Secciones de la landing (Hero, FAQ, Mapa, etc.)
├── registro/                 # Formularios multi-paso
└── shared/                   # UI primitives compartidos

lib/                          # Utilidades (cn, helpers)
public/                       # Assets estáticos
comp_files/                   # Brandbook y material de diseño
BACKEND_SPEC.md               # Contrato de API para el backend
```

### Secciones de la landing (orden en `app/page.tsx`)

1. **Nav** — barra superior con CTAs duales
2. **Hero** — tesis central + CTAs para ambas audiencias
3. **MarqueeBanner** — frases de impacto en loop
4. **PainPoints** — los dolores del retail actual
5. **AudienceSplit** — bifurcación tienda vs productor
6. **SlotVisual** — qué es un slot (espacio físico monetizable)
7. **ComandoCase** — caso de éxito piloto (Café Comando)
8. **Calculator** — calculadora de ingresos para tiendas
9. **Pricing** — modelo comercial (12% comisión)
10. **HowItWorks** — flujo end-to-end
11. **MapaCDMX** — mapa de slots activos en CDMX (Leaflet)
12. **FAQ** — dudas frecuentes
13. **ManifestoCTA** — cierre con manifesto + CTA final
14. **Footer**

---

## 🚀 Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Build de producción
npm run start      # Servir build (usa $PORT si está seteado)
npm run lint
```

**Node:** >= 18.17.0 (se recomienda Node 20 — ver `.nvmrc`).

### Variables de entorno

Copia `.env.example` a `.env.local` y configura:

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL del backend (ej. `https://api.suuplai.com`). Hoy la landing no consume API — todos los datos están mockeados o en `localStorage`. |

El contrato completo de API está en [BACKEND_SPEC.md](BACKEND_SPEC.md).

---

## ☁️ Despliegue (Railway)

El proyecto está configurado para desplegar en Railway vía Nixpacks.

**Archivos de despliegue:**
- [railway.json](railway.json) — builder Nixpacks + política de reinicio.
- [package.json](package.json) — `start` bindea a `$PORT` que Railway inyecta.
- [.nvmrc](.nvmrc) — fija Node 20.

**Pasos:**
1. En Railway → **New Project** → **Deploy from GitHub repo** → seleccionar este repo.
2. En **Variables**: añadir `NEXT_PUBLIC_API_URL`.
3. Railway detecta Next.js automáticamente y corre `npm run build` + `npm run start`.
4. **Settings → Networking → Generate Domain** para dominio público.
5. Opcional: conectar dominio custom (`suuplai.com`) y configurar DNS.

---

## 🗺️ Roadmap inmediato

- [ ] Conectar formularios a backend real (`POST /leads/tienda`, `POST /leads/productor`).
- [ ] Implementar OTP real de WhatsApp vía Twilio (hoy generado en browser).
- [ ] Mapa de CDMX con datos dinámicos desde `GET /slots/mapa` (hoy 7 puntos hardcodeados).
- [ ] Configuración de precios de calculadora desde backend (hoy `BASE_RATE = 800` constante).
- [ ] Dashboard de admin para gestión de leads.

Ver [BACKEND_SPEC.md](BACKEND_SPEC.md) para el detalle completo del contrato de API pendiente.

---

## 📝 Notas sobre el repositorio

Este repo es ahora el **master** del proyecto (originalmente fork de `Sancesco/suuplai-frontend`). Todo desarrollo futuro ocurre aquí.

### Checklist post-fork recomendado

Cuando el fork deja de seguir al upstream y se vuelve repo principal, conviene hacer estos ajustes en GitHub:

- [ ] **Settings → General → "Leave fork network"** (opcional, pero recomendado): desvincula del upstream para que no aparezca "forked from" ni se ofrezca sync del upstream. *Esta acción es irreversible — solo hazlo cuando estés seguro.*
- [ ] **Settings → General → Description / Website / Topics**: añade descripción, URL de producción y tags (`nextjs`, `retail`, `marketplace`, `mexico`).
- [ ] **Settings → Branches → Branch protection rules** para `main`: requerir PR, reviews y checks antes de mergear.
- [ ] **Settings → Actions → General**: decidir si habilitas CI (lint + build en cada PR).
- [ ] **Settings → Secrets and variables → Actions**: si conectas CI, añadir secrets (ej. `RAILWAY_TOKEN` si quieres deploy automatizado fuera del auto-deploy nativo de Railway).
- [ ] **Issues / Projects**: habilitar si los vas a usar para tracking.
- [ ] **`CODEOWNERS`**: añadir si hay más de un contribuidor.
- [ ] **Renombrar** el repo si quieres que deje de llamarse `suuplai-frontend` (no aplica aquí, el nombre ya es correcto).
- [ ] Si los colaboradores tenían acceso al repo original, re-invitarlos al nuevo.
- [ ] Actualizar cualquier referencia al repo anterior en documentación interna, Railway, Vercel, etc.

---

## 📄 Licencia

Propietario — Suuplai. Todos los derechos reservados.
