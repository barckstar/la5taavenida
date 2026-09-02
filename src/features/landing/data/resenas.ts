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
 * Enlace para dejar una resena. Lo ideal es
 * `https://search.google.com/local/writereview?placeid=<PLACE_ID>`, que abre el
 * formulario directo, pero requiere el Place ID del negocio. Mientras no lo
 * tengamos, se cae a la busqueda en Maps.
 */
export const PLACE_ID: string | null = null; // PENDIENTE: pedirlo al cliente

export function enlaceResena(consulta: string): string {
  return PLACE_ID
    ? `https://search.google.com/local/writereview?placeid=${PLACE_ID}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}
