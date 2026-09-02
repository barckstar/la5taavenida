# Arquitectura y funcionamiento — 5ta Avenida Grill

Documento técnico del sitio. Explica **qué hace, cómo está armado y por qué se
tomó cada decisión**. Está pensado para que alguien que abre el proyecto por
primera vez pueda trabajar sin tener que reconstruir el razonamiento.

Última revisión: 2026-09-02.

---

## 1. Qué es

Sitio de **5ta Avenida Grill**, restaurante y parrilla en San Ramón, Alajuela,
Costa Rica. Único canal digital previo: Facebook e Instagram.

Hace tres cosas:

1. Presenta el negocio con información **real y verificable** — dirección,
   horarios, calificación de Google, ofertas vigentes.
2. Muestra el menú completo en dos formatos: cuadrícula y recorrido tipo reels.
3. Permite armar un pedido y **finalizarlo por WhatsApp**.

Es una **muestra gratuita** para ganar la cuenta. Eso condiciona el diseño: alto
impacto visual con alcance de trabajo acotado y **cero costo de operación**.

---

## 2. Cómo funciona el pedido

Esta es la pieza central y la que más gente pregunta. **No hay servidor, no hay
base de datos y no hay pasarela de pago.**

```
Menú (cuadrícula o reels)
        │  agregar
        ▼
Carrito  ── localStorage del dispositivo
        │  continuar
        ▼
Checkout ── nombre · teléfono · retiro o express
        │   dirección · ubicación GPS · método de pago
        ▼
Mensaje formateado
        │
        ▼
wa.me/50664901222?text=<pedido>
        │
        ▼
El cliente presiona ENVIAR → el restaurante cobra
```

### Lo que esto implica, dicho claro

**El pedido solo existe si el cliente presiona enviar en WhatsApp.** Si abandona
en esa pantalla, el restaurante nunca se entera y no hay métrica de pedidos
perdidos. Es una limitación **aceptada a cambio de cero infraestructura**, no un
descuido. Revisable si el cliente firma.

**El sitio no procesa pagos.** El método de pago (efectivo, Sinpe Móvil o
tarjeta) viaja en el mensaje para que el restaurante llegue preparado, pero
cobra él. El costo del express lo cobra el mensajero al llegar.

### La guarda de longitud

`wa.me` transporta el mensaje **dentro de la URL**. WhatsApp en iOS lo trunca
antes que otros clientes, y lo hace en silencio: el pedido llegaría incompleto y
nadie se enteraría.

Por eso `construirMensaje()` mide el texto **ya codificado** —no
`texto.length`— porque los acentos y el símbolo de colón se expanden al
codificar, y esa es la longitud real que viaja. Si supera 1.500 caracteres, el
checkout **avisa en pantalla y no abre WhatsApp**.

Hay pruebas que cubren este caso, incluida una con un pedido de 40 líneas.

---

## 3. Stack

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | Next.js 16, App Router | Renderiza HTML en el servidor. Para un negocio local eso es SEO y previsualizaciones de enlace en WhatsApp — un SPA mandaría un `<div>` vacío |
| Lenguaje | TypeScript estricto | Sin `any`, sin `.jsx` |
| Estilos | Tailwind CSS 4 | Config CSS-first con `@theme`, sin archivo de configuración JS |
| Animación | `motion` (Framer Motion) | **Bajo revisión**: ver §8 |
| Validación | Zod | Un solo schema tipa el formulario y valida |
| Datos estructurados | `schema-dts` | Tipa el JSON-LD; atrapó dos errores que Google habría ignorado en silencio |
| Pruebas | Vitest | Solo sobre lógica pura, ver §7 |
| Despliegue | Vercel | Estático, sin funciones de servidor |

**Cinco dependencias de producción**: `next`, `react`, `react-dom`, `motion`,
`zod`. Todo lo demás —iconos, carrusel, mapa, animaciones de fuego, barra de
desplazamiento— se resolvió con SVG y CSS propios.

---

## 4. Arquitectura de carpetas

**Feature-Based.** La regla dura: *una feature nunca importa de otra feature*.
Lo compartido sube a `shared/`. Cuando dos features necesitan hablarse, la
composición ocurre en `app/layout.tsx`.

```
src/
  app/                     rutas: solo metadata y composición, sin lógica
    layout.tsx             fuentes, JSON-LD, providers, navbar, pie
    page.tsx               inicio
    menu/page.tsx          cuadrícula
    menu/reels/page.tsx    recorrido tipo Shorts
    robots.ts  sitemap.ts

  features/
    landing/    hero, sobre nosotros, destacados, por qué, reseñas, ubicación
    ofertas/    promociones vigentes
    menu/       cuadrícula, tarjetas, hoja de detalle, datos del menú
    reels/      recorrido a pantalla completa, filtros, favoritos
    carrito/    reducer, persistencia, drawer, sugerencias
    checkout/   formulario, ubicación, direcciones guardadas, mensaje

  shared/
    components/ui/       primitivas + la hoja de detalle del plato
    components/layout/   navbar, pie, barra social, switch de vista
    config/negocio.ts    fuente única de los datos del negocio
    types/menu.ts        Plato, Media, CategoriaId, FiltroCatalogo
    lib/                 colones, almacén local, favoritos, detalle, JSON-LD
```

