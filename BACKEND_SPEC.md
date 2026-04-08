# Suuplai — Especificación de Backend
> Generado a partir del análisis del frontend en `/c/dev/slotty/frontend/slotty`
> Fecha: 2026-02-26

---

## 1. Qué encontré en el frontend

### Páginas existentes

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page completa (14 componentes, 0 llamadas a API) |
| `/registro-tienda` | Formulario 3 pasos para tiendas + generación de PDF |
| `/registro-productor` | Formulario de waitlist para marcas |
| `/terminos` | Términos de uso (estática) |
| `/privacidad` | Aviso de privacidad (estática) |

### Estado actual de los datos — TODO está mockeado

| Dato | Dónde vive hoy | Lo que debe hacer el backend |
|------|----------------|------------------------------|
| Registros de tiendas | `localStorage` clave `suuplai_registros` | `POST /leads/tienda` |
| Registros de productores | `localStorage` clave `suuplai_registros` | `POST /leads/productor` |
| OTP de WhatsApp | Generado en el browser (número random, visible en pantalla) | `POST /auth/otp/send` real vía Twilio |
| Puntos del mapa | 7 constantes hardcodeadas en `MapaLeaflet.tsx` | `GET /slots/mapa` |
| Slots activos ("20") | Número hardcodeado en `MapaCDMX.tsx` y `ComandoCase.tsx` | Conteo dinámico desde BD |
| Métricas del caso ("$164K", "4 marcas") | Hardcodeadas en `ComandoCase.tsx` | Tabla `metricas` |
| Precios de la calculadora | Constantes en `Calculator.tsx` (`BASE_RATE = 800`) | Configuración en BD |

---

## 2. Tipos e interfaces del frontend — exactos

### FormTienda (`components/registro/FormTienda.tsx`)

```typescript
interface FormData {
  // Contacto
  nombre: string
  apellido: string
  email: string
  whatsapp: string

  // Tienda
  nombreTienda: string
  tipoTienda: string        // 'Gimnasio/estudio fitness' | 'Café/cafetería' | 'Tienda naturista/orgánica'
                            // 'Boutique de ropa' | 'Librería/papelería' | 'Farmacia independiente'
                            // 'Minisuper/abarrotes' | 'Salón de belleza/spa' | 'Coworking/oficina' | 'Otro'
  colonia: string
  alcaldia: string

  // Espacio
  metrosLineales: string    // 'Menos de 1m' | '1–2m' | '2–5m' | '5–10m' | 'Más de 10m'
  trafico: string           // 'Menos de 50' | '50–150' | '150–500' | 'Más de 500'
  tipoEspacio: string       // 'Anaquel/estante' | 'Refrigerador/refri' | 'Mesa de exhibición'
                            // 'Espacio en mostrador' | 'Varios tipos'
  categorias: string        // 'Alimentos y bebidas' | 'Cosméticos y skincare' | 'Wellness y suplementos'
                            // 'Moda y accesorios' | 'Cualquier categoría'
  notas: string

  // Fiscal (paso 2)
  tipoPersona: string       // 'Persona física' | 'Persona moral'
  razonSocial: string
  rfc: string               // max 13 caracteres
  direccionFiscal: string

  // Aceptaciones
  aceptaComision: boolean   // 12% sobre ventas
  aceptaTerminos: boolean
}
```

### FormProductor (`components/registro/FormProductor.tsx`)

