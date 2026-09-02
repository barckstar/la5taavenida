# 5ta Avenida Grill

Sitio web de **5ta Avenida Grill**, restaurante y parrilla en San Ramón,
Alajuela, Costa Rica.

Menú virtual con pedido en línea que se finaliza por WhatsApp. Sin backend, sin
base de datos y sin pasarela de pago: el sitio es estático y el cobro lo hace el
restaurante.

## Arrancar

```bash
npm install
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build |
| `npm test` | Pruebas (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Tipos, sin emitir |

## Stack

Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS 4 ·
Turbopack · Framer Motion · Zod · Vitest · Vercel.

## Estructura

Arquitectura **Feature-Based**. Regla dura: *una feature nunca importa de otra
feature*; lo compartido sube a `shared/`. Cuando dos features necesitan hablarse,
la composición ocurre en `app/layout.tsx`, que es el punto de composición.

```
src/
  app/                  rutas: solo metadata y composición
    page.tsx            inicio (todas las secciones ancladas)
    menu/page.tsx       menú en cuadrícula
    menu/reels/page.tsx recorrido tipo Shorts
  features/
    landing/  ofertas/  menu/  reels/  carrito/  checkout/
  shared/
    components/ui  components/layout  config  lib
```

### Dos páginas, dos vistas del menú

- `/` lleva **toda** la información del negocio como secciones ancladas.
- `/menu` es la cuadrícula; `/menu/reels` el recorrido a pantalla completa.
  Son features separadas a propósito: cada ruta carga solo su JavaScript.

## Contenido

Todo el contenido vive tipado en `features/*/data/`, **nunca incrustado en el
JSX**. Cambiar el menú, las ofertas o las reseñas es editar un archivo de datos.

| Archivo | Qué contiene |
|---|---|
| `shared/config/negocio.ts` | Dirección, horarios, WhatsApp, coordenadas, pagos |
| `features/menu/data/menu.ts` | Los 35 platos con sus precios reales |
| `features/ofertas/data/ofertas.ts` | Promociones vigentes |
| `features/landing/data/resenas.ts` | Reseñas reales de Google |

## Documentación

| Documento | Para qué |
|---|---|
| [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) | **Empezá por aquí.** Cómo funciona el pedido, por qué cada decisión, estado real de rendimiento y pendientes |
| [CLAUDE.md](CLAUDE.md) | Reglas operativas del proyecto |
| [docs/specs/](docs/specs/) | Diseño original acordado con el cliente |
| [docs/plans/](docs/plans/) | Plan de implementación |
| [.claude/interaction-log.md](.claude/interaction-log.md) | Bitácora: qué se decidió, qué falló y por qué |

## Reglas del proyecto

Están en `CLAUDE.md`, y conviene leerlo antes de tocar nada. Las que más se
olvidan:

- **Paleta 70/30/10** sobre negro real (`#050505`). El naranja nunca es fondo de
  sección. Los contrastes están medidos y anotados en `globals.css`.
- **Registro de usted** en todo el texto visible. El sitio le habla a los
  clientes del restaurante, no a quien lo desarrolla.
- **Lighthouse > 95** en las cuatro categorías, auditado sobre el build de
  producción.
- **Nada de datos inventados**: precios, reseñas, calificaciones y horarios son
  reales o no se publican.

## Estado

| Categoría Lighthouse | Puntaje |
|---|---|
| Accesibilidad | 100 |
| Prácticas recomendadas | 100 |
| SEO | 100 |
| Rendimiento | ~80 — **bajo el estándar** |

El cuello del rendimiento está medido: el desglose del LCP da 4,4 s de *render
delay* por hidratación de JavaScript, no peso de imágenes. Ver la sección
correspondiente en `CLAUDE.md`.

## Antes de desplegar

1. **`NEXT_PUBLIC_SITIO_URL`** en Vercel con el dominio real. Sin eso el sitemap
   y el JSON-LD apuntan a `la5taavenida.vercel.app`.
2. Las fotos de los platos son **provisionales**, de Wikimedia Commons y todas
   CC0 o dominio público (ver `public/platos/fotos/LICENCIAS.json`). Reemplazar
   por fotos reales del local.
3. Falta `public/local/parrilla.webp`, la foto del local para la sección
   "¿Por qué 5ta Avenida?".
