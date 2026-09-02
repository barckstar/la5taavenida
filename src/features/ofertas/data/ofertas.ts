/**
 * ============================================================================
 * OFERTAS REALES DE 5TA AVENIDA GRILL
 * ============================================================================
 * Transcritas de las publicaciones de su Instagram (@5ta_avenida_sanramon),
 * compartidas por el cliente el 2026-09-02. Nombres, precios y restricciones
 * son los suyos.
 *
 * El "i.i" de sus artes significa IMPUESTOS INCLUIDOS: confirma que los precios
 * que se muestran son finales, como se definio en el spec.
 *
 * HALLAZGO: estas promos confirman que SI venden bebidas — batidos y cerveza
 * Imperial Cero — aunque el menu impreso que nos pasaron no las lista. Falta
 * pedirle al cliente la carta de bebidas con sus precios.
 *
 * VIGENCIA: sus artes dicen "promocion por tiempo limitado" sin fecha. Por eso
 * `hasta` queda en null: se muestran hasta que el cliente avise. Cuando de
 * fechas, se llenan y `ofertasVigentes()` las retira solo.
 * ============================================================================
 */

export type Oferta = {
  id: string;
  titulo: string;
  detalle?: string;
  /** Precio de la promocion, en colones. Impuestos incluidos. */
  precio: number;
  /** Etiqueta corta para el badge, ej. "2x1" o "-22%". */
  gancho?: string;
  /** Lo que el arte del cliente aclara en letra chica. */
  restriccion?: string;
  /** null = sin fecha de fin conocida. */
  hasta: string | null;
};

export const ofertas: Oferta[] = [
  {
    id: "costilla-2x1",
    titulo: "2 Costilla Burger",
    detalle: "De costilla de ternera de res",
    precio: 3500,
    gancho: "2x1",
    restriccion: "Carne solo de ternera.",
    hasta: null,
  },
  {
    id: "tradicional-2x",
    titulo: "2 Hamburguesas Tradicionales",
    precio: 3000,
    gancho: "2x",
    restriccion: "No incluye papas. Aplican restricciones.",
    hasta: null,
  },
  {
    id: "combo-cheese",
    titulo: "Cheeseburger + papas + Imperial Cero",
    precio: 4950,
    gancho: "Combo",
    restriccion: "Cerveza sin alcohol.",
    hasta: null,
  },
  {
    id: "alitas-12",
    titulo: "12 Alitas de pollo",
    precio: 5800,
    restriccion: "No incluye bebida.",
    hasta: null,
  },
  {
    id: "cartuchos-2",
    titulo: "2 Cartuchos",
    detalle: "De res con papas",
    precio: 3900,
    gancho: "-22%",
    hasta: null,
  },
  {
    id: "salchipapas-2",
    titulo: "2 Salchipapas",
    precio: 3500,
    gancho: "2x",
    restriccion: "No incluye bebida.",
    hasta: null,
  },
  {
    id: "batidos-2x",
    titulo: "2 Batidos",
    precio: 2000,
    gancho: "2x",
    hasta: null,
  },
];

/**
 * Devuelve las ofertas que siguen en pie. Una oferta con `hasta` vencido
 * desaparece sola: nada peor que un sitio anunciando una promo que ya no existe.
 */
export function ofertasVigentes(hoy: Date = new Date()): Oferta[] {
  return ofertas.filter((o) => {
    if (!o.hasta) return true;
    return new Date(o.hasta) >= hoy;
  });
}