### Ejemplos concretos de la regla

- El carrito necesita saber qué platos existen para descartar los que ya no
  están en la carta. **No importa el menú**: recibe `idsDelMenu` como prop desde
  el layout.
- Las sugerencias del carrito muestran adicionales del menú. **Tampoco lo
  importan**: llegan como prop.
- Las brasas las usan el hero y los reels. Por eso viven en `shared/`, no en
  `landing/`.
- Los **tipos del dominio** (`Plato`, `Media`, `CategoriaId`) vivían en
  `features/menu/types`, y las otras cuatro features tenían que importarlos de
  ahí para poder hablar de un plato: la regla estaba rota de fábrica. Subieron a
  `shared/types/menu.ts`.
- Los **favoritos** nacieron en `reels/`, que fue donde se pidieron primero.
  Cuando el menú también los necesitó, subieron a `shared/lib/favoritos.ts` en
  vez de que el menú importara de reels.
- La **hoja de detalle del plato** se monta UNA vez en el layout, con
  `DetallePlatoProvider`. Antes vivía dentro del menú con estado local, así que
  solo abría ahí: en el inicio, tocar un destacado llevaba a `/menu` y el
  cliente tenía que buscar el plato otra vez entre treinta y cinco.

### Por qué los reels son una feature aparte

Empezaron siendo un modo dentro de `/menu` y se separaron a `/menu/reels`. Dos
razones:

1. **Recursos**: cada ruta carga solo su JavaScript. La cuadrícula no paga el
   código del recorrido ni al revés.
2. **Pantalla completa**: el recorrido se toma el viewport sin pelear con el
   layout del menú.

---

## 5. El contenido es dato, no código

Ningún texto, precio ni plato está incrustado en el JSX. Todo vive tipado en
`features/*/data/`. **Cambiar el menú o las ofertas es editar un archivo.**

| Archivo | Qué guarda | Estado |
|---|---|---|
| `shared/config/negocio.ts` | Dirección, coordenadas, horarios, WhatsApp, métodos de pago, IDs de Google | Real |
| `features/menu/data/menu.ts` | 35 platos con nombre y precio | Real (transcrito del menú impreso) |
| `features/ofertas/data/ofertas.ts` | 7 promociones con su letra chica | Real (de su Instagram) |
| `features/landing/data/resenas.ts` | 6 reseñas | Reales, transcritas literales |
| `features/landing/data/landing.ts` | Textos de secciones | Escritos por nosotros |

### Regla de integridad

**Precios, reseñas, calificaciones y horarios son reales o no se publican.**

Durante el desarrollo se rechazaron tres atajos, y quedaron documentados en el
código:

- Inventar reseñas con nombres de personas — viola las políticas de Google y
  expone al cliente.
- Poner un contador de "me gusta" con un número falso — se implementaron
  favoritos por dispositivo en su lugar.
- Mostrar una calificación estimada — se esperó a tener la real (4,6 sobre 59).

Lo que **sí** es provisional está marcado y documentado: las fotos de los platos
son de Wikimedia Commons, todas CC0 o dominio público, con su manifiesto de
licencias en `public/platos/fotos/LICENCIAS.json`.

---

## 6. Sistema visual

### Paleta 70/30/10

| Franja | Uso | Colores |
|---|---|---|
| 70% | Fondos | `#050505` · `#17100E` — **negro real** |
| 30% | Superficies, tarjetas, bordes | `#1A0F0D` · `#2A1512` · `#33201C` |
| 10% | CTAs, precios, estados activos | `#E35120` · `#E8771F` |

> La primera paleta salió del degradado de la **foto de perfil** del logo y se
> veía café y embarrada. Eso era el fondo de una foto, no la identidad: la marca
> real es la llama sobre negro. **No volver al café.**

### Contrastes medidos, no estimados

Sobre `#050505`: acento 5.30:1 · acento-alt 6.88:1 · blanco 20.1:1. Todo AA.

Dos reglas que salieron de medir:

- El rojo brasa `#A01010` queda en 2.50:1 — **decorativo, nunca texto**.
- Sobre degradados o superficies del 30%, el texto va **blanco**, no naranja: el
  naranja cae a 2.55:1 sobre el resplandor del hero.

### Animación

Todo anima **solo `transform` y `opacity`**, que van por GPU y no fuerzan
reflow. `prefers-reduced-motion` detiene todo.

El fuego —brasas, llama del logo, respiro de la curva— es **CSS puro, sin
JavaScript**. Los keyframes usan pasos deliberadamente irregulares: una llama
que late simétrica se lee como máquina.

> Hay una prueba (`shared/lib/animaciones.test.ts`) que verifica que toda
> animación invocada tenga su `@keyframes`. Existe porque una vez se borraron
> tres keyframes por arrastre y **nada falló**: ni el build, ni los tipos, ni el
> lint. La animación simplemente dejó de correr.

