# Plan de implementación — Sitio 5ta Avenida Grill

> **Para trabajadores agénticos:** SUB-SKILL REQUERIDA: usar `superpowers:subagent-driven-development` (recomendado) o `superpowers:executing-plans` para implementar tarea por tarea. Los pasos usan checkbox (`- [ ]`) para seguimiento.

**Goal:** Construir el sitio de dos páginas de 5ta Avenida Grill — landing informativa con promoción semanal, y menú virtual con doble vista, carrito y checkout que entrega la orden por WhatsApp.

**Architecture:** Next.js App Router con arquitectura Feature-Based. Todo el contenido vive tipado en `features/*/data/`, separado de los componentes. Sin backend: el carrito es estado de cliente persistido en `localStorage` y el checkout construye un mensaje de WhatsApp. Sitio 100% estático desplegable en Vercel.

**Tech Stack:** Next 16.3.4 · React 19.2.8 · TypeScript estricto · Tailwind CSS 4.3.3 · Framer Motion · Zod · schema-dts · Vitest · Node 24.16

**Spec:** `docs/specs/2026-09-01-sitio-5ta-avenida-design.md`

## Global Constraints

- **TypeScript estricto.** `strict: true`. Prohibido `any`. Sin archivos `.jsx`.
- **Feature-Based.** Ninguna feature importa de otra feature. Lo compartido sube a `shared/`.
- **Contenido como datos.** Nunca incrustar textos, platos ni precios en el JSX.
- **Paleta 70/30/10.** 70% `#220B08` / `#361316` · 30% `#5B260D` / `#963316` · 10% `#E35120` / `#E8771F`.
- **Contraste obligatorio.** `#E35120` solo sobre `#220B08` para texto pequeño. Sobre `#361316` usar `#E8771F`. `#963316` **nunca** como texto.
- **WhatsApp:** `6490-1222` → `https://wa.me/50664901222`.
- **Dirección real:** 350 metros oeste de Supermercados Molina, San Ramón de Alajuela.
- **Precios:** colones enteros, finales, todo incluido. Formato `₡17.000` (punto como separador de miles).
- **Animación:** solo `transform` y `opacity`. `prefers-reduced-motion` respetado siempre.
- **Todo dato inventado va marcado con el comentario `DEMO`** en el código.

## Estrategia de pruebas

Vitest sobre las cuatro unidades de lógica pura donde un error causa daño real:
`formatoColones`, `promoActiva`, el reducer del carrito, y `construirMensaje`.

Los componentes visuales **no** llevan pruebas unitarias — se verifican en el navegador.
Para un sitio de vitrina, testear que un `<div>` renderiza es ceremonia sin retorno.

## Estructura de archivos

| Archivo | Responsabilidad |
|---|---|
| `src/shared/config/negocio.ts` | Único lugar con WhatsApp, dirección, horarios y flags |
| `src/shared/lib/formatoColones.ts` | Formato de moneda CR |
| `src/shared/components/ui/*` | Primitivas sin lógica de dominio |
| `src/features/menu/types.ts` | `Plato`, `Media`, `CategoriaId` — la fuente de verdad de tipos del menú |
| `src/features/menu/data/menu.ts` | Los platos. Se reemplaza sin tocar componentes |
| `src/features/carrito/lib/carritoStore.ts` | Reducer + Context + persistencia |
| `src/features/checkout/lib/construirMensaje.ts` | Arma el texto y mide su longitud |
| `src/features/promociones/lib/promoActiva.ts` | Selección de promo por fecha |

---