```typescript
interface FormData {
  // Contacto
  nombre: string
  apellido: string
  email: string
  whatsapp: string

  // Marca
  nombreMarca: string
  categoria: string         // 'Alimentos y bebidas' | 'Salsas/condimentos' | 'Snacks/botanas'
                            // 'Bebidas funcionales' | 'Cosméticos y skincare' | 'Wellness y suplementos'
                            // 'Moda y accesorios' | 'Libros y papelería' | 'Arte y diseño' | 'Otro'
  skus: string              // '1–3' | '4–10' | '11–20' | 'Más de 20'
  ticket: string            // 'Menos de $50' | '$50–$150' | '$150–$350' | '$350–$800' | 'Más de $800'

  // Situación actual
  canalesVenta: string[]    // multi-select: 'Instagram / TikTok' | 'E-commerce propio'
                            // 'Mercado Libre / Amazon' | 'Tiendas independientes'
                            // 'Cadenas grandes' | 'Mercados / bazares'
  frustracion: string       // 'Slotting fees y barreras de entrada altísimas'
                            // 'No tengo datos de quién me compra ni dónde roto mejor'
                            // 'Mi margen se destruye con logística y penalizaciones'
                            // 'Tardo meses en entrar y años en ver resultados'
                            // 'Me pierdo entre cientos de productos similares'
                            // 'No puedo testear SKUs nuevos sin arriesgar mucho'

  // Objetivos
  numTiendas: string        // '1–3 (prueba)' | '4–10' | '11–20' | '20+'
  zona: string              // 'Roma/Condesa' | 'Polanco/Lomas' | 'Coyoacán/Del Valle'
                            // 'Santa Fe/Interlomas' | 'Narvarte/Doctores' | 'Toda la ciudad'
  descripcion: string
  instagram: string
}
```

### MapPoint (`components/landing/MapaLeaflet.tsx`) — hardcodeado hoy

```typescript
interface MapPoint {
  id: string
  name: string
  slots: number     // cantidad de slots disponibles en esa zona
  lat: number
  lng: number
}

// Datos actuales hardcodeados:
const mapPoints: MapPoint[] = [
  { id: 'condesa',  name: 'Condesa',    slots: 4, lat: 19.4111, lng: -99.1769 },
  { id: 'roma',     name: 'Roma Norte', slots: 3, lat: 19.4185, lng: -99.1629 },
  { id: 'polanco',  name: 'Polanco',    slots: 3, lat: 19.4330, lng: -99.1978 },
  { id: 'coyoacan', name: 'Coyoacán',   slots: 2, lat: 19.3479, lng: -99.1613 },
  { id: 'santafe',  name: 'Santa Fe',   slots: 2, lat: 19.3572, lng: -99.2650 },
  { id: 'narvarte', name: 'Narvarte',   slots: 3, lat: 19.3971, lng: -99.1628 },
  { id: 'doctores', name: 'Doctores',   slots: 3, lat: 19.4134, lng: -99.1473 },
]
```

---

## 3. Modelo de negocio — extraído del código

| Parámetro | Valor | Fuente en código |
|-----------|-------|------------------|
| Comisión plataforma sobre ventas | **12%** | `FormTienda.tsx` PDF terms + `ComandoCase.tsx` |
| Tarifa base por metro/mes | **$800 MXN** | `Calculator.tsx` `BASE_RATE = 800` |
| Modalidad mixta (multiplicador) | **×1.25** ($1,000/m) | `Calculator.tsx` `MODAL_MULTIPLIERS` |
| Modalidad comisión (multiplicador) | **×1.5** ($1,200/m) | `Calculator.tsx` |
| Máximo marcas por espacio | **4** | `ComandoCase.tsx` + `InfoSideTienda.tsx` |
| Benchmark cadena grande | **$50,000 MXN/mes** | `Calculator.tsx` `RETAILER_BENCHMARK` |
| Aviso de salida | **15 días naturales** | `FormTienda.tsx` PDF + `FAQ.tsx` |
| Tiempo activación de slot | **48–72 horas** | `FAQ.tsx` |
| Ciclo de pago a tiendas | **Mensual** | `HowItWorks.tsx` paso 4 |
| Período mínimo de prueba | **3 fines de semana** | `AudienceSplit.tsx` |
| Precio slot actual (caso real) | **$1,000 MXN/mes** | `ComandoCase.tsx` |
| Proyección canal ancla | **$164,000 MXN/mes** | `ComandoCase.tsx` |
| Caso real activo | **20 puntos, CDMX, sector fitness** | `ComandoCase.tsx` |

