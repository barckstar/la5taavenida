# Diseño — Sitio web 5ta Avenida Grill

Fecha: 2026-09-01 · Estado: pendiente de aprobación

## 1. Contexto y objetivo

**5ta Avenida Grill** (página de Facebook: "5ta Avenida San Ramón") es un restaurante grill en San Ramón, Alajuela, Costa Rica. Su única presencia digital es Facebook (~4.352 seguidores). Tagline oficial: *"¡Una nueva experiencia gastronómica en San Ramón!"*

Este sitio es una **muestra gratuita** para ganar la cuenta. El objetivo comercial es presentar algo que el cliente no pueda rechazar. Eso impone dos restricciones opuestas que el diseño debe balancear: impacto visual alto, y alcance de trabajo acotado.

## 2. Alcance

**Incluye**
- Landing con información del negocio, secciones y promoción semanal
- Menú virtual con dos vistas en móvil (Reels y Lista)
- Carrito de compras persistente
- Checkout que entrega la orden por WhatsApp
- SEO local con JSON-LD `Restaurant`

**No incluye**
- Backend, base de datos, autenticación
- Pasarela de pago real
- Panel de administración
- Registro de órdenes (decisión explícita, ver §13)

## 3. Marca y sistema visual

Extraído del logo y de la portada de Facebook. La dirección de arte del cliente ya existe: **madera gris envejecida, ladrillo rojo iluminado, tabla de tronco, fuego.** El sitio la continúa, no la reinventa.

### Reparto 70/30/10

| Franja | Uso | Colores |
|---|---|---|
| **70%** dominante | Fondos de página y de sección | `#220B08` casi negro · `#361316` granate |
| **30%** secundario | Tarjetas, superficies, separadores, texturas | `#5B260D` · `#963316` |
| **10%** acento | CTAs, precios, badges, estado activo | `#E35120` naranja fuego · `#E8771F` ámbar |

### Reglas de contraste (medidas, no estimadas)

| Combinación | Ratio | Regla |
|---|---|---|
| `#E35120` sobre `#220B08` | 4.88:1 | Texto normal permitido |
| `#E35120` sobre `#361316` | 4.33:1 | **Solo texto grande.** Para texto pequeño sobre granate usar `#E8771F` (5.62:1) |
| `#E8771F` sobre `#220B08` | 6.33:1 | Seguro en todo tamaño |
| `#FFFDFC` sobre `#220B08` | 18.50:1 | Texto de cuerpo |
| `#963316` como texto | 2.49:1 / 2.21:1 | **Nunca como texto.** Es color de superficie únicamente |

Los tokens viven en `globals.css` bajo `@theme` de Tailwind v4.

### Tipografía

Display con carácter de brocha o condensada para títulos, acompañando el logo. Sans neutra y legible para cuerpo y precios. Cargadas con `next/font/local` para evitar layout shift.

## 4. Arquitectura

**Stack:** Next.js 16 App Router · React 19 · TypeScript estricto · Tailwind CSS v4 · Turbopack · Framer Motion · Zod · `schema-dts` · Vercel.

**Feature-Based.** Ninguna feature importa de otra; lo compartido sube a `shared/`.

```
src/
  app/
    layout.tsx          fuentes, metadata raíz, JSON-LD, Navbar/Footer, CarritoProvider
    page.tsx            landing
    menu/page.tsx       menú virtual
    globals.css         @theme con los tokens 70/30/10
    robots.ts  sitemap.ts  not-found.tsx

  features/
    landing/       components/{Hero,Nosotros,Destacados,Ubicacion,Contacto}.tsx
                   data/landing.ts
    promociones/   components/PromoSemanal.tsx · data/promos.ts · lib/promoActiva.ts
    menu/          components/{MenuView,ReelsView,ListaView,PlatoMedia,PlatoDetalle,
                               CategoriaTabs,VistaToggle}.tsx
                   data/menu.ts · types.ts
    carrito/       components/{CarritoDrawer,CarritoBoton,LineaCarrito}.tsx
                   lib/carritoStore.ts · types.ts
    checkout/      components/CheckoutDrawer.tsx · schema.ts
                   lib/{construirMensaje.ts,enviarWhatsApp.ts}

  shared/
    components/ui/       Boton, Tarjeta, Drawer, Contenedor, Badge
    components/layout/   Navbar, Footer
    config/negocio.ts    WhatsApp, dirección, horarios, flags
    lib/formatoColones.ts
```

