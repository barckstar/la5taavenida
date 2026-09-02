export type CategoriaId = "grill" | "hamburguesas" | "adicionales" | "infantil";

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
};