### Flujos de usuario detectados

**Flujo Tienda (registro-tienda):**
1. Datos de contacto + datos de tienda + datos de espacio
2. Datos fiscales + aceptar términos + aceptar modelo de comisión
3. Verificar WhatsApp con OTP (hoy: frontend-only, inseguro)
4. Descarga carta de intención PDF (generada en browser con jsPDF)
5. Agenda llamada de 20 min (Google Calendar embed)

**Flujo Productor (registro-productor):**
1. Datos de contacto + datos de marca + canales actuales + objetivos
2. Submit → waitlist (guarda en localStorage)
3. Agenda llamada de 20 min (mismo Google Calendar embed)

**Flujo de la app (no construido, inferido de HowItWorks.tsx):**

*Tienda:*
1. Registrar tienda → 2. Publicar espacio → 3. Recibir propuestas → 4. Cobrar automático

*Productor:*
1. Crear perfil de marca → 2. Explorar mapa (filtros: zona, tráfico, categoría) → 3. Proponer → 4. Medir y expandir

---

## 4. Entidades de la base de datos

### `users`
```sql
id                 UUID PRIMARY KEY DEFAULT gen_random_uuid()
email              VARCHAR UNIQUE
whatsapp           VARCHAR UNIQUE
nombre             VARCHAR
apellido           VARCHAR
tipo               ENUM('tienda', 'productor', 'admin')  NOT NULL
status             ENUM('waitlist', 'activo', 'suspendido')  DEFAULT 'waitlist'
email_verified     BOOLEAN DEFAULT FALSE
whatsapp_verified  BOOLEAN DEFAULT FALSE
created_at         TIMESTAMPTZ DEFAULT NOW()
updated_at         TIMESTAMPTZ
```

### `refresh_tokens`
```sql
id          UUID PRIMARY KEY
user_id     UUID REFERENCES users(id) ON DELETE CASCADE
token       VARCHAR UNIQUE NOT NULL
expires_at  TIMESTAMPTZ NOT NULL
revoked     BOOLEAN DEFAULT FALSE
created_at  TIMESTAMPTZ DEFAULT NOW()
```

### `otp_tokens`
```sql
id          UUID PRIMARY KEY
whatsapp    VARCHAR NOT NULL
codigo      VARCHAR(6) NOT NULL
expires_at  TIMESTAMPTZ NOT NULL
usado       BOOLEAN DEFAULT FALSE
intentos    SMALLINT DEFAULT 0
created_at  TIMESTAMPTZ DEFAULT NOW()

INDEX(whatsapp)
```

### `leads` — datos crudos del frontend actual
```sql
id          UUID PRIMARY KEY
tipo        ENUM('tienda', 'productor')  NOT NULL
datos       JSONB NOT NULL               -- el form completo serializado
ip          VARCHAR
procesado   BOOLEAN DEFAULT FALSE        -- true = ya se convirtió en user/tienda/marca
created_at  TIMESTAMPTZ DEFAULT NOW()
```

### `tiendas`
```sql
id                    UUID PRIMARY KEY
user_id               UUID UNIQUE REFERENCES users(id)
nombre_tienda         VARCHAR NOT NULL
tipo_tienda           VARCHAR NOT NULL
colonia               VARCHAR NOT NULL
alcaldia              VARCHAR NOT NULL
ciudad                VARCHAR DEFAULT 'CDMX'
lat                   DECIMAL(9,6)          -- para el mapa Leaflet
lng                   DECIMAL(9,6)
tipo_persona          VARCHAR               -- 'Persona física' | 'Persona moral'
razon_social          VARCHAR
rfc                   VARCHAR(13)
direccion_fiscal      TEXT
trafico_diario        VARCHAR               -- rango como string ('50–150')
tipo_espacio          VARCHAR
categorias_aceptadas  VARCHAR[]             -- array PostgreSQL
notas                 TEXT
acepta_comision       BOOLEAN DEFAULT FALSE
acepta_terminos       BOOLEAN DEFAULT FALSE
status                ENUM('lead', 'activa', 'inactiva')  DEFAULT 'lead'
created_at            TIMESTAMPTZ DEFAULT NOW()
updated_at            TIMESTAMPTZ
```

