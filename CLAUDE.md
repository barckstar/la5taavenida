# CLAUDE.md — 5ta Avenida Grill

Sitio web de **5ta Avenida Grill** (página FB: "5ta Avenida San Ramón"),
restaurante/grill en San Ramón, Alajuela, Costa Rica.

Estado: **sondeo / definición**. No hay código todavía.

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
| 70% dominante | Fondos de pagina y secciones | `#220B08` / `#361316` (casi negro / granate) |
| 30% secundario | Tarjetas, superficies, separadores, texturas madera/ladrillo | `#5B260D` / `#963316` |
| 10% acento | CTAs, precios, badges, estado activo, "Agregar al carrito" | `#E35120` / `#E8771F` |

El naranja **nunca** se usa como fondo de seccion. Verificar contraste WCAG AA.

## Pendiente de decidir

- [ ] Alcance: ¿vitrina, o con reservas reales / pedidos?
- [ ] Dirección, teléfono, horarios y menú reales (bloqueado por el cliente)
- [ ] Fotografía del local y platos
- [ ] Dominio
- [ ] ¿Bilingüe ES/EN?
- [ ] shadcn/ui, Biome, Vitest+Playwright, GitHub Actions — propuestos, sin confirmar

## Convenciones

- Log de tareas en `.claude/interaction-log.md`
- `graphify .` dentro de este proyecto (grafo propio)
- `.env.local` desde `.env.example`; en producción, Environment Variables de Vercel
- Nunca leer `.env`, `.env.*`, `.secrets`
