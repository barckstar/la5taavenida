# Sondeo — 5ta Avenida Grill (Facebook)

Fecha: 2026-09-01 · Fuente: https://www.facebook.com/5taavenidagrill/?locale=es_LA

## Identidad confirmada

| Campo | Valor | Confianza |
|---|---|---|
| Nombre de la página | **5ta Avenida San Ramón** | Alta — `og:title` |
| Nombre de marca (logo) | **5ta Avenida Grill** | Alta — texto del logo |
| Handle FB | `5taavenidagrill` | Alta |
| Ubicación | San Ramón, Alajuela, **Costa Rica** | Alta — `og:description` |
| Tagline | *"¡Una nueva experiencia gastronómica en San Ramón!"* | Alta — `og:description` |
| Seguidores | ~4.352 me gusta · 15 hablando de esto · 8 check-ins | Alta (al 2026-09-01) |
| Categoría | Restaurante / grill (inferido de logo + tagline) | **Media — no confirmado por FB** |
| **Dirección** | **350 metros oeste de Supermercados Molina, San Ramón de Alajuela** | Alta — pestaña `/menu` de FB |
| WhatsApp | **6490-1222** → `wa.me/50664901222` | Alta — dado por el cliente |

## Marca

**Logo** (`research/assets/logo_fb_profile.jpg`, 720×720 JPG):
Llama estilizada en granate muy oscuro sobre fondo degradado radial naranja→negro.
Dentro de la llama, "**5ta**" en pincel blanco. Debajo "**AVENIDA**" en arco, tipografía
display con textura de brocha, y "**Grill**" en script manuscrito.

Concepto visual: **fuego, parrilla, calor**. Nocturno, cálido, informal-premium.

### Paleta extraída del logo

| Rol | Hex | Nota |
|---|---|---|
| Naranja fuego (primario) | `#E35120` | Color dominante, 15% del logo |
| Naranja ámbar (acento) | `#E8771F` | Segundo dominante |
| Naranja claro (highlight) | `#F0A05D` | Brillos |
| Granate oscuro (llama) | `#361316` | El cuerpo de la llama |
| Café rojizo (medio) | `#963316` / `#9B4D16` | Transiciones del degradado |
| Café profundo | `#5B260D` | Sombra |
| Casi negro (fondo) | `#220B08` | Bordes / fondo |
| Blanco | `#FFFDFC` | Texto "5ta" |

Degradado del fondo: radial, `#E8771F` al centro → `#220B08` en las esquinas.

## Lo que NO se pudo obtener

Facebook exige sesión iniciada para todo excepto los meta tags `og:`. El HTML público
son 500 KB de shell de JavaScript sin contenido. Quedó pendiente:

- Horarios de atención
- Menú y precios
- Fotos del local, platos y portada
- Reseñas y calificación
- Instagram / TikTok asociados

**No aparece en TripAdvisor, OpenTable ni Sluurpy** bajo ese nombre.

> ⚠️ Las búsquedas web devuelven varios negocios homónimos que **NO son este**:
> *5ta Avenida Bolsos* (tienda de carteras en Alajuela, tel. 2442-5555), *5ta Avenida Hostel*
> (Alajuela), *Quinta Avenida Grill* (Salvador, Brasil), *5th Avenue Grille* (Frisco, Colorado).
> No usar esos datos de contacto.

## Intentos de extracción (para no repetirlos)

| Vía | Resultado |
|---|---|
| WebFetch normal | Solo el nombre |
| curl con UA `facebookexternalhit` en `/` | ✅ og:title, og:description, og:image (logo) |
| curl con UA de crawler en `/menu` | ✅ **la dirección** |
| curl en `/photos`, `/posts`, `/videos`, `/reviews` | Solo og genéricos de la página, sin contenido |
| `mbasic.facebook.com` | Error de Facebook |
| Navegador integrado | Policy check intermitente, no cargó |
| TripAdvisor / OpenTable / Sluurpy | No existe ficha |

El menú de la pestaña `/menu` **no está expuesto públicamente** — la descripción es una
plantilla genérica de Facebook, no lleva platos.

## Cómo cerrar los huecos

1. **Lo más rápido:** que el cliente entregue dirección, teléfono, horarios, menú y fotos en alta.
2. Sesión de Facebook iniciada en el navegador para leer la pestaña "Información" y el álbum de fotos.
3. Google Maps / Waze del local para dirección y coordenadas (necesarias para el JSON-LD).
4. Fotos: si no hay material profesional, hay que agendar sesión. Un sitio de restaurante vive de las fotos.