### `slots` — cada espacio que publica una tienda
```sql
id                     UUID PRIMARY KEY
tienda_id              UUID REFERENCES tiendas(id) ON DELETE CASCADE
metros_lineales        DECIMAL(5,2) NOT NULL
tipo_espacio           VARCHAR NOT NULL  -- 'anaquel' | 'refrigerador' | 'mostrador' | 'mesa' | 'varios'
max_marcas             SMALLINT DEFAULT 4
categorias_aceptadas   VARCHAR[]
precio_mensual_base    DECIMAL(10,2) NOT NULL
modalidad              VARCHAR NOT NULL  -- 'fija' | 'mixta' | 'comision'
descripcion            TEXT
fotos                  TEXT[]            -- URLs a R2/S3
status                 ENUM('disponible', 'ocupado', 'inactivo')  DEFAULT 'disponible'
created_at             TIMESTAMPTZ DEFAULT NOW()
updated_at             TIMESTAMPTZ
```

### `marcas`
```sql
id                  UUID PRIMARY KEY
user_id             UUID UNIQUE REFERENCES users(id)
nombre_marca        VARCHAR NOT NULL
categoria           VARCHAR NOT NULL
skus_range          VARCHAR               -- '1–3', '4–10', etc.
ticket_promedio     VARCHAR               -- rango como string
canales_venta       VARCHAR[]
frustracion         TEXT
num_tiendas_target  VARCHAR
zona_preferida      VARCHAR
descripcion         TEXT
instagram           VARCHAR
status              ENUM('waitlist', 'activa', 'rechazada', 'suspendida')  DEFAULT 'waitlist'
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ
```

### `acuerdos` — contrato entre marca y slot
```sql
id               UUID PRIMARY KEY
slot_id          UUID REFERENCES slots(id)
marca_id         UUID REFERENCES marcas(id)
tienda_id        UUID REFERENCES tiendas(id)   -- desnormalizado para queries rápidas
precio_mensual   DECIMAL(10,2) NOT NULL
comision_pct     DECIMAL(5,2) DEFAULT 12.0     -- % comisión sobre ventas
modalidad        VARCHAR NOT NULL
fecha_inicio     DATE
duracion_meses   SMALLINT                       -- NULL = mes a mes
status           ENUM('propuesta', 'aceptado', 'activo', 'finalizado', 'cancelado', 'rechazado')
                 DEFAULT 'propuesta'
contrato_url     TEXT                           -- PDF firmado en R2
notas            TEXT
created_at       TIMESTAMPTZ DEFAULT NOW()
updated_at       TIMESTAMPTZ
```

### `pagos`
```sql
id                    UUID PRIMARY KEY
acuerdo_id            UUID REFERENCES acuerdos(id)
monto                 DECIMAL(10,2) NOT NULL
comision_plataforma   DECIMAL(10,2) NOT NULL    -- 15-20% del monto
periodo               VARCHAR NOT NULL           -- '2026-03'
status                ENUM('pendiente', 'procesado', 'fallido', 'reembolsado')  DEFAULT 'pendiente'
gateway_id            VARCHAR                    -- ID en Conekta/Stripe
gateway_response      JSONB                      -- respuesta cruda del gateway
created_at            TIMESTAMPTZ DEFAULT NOW()
updated_at            TIMESTAMPTZ
```

