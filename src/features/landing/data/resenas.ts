import { negocio } from "@/shared/config/negocio";

/**
 * ============================================================================
 * ATENCION — CONTENIDO DE EJEMPLO, NO PUBLICAR ASI
 * ============================================================================
 * Estas NO son resenas reales. Son marcadores de posicion para que la muestra
 * tenga la seccion armada.
 *
 * ANTES DE PUBLICAR hay que reemplazarlas por las resenas reales del perfil de
 * Google del negocio. Publicar resenas inventadas con nombres de personas en un
 * negocio real es fraudulento: viola las politicas de Google (puede costar la
 * suspension del perfil) y expone al cliente frente a la ley de proteccion al
 * consumidor. No dejar esto en produccion.
 *
 * Para automatizarlo mas adelante hace falta el Place ID del negocio y la
 * Google Places API.
 * ============================================================================
 */

export type Resena = {
  autor: string;
  estrellas: 1 | 2 | 3 | 4 | 5;
  texto: string;
  fecha: string;
};

export const resenasEjemplo: Resena[] = [
  {
    autor: "Reseña de ejemplo",
    estrellas: 5,
    texto:
      "Aquí va una reseña real del perfil de Google del negocio. Reemplazar antes de publicar.",
    fecha: "Pendiente",
  },
  {
    autor: "Reseña de ejemplo",
    estrellas: 5,
    texto:
      "Aquí va una reseña real del perfil de Google del negocio. Reemplazar antes de publicar.",
    fecha: "Pendiente",
  },
  {
    autor: "Reseña de ejemplo",
    estrellas: 4,
    texto:
      "Aquí va una reseña real del perfil de Google del negocio. Reemplazar antes de publicar.",
    fecha: "Pendiente",
  },
];


/**
 * Enlace a la ficha del negocio en Google Maps, donde se deja la resena.
 *
 * Se usa el CID, que es el identificador real del lugar y viene del enlace que
 * compartio el cliente. Es mucho mas confiable que buscar por nombre: una
 * busqueda puede caer en otro negocio homonimo, y de "5ta Avenida" hay varios
 * en Costa Rica.
 *
 * Para el formulario de resena de un solo clic
 * (`search.google.com/local/writereview?placeid=ChIJ...`) hace falta el Place
 * ID en formato ChIJ, que no viene en el enlace. Se puede sacar del buscador
 * de Place ID de Google. Mientras tanto, este enlace abre la ficha y el
 * usuario pulsa "Escribir una resena".
 */
export function enlaceResena(): string {
  return `https://www.google.com/maps?cid=${negocio.google.cid}`;
}

export function enlaceFichaGoogle(): string {
  return `https://www.google.com/maps?cid=${negocio.google.cid}`;
}
