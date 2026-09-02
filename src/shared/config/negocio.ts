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

  /** Redes del negocio, confirmadas por el cliente (2026-09-01). */
  facebook: "https://www.facebook.com/5taavenidagrill",
  instagram: "https://www.instagram.com/5ta_avenida_sanramon",

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

    /**
     * Calificacion y resenas REALES de su ficha de Google (2026-09-01).
     * Actualizar a mano cuando cambien, o automatizar con la Places API.
     */
    calificacion: 4.6 as number | null,
    cantidadResenas: 59 as number | null,
  },

  /** Seguidores en Facebook, de los meta tags de su pagina (2026-09-01). */
  seguidoresFacebook: 4352,

  /** Rango de precios para el JSON-LD. DEMO: ajustar con el menu real. */
  rangoPrecios: "₡₡",
  /** Rango real segun Google: consumo por persona. */
  rangoPreciosTexto: "₡5.000 – ₡10.000 por persona",
  /** Del menu impreso: del adicional mas barato al plato mas caro. */
  rangoMenu: { min: 800, max: 13000 },
  /** Categoria con la que Google los clasifica. */
  categoriaGoogle: "Restaurante de comida rápida",
  /** Plus Code de Google, sirve como direccion exacta. */
  plusCode: "3GQQ+W6 San Ramón, Provincia de Alajuela",
  /** Modalidades confirmadas en su ficha de Google. */
  servicios: ["Consumo en el lugar", "Para llevar", "Entrega a domicilio"],

  /**
   * Metodos de pago que anuncia el propio menu impreso del local (2026-09-02).
   * Se muestran en el checkout como informacion: el cobro lo hace el
   * restaurante por WhatsApp, el sitio no procesa pagos.
   */
  metodosPago: ["Sinpe Móvil", "Efectivo", "Tarjeta"],

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