### `metricas`
```sql
id                  UUID PRIMARY KEY
acuerdo_id          UUID REFERENCES acuerdos(id)
periodo             VARCHAR NOT NULL             -- '2026-03'
ventas_totales      DECIMAL(10,2) NOT NULL
unidades_vendidas   INTEGER NOT NULL
ticket_promedio     DECIMAL(10,2)
tasa_rotacion       DECIMAL(5,2)                -- % rotación mensual
tasa_recompra       DECIMAL(5,2)                -- % recompra mensual
notas               TEXT
created_at          TIMESTAMPTZ DEFAULT NOW()

UNIQUE(acuerdo_id, periodo)
```

### Relaciones
```
users (1) ──── (1) tiendas ──── (N) slots ──── (N) acuerdos ──── (N) pagos
users (1) ──── (1) marcas  ──────────────────── (N) acuerdos ──── (N) metricas
                                                acuerdos (1) ──── (N) metricas
```

---

## 5. Endpoints

### Auth
```
POST   /api/v1/auth/otp/send       { whatsapp }                → envía OTP real via Twilio
POST   /api/v1/auth/otp/verify     { whatsapp, codigo }        → devuelve { accessToken, refreshToken }
POST   /api/v1/auth/refresh        { refreshToken }            → nuevo accessToken
GET    /api/v1/auth/me                                         → perfil usuario autenticado
POST   /api/v1/auth/logout         { refreshToken }            → revoca refresh token
```

### Leads (MVP inmediato — reemplaza el localStorage)
```
POST   /api/v1/leads/tienda        body: FormDataTienda        → 201 { id }
POST   /api/v1/leads/productor     body: FormDataProductor     → 201 { id }
GET    /api/v1/leads               ?tipo=&procesado=&page=     → [ADMIN] lista
PUT    /api/v1/leads/:id/aprobar                               → [ADMIN] convierte en user activo
```

### Tiendas
```
POST   /api/v1/tiendas                                         → crear tienda [AUTH]
GET    /api/v1/tiendas             ?zona=&categoria=&trafico=  → listar (público)
GET    /api/v1/tiendas/:id                                     → detalle (público)
PUT    /api/v1/tiendas/:id                                     → actualizar [AUTH owner]
POST   /api/v1/tiendas/:id/fotos   multipart/form-data         → subir fotos [AUTH owner]
DELETE /api/v1/tiendas/:id/fotos/:fotoId                       → eliminar foto [AUTH owner]
GET    /api/v1/tiendas/:id/slots                               → slots de esta tienda
GET    /api/v1/tiendas/:id/acuerdos                            → acuerdos [AUTH owner]
GET    /api/v1/tiendas/:id/metricas ?periodo=                  → dashboard [AUTH owner]
```

### Slots
```
POST   /api/v1/slots                                           → crear slot [AUTH tienda]
GET    /api/v1/slots               ?zona=&categoria=&tipo=&status=  → listar (público)
GET    /api/v1/slots/mapa                                      → solo {id,lat,lng,slots,zona} para Leaflet
GET    /api/v1/slots/:id                                       → detalle
PUT    /api/v1/slots/:id                                       → actualizar [AUTH owner]
DELETE /api/v1/slots/:id                                       → desactivar [AUTH owner]
```

### Marcas / Productores
```
POST   /api/v1/marcas                                          → crear perfil [AUTH]
GET    /api/v1/marcas/:id                                      → perfil [AUTH]
PUT    /api/v1/marcas/:id                                      → actualizar [AUTH owner]
GET    /api/v1/marcas/:id/acuerdos                             → acuerdos [AUTH owner]
GET    /api/v1/marcas/:id/metricas ?periodo=                   → dashboard [AUTH owner]
```

