import type { Plato } from "@/shared/types/menu";

/**
 * ============================================================================
 * OFERTAS REALES DE 5TA AVENIDA GRILL
 * ============================================================================
 * Transcritas de las publicaciones de su Instagram (@5ta_avenida_sanramon).
 * Nombres, precios y restricciones son los suyos.
 *
 * El "i.i" de sus artes significa IMPUESTOS INCLUIDOS: confirma que los precios
 * mostrados son finales.
 *
 * LAS FOTOS estan recortadas de esos mismos artes, dejando FUERA el titulo, el
 * precio, el logo y la franja de contacto: todo eso ya lo pone el sitio, y
 * duplicarlo dentro de la imagen se ve sucio.
 *
 * BEBIDAS: estas promos confirman que venden batidos, cerveza Imperial Cero y
 * Coca Cola, aunque el menu impreso no las lista. Falta pedir la carta.
 *
 * VIGENCIA: sus artes dicen "promocion por tiempo limitado" sin fecha, por eso
 * `hasta` queda en null. Cuando el cliente las de, `ofertasVigentes()` retira
 * sola la que venza.
 * ============================================================================
 */

export type Oferta = {
  id: string;
  titulo: string;
  detalle?: string;
  /** Precio de la promocion, en colones. Impuestos incluidos. */
  precio: number;
  /** Etiqueta corta para el badge, ej. "2x1" o "-22%". */
  gancho?: string;
  /** Lo que el arte del cliente aclara en letra chica. */
  restriccion?: string;
  /** Foto recortada del arte original. */
  foto: string;
  /** null = sin fecha de fin conocida. */
  hasta: string | null;
};

export const ofertas: Oferta[] = [
  {
    id: "costilla-2x1",
    titulo: "2 Costilla Burger",
    detalle: "De costilla de ternera de res · Viernes",
    precio: 3500,
    gancho: "2x1",
    restriccion: "Carne solo de ternera.",
    foto: "/ofertas/costilla-2x1.webp",
    hasta: null,
  },
  {
    id: "tradicional-2x",
    titulo: "2 Hamburguesas Tradicionales",
    precio: 3000,
    gancho: "2x",
    restriccion: "No incluye papas. Aplican restricciones.",
    foto: "/ofertas/tradicional-2x.webp",
    hasta: null,
  },
  {
    id: "combo-cheese",
    titulo: "Cheeseburger + papas + Imperial Cero",
    precio: 4950,
    gancho: "Combo",
    restriccion: "Cerveza sin alcohol.",
    foto: "/ofertas/combo-cheese.webp",
    hasta: null,
  },
  {
    id: "nuggets-coca",
    titulo: "Nuggets de chicharrón + Coca Cola",
    detalle: "Refresco de 355 ml",
    precio: 3900,
    gancho: "Combo",
    foto: "/ofertas/nuggets-coca.webp",
    hasta: null,
  },
  {
    id: "cartuchos-2",
    titulo: "2 Cartuchos",
    detalle: "De res con papas",
    precio: 3900,
    gancho: "-22%",
    foto: "/ofertas/cartuchos-2.webp",
    hasta: null,
  },
  {
    id: "tacos-ticos",
    titulo: "2 Tacos Ticos",
    precio: 3000,
    gancho: "2x",
    foto: "/ofertas/tacos-ticos.webp",
    hasta: null,
  },
  {
    id: "salchipapas-2",
    titulo: "2 Salchipapas",
    precio: 3500,
    gancho: "2x",
    restriccion: "No incluye bebida.",
    foto: "/ofertas/salchipapas-2.webp",
    hasta: null,
  },
  {
    id: "batidos-2x",
    titulo: "2 Batidos a escoger",
    precio: 2000,
    gancho: "2x",
    foto: "/ofertas/batidos-2x.webp",
    hasta: null,
  },
  {
    id: "pincho",
    titulo: "Un Pincho",
    detalle: "Un palillo con carne de cerdo",
    precio: 1000,
    gancho: "-26%",
    foto: "/ofertas/pincho.webp",
    hasta: null,
  },
];

/**
 * Devuelve las ofertas que siguen en pie. Una oferta con `hasta` vencido
 * desaparece sola: nada peor que un sitio anunciando una promo que ya no existe.
 */
export function ofertasVigentes(hoy: Date = new Date()): Oferta[] {
  return ofertas.filter((o) => !o.hasta || new Date(o.hasta) >= hoy);
}

/**
 * Convierte una oferta en la forma que entiende el carrito.
 *
 * Se reutiliza el tipo `Plato` en vez de inventar un tipo paralelo: el carrito,
 * el checkout y el mensaje de WhatsApp ya saben tratar platos, y una promocion
 * no es mas que una linea con nombre y precio. El prefijo `oferta-` en el id
 * evita que choque con un plato del menu que se llame parecido.
 */
export function ofertaComoPlato(o: Oferta): Plato {
  return {
    id: `oferta-${o.id}`,
    nombre: o.gancho ? `${o.titulo} (${o.gancho})` : o.titulo,
    descripcion: [o.detalle, o.restriccion].filter(Boolean).join(" · "),
    ingredientes: [],
    precio: o.precio,
    categoria: "ofertas",
    media: {
      tipo: "imagen",
      src: o.foto,
      alt: `${o.titulo} en 5ta Avenida Grill, San Ramón`,
    },
    disponible: true,
  };
}
