import type { Plato } from "../types";

/**
 * ============================================================================
 * MENU REAL DE 5TA AVENIDA GRILL
 * ============================================================================
 * Transcrito del menu impreso que compartio el cliente el 2026-09-02
 * ("NUEVO MENÚ"). Los NOMBRES y los PRECIOS son los suyos, no inventados.
 *
 * Lo que SI se escribio aqui son las DESCRIPCIONES: el menu impreso solo lista
 * nombre y precio. Se mantienen cortas y sin afirmar ingredientes que no
 * constan, justamente para no inventar la composicion de los platos. Conviene
 * que el cliente las revise y las amplie.
 *
 * `ingredientes` queda vacio salvo donde el propio nombre lo dice.
 *
 * DUDAS DE TRANSCRIPCION (confirmar con el cliente):
 *   - "Choripán": en la imagen se lee "Choripáti", que no es palabra.
 *   - "Empanada Arreglada": en la imagen se lee "Empada Arreglada".
 *
 * FOTOS: solo existe la de la hamburguesa de portada. El resto usa el marcador
 * de marca. Sustituir `FOTO_PENDIENTE` conforme lleguen.
 * ============================================================================
 */

const FOTO_PENDIENTE = "/platos/placeholder.svg";
const FOTO_BURGER = "/platos/hamburguesa-5ta.webp";

