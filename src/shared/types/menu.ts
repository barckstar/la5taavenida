/**
 * Tipos del dominio: lo que el local vende.
 *
 * Viven en `shared` y no dentro de `menu` porque los usan CINCO features
 * —menu, ofertas, reels, carrito y checkout— y la regla del proyecto es que
 * una feature nunca importa de otra. Mientras estuvieron en
 * `features/menu/types`, las otras cuatro tenian que romper esa regla solo
 * para poder hablar de un plato.
 */

export type CategoriaId = "grill" | "ofertas"
  | "hamburguesas" | "adicionales" | "infantil";

/**
 * Union discriminada a proposito. La vista Reels funciona HOY con imagenes y
 * acepta video cuando el cliente los grabe, sin reescribir componentes.
 */
export type Media =
  | { tipo: "video"; src: string; poster: string; alt: string }
  | { tipo: "imagen"; src: string; alt: string };

export type Plato = {
  id: string;
  nombre: string;
  descripcion: string;
  /** Vacio cuando el menu del cliente no detalla la composicion. */
  ingredientes: string[];
  /** Colones enteros. Precio final al publico, tal como lo publica el local. */
  precio: number;
  categoria: CategoriaId;
  media: Media;
  destacado?: boolean;
  disponible: boolean;
};

export type Categoria = {
  id: CategoriaId;
  nombre: string;
  /**
   * Etiqueta para el carril de circulos de los reels, donde cada rotulo
   * dispone de unos 64px. "Menu Grill" se cortaba a "Menu Gri..."; el prefijo
   * "Menu" no distingue nada porque lo comparten dos categorias.
   */
  corto?: string;
};

/**
 * Lo que se puede tener seleccionado en un carril de filtros: una categoria,
 * todo, o los favoritos del aparato. El menu y los reels filtran igual, asi
 * que comparten el tipo en vez de declarar dos identicos.
 */
export type FiltroCatalogo = CategoriaId | "todas" | "favoritos";