### Acuerdos
```
POST   /api/v1/acuerdos                                        → proponer acuerdo [AUTH marca]
GET    /api/v1/acuerdos                                        → mis acuerdos [AUTH]
GET    /api/v1/acuerdos/:id                                    → detalle [AUTH participante]
PUT    /api/v1/acuerdos/:id/aceptar                            → tienda acepta [AUTH tienda]
PUT    /api/v1/acuerdos/:id/rechazar                           → tienda rechaza [AUTH tienda]
PUT    /api/v1/acuerdos/:id/cancelar   { motivo }              → cancelar con 15d aviso [AUTH]
GET    /api/v1/acuerdos/:id/contrato                           → descarga PDF [AUTH participante]
```

### Pagos
```
POST   /api/v1/pagos                                           → crear intención de pago [AUTH marca]
GET    /api/v1/pagos                                           → historial [AUTH]
GET    /api/v1/pagos/:id                                       → detalle [AUTH]
POST   /api/v1/pagos/webhook                                   → webhook Conekta (sin auth, verifica firma HMAC)
```

### Métricas
```
GET    /api/v1/metricas            ?acuerdoId=&periodo=        → métricas [AUTH]
POST   /api/v1/metricas                                        → [ADMIN] crear reporte manual
```

### Admin
```
GET    /api/v1/admin/leads                                     → todos los leads
GET    /api/v1/admin/tiendas                                   → todas las tiendas
GET    /api/v1/admin/marcas                                    → todas las marcas
GET    /api/v1/admin/acuerdos                                  → todos los acuerdos
GET    /api/v1/admin/stats                                     → métricas globales del negocio
```

---

## 6. Stack recomendado

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Runtime | Node.js 22 LTS | Mismo ecosistema que el frontend (TypeScript) |
| Framework | **Fastify 5** | 2-3x más rápido que Express, validación integrada, plugin ecosystem maduro |
| Lenguaje | TypeScript strict | Consistencia con el frontend, tipos compartibles |
| ORM | **Prisma** | Migrations, type-safety, Prisma Studio para admin visual |
| Base de datos | **PostgreSQL** | Arrays nativos, JSONB, relaciones claras, PostGIS disponible para geo |
| Auth | JWT (jose) + OTP WhatsApp | Access token 15min + refresh token 30 días |
| OTP real | **Twilio WhatsApp Business API** | Reemplaza el OTP frontend-only actual |
| Storage | **Cloudflare R2** | S3-compatible, sin egress fees, SDK oficial |
| Pagos | **Conekta** | Estándar en México: tarjetas, SPEI, OXXO Pay |
| Email | **Resend** | SDK TypeScript nativo, plantillas React |
| Deploy | **Railway** | Un comando, Postgres managed incluido, barato para MVP |

---

## 7. Estructura de carpetas del backend

```
backend/
  src/
    modules/
      auth/
        auth.routes.ts
        auth.service.ts
        otp.service.ts
      leads/
        leads.routes.ts
        leads.service.ts
        leads.schemas.ts
      tiendas/
        tiendas.routes.ts
        tiendas.service.ts
      slots/
        slots.routes.ts
        slots.service.ts
      marcas/
        marcas.routes.ts
        marcas.service.ts
      acuerdos/
        acuerdos.routes.ts
        acuerdos.service.ts
        contrato.service.ts       ← generación de PDF del contrato
      pagos/
        pagos.routes.ts
        pagos.service.ts
        webhook.handler.ts        ← verifica firma HMAC de Conekta
      metricas/
        metricas.routes.ts
        metricas.service.ts
      admin/
        admin.routes.ts
    plugins/
      db.ts                       ← Prisma client singleton
      jwt.ts                      ← fastify-jwt config
      storage.ts                  ← Cloudflare R2 client
      whatsapp.ts                 ← Twilio client
      email.ts                    ← Resend client
    shared/
      errors.ts                   ← AppError + catálogo de errores
      auth.hook.ts                ← preHandler de auth y roles
    app.ts
    server.ts
  prisma/
    schema.prisma
    migrations/
  tests/
    modules/
      leads.test.ts
      auth.test.ts
      pagos.test.ts               ← especialmente el webhook
  .env.example
  package.json
  tsconfig.json
```

---

