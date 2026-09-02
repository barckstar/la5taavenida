# CLAUDE.md — 5ta Avenida Grill

Sitio web de **5ta Avenida Grill** (página FB: "5ta Avenida San Ramón"),
restaurante/grill en San Ramón, Alajuela, Costa Rica.

Estado: **en desarrollo**. Ver `docs/plans/2026-09-01-sitio-5ta-avenida.md`.

Dev server en el **puerto 3001** (`npm run dev`). Ojo: `D:\.claude\launch.json` manda
cuando la sesion corre desde `D:\`; mascontractorsllc usa el 3000.

## Contexto del negocio

- Tagline oficial: *"¡Una nueva experiencia gastronómica en San Ramón!"*
- Única presencia digital hoy: Facebook `5taavenidagrill` (~4.352 seguidores)
- Idioma: español (CR). Evaluar si necesita inglés por turismo.
- **WhatsApp del negocio: 6490-1222** (CR) → `wa.me/50664901222`
- Referencia de estilo dada por el cliente: https://www.chickenfritocr.com/
- Ver `research/facebook-sondeo.md` para el sondeo completo y la paleta de marca.

## Contexto comercial

Esto es una **muestra gratis** para ganar la cuenta. No tenemos toda la informacion
del negocio todavia, asi que el sitio tiene que verse tan bien que no lo puedan rechazar.
Presupuesto de esfuerzo acotado: impacto visual alto, alcance controlado.

## Stack (decidido)

- **Next.js 16 (App Router) + React 19**
- **TypeScript estricto** — sin `.jsx`, sin `any`
- **Tailwind CSS v4** — config CSS-first con `@theme` en `globals.css`
- **Turbopack** (sin `--webpack`)
- Framer Motion (paquete `motion`) para animación
- `next/font/local` para tipografías
- Zod para schemas de formulario
- `schema-dts` para tipar el JSON-LD
- Deploy en **Vercel** + `@vercel/speed-insights`

## Arquitectura de navegacion — SOLO 2 PAGINAS

- **`/` (Inicio)** — lleva TODA la informacion del negocio como secciones ancladas:
  hero, promocion semanal, nosotros, destacados, ubicacion, contacto. Se recorre con
  scroll suave entre anclas: se siente como una SPA, sin recargas.
- **`/menu`** — la unica ruta aparte, porque es la que monta el menu virtual y el carrito.

No se crean rutas para "nosotros", "contacto" ni "ubicacion". Son anclas de `/`.
El carrito y el checkout son drawers, nunca paginas.

## Arquitectura — Feature-Based

```
src/
  app/            # solo rutas: metadata + composición. Sin lógica.
  features/       # <feature>/{components,data,types,lib,actions}
  shared/         # components/ui, components/layout, lib, types
```

Regla dura: **una feature nunca importa de otra feature.** Lo compartido sube a `shared/`.
El contenido vive tipado en `features/<x>/data/`, nunca hardcodeado en el JSX.

## SEO (prioridad alta — negocio local)

- `export const metadata` por página, nunca genérico
- JSON-LD `Restaurant` con dirección, geo, horarios, teléfono y rango de precios
- Jerarquía estricta H1 → H2 → H3, un H1 por página
- Alt text patrón **"Qué + Dónde"** — ej. `"Costillas a la parrilla en 5ta Avenida Grill, San Ramón"`
- `robots.ts`, `sitemap.ts` generados por Next
- `public/llms.txt`

## Paleta — reparto 70/30/10

| Franja | Uso | Color |
|---|---|---|
| 70% dominante | Fondos de pagina y secciones | `#050505` / `#0F0D0D` — **negro real** |
| 30% secundario | Tarjetas, superficies, separadores | `#1A0F0D` / `#2A1512` |
| 10% acento | CTAs, precios, badges, estado activo, "Agregar al carrito" | `#E35120` / `#E8771F` |

El naranja **nunca** se usa como fondo de seccion.

> La primera paleta salio del degradado de la FOTO DE PERFIL del logo y se veia cafe y
> embarrada. Eso era el fondo de una foto, no la identidad. La marca real es **la llama
> sobre negro**, y asi lo hace tambien la referencia del cliente (chickenfritocr.com usa
> `#050505` / `#1A0A0A` con rojo y naranja solo de acento). No volver al cafe.

Contraste medido sobre `#050505`: acento 5.30:1, acento-alt 6.88:1, blanco 20.1:1 — todo AA.
El rojo brasa `#A01010` queda en 2.50:1: **decorativo, nunca texto**. Y sobre degradados o
superficies del 30%, el texto va blanco, no naranja.

## Pendiente de decidir

- [x] Dirección, teléfono y **horarios reales** confirmados
- [x] Coordenadas exactas y CID de Google del negocio
- [ ] Menú: PRECIOS reales (los actuales son inventados) y FOTOS de los platos
- [x] Nombres reales de 4 platos: La 5ta Avenida, La Surtida, Papas Gajo, Nachos
- [ ] Place ID en formato ChIJ, para el enlace de reseña de un clic
- [x] Calificación real de Google: 4,6 con 59 reseñas
- [x] 6 reseñas reales en español, transcritas literales
- [ ] ¿Places API para traerlas en vivo? Requiere llave y facturación en Google Cloud
- [ ] Fotografía del local y platos
- [x] Dominio: vercel.app para la muestra
- [ ] ¿Bilingüe ES/EN?
- [ ] shadcn/ui, Biome, Vitest+Playwright, GitHub Actions — propuestos, sin confirmar

## Convenciones

- Log de tareas en `.claude/interaction-log.md`
- `graphify .` dentro de este proyecto (grafo propio)
- `.env.local` desde `.env.example`; en producción, Environment Variables de Vercel
- Nunca leer `.env`, `.env.*`, `.secrets`