El contenido vive tipado en `features/*/data/`, nunca incrustado en el JSX. Esto permite reemplazar el menú de demostración por el real sin tocar componentes.

## 5. Página 1 — Landing

Secciones en orden:

1. **Hero** — imagen de producto sobre fondo oscuro, logo, tagline, dos CTAs: "Ver menú" y "Ordenar por WhatsApp". Brasas animadas en CSS.
2. **Promoción semanal** — banner destacado, la única pieza que rota semanalmente.
3. **Nosotros** — el concepto del grill, texto corto sobre textura de madera.
4. **Destacados** — 3 o 4 platos que enlazan al menú.
5. **Ubicación** — dirección, mapa embebido, horarios.
6. **Contacto** — WhatsApp, Facebook, dirección.

### Promoción semanal

`data/promos.ts` es un arreglo con `desde` y `hasta`. `promoActiva()` selecciona la vigente comparando contra la fecha actual; si ninguna aplica, cae a una promo por defecto para que la sección nunca quede vacía. Cambiar la promoción es editar un archivo y republicar.

## 6. Página 2 — Menú virtual

Dos vistas, un solo conjunto de datos. El toggle se recuerda en `localStorage`.

### Modelo de datos

```ts
type CategoriaId = 'hamburguesas' | 'costillas' | 'alitas' | 'bocas' | 'bebidas' | 'postres'

type Media =
  | { tipo: 'video'; src: string; poster: string; alt: string }
  | { tipo: 'imagen'; src: string; alt: string }

type Plato = {
  id: string
  nombre: string
  descripcion: string
  ingredientes: string[]
  precio: number          // colones enteros, precio final al público
  categoria: CategoriaId
  media: Media
  destacado?: boolean
  disponible: boolean
}
```

`Media` es una unión discriminada: la vista Reels funciona **hoy con fotos** y acepta videos cuando existan, sin reescribir nada. Es la decisión que evita que la falta de videos bloquee la entrega.

### Vista Reels (móvil)

Scroll vertical con `scroll-snap-type: y mandatory`, un plato por pantalla completa. Overlay inferior con nombre, precio grande en acento, descripción, ingredientes desplegables y botón de agregar. Al agregar, el botón se convierte en contador de cantidad sin sacar al usuario del scroll.

### Vista Lista

Tabs de categoría fijas arriba, grid de tarjetas con foto, nombre, precio y botón rápido. Para quien ya sabe qué quiere.

### Comportamiento en escritorio

El toggle de dos vistas es **exclusivo de móvil**, tal como se pidió. En escritorio el menú muestra siempre la vista Lista, en grid de varias columnas, y el toggle no se renderiza. La vista Reels a pantalla completa no tiene sentido en un monitor horizontal y arrastraría el peso de los videos sin beneficio. El punto de corte es el breakpoint `md` de Tailwind.

### Control de peso (requisito duro: fluido pero que no pese)

- `preload="none"` en todos los videos; el `poster` se muestra primero siempre
- `IntersectionObserver` reproduce **solo** el plato visible y pausa el resto
- Precarga únicamente el vecino inmediato
- Videos `muted`, `loop`, `playsInline`, loops cortos y sin corte
- Nunca hay más de dos videos en memoria, sea el menú de 20 o de 60 platos
- Imágenes por `next/image` con `sizes` correcto y placeholder borroso

Los platos con `disponible: false` se muestran atenuados y sin botón de agregar.

## 7. Carrito

React Context más `useReducer`, persistido en `localStorage` con `try/catch` porque puede fallar en modo privado. **Cero dependencias de estado** — un carrito de restaurante no justifica Zustand ni Redux.

Operaciones: agregar, cambiar cantidad, quitar, nota por línea, vaciar, total. El carrito es un drawer.