## 8. Variables de entorno requeridas

```bash
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/suuplai

# JWT
JWT_SECRET=secret_largo_y_random_minimo_32_chars
JWT_REFRESH_SECRET=otro_secret_diferente_para_refresh
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# CORS
FRONTEND_URL=http://localhost:3000

# Twilio (OTP WhatsApp)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Conekta (pagos México)
CONEKTA_API_KEY=key_xxxxxxxxxxxxxxxxxxx
CONEKTA_WEBHOOK_KEY=xxxxxxxxxxxxxxxxxxx  ← para verificar firma HMAC

# Cloudflare R2 (fotos de slots + contratos PDF)
R2_ACCOUNT_ID=xxxxxxxxxxxxxxxx
R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_BUCKET_NAME=suuplai
R2_PUBLIC_URL=https://pub-xxxx.r2.dev

# Resend (emails)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=hola@suuplai.com
```

---

## 9. Cambios inmediatos que necesita el frontend

### 1. Reemplazar localStorage en FormTienda

**Archivo:** `components/registro/FormTienda.tsx` líneas 346-353

```typescript
// ANTES:
const existing = JSON.parse(localStorage.getItem('suuplai_registros') || '[]') as unknown[]
localStorage.setItem('suuplai_registros', JSON.stringify([...existing, { tipo: 'tienda', ...form }]))

// DESPUÉS:
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/leads/tienda`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (!res.ok) throw new Error('Error al registrar')
```

### 2. Reemplazar localStorage en FormProductor

**Archivo:** `components/registro/FormProductor.tsx` líneas 129-134

```typescript
// ANTES:
const existing = JSON.parse(localStorage.getItem('suuplai_registros') || '[]') as unknown[]
localStorage.setItem('suuplai_registros', JSON.stringify([...existing, { tipo: 'productor', ...form }]))

// DESPUÉS:
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/leads/productor`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (!res.ok) throw new Error('Error al registrar')
```

### 3. Reemplazar OTP frontend-only en FormTienda

**Archivo:** `components/registro/FormTienda.tsx` líneas 322-333

```typescript
// ANTES (inseguro — el código se genera y muestra en pantalla):
const goToOTP = () => {
  const code = String(Math.floor(100000 + Math.random() * 900000))
  setOtpGenerated(code)
  setStep(3)
}

// DESPUÉS:
const goToOTP = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ whatsapp: form.whatsapp }),
  })
  setStep(3)
  // Ya no mostrar el código en pantalla — llega por WhatsApp real
}
```

### 4. Reemplazar puntos del mapa en MapaLeaflet

**Archivo:** `components/landing/MapaLeaflet.tsx` líneas 13-21

```typescript
// ANTES: array hardcodeado
const mapPoints: MapPoint[] = [...]

// DESPUÉS: fetch al backend
const [mapPoints, setMapPoints] = useState<MapPoint[]>([])
useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/slots/mapa`)
    .then(r => r.json())
    .then(setMapPoints)
}, [])
```

---

## 10. Orden de implementación recomendado

| Día | Módulo | Valor para el negocio |
|-----|--------|----------------------|
| 1 | Setup + Módulo Leads | Los formularios dejan de perder datos en localStorage |
| 2 | Auth (OTP real + JWT) | Verificación WhatsApp real, tokens seguros |
| 3 | Tiendas CRUD + fotos | Perfil de tienda en BD, fotos en R2 |
| 4 | Slots + endpoint `/slots/mapa` | Mapa Leaflet dinámico, slots reales |
| 5 | Marcas | Perfil de productor en BD |
| 6 | Acuerdos | Flujo de propuesta → aceptar → activar |
| 7 | Pagos (Conekta) | Cobro real, webhook |
| 8 | Métricas | Dashboard de rotación y recompra |
| 9 | Panel Admin | Gestión de leads, aprobaciones |
| 10 | Tests críticos | Auth, leads, webhook de pagos |
