import { negocio } from "@/shared/config/negocio";

/**
 * ============================================================================
 * RESENAS REALES DE GOOGLE
 * ============================================================================
 * Transcritas literalmente de la ficha del negocio (2026-09-02). La ficha tiene
 * 4,6 estrellas sobre 59 resenas; esos numeros viven en `negocio.google`.
 *
 * Se conservan TAL CUAL las escribieron sus autores, con sus tildes faltantes y
 * su puntuacion. No se corrigen: son citas atribuidas a personas reales y
 * cualquiera las contrasta en Google en dos clics. Editarlas seria falsearlas.
 *
 * NO INVENTAR resenas nuevas por la misma razon.
 *
 * ---------------------------------------------------------------------------
 * EXCLUIDA A PROPOSITO
 * ---------------------------------------------------------------------------
 * La resena de "ernesto mayorga" (5 estrellas, hace un ano) existe y es real,
 * pero no se incluye: su texto responde a otra resena que acusaba al local de
 * causar una intoxicacion. Fuera de ese hilo se lee como si el propio
 * restaurante sacara el tema de que alguien se enfermo. Es contraproducente
 * como material de marketing, no una cuestion de ocultar una critica: la
 * resena es POSITIVA. Si el cliente la quiere, se agrega.
 * ============================================================================
 */

export type Resena = {
  autor: string;
  /** Distintivo de Google, ej. "Local Guide · 55 resenas" */
  credencial?: string;
  estrellas: 1 | 2 | 3 | 4 | 5;
  texto: string;
  fecha: string;
};

export const resenas: Resena[] = [
  {
    autor: "Leiner Barrantes",
    credencial: "Local Guide · 55 reseñas",
    estrellas: 5,
    texto:
      "Las mejores hamburguesas de 1000 de San Ramón. Aunque el pan es pequeño, la torta es la mejor, son las que traen más papas y además vienen con tomate y pepinillos.",
    fecha: "Hace 3 meses",
  },
  {
    autor: "Jonatan Quesada",
    credencial: "Local Guide · 112 reseñas",
    estrellas: 5,
    texto:
      "Pedimos una surtida para 8 personas, lo recomiendo, muy buena estaba",
    fecha: "Hace 8 meses",
  },
  {
    autor: "Carlos Fonseca",
    credencial: "14 reseñas",
    estrellas: 5,
    texto:
      "Son rápidos y sinceros para decirte que van a durar mas de lo esperado eso lo aprecio. Precio vs Calidad muy bien.",
    fecha: "Hace 8 meses",
  },
  {
    autor: "Noelia Romo",
    credencial: "Local Guide · 28 reseñas",
    estrellas: 5,
    texto: "Muy rico y las hamburguesas 🤤🤤🤤🤤",
    fecha: "Hace 6 meses",
  },
  {
    autor: "Melvin Otárola",
    credencial: "8 reseñas",
    estrellas: 5,
    texto: "Me encanta las papas gajo y los nachos",
    fecha: "Hace 7 meses",
  },
  {
    autor: "Leandro Lizano",
    credencial: "Local Guide · 20 reseñas",
    estrellas: 4,
    texto: "Delicioso, la surtida es muy buena",
    fecha: "Hace 8 meses",
  },
];

/** Enlace a la ficha en Google Maps, donde se deja o se lee una resena. */
export function enlaceResena(): string {
  return `https://www.google.com/maps?cid=${negocio.google.cid}`;
}

export function enlaceFichaGoogle(): string {
  return `https://www.google.com/maps?cid=${negocio.google.cid}`;
}