El `CarritoProvider` vive en `layout.tsx`, así que el estado es global a las dos páginas. El botón flotante con el conteo aparece **solo cuando hay algo en el carrito**, y en ambas páginas: si alguien arma un pedido, navega a la landing y vuelve, no pierde nada.

## 8. Checkout hacia WhatsApp

Drawer, no página. Así el sitio se mantiene en dos páginas.

**Campos:** nombre, teléfono, modalidad (**Retiro** o **Express**), dirección solo si es Express, hora deseada, notas. Validado con Zod; el mismo schema tipa el formulario.

**Sin costo de envío y sin selector de pago.** El express lo cobra el mensajero al llegar, y el método de pago (datáfono o SINPE) lo coordina el restaurante en la conversación de WhatsApp. El checkout no los pregunta.

### Mensaje generado

```
*PEDIDO — 5ta Avenida Grill*

2x Hamburguesa 5ta Avenida    ₡17.000
1x Costillas BBQ               ₡9.500
   sin cebolla

*TOTAL: ₡26.500*

Express · Juan Pérez · 8888-8888
Barrio Los Ángeles, casa azul
Hora: 7:30 pm
Pago y envío: a coordinar
```

Se abre `https://wa.me/50664901222?text=` con el mensaje codificado.

**Guarda contra el límite de URL:** el mensaje se codifica y se mide antes de abrir. Si supera el margen seguro de 1.500 caracteres codificados, se avisa en pantalla y se sugiere dividir el pedido, en vez de dejar que WhatsApp lo trunque en silencio.

## 9. Animación

Framer Motion, con disciplina:

- Solo `transform` y `opacity`, propiedades que van por GPU
- Reveals con `whileInView` y `once: true`, para que no re-animen al subir
- `prefers-reduced-motion` respetado en todo el sitio
- Brasas del hero en CSS puro, sin JavaScript
- Sin animación en el scroll del menú Reels más allá del snap nativo

## 10. SEO

- `export const metadata` por página, nunca genérico
- JSON-LD `Restaurant` tipado con `schema-dts`: nombre, dirección real, geo, teléfono, horarios, rango de precios, `servesCuisine`
- Jerarquía estricta H1, H2, H3, con un solo H1 por página
- Alt text patrón **"Qué + Dónde"**, por ejemplo *"Costillas BBQ a la parrilla en 5ta Avenida Grill, San Ramón"*
- `robots.ts` y `sitemap.ts` generados por Next
- `public/llms.txt`

## 11. Accesibilidad

- Contraste según la tabla de la sección 3, sin excepciones
- El drawer atrapa el foco y cierra con `Escape`
- La vista Reels es navegable por teclado; el toggle de vista es un control real, no un div
- Los videos son decorativos y van `muted`; toda la información está en el texto

## 12. Datos reales frente a datos de demostración

| Dato | Estado |
|---|---|
| Nombre, tagline, logo | Real |
| Dirección: 350 m oeste de Supermercados Molina, San Ramón de Alajuela | Real |
| WhatsApp 6490-1222 | Real |
| Paleta de marca | Derivada del logo real |
| Platos, precios, fotos | Pendiente — se toman del Facebook del cliente |
| Horarios | **Inventados para la muestra**, marcados en el código |

Horarios de demostración: lunes cerrado; martes a jueves de 11:00 a 22:00; viernes y sábado de 11:00 a 24:00; domingo de 11:00 a 21:00. Van en `shared/config/negocio.ts` con un comentario `DEMO` visible.

## 13. Riesgos asumidos conscientemente

1. **La orden solo existe si el cliente presiona enviar en WhatsApp.** Si abandona ahí, el restaurante nunca se entera y no hay métrica de órdenes perdidas. Se acepta a cambio de cero infraestructura y cero costo. Revisable si el cliente firma.
2. **Sin control de disponibilidad en tiempo real.** Marcar un plato agotado requiere editar `data/menu.ts` y republicar.
3. **Los videos no existen todavía.** El diseño degrada a fotos y no queda bloqueado.

## 14. Fuera de alcance

Reservas de mesa, programa de lealtad, multi-idioma, pagos en línea, integración con Uber Eats o PedidosYa, panel de administración. Todos posibles después; ninguno pertenece a la muestra.
