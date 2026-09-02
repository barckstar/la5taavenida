import { negocio } from "@/shared/config/negocio";

/**
 * ============================================================================
 * RESENAS DE GOOGLE
 * ============================================================================
 * La ficha del negocio tiene 4,6 estrellas sobre 59 resenas (2026-09-01).
 * Esos numeros son reales y viven en `negocio.google`.
 *
 * De los TEXTOS solo tenemos el que se alcanza a leer en la captura que
 * compartio el usuario, y viene cortado por el "Ver mas" de Google.
 *
 * COMO COMPLETAR: abrir la ficha, entrar a Resenas y copiar 3 completas
 * (autor, estrellas, fecha y texto). No inventar ninguna: son declaraciones
 * atribuidas a personas reales y cualquiera las contrasta en dos clics.
 *
 * PARA TRAERLAS EN VIVO haria falta la Google Places API (Place Details
 * devuelve hasta 5 resenas), que exige una llave y un proyecto de Google
 * Cloud con facturacion activa. Hoy no la tenemos.
 * ============================================================================
 */

export type Resena = {
  autor: string;
  /** Distintivo de Google, ej. "Local Guide · 554 resenas" */
  credencial?: string;
  estrellas: 1 | 2 | 3 | 4 | 5;
  texto: string;
  fecha: string;
  /** true cuando el texto viene cortado por el "Ver mas" de Google. */
  truncada?: boolean;
};

export const resenas: Resena[] = [
  {
    autor: "Mr. E.",
    credencial: "Local Guide · 554 reseñas",
    estrellas: 5,
    texto:
      "I was cruising through town looking for a quick burger when I came to this place. It is a literal counter facing the sidewalk with a small kitchen behind it. I figured “Sure, why not?” to giving it a try, and let me tell you, I'm super…",
    fecha: "Hace 7 meses",
    truncada: true,
  },
];

/** Enlace a la ficha en Google Maps, donde se deja o se lee una resena. */
export function enlaceResena(): string {
  return `https://www.google.com/maps?cid=${negocio.google.cid}`;
}

export function enlaceFichaGoogle(): string {
  return `https://www.google.com/maps?cid=${negocio.google.cid}`;
}