### Task 1: Andamiaje del proyecto

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/shared/config/negocio.ts`

**Interfaces:**
- Produces: `negocio` — objeto congelado con `whatsapp`, `direccion`, `horarios`, `redes`.

- [ ] **Step 1: Inicializar el proyecto**

```bash
cd D:/la5taavenida
npx create-next-app@16.3.4 . --ts --app --tailwind --eslint --src-dir --import-alias "@/*" --turbopack --no-install
npm install
```

- [ ] **Step 2: Inicializar git y primer commit**

```bash
git init
git add -A
git commit -m "chore: andamiaje inicial Next 16 + TypeScript + Tailwind 4"
```

- [ ] **Step 3: Definir los tokens 70/30/10 en `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  /* 70% dominante */
  --color-base:        #220B08;
  --color-base-alt:    #361316;
  /* 30% secundario */
  --color-superficie:  #5B260D;
  --color-superficie-alt: #963316;
  /* 10% acento */
  --color-acento:      #E35120;
  --color-acento-alt:  #E8771F;
  --color-acento-claro:#F0A05D;
  /* texto */
  --color-texto:       #FFFDFC;
  --color-texto-suave: #D9C9C2;
}

body { background: var(--color-base); color: var(--color-texto); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

- [ ] **Step 4: Crear `src/shared/config/negocio.ts`**

```ts
export const negocio = {
  nombre: '5ta Avenida Grill',
  nombreFacebook: '5ta Avenida San Ramón',
  tagline: '¡Una nueva experiencia gastronómica en San Ramón!',
  whatsapp: '50664901222',
  whatsappVisible: '6490-1222',
  direccion: '350 metros oeste de Supermercados Molina, San Ramón de Alajuela',
  ciudad: 'San Ramón',
  provincia: 'Alajuela',
  pais: 'CR',
  facebook: 'https://www.facebook.com/5taavenidagrill/',
  // DEMO: horarios inventados para la muestra. Reemplazar con los reales.
  horarios: [
    { dias: 'Lunes', apertura: null, cierre: null },
    { dias: 'Martes a jueves', apertura: '11:00', cierre: '22:00' },
    { dias: 'Viernes y sábado', apertura: '11:00', cierre: '24:00' },
    { dias: 'Domingo', apertura: '11:00', cierre: '21:00' },
  ],
} as const
```

- [ ] **Step 5: Verificar que arranca**

Run: `npm run dev`
Expected: servidor en `localhost:3000`, fondo `#220B08`, sin errores en consola.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: tokens de marca 70/30/10 y configuracion del negocio"
```

---

### Task 2: Vitest y formato de colones

**Files:**
- Create: `vitest.config.ts`, `src/shared/lib/formatoColones.ts`, `src/shared/lib/formatoColones.test.ts`

**Interfaces:**
- Produces: `formatoColones(monto: number): string`

- [ ] **Step 1: Instalar Vitest**

```bash
npm install -D vitest
```

Agregar a `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 2: Escribir la prueba que falla**

```ts
import { describe, it, expect } from 'vitest'
import { formatoColones } from './formatoColones'

describe('formatoColones', () => {
  it('usa punto como separador de miles', () => {
    expect(formatoColones(17000)).toBe('₡17.000')
  })
  it('no muestra decimales', () => {
    expect(formatoColones(9500)).toBe('₡9.500')
  })
  it('maneja montos menores a mil', () => {
    expect(formatoColones(800)).toBe('₡800')
  })
  it('maneja cero', () => {
    expect(formatoColones(0)).toBe('₡0')
  })
  it('maneja montos de seis cifras', () => {
    expect(formatoColones(125000)).toBe('₡125.000')
  })
})
```

- [ ] **Step 3: Correr y verificar que falla**

Run: `npm test`
Expected: FAIL — no existe el módulo `formatoColones`.

- [ ] **Step 4: Implementar**

```ts
export function formatoColones(monto: number): string {
  return '₡' + Math.round(monto).toLocaleString('es-CR', { maximumFractionDigits: 0 })
}
```

Si `es-CR` no produce punto como separador en el runtime, reemplazar por formato manual:
`'₡' + Math.round(monto).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')`.
La prueba es la que decide cuál queda.

- [ ] **Step 5: Correr y verificar que pasa**

Run: `npm test`
Expected: PASS, 5 pruebas.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: formato de colones con pruebas"
```

---

### Task 3: Primitivas de interfaz

**Files:**
- Create: `src/shared/components/ui/{Boton,Contenedor,Tarjeta,Badge,Drawer}.tsx`

**Interfaces:**
- Produces:
  - `Boton({ variante: 'acento' | 'contorno' | 'fantasma', tamano?: 'md' | 'lg', ...ButtonHTMLAttributes })`
  - `Contenedor({ children, className? })` — ancho máximo y padding lateral
  - `Tarjeta({ children, className? })` — superficie 30%
  - `Badge({ children, className? })`
  - `Drawer({ abierto: boolean, onCerrar: () => void, titulo: string, children })`

- [ ] **Step 1: Implementar `Drawer`, la única primitiva con lógica**

Requisitos no negociables: cierra con `Escape`, atrapa el foco mientras está abierto,
bloquea el scroll del fondo, el overlay cierra al hacer clic, y lleva
`role="dialog"` con `aria-modal="true"` y `aria-labelledby` apuntando al título.

- [ ] **Step 2: Implementar el resto de primitivas**

`Boton` con variante `acento` usa `bg-acento text-base` (naranja sobre casi negro,
4.88:1). Nunca usar `--color-superficie-alt` como color de texto.

- [ ] **Step 3: Verificar en el navegador**

Renderizar las cinco primitivas en `src/app/page.tsx` temporalmente, abrir el Drawer,
cerrarlo con `Escape`, y confirmar con Tab que el foco no se escapa.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: primitivas de interfaz con drawer accesible"
```

---

### Task 4: Tipos y datos del menú

**Files:**
- Create: `src/features/menu/types.ts`, `src/features/menu/data/menu.ts`, `src/features/menu/data/categorias.ts`

**Interfaces:**
- Produces: `Plato`, `Media`, `CategoriaId`, `menu: Plato[]`, `categorias: Categoria[]`

- [ ] **Step 1: Crear `types.ts`**

```ts
export type CategoriaId =
  | 'hamburguesas' | 'costillas' | 'alitas' | 'bocas' | 'bebidas' | 'postres'

export type Media =
  | { tipo: 'video'; src: string; poster: string; alt: string }
  | { tipo: 'imagen'; src: string; alt: string }

export type Plato = {
  id: string
  nombre: string
  descripcion: string
  ingredientes: string[]
  precio: number
  categoria: CategoriaId
  media: Media
  destacado?: boolean
  disponible: boolean
}

export type Categoria = { id: CategoriaId; nombre: string; emoji: string }
```

- [ ] **Step 2: Crear los datos**

Cabecera obligatoria del archivo:

```ts
// DEMO: platos y precios provisionales para la muestra.
// Reemplazar con el menú real del cliente. Los textos alt siguen
// el patrón "Qué + Dónde" para SEO local.
```

Poblar con los platos que se logren extraer del Facebook del cliente. Mientras no estén,
usar la hamburguesa con camarones de la portada como plato destacado real, y completar
con platos de grill costarricense creíbles. Todos con `media.tipo: 'imagen'`.

- [ ] **Step 3: Verificar que TypeScript acepta los datos**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: modelo de datos del menu con contenido de demostracion"
```

---

### Task 5: Carrito

**Files:**
- Create: `src/features/carrito/types.ts`, `src/features/carrito/lib/carritoStore.ts`, `src/features/carrito/lib/carritoReducer.test.ts`

**Interfaces:**
- Consumes: `Plato` de `@/features/menu/types`
- Produces:
  - `type LineaCarrito = { plato: Plato; cantidad: number; nota?: string }`
  - `carritoReducer(estado: LineaCarrito[], accion: AccionCarrito): LineaCarrito[]`
  - `CarritoProvider({ children })`
  - `useCarrito(): { lineas, agregar, cambiarCantidad, quitar, ponerNota, vaciar, total, conteo }`

- [ ] **Step 1: Escribir las pruebas del reducer**

Casos que importan: agregar un plato nuevo lo pone en cantidad 1; agregar el mismo plato
dos veces **incrementa en vez de duplicar la línea**; bajar la cantidad a 0 elimina la
línea; quitar una línea no afecta a las demás; `vaciar` deja el arreglo vacío; una nota
se conserva al cambiar la cantidad.

```ts
import { describe, it, expect } from 'vitest'
import { carritoReducer } from './carritoStore'
import type { Plato } from '@/features/menu/types'

const plato: Plato = {
  id: 'ham-5ta', nombre: 'Hamburguesa 5ta Avenida', descripcion: '',
  ingredientes: [], precio: 8500, categoria: 'hamburguesas',
  media: { tipo: 'imagen', src: '/x.jpg', alt: 'x' }, disponible: true,
}

describe('carritoReducer', () => {
  it('agrega un plato nuevo con cantidad 1', () => {
    const r = carritoReducer([], { tipo: 'agregar', plato })
    expect(r).toHaveLength(1)
    expect(r[0].cantidad).toBe(1)
  })

  it('incrementa en vez de duplicar la linea', () => {
    let r = carritoReducer([], { tipo: 'agregar', plato })
    r = carritoReducer(r, { tipo: 'agregar', plato })
    expect(r).toHaveLength(1)
    expect(r[0].cantidad).toBe(2)
  })

  it('elimina la linea cuando la cantidad baja a cero', () => {
    let r = carritoReducer([], { tipo: 'agregar', plato })
    r = carritoReducer(r, { tipo: 'cambiarCantidad', id: 'ham-5ta', cantidad: 0 })
    expect(r).toHaveLength(0)
  })

  it('conserva la nota al cambiar la cantidad', () => {
    let r = carritoReducer([], { tipo: 'agregar', plato })
    r = carritoReducer(r, { tipo: 'ponerNota', id: 'ham-5ta', nota: 'sin cebolla' })
    r = carritoReducer(r, { tipo: 'cambiarCantidad', id: 'ham-5ta', cantidad: 3 })
    expect(r[0].nota).toBe('sin cebolla')
    expect(r[0].cantidad).toBe(3)
  })

  it('vaciar deja el carrito sin lineas', () => {
    let r = carritoReducer([], { tipo: 'agregar', plato })
    r = carritoReducer(r, { tipo: 'vaciar' })
    expect(r).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Correr y verificar que fallan**

Run: `npm test`
Expected: FAIL — `carritoReducer` no existe.

- [ ] **Step 3: Implementar el reducer y el Provider**

El reducer es una función pura exportada por separado para que sea testeable sin React.
La persistencia en `localStorage` va en un `useEffect` del Provider, **envuelta en
`try/catch`** porque falla en modo privado. La hidratación inicial también va en
`useEffect`, no en el `useReducer`, para no romper el renderizado del servidor.

- [ ] **Step 4: Correr y verificar que pasan**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: carrito con reducer probado y persistencia local"
```

---

### Task 6: Mensaje de WhatsApp con guarda de longitud

**Files:**
- Create: `src/features/checkout/schema.ts`, `src/features/checkout/lib/construirMensaje.ts`, `src/features/checkout/lib/construirMensaje.test.ts`

**Interfaces:**
- Consumes: `LineaCarrito` de `@/features/carrito/types`
- Produces:
  - `datosPedidoSchema` (Zod) y `type DatosPedido = z.infer<typeof datosPedidoSchema>`
  - `construirMensaje(lineas, datos, total): { texto: string; largoCodificado: number; excedeLimite: boolean }`
  - `LIMITE_SEGURO = 1500`

Esta es la tarea de mayor riesgo del proyecto. Si el mensaje se trunca, el pedido llega
incompleto al restaurante y nadie se entera.

- [ ] **Step 1: Escribir las pruebas**

Casos: incluye todas las líneas con cantidad y precio; incluye el total; incluye la nota
cuando existe; omite la dirección cuando la modalidad es Retiro; incluye la dirección
cuando es Express; **marca `excedeLimite` en un pedido de 40 líneas**; y `excedeLimite`
es falso en un pedido normal.

```ts
import { describe, it, expect } from 'vitest'
import { construirMensaje, LIMITE_SEGURO } from './construirMensaje'

const linea = (id: string, cantidad: number) => ({
  plato: { id, nombre: `Plato ${id}`, descripcion: '', ingredientes: [],
           precio: 8500, categoria: 'bocas' as const,
           media: { tipo: 'imagen' as const, src: '/x.jpg', alt: 'x' }, disponible: true },
  cantidad,
})

const retiro = { nombre: 'Ana', telefono: '88888888', modalidad: 'retiro' as const, hora: '19:30' }
const express = { ...retiro, modalidad: 'express' as const, direccion: 'Barrio X, casa azul' }

describe('construirMensaje', () => {
  it('incluye cada linea con su cantidad', () => {
    const { texto } = construirMensaje([linea('a', 2)], retiro, 17000)
    expect(texto).toContain('2x Plato a')
  })

  it('incluye el total formateado', () => {
    const { texto } = construirMensaje([linea('a', 2)], retiro, 17000)
    expect(texto).toContain('₡17.000')
  })

  it('omite la direccion cuando es retiro', () => {
    const { texto } = construirMensaje([linea('a', 1)], retiro, 8500)
    expect(texto).not.toContain('Barrio X')
  })

  it('incluye la direccion cuando es express', () => {
    const { texto } = construirMensaje([linea('a', 1)], express, 8500)
    expect(texto).toContain('Barrio X, casa azul')
  })

  it('marca excedeLimite en un pedido enorme', () => {
    const muchas = Array.from({ length: 40 }, (_, i) => linea(`plato-numero-${i}`, 3))
    const { excedeLimite, largoCodificado } = construirMensaje(muchas, express, 999000)
    expect(largoCodificado).toBeGreaterThan(LIMITE_SEGURO)
    expect(excedeLimite).toBe(true)
  })

  it('no marca excedeLimite en un pedido normal', () => {
    const { excedeLimite } = construirMensaje([linea('a', 2), linea('b', 1)], express, 25500)
    expect(excedeLimite).toBe(false)
  })
})
```

- [ ] **Step 2: Correr y verificar que fallan**

Run: `npm test`
Expected: FAIL.

- [ ] **Step 3: Implementar**

`largoCodificado` se mide con `encodeURIComponent(texto).length`, **no** con
`texto.length` — los acentos, el símbolo de colón y los saltos de línea se expanden a
tres o más caracteres al codificarse, y esa es la longitud que realmente viaja en la URL.

- [ ] **Step 4: Correr y verificar que pasan**

Run: `npm test`
Expected: PASS, 6 pruebas.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: armado del mensaje de whatsapp con guarda de longitud"
```

---

### Task 7: Menú — vista Lista

**Files:**
- Create: `src/features/menu/components/{ListaView,CategoriaTabs,TarjetaPlato}.tsx`
- Create: `src/app/menu/page.tsx`

- [ ] **Step 1: Implementar `TarjetaPlato`**

Imagen por `next/image` con `sizes` correcto. Precio en `--color-acento`. Botón de
agregar que se convierte en control de cantidad cuando la línea ya está en el carrito.
Los platos con `disponible: false` van atenuados, sin botón y con un `Badge` de "Agotado".

- [ ] **Step 2: Implementar `CategoriaTabs`** — `position: sticky` bajo la barra de navegación.

- [ ] **Step 3: Implementar `ListaView`** — grid de 1 columna en móvil, 2 en `md`, 3 en `lg`.

- [ ] **Step 4: Verificar en el navegador** — agregar platos y confirmar que el conteo sube.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: vista lista del menu"
```

---

### Task 8: Menú — vista Reels

**Files:**
- Create: `src/features/menu/components/{ReelsView,PlatoMedia,PlatoDetalle,VistaToggle,MenuView}.tsx`

- [ ] **Step 1: Implementar `PlatoMedia`**

Discrimina sobre `media.tipo`. Para `imagen`, `next/image` a pantalla completa. Para
`video`: `muted`, `loop`, `playsInline`, `preload="none"` y `poster` siempre presente.
Un `IntersectionObserver` reproduce **solo** el elemento visible y pausa el resto.

- [ ] **Step 2: Implementar `ReelsView`**

Contenedor con `h-[100dvh]` (no `100vh`, que se rompe con la barra del navegador móvil),
`overflow-y-auto`, `scroll-snap-type: y mandatory`, y cada plato con `scroll-snap-align: start`.

- [ ] **Step 3: Implementar `VistaToggle` y `MenuView`**

`VistaToggle` son dos `<button>` reales con `aria-pressed`, nunca `<div>`. `MenuView`
lee la preferencia de `localStorage` y **oculta el toggle en `md` y superior**, donde
siempre se muestra `ListaView`.

- [ ] **Step 4: Verificar en el navegador**

Emular móvil, confirmar el snap vertical, alternar vistas, y verificar en la pestaña de
red que las imágenes fuera de pantalla no se descargan de golpe.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: vista reels del menu con carga diferida"
```

---

### Task 9: Drawer del carrito

**Files:**
- Create: `src/features/carrito/components/{CarritoDrawer,CarritoBoton,LineaCarritoItem}.tsx`
- Modify: `src/app/layout.tsx` — montar `CarritoProvider`, `CarritoBoton` y `CarritoDrawer`

- [ ] **Step 1: Implementar los tres componentes.** `CarritoBoton` es flotante, fijo abajo a la derecha, y **solo se renderiza cuando `conteo > 0`**.

- [ ] **Step 2: Montar en el layout** para que el carrito sea global a las dos páginas.

- [ ] **Step 3: Verificar la persistencia** — agregar platos, recargar la página, confirmar que siguen ahí. Repetir en ventana privada para confirmar que no truena.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: drawer del carrito global a las dos paginas"
```

---

### Task 10: Checkout

**Files:**
- Create: `src/features/checkout/components/CheckoutDrawer.tsx`, `src/features/checkout/lib/enviarWhatsApp.ts`

- [ ] **Step 1: Implementar el formulario** — seis campos validados con `datosPedidoSchema`. El campo de dirección aparece **solo** cuando la modalidad es Express. Errores de validación asociados por `aria-describedby`.

- [ ] **Step 2: Conectar `construirMensaje`.** Si `excedeLimite` es verdadero, mostrar un aviso claro y **no abrir WhatsApp**. Es la guarda que evita el pedido truncado.

- [ ] **Step 3: Implementar `enviarWhatsApp`** — `window.open` a `https://wa.me/50664901222?text=` con el texto codificado.

- [ ] **Step 4: Verificar el flujo completo** — armar un pedido, llenar el formulario, confirmar que WhatsApp abre con el mensaje bien formado. Luego armar un pedido de 40 líneas y confirmar que aparece el aviso en vez de abrir.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: checkout que entrega la orden por whatsapp"
```

---

### Task 11: Promoción semanal

**Files:**
- Create: `src/features/promociones/{types.ts,data/promos.ts,lib/promoActiva.ts,lib/promoActiva.test.ts,components/PromoSemanal.tsx}`

**Interfaces:**
- Produces: `promoActiva(promos: Promo[], hoy: Date): Promo` — nunca devuelve `undefined`

- [ ] **Step 1: Escribir las pruebas**

Casos: devuelve la promo vigente para la fecha dada; ignora las vencidas; ignora las
futuras; **devuelve la promo por defecto cuando ninguna aplica** (la sección nunca queda
vacía); y con dos vigentes simultáneas devuelve la que empezó más recientemente.

`hoy` se recibe como parámetro, nunca se lee de `new Date()` adentro — de lo contrario
la función no es testeable.

- [ ] **Step 2: Correr, verificar que fallan, implementar, verificar que pasan**

Run: `npm test`

- [ ] **Step 3: Implementar `PromoSemanal`** y commit

```bash
git add -A && git commit -m "feat: promocion semanal por vigencia con pruebas"
```

---

### Task 12: Landing

**Files:**
- Create: `src/features/landing/components/{Hero,Nosotros,Destacados,Ubicacion,Contacto}.tsx`
- Create: `src/features/landing/data/landing.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Implementar `Hero`** — imagen de producto, logo, tagline, y dos CTAs: "Ver menú" y "Ordenar por WhatsApp". Brasas en CSS puro con `@keyframes` sobre `transform` y `opacity`.

- [ ] **Step 2: Implementar las secciones restantes.** Textos en `data/landing.ts`, nunca en el JSX. `Ubicacion` muestra la dirección real y los horarios desde `negocio`.

- [ ] **Step 3: Animaciones de entrada** — Framer Motion con `whileInView` y `once: true`.

- [ ] **Step 4: Verificar en móvil y escritorio.** Confirmar que nada desborda horizontalmente.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: landing completa"
```

---

### Task 13: SEO, accesibilidad y cierre

**Files:**
- Create: `src/app/{robots.ts,sitemap.ts,not-found.tsx}`, `public/llms.txt`
- Create: `src/shared/lib/jsonLd.ts`
- Create: `src/shared/components/layout/{Navbar,Footer}.tsx`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/menu/page.tsx`

- [ ] **Step 1: JSON-LD `Restaurant` tipado con `schema-dts`**

```bash
npm install -D schema-dts
```

Incluye `name`, `address` con la dirección real, `telephone`, `openingHoursSpecification`
derivado de `negocio.horarios`, `priceRange` y `servesCuisine`.

- [ ] **Step 2: `metadata` por página.** Distinta en `/` y en `/menu`. Con `openGraph` para que el enlace se vea bien al compartirlo por WhatsApp — que es el canal principal de este negocio.

- [ ] **Step 3: `robots.ts`, `sitemap.ts`, `not-found.tsx` y `llms.txt`.**

- [ ] **Step 4: Navbar y Footer** montados en el layout.

- [ ] **Step 5: Auditoría final**

Verificar: un solo H1 por página; jerarquía H1→H2→H3 sin saltos; todo `alt` sigue
"Qué + Dónde"; navegación completa por teclado; contraste conforme a la tabla del spec;
y `prefers-reduced-motion` activado detiene las animaciones.

Run: `npm run build && npx tsc --noEmit && npm test`
Expected: build limpio, sin errores de tipos, todas las pruebas en verde.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: seo local, json-ld y auditoria de accesibilidad"
```

---

## Autorrevisión del plan

**Cobertura del spec:**

| Sección del spec | Tarea |
|---|---|
| §3 Marca y 70/30/10 | 1 |
| §3 Reglas de contraste | 3, 13 |
| §4 Arquitectura Feature-Based | 1 y en adelante |
| §5 Landing | 12 |
| §5 Promoción semanal | 11 |
| §6 Modelo de datos | 4 |
| §6 Vista Reels | 8 |
| §6 Vista Lista | 7 |
| §6 Escritorio sin toggle | 8 |
| §6 Control de peso | 8 |
| §7 Carrito | 5, 9 |
| §8 Checkout y WhatsApp | 6, 10 |
| §8 Guarda de longitud | 6, 10 |
| §9 Animación | 1, 12 |
| §10 SEO | 13 |
| §11 Accesibilidad | 3, 8, 10, 13 |
| §12 Horarios DEMO | 1 |

Sin huecos.

**Consistencia de tipos:** `Plato` se define una vez en la Tarea 4 y lo consumen 5, 6, 7,
8 y 9. `LineaCarrito` se define en la 5 y lo consume la 6. `formatoColones` se define en
la 2 y lo consumen 6, 7 y 9.
