import type { Plato } from "@/shared/types/menu";

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
 * FOTOS: la de "mar-y-tierra" es REAL (portada de su Facebook). El resto son
 * provisionales de Wikimedia Commons, todas CC0 o dominio publico — ver
 * public/platos/fotos/LICENCIAS.json. NO son la comida del cliente:
 * reemplazarlas por fotos del local antes de publicar.
 * ============================================================================
 */

/**
 * Fotos PROVISIONALES de Wikimedia Commons, todas CC0 o dominio publico.
 * Ver public/platos/fotos/LICENCIAS.json para el detalle de cada archivo.
 * NO son la comida del cliente: reemplazar por fotos reales del local.
 */
const FOTOS = "/platos/fotos";

export const menu: Plato[] = [
  // ---------------------------------------------------------------- burgers
  {
    id: "mar-y-tierra",
    nombre: "Mar y Tierra Burger",
    descripcion:
      "Carne a la parrilla y camarones al ajillo sobre pan artesanal. Mar y tierra en un solo mordisco, y la que sale en todas las fotos.",
    ingredientes: [],
    precio: 4200,
    categoria: "hamburguesas",
    media: {
      // Unica foto REAL de comida. El recorte transparente (FOTO_BURGER) es
      // para el fondo del hero; en una tarjeta 4:3 se recortaba mal y quedaba
      // casi todo transparente. Esta version esta compuesta sobre fondo y
      // encuadrada para miniatura.
      tipo: "imagen",
      src: `${FOTOS}/mar-y-tierra.webp`,
      alt: "Mar y Tierra Burger con camarones en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "angus",
    nombre: "Angus",
    descripcion:
      "Nuestra Angus: carne de res jugosa, sellada a la parrilla y servida en pan artesanal recién horneado. La más pedida de la casa.",
    ingredientes: [],
    precio: 5500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/angus.webp`,
      alt: "Hamburguesa Angus en pan artesanal en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "pulled-pork",
    nombre: "Pulled Pork",
    descripcion:
      "Cerdo cocinado lento hasta deshacerse solo, en pan artesanal. Suave, ahumado y generoso.",
    ingredientes: [],
    precio: 4200,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/pulled-pork.webp`,
      alt: "Hamburguesa de cerdo mechado en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "costilla-burger",
    nombre: "Costilla Burger",
    descripcion:
      "Costilla de cerdo tierna en pan artesanal. Para quien quiere sabor de parrilla sin soltar la hamburguesa.",
    ingredientes: [],
    precio: 3500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/costilla-burger.webp`,
      alt: "Hamburguesa de costilla en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "doble-torta",
    nombre: "Doble Torta",
    descripcion:
      "Doble carne a la parrilla en pan artesanal. Cuando una no alcanza.",
    ingredientes: [],
    precio: 3500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/doble-torta.webp`,
      alt: "Hamburguesa doble torta en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "cheeseburger",
    nombre: "Cheeseburger",
    descripcion:
      "La clásica que nunca falla: carne a la parrilla y queso derretido en pan artesanal.",
    ingredientes: [],
    precio: 3500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/cheeseburger.webp`,
      alt: "Cheeseburger en pan artesanal en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "de-pollo",
    nombre: "D' Pollo",
    descripcion:
      "Pollo dorado y jugoso en pan artesanal. Ligera de nombre, contundente de sabor.",
    ingredientes: [],
    precio: 2500,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/de-pollo.webp`,
      alt: "Hamburguesa de pollo en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "tradicional",
    nombre: "Tradicional",
    descripcion:
      "La de toda la vida, en pan artesanal. Simple, honesta y bien servida.",
    ingredientes: [],
    precio: 2000,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/tradicional.webp`,
      alt: "Hamburguesa tradicional en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "economica",
    nombre: "Económica",
    descripcion:
      "Nuestra opción más accesible, con el mismo sabor de la parrilla. Rinde y no falla.",
    ingredientes: [],
    precio: 1000,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/economica.webp`,
      alt: "Hamburguesa económica en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },

  // ------------------------------------------------------------------ grill
  {
    id: "surtida-grande",
    nombre: "Surtida 5ta Avenida (Grande)",
    descripcion:
      "La picada de la casa para compartir en grande: carnes surtidas directo de la parrilla con sus acompañamientos. Pensada para la mesa completa.",
    ingredientes: [],
    precio: 13000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/surtida-grande.webp`,
      alt: "Surtida 5ta Avenida grande para compartir en San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "surtida-pequena",
    nombre: "Surtida 5ta Avenida (Pequeña)",
    descripcion:
      "La misma picada de la casa, en porción para dos. Todo el sabor, la mitad del compromiso.",
    ingredientes: [],
    precio: 7500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/surtida-pequena.webp`,
      alt: "Surtida 5ta Avenida pequeña en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "taco-birria",
    nombre: "Taco de Birria (3 unidades)",
    descripcion:
      "Tres tacos de birria jugosos, con la carne deshebrada y bien sazonada. De los que se piden de a dos órdenes.",
    ingredientes: [],
    precio: 4900,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/taco-birria.webp`,
      alt: "Tacos de birria en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "costilla-cerdo",
    nombre: "Costilla de cerdo",
    descripcion:
      "Costilla de cerdo a la parrilla, tierna hasta soltarse del hueso. Puro carbón y paciencia.",
    ingredientes: [],
    precio: 4200,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/costilla-cerdo.webp`,
      alt: "Costilla de cerdo a la parrilla en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "papas-mixtas",
    nombre: "Papas Mixtas",
    descripcion:
      "Nuestras papas mixtas, cargadas y listas para compartir. El acompañamiento que siempre se pide de más.",
    ingredientes: [],
    precio: 4000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/papas-mixtas.webp`,
      alt: "Papas mixtas en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "nachos-mixtos",
    nombre: "Nachos Mixtos",
    descripcion:
      "Tortillas crujientes bien cargadas, mixtas y para compartir. De los favoritos en las reseñas.",
    ingredientes: [],
    precio: 4000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/nachos-mixtos.webp`,
      alt: "Nachos mixtos en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "nachos",
    nombre: "Nachos",
    descripcion:
      "Tortillas crujientes con todo encima. El comienzo perfecto mientras llega lo demás.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/nachos.webp`,
      alt: "Nachos en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "nuggets",
    nombre: "Nuggets",
    descripcion:
      "Nuggets de pollo dorados por fuera y jugosos por dentro. Los que gustan a todos.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/nuggets.webp`,
      alt: "Nuggets de pollo en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "alitas",
    nombre: "Alitas (6 unidades)",
    descripcion:
      "Seis alitas de pollo doradas al punto. Para arrancar la noche o para no compartir.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/alitas.webp`,
      alt: "Alitas de pollo en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "papas-especiales",
    nombre: "Papas Especiales",
    descripcion:
      "Nuestras papas especiales, con la sazón de la casa. Doradas, crujientes y difíciles de dejar.",
    ingredientes: [],
    precio: 3500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/papas-especiales.webp`,
      alt: "Papas especiales en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "pinchos",
    nombre: "Pinchos (2 unidades)",
    descripcion:
      "Dos pinchos hechos a la parrilla, jugosos y bien sazonados. Directo del carbón al plato.",
    ingredientes: [],
    precio: 3000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/pinchos.webp`,
      alt: "Pinchos a la parrilla en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "canasta-chicharron",
    nombre: "Canasta de chicharrón",
    descripcion:
      "Canasta de chicharrón crujiente, servida bien caliente. Tradición tica en su mejor versión.",
    ingredientes: [],
    precio: 2800,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/canasta-chicharron.webp`,
      alt: "Canasta de chicharrón en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "cartucho",
    nombre: "Cartucho",
    descripcion:
      "Nuestro cartucho de la casa: para llevar, para picar y para compartir.",
    ingredientes: [],
    precio: 2500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/cartucho.webp`,
      alt: "Cartucho en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "salchipapas",
    nombre: "Salchipapas",
    descripcion:
      "Salchichas y papas doradas juntas, como debe ser. Sencillo y siempre acertado.",
    ingredientes: [],
    precio: 2300,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/salchipapas.webp`,
      alt: "Salchipapas en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "taco-tico",
    nombre: "Taco Tico",
    descripcion:
      "Nuestro taco tico, crujiente y bien servido. El clásico de barrio hecho como se debe.",
    ingredientes: [],
    precio: 2000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/taco-tico.webp`,
      alt: "Taco tico en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    // Transcripcion dudosa: la imagen dice "Empada Arreglada".
    id: "empanada-arreglada",
    nombre: "Empanada Arreglada",
    descripcion:
      "Empanada arreglada, servida bien caliente y con todo lo que lleva. Un antojo completo.",
    ingredientes: [],
    precio: 2000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/empanada-arreglada.webp`,
      alt: "Empanada arreglada en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    // Transcripcion dudosa: la imagen dice "Choripáti".
    id: "choripan",
    nombre: "Choripán",
    descripcion:
      "Chorizo a la parrilla en pan. Directo, humeante y sin vueltas.",
    ingredientes: [],
    precio: 1500,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/choripan.webp`,
      alt: "Choripán en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "empanada",
    nombre: "Empanada",
    descripcion:
      "Empanada recién hecha, dorada y caliente. El antojo rápido de siempre.",
    ingredientes: [],
    precio: 1000,
    categoria: "grill",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/empanada.webp`,
      alt: "Empanada en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },

  // --------------------------------------------------------------- infantil
  {
    id: "mini-papas-mixtas",
    nombre: "Mini papas mixtas",
    descripcion:
      "Porción infantil de nuestras papas mixtas. Del tamaño justo para los peques.",
    ingredientes: [],
    precio: 2500,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/papas-mixtas.webp`,
      alt: "Mini papas mixtas para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-nachos-mixtos",
    nombre: "Mini Nachos Mixtos",
    descripcion:
      "Nachos mixtos en porción pequeña, pensados para los más chicos de la mesa.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/nachos-mixtos.webp`,
      alt: "Mini nachos mixtos para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-salchipapas",
    nombre: "Mini Salchipapas",
    descripcion:
      "Salchipapas en tamaño infantil. Las favoritas de la casa, en versión pequeña.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/salchipapas.webp`,
      alt: "Mini salchipapas para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-nuggets",
    nombre: "Mini nuggets con papas",
    descripcion:
      "Nuggets con papas en porción infantil. La combinación que nunca falla con los niños.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/nuggets.webp`,
      alt: "Mini nuggets con papas para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-papas-especiales",
    nombre: "Mini papas especiales",
    descripcion:
      "Nuestras papas especiales en porción infantil. Mismo sabor, tamaño para peques.",
    ingredientes: [],
    precio: 2000,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/papas-especiales.webp`,
      alt: "Mini papas especiales para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "mini-nachos",
    nombre: "Mini Nachos",
    descripcion:
      "Nachos en porción infantil, crujientes y fáciles de compartir.",
    ingredientes: [],
    precio: 1500,
    categoria: "infantil",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/nachos.webp`,
      alt: "Mini nachos para niños en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },

  // ------------------------------------------------------------ adicionales
  {
    id: "papas-gajos",
    nombre: "Orden de papas en gajos",
    descripcion:
      "Papas en gajo, doradas por fuera y suaves por dentro. Las que mencionan en las reseñas.",
    ingredientes: [],
    precio: 1500,
    categoria: "adicionales",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/papas-gajos.webp`,
      alt: "Orden de papas en gajos en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "papas-pequenas",
    nombre: "Orden de papas pequeñas",
    descripcion:
      "Porción pequeña de papas doradas. El acompañamiento justo para cualquier plato.",
    ingredientes: [],
    precio: 800,
    categoria: "adicionales",
    media: {
      tipo: "imagen",
      src: `${FOTOS}/papas-pequenas.webp`,
      alt: "Orden de papas pequeñas en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
];

export const platosDestacados = menu.filter((p) => p.destacado && p.disponible);

export function platosPorCategoria(categoria: Plato["categoria"]): Plato[] {
  return menu.filter((p) => p.categoria === categoria);
}
