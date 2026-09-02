"use client";

import Image from "next/image";
import { categorias } from "@/features/menu/data/categorias";
import type { CategoriaId, Plato } from "@/features/menu/types";

/** Los filtros del recorrido: las categorias reales mas los favoritos. */
export type FiltroReel = CategoriaId | "todas" | "favoritos";

/**
 * Filtro de categorías del recorrido de reels.
 *
 * Va en el costado izquierdo, que en escritorio quedaba vacío. Cada categoría
 * se muestra como círculo con una foto suya: se reconoce de un vistazo, sin
 * leer, que es lo que corresponde en una vista pensada para deslizar rápido.
 *
 * En pantallas angostas no cabe un riel lateral, así que baja a una fila
 * horizontal deslizable bajo el navbar.
 */
export function FiltroCategorias({
  platos,
  activa,
  onCambiar,
  cantidadFavoritos,
}: {
  platos: Plato[];
  activa: FiltroReel;
  onCambiar: (c: FiltroReel) => void;
  cantidadFavoritos: number;
}) {
  /** Primera foto disponible de cada categoría, para la miniatura. */
  const portada = (id: CategoriaId) =>
    platos.find((p) => p.categoria === id && p.disponible)?.media.src;

  const conPlatos = categorias.filter((c) =>
    platos.some((p) => p.categoria === c.id),
  );

  return (
    <div
      role="group"
      aria-label="Filtrar reels por categoría"
      className="pointer-events-auto fixed left-0 right-0 top-16 z-30 flex gap-3 overflow-x-auto bg-base/85 px-4 py-3 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:right-auto lg:top-1/2 lg:w-28 lg:-translate-y-1/2 lg:flex-col lg:overflow-visible lg:bg-transparent lg:py-0 lg:backdrop-blur-none"
    >
      <Circulo
        activa={activa === "todas"}
        onClick={() => onCambiar("todas")}
        etiqueta="Todo"
      />

      {/* Favoritos solo aparece cuando hay alguno: un filtro que siempre
          devuelve vacio es una promesa rota. */}
      {cantidadFavoritos > 0 && (
        <Circulo
          activa={activa === "favoritos"}
          onClick={() => onCambiar("favoritos")}
          etiqueta={`Favoritos (${cantidadFavoritos})`}
          icono="corazon"
        />
      )}
      {conPlatos.map((c) => (
        <Circulo
          key={c.id}
          activa={activa === c.id}
          onClick={() => onCambiar(c.id)}
          etiqueta={c.nombre}
          foto={portada(c.id)}
        />
      ))}
    </div>
  );
}

function Circulo({
  activa,
  onClick,
  etiqueta,
  foto,
  icono,
}: {
  activa: boolean;
  onClick: () => void;
  etiqueta: string;
  foto?: string;
  icono?: "corazon";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      className="flex shrink-0 flex-col items-center gap-1 lg:w-full"
    >
      <span
        className={`grid size-14 place-items-center overflow-hidden rounded-full transition-all duration-200 lg:size-16 ${
          activa
            ? "ring-2 ring-acento ring-offset-2 ring-offset-base"
            : "opacity-70 ring-1 ring-borde hover:opacity-100"
        }`}
      >
        {foto ? (
          <Image
            src={foto}
            alt=""
            width={64}
            height={64}
            className="size-full object-cover"
          />
        ) : icono === "corazon" ? (
          <span className="grid size-full place-items-center bg-superficie text-acento">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
              <path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 21.5l8.8-8.5a5.2 5.2 0 0 0 0-7.4Z" />
            </svg>
          </span>
        ) : (
          // "Todo" no tiene foto propia: lleva la llama de la marca.
          <span className="grid size-full place-items-center bg-superficie">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-acento" aria-hidden="true">
              <path d="M12 2c1.5 3.1.3 4.8-.7 6.1-1.2 1.6-2 2.9-2 4.8 0 3.1 2.6 5.6 5.7 5.6s5.6-2.5 5.6-5.6c0-2.3-1.2-3.7-2.6-5.6.4 1.3.2 2.4-.6 3 .5-2.6-1.3-5.9-5.4-8.3z" />
            </svg>
          </span>
        )}
      </span>
      <span
        className={`max-w-16 truncate text-center text-[10px] leading-tight lg:max-w-full lg:text-[11px] ${
          activa ? "text-acento" : "text-texto-suave"
        }`}
      >
        {etiqueta}
      </span>
    </button>
  );
}