---

## 7. Estrategia de pruebas

**33 pruebas, todas sobre lógica pura.** No hay pruebas de componentes: para un
sitio de vitrina, verificar que un `<div>` renderiza es ceremonia sin retorno.

| Qué se prueba | Por qué |
|---|---|
| `formatoColones` | `toLocaleString('es-CR')` devuelve `17 000` con **espacio**, no con punto. Se hace a mano y la prueba lo fija |
| Reducer del carrito | Agregar duplicado incrementa, cantidad cero elimina, la nota sobrevive al cambio de cantidad |
| `construirMensaje` | Incluye todo, respeta la modalidad, y **detecta el exceso de longitud** |
| Privacidad de la ubicación | En retiro **no** se envía la ubicación del cliente |
| Animaciones | Toda animación usada tiene su keyframe definido |

---

## 8. Rendimiento — estado real

| Categoría Lighthouse | Puntaje | Estándar |
|---|---|---|
| Accesibilidad | 100 | ✓ |
| Prácticas recomendadas | 100 | ✓ |
| SEO | 100 | ✓ |
| **Rendimiento** | **~80** | ✗ (estándar: >95) |

### La causa está medida

Desglose del LCP:

| Fase | Tiempo |
|---|---|
| TTFB | 464 ms |
| Descarga de la imagen | 334 ms |
| **Retraso de pintado** | **4.401 ms** |

**No es peso de imágenes** — la imagen del hero se optimizó de 382 KB a 16 KB y
el CLS bajó a 0, pero el retraso no se movió. Son **4,4 segundos de JavaScript
hidratando**, y el sospechoso es Framer Motion con los componentes `Revelar`
repartidos por todo el sitio.

### El siguiente paso

Reemplazar Framer Motion por **IntersectionObserver + clases CSS**, que hace lo
mismo sin costo de hidratación. Separar los reels en su propia ruta ya empujó en
esa dirección.

---

## 9. SEO

- JSON-LD `Restaurant` con dirección, geo, horarios, calificación 4,6 sobre 59
  reseñas, rango de precios y métodos de pago. Todo real.
- JSON-LD `Menu` con las 4 secciones y los 35 platos con precio — es lo que
  permite que Google muestre la carta en el resultado.
- `metadata` por página, `robots.ts`, `sitemap.ts`, `llms.txt`.
- Imagen de compartir en 1200×630 con la calificación real. Facebook, WhatsApp y
  X la leen; **Instagram no genera vista previa de enlaces**.
- Alt text con patrón "Qué + Dónde" en toda imagen.

---

## 10. Decisiones que parecen raras y no lo son

**El mapa es un iframe de Google, no Leaflet.** Se intentó Leaflet para poder
poner el logo dentro del pin — el embed de Google no admite marcadores
personalizados. No prosperó: las teselas oscuras de CartoDB pasaron a exigir
llave y salían marcadas "API KEY REQUIRED" sobre todo el mapa.

**El carrito usa `useSyncExternalStore`, no `useEffect`.** Hidratar desde
`localStorage` con `setState` dentro de un efecto dispara la regla
`react-hooks/set-state-in-effect` de React 19 por provocar renders en cascada.
Con `useSyncExternalStore`, `localStorage` es el almacén real y React resuelve
solo el desajuste servidor/cliente.

**La vista de reels acepta video o imagen.** El campo `media` es una unión
discriminada. Hoy funciona con fotos y aceptará videos cuando el cliente los
grabe, sin reescribir el componente. Fue la decisión que evitó que la falta de
videos bloqueara la entrega.

**El formato de colones se hace a mano.** Ver §7.

**Las direcciones se guardan en el dispositivo.** Hasta cuatro, por uso
reciente, deduplicadas. Sin servidor, sin cuenta, y los datos nunca salen del
teléfono — que además es lo correcto en privacidad: son direcciones de casa.

---

## 11. Pendientes conocidos

| Qué | Bloqueado por |
|---|---|
| Rendimiento a >95 | Reemplazar Framer Motion por CSS |
| Desborde horizontal del inicio a 320 px | Falta identificar el elemento |
| Fotos reales de los platos | El cliente |
| Foto del local para "¿Por qué 5ta Avenida?" | El cliente |
| Carta de **bebidas** — se confirmó que sí venden | El cliente |
| Botón "+" en tarjetas de ofertas y destacados | Por hacer |
| Lista de ofertas dentro del menú | Por hacer |
| Fechas de vigencia de las ofertas | El cliente |
| Place ID de Google en formato ChIJ | El cliente |
| Videos para el recorrido de reels | El cliente |

---

## 12. Antes de desplegar

1. **`NEXT_PUBLIC_SITIO_URL`** en Vercel con el dominio real. Sin eso el
   sitemap, el JSON-LD y las previsualizaciones apuntan a
   `la5taavenida.vercel.app`.
2. Verificar que las fotos provisionales siguen siendo aceptables para el
   cliente, o reemplazarlas.
3. El registro de todo el texto visible es **usted**. Si se agrega copy nuevo,
   mantenerlo.
