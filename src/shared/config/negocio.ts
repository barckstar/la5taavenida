/**
 * Fuente unica de verdad de los datos del negocio.
 *
 * Todo lo marcado DEMO es provisional para la muestra y debe reemplazarse
 * con informacion real del cliente antes de publicar.
 */

export type Horario = {
  /** Etiqueta legible, ej. "Martes a jueves" */
  dias: string;
  /** Codigos de dia para el JSON-LD (schema.org) */
  diasSchema: string[];
  /** Formato 24h "HH:MM". null en ambos = cerrado */
  apertura: string | null;
  cierre: string | null;
};

export const negocio = {
  nombre: "5ta Avenida Grill",
  nombreFacebook: "5ta Avenida San Ramón",
  tagline: "¡Una nueva experiencia gastronómica en San Ramón!",

  /** Numero en formato internacional sin signos, para los enlaces wa.me */
  whatsapp: "50664901222",
  /** Como se le muestra al usuario */
  whatsappVisible: "6490-1222",

  direccion: "350 metros oeste de Supermercados Molina, San Ramón de Alajuela",
  ciudad: "San Ramón",
  provincia: "Alajuela",
  pais: "CR",

  facebook: "https://www.facebook.com/5taavenidagrill/",

  /** Rango de precios para el JSON-LD. DEMO: ajustar con el menu real. */
  rangoPrecios: "₡₡",

  // DEMO: horarios inventados para la muestra. El cliente aun no los entrego.
  horarios: [
    { dias: "Lunes", diasSchema: ["Monday"], apertura: null, cierre: null },
    {
      dias: "Martes a jueves",
      diasSchema: ["Tuesday", "Wednesday", "Thursday"],
      apertura: "11:00",
      cierre: "22:00",
    },
    {
      dias: "Viernes y sábado",
      diasSchema: ["Friday", "Saturday"],
      apertura: "11:00",
      cierre: "24:00",
    },
    {
      dias: "Domingo",
      diasSchema: ["Sunday"],
      apertura: "11:00",
      cierre: "21:00",
    },
  ] satisfies Horario[],
} as const;

/** Construye el enlace de WhatsApp con un mensaje opcional ya codificado. */
export function enlaceWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${negocio.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
