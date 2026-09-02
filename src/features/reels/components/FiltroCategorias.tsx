"use client";

import Image from "next/image";
import { categorias } from "@/features/menu/data/categorias";
import type { CategoriaId, Plato } from "@/features/menu/types";

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
}: {
  platos: Plato[];
  activa: CategoriaId | "todas";
  onCambiar: (c: CategoriaId | "todas") => void;
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
}: {
  activa: boolean;
  onClick: () => void;
  etiqueta: string;
  foto?: string;
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
        ) : (
          // "Todo" no tiene foto propia: lleva la llama de la marca.
          <span className="grid size-full place-items-center bg-superficie font-display text-lg font-bold text-acento">
            ★
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
