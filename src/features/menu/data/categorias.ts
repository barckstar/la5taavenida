import type { Categoria } from "../types";

/** Las cuatro secciones tal como las divide el menu impreso del local. */
export const categorias: Categoria[] = [
  { id: "ofertas", nombre: "Ofertas" },
  { id: "hamburguesas", nombre: "Hamburguesas" },
  { id: "grill", nombre: "Menú Grill", corto: "Grill" },
  { id: "infantil", nombre: "Menú Infantil", corto: "Infantil" },
  { id: "adicionales", nombre: "Adicionales" },
];
