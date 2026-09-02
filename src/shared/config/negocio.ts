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

  /**
   * Coordenadas CONFIRMADAS del local, tomadas de la ficha de Google que
   * compartio el cliente (2026-09-01). Ya no son una estimacion.
   */
  coordenadas: { lat: 10.0898297, lng: -84.4743896 },

  /**
   * Identificadores del negocio en Google, del enlace de su ficha.
   * `cid` sirve para enlazar directo al lugar en Maps.
   */
  google: {
    cid: "15405326590712899056",
    /** ID del Knowledge Graph, por si hace falta la Places API. */
    kgId: "/g/11p5blxm46",
  },

  /** Rango de precios para el JSON-LD. DEMO: ajustar con el menu real. */
  rangoPrecios: "₡₡",

  /**
   * Horarios REALES, tomados de la ficha de Google del negocio (2026-09-01).
   * Abren los siete dias; martes arranca mas tarde. Ya no son DEMO.
   */
  horarios: [
    {
      dias: "Lunes",
      diasSchema: ["Monday"],
      apertura: "12:00",
      cierre: "22:00",
    },
    {
      dias: "Martes",
      diasSchema: ["Tuesday"],
      apertura: "15:00",
      cierre: "22:00",
    },
    {
      dias: "Miércoles a domingo",
      diasSchema: [
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      apertura: "12:00",
      cierre: "22:00",
    },
  ] satisfies Horario[],
} as const;

/** Construye el enlace de WhatsApp con un mensaje opcional ya codificado. */
export function enlaceWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${negocio.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