export const menu: Plato[] = [
  // ---------------------------------------------------------------- burgers
  {
    id: "mar-y-tierra",
    nombre: "Mar y Tierra Burger",
    descripcion:
      "Carne a la parrilla y camarones sobre pan artesanal. La de la foto.",
    ingredientes: [],
    precio: 4200,
    categoria: "hamburguesas",
    media: {
      // Unica foto real: coincide con la portada de su Facebook.
      tipo: "imagen",
      src: FOTO_BURGER,
      alt: "Mar y Tierra Burger con camarones en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "angus",
    nombre: "Angus",
    descripcion: "Carne Angus en pan artesanal.",
    ingredientes: [],
    precio: 5500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa Angus en pan artesanal en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "pulled-pork",
    nombre: "Pulled Pork",
    descripcion: "Cerdo mechado en pan artesanal.",
    ingredientes: [],
    precio: 4200,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa de cerdo mechado en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "costilla-burger",
    nombre: "Costilla Burger",
    descripcion: "Costilla de cerdo en pan artesanal.",
    ingredientes: [],
    precio: 3500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa de costilla en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "doble-torta",
    nombre: "Doble Torta",
    descripcion: "Doble carne en pan artesanal.",
    ingredientes: [],
    precio: 3500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa doble torta en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "cheeseburger",
    nombre: "Cheeseburger",
    descripcion: "Con queso, en pan artesanal.",
    ingredientes: [],
    precio: 3500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Cheeseburger en pan artesanal en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "de-pollo",
    nombre: "D' Pollo",
    descripcion: "De pollo, en pan artesanal.",
    ingredientes: [],
    precio: 2500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa de pollo en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "tradicional",
    nombre: "Tradicional",
    descripcion: "La de siempre, en pan artesanal.",
    ingredientes: [],
    precio: 2000,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa tradicional en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "economica",
    nombre: "Económica",
    descripcion: "La opción más accesible del menú.",
    ingredientes: [],
    precio: 1000,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa económica en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },

  // ------------------------------------------------------------------ grill
  {
    id: "surtida-grande",
    nombre: "Surtida 5ta Avenida (Grande)",
    descripcion:
      "La picada de la casa para compartir. Dos reseñas de Google la recomiendan para grupo.",
    ingredientes: [],
    precio: 13000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Surtida 5ta Avenida grande para compartir en San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "surtida-pequena",
    nombre: "Surtida 5ta Avenida (Pequeña)",
    descripcion: "La misma picada de la casa, en porción pequeña.",
    ingredientes: [],
    precio: 7500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Surtida 5ta Avenida pequeña en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "taco-birria",
    nombre: "Taco de Birria (3 unidades)",
    descripcion: "Tres tacos de birria.",
    ingredientes: [],
    precio: 4900,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Tacos de birria en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "costilla-cerdo",
    nombre: "Costilla de cerdo",
    descripcion: "Costilla de cerdo a la parrilla.",
    ingredientes: [],
    precio: 4200,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Costilla de cerdo a la parrilla en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "papas-mixtas",
    nombre: "Papas Mixtas",
    descripcion: "Papas mixtas de la casa.",
    ingredientes: [],
    precio: 4000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Papas mixtas en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "nachos-mixtos",
    nombre: "Nachos Mixtos",
    descripcion: "Nachos mixtos. Los mencionan en las reseñas de Google.",
    ingredientes: [],
    precio: 4000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Nachos mixtos en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "nachos",
    nombre: "Nachos",
    descripcion: "Nachos de la casa.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Nachos en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "nuggets",
    nombre: "Nuggets",
    descripcion: "Nuggets de pollo.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Nuggets de pollo en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "alitas",
    nombre: "Alitas (6 unidades)",
    descripcion: "Seis alitas de pollo.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Alitas de pollo en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "papas-especiales",
    nombre: "Papas Especiales",
    descripcion: "Papas especiales de la casa.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Papas especiales en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "pinchos",
    nombre: "Pinchos (2 unidades)",
    descripcion: "Dos pinchos a la parrilla.",
    ingredientes: [],
    precio: 3000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Pinchos a la parrilla en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "canasta-chicharron",
    nombre: "Canasta de chicharrón",
    descripcion: "Canasta de chicharrón.",
    ingredientes: [],
    precio: 2800,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Canasta de chicharrón en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "cartucho",
    nombre: "Cartucho",
    descripcion: "Cartucho de la casa.",
    ingredientes: [],
    precio: 2500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Cartucho en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "salchipapas",
    nombre: "Salchipapas",
    descripcion: "Salchichas con papas.",
    ingredientes: [],
    precio: 2300,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Salchipapas en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "taco-tico",
    nombre: "Taco Tico",
    descripcion: "Taco tico de la casa.",
    ingredientes: [],
    precio: 2000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Taco tico en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    // Transcripcion dudosa: la imagen dice "Empada Arreglada".
    id: "empanada-arreglada",
    nombre: "Empanada Arreglada",
    descripcion: "Empanada arreglada.",
    ingredientes: [],
    precio: 2000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Empanada arreglada en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    // Transcripcion dudosa: la imagen dice "Choripáti".
    id: "choripan",
    nombre: "Choripán",
    descripcion: "Chorizo en pan.",
    ingredientes: [],
    precio: 1500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Choripán en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "empanada",
    nombre: "Empanada",
    descripcion: "Empanada de la casa.",
    ingredientes: [],
    precio: 1000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Empanada en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },

  // --------------------------------------------------------------- infantil
  {
    id: "mini-papas-mixtas",
    nombre: "Mini papas mixtas",
    descripcion: "Porción infantil de papas mixtas.",
    ingredientes: [],
    precio: 2500,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Mini papas mixtas para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-nachos-mixtos",
    nombre: "Mini Nachos Mixtos",
    descripcion: "Porción infantil de nachos mixtos.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Mini nachos mixtos para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-salchipapas",
    nombre: "Mini Salchipapas",
    descripcion: "Porción infantil de salchipapas.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Mini salchipapas para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-nuggets",
    nombre: "Mini nuggets con papas",
    descripcion: "Porción infantil de nuggets con papas.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Mini nuggets con papas para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-papas-especiales",
    nombre: "Mini papas especiales",
    descripcion: "Porción infantil de papas especiales.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Mini papas especiales para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-nachos",
    nombre: "Mini Nachos",
    descripcion: "Porción infantil de nachos.",
    ingredientes: [],
    precio: 1500,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Mini nachos para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },

  // ------------------------------------------------------------ adicionales
  {
    id: "papas-gajos",
    nombre: "Orden de papas en gajos",
    descripcion: "Papas en gajo. Las mencionan en las reseñas de Google.",
    ingredientes: [],
    precio: 1500,
    categoria: "adicionales",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Orden de papas en gajos en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "papas-pequenas",
    nombre: "Orden de papas pequeñas",
    descripcion: "Porción pequeña de papas.",
    ingredientes: [],
    precio: 800,
    categoria: "adicionales",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Orden de papas pequeñas en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
];

export const platosDestacados = menu.filter((p) => p.destacado && p.disponible);

export function platosPorCategoria(categoria: Plato["categoria"]): Plato[] {
  return menu.filter((p) => p.categoria === categoria);
}
