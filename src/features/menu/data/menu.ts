import type { Plato } from "../types";

/**
 * ============================================================================
 * DEMO — CONTENIDO PROVISIONAL
 * ============================================================================
 * PLATOS CONFIRMADOS (nombre real, precio todavia DEMO):
 *   - "la-quinta": la hamburguesa de la foto de portada de su Facebook.
 *   - "la-surtida": la nombran Jonatan Quesada y Leandro Lizano en sus resenas.
 *   - "papas-gajo" y "nachos-parrilla": los nombra Melvin Otarola.
 *
 * El resto son platos de grill costarricense verosimiles, puestos para que la
 * muestra se vea completa. Los PRECIOS son todos inventados: la ficha de Google
 * solo dice ₡5.000-10.000 por persona.
 *
 * NADA de esto es el menu real. Reemplazar en cuanto el cliente entregue sus
 * platos, precios y fotos. Los componentes no se tocan: solo este archivo.
 *
 * Los textos `alt` siguen el patron "Que + Donde" que exige el SEO local.
 * Mientras no haya fotos reales, `media.src` apunta al marcador de la marca.
 * ============================================================================
 */

const FOTO_PENDIENTE = "/platos/placeholder.svg";

export const menu: Plato[] = [
  {
    id: "la-quinta",
    nombre: "La 5ta Avenida",
    descripcion:
      "La hamburguesa de la casa: carne a la parrilla, cerdo mechado en salsa BBQ y camarones al ajillo, todo en pan artesanal.",
    ingredientes: [
      "Carne de res a la parrilla",
      "Cerdo mechado en BBQ",
      "Camarones al ajillo",
      "Tomate, lechuga y pepinillo",
      "Pan artesanal con ajonjolí",
    ],
    precio: 9500,
    categoria: "hamburguesas",
    media: {
      // Unica foto REAL que tenemos, recortada de la portada de Facebook.
      tipo: "imagen",
      src: "/platos/hamburguesa-5ta.webp",
      alt: "Hamburguesa La 5ta Avenida con camarones en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "smash-doble",
    nombre: "Smash Doble",
    descripcion:
      "Dos tortas de res prensadas en plancha caliente, doble queso y cebolla caramelizada.",
    ingredientes: ["Doble carne de res", "Doble queso amarillo", "Cebolla caramelizada", "Salsa de la casa"],
    precio: 7800,
    categoria: "hamburguesas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Hamburguesa Smash Doble a la plancha en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "costilla-bbq",
    nombre: "Costillas BBQ",
    descripcion:
      "Costilla de cerdo cocinada lenta hasta soltarse del hueso, glaseada en BBQ ahumado.",
    ingredientes: ["Costilla de cerdo", "Salsa BBQ ahumada", "Papas rústicas", "Ensalada de repollo"],
    precio: 11500,
    categoria: "costillas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Costillas de cerdo en salsa BBQ a la parrilla en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    id: "alitas-buffalo",
    nombre: "Alitas Buffalo",
    descripcion: "Ocho alitas crujientes bañadas en salsa buffalo, con aderezo ranch.",
    ingredientes: ["8 alitas de pollo", "Salsa buffalo", "Aderezo ranch", "Bastones de apio"],
    precio: 6900,
    categoria: "alitas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Alitas de pollo en salsa buffalo en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    // PLATO REAL: dos resenas de Google la mencionan por nombre.
    // "Pedimos una surtida para 8 personas, lo recomiendo" — Jonatan Quesada
    // "Delicioso, la surtida es muy buena" — Leandro Lizano
    // El precio y la composicion siguen siendo DEMO.
    id: "la-surtida",
    nombre: "La Surtida",
    descripcion:
      "La picada para compartir: carnes surtidas, papas gajo, chicharrón y salsas de la casa. Pensada para grupo.",
    ingredientes: [
      "Carnes surtidas a la parrilla",
      "Papas gajo",
      "Chicharrón",
      "Salsas de la casa",
    ],
    precio: 24000,
    categoria: "bocas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "La Surtida para compartir en 5ta Avenida Grill, San Ramón",
    },
    destacado: true,
    disponible: true,
  },
  {
    // PLATO REAL: "Me encanta las papas gajo y los nachos" — Melvin Otárola
    id: "papas-gajo",
    nombre: "Papas Gajo",
    descripcion: "Papas en gajo doradas, con salsa de la casa.",
    ingredientes: ["Papas en gajo", "Especias de la casa", "Salsa para acompañar"],
    precio: 3200,
    categoria: "bocas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Papas gajo doradas en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "chicharron",
    nombre: "Boca de Chicharrón",
    descripcion: "Chicharrón de cerdo con yuca frita, chimichurri y limón.",
    ingredientes: ["Chicharrón de cerdo", "Yuca frita", "Chimichurri", "Limón"],
    precio: 5800,
    categoria: "bocas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Boca de chicharrón con yuca frita en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    // PLATO REAL: "Me encanta las papas gajo y los nachos" — Melvin Otárola
    id: "nachos-parrilla",
    nombre: "Nachos de la Parrilla",
    descripcion: "Tortillas crujientes con carne a la parrilla, queso fundido y pico de gallo.",
    ingredientes: ["Tortillas de maíz", "Carne a la parrilla", "Queso fundido", "Pico de gallo", "Natilla"],
    precio: 6500,
    categoria: "bocas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Nachos con carne a la parrilla en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "limonada-hierbabuena",
    nombre: "Limonada con Hierbabuena",
    descripcion: "Limonada natural batida al momento con hierbabuena fresca.",
    ingredientes: ["Limón criollo", "Hierbabuena", "Hielo"],
    precio: 2200,
    categoria: "bebidas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Limonada natural con hierbabuena en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "cerveza-nacional",
    nombre: "Cerveza Nacional",
    descripcion: "Botella bien fría.",
    ingredientes: ["Cerveza nacional 350 ml"],
    precio: 2000,
    categoria: "bebidas",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Cerveza nacional fría en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
  {
    id: "brownie-helado",
    nombre: "Brownie con Helado",
    descripcion: "Brownie tibio de chocolate con una bocha de helado de vainilla.",
    ingredientes: ["Brownie de chocolate", "Helado de vainilla", "Salsa de chocolate"],
    precio: 3500,
    categoria: "postres",
    media: {
      tipo: "imagen",
      src: FOTO_PENDIENTE,
      alt: "Brownie de chocolate con helado en 5ta Avenida Grill, San Ramón",
    },
    disponible: true,
  },
];

export const platosDestacados = menu.filter((p) => p.destacado && p.disponible);

export function platosPorCategoria(categoria: Plato["categoria"]): Plato[] {
  return menu.filter((p) => p.categoria === categoria);
}
