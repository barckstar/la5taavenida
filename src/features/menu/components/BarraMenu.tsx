"use client";

import { IconoVideo, IconoCuadros } from "@/shared/components/ui/Iconos";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import type { Categoria, CategoriaId } from "../types";

type Vista = "lista" | "reels";

/**
 * Barra fija del menu: alternador de vista y filtro de categorias.
 *
 * Va a ANCHO COMPLETO, fuera del Contenedor, con fondo opaco y borde inferior.
 * Antes vivia dentro del Contenedor y su fondo solo cubria el ancho de la
 * columna: las tarjetas se veian pasar por los costados y asomaban por arriba
 * y por abajo de la barra. El `backdrop-blur` solo no alcanza — hace falta que
 * el fondo llegue de borde a borde.
 */
export function BarraMenu({
  vista,
  onCambiarVista,
  categoria,
  onCambiarCategoria,
  categorias,
}: {
  vista: Vista;
  onCambiarVista: (v: Vista) => void;
  categoria: CategoriaId | "todas";
  onCambiarCategoria: (c: CategoriaId | "todas") => void;
  categorias: Categoria[];
}) {
  return (
    <div className="sticky top-16 z-30 border-b border-borde bg-base/95 backdrop-blur-md">
      <Contenedor className="flex items-center gap-3 py-3">
        {/* Alternador vista: solo movil, la vista Reels no existe en escritorio */}
        <div className="md:hidden">
          <SwitchVista vista={vista} onCambiar={onCambiarVista} />
        </div>

        <div
          role="group"
          aria-label="Filtrar por categoría"
          // `-mb-2 pb-2` deja sitio a la barra de scroll sin que corte los chips
          className="-mb-2 flex flex-1 gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Chip
            activo={categoria === "todas"}
            onClick={() => onCambiarCategoria("todas")}
          >
            Todo
          </Chip>
          {categorias.map((c) => (
            <Chip
              key={c.id}
              activo={categoria === c.id}
              onClick={() => onCambiarCategoria(c.id)}
            >
              {c.nombre}
            </Chip>
          ))}
        </div>
      </Contenedor>
    </div>
  );
}

/**
 * Switch de dos posiciones: cuadros (lista) y video (reels).
 *
 * Es un `role="radiogroup"` con dos botones reales, no un div con onClick: se
 * navega con teclado y los lectores de pantalla anuncian cual esta activo.
 */
function SwitchVista({
  vista,
  onCambiar,
}: {
  vista: Vista;
  onCambiar: (v: Vista) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Forma de ver el menú"
      className="relative inline-flex shrink-0 rounded-full border border-borde bg-superficie p-1"
    >
      {/* Pastilla que se desliza detras del icono activo. */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 w-9 rounded-full bg-acento transition-transform duration-300 ${
          vista === "lista" ? "translate-x-0" : "translate-x-9"
        }`}
        style={{ left: "0.25rem" }}
      />

      <button
        type="button"
        role="radio"
        aria-checked={vista === "lista"}
        aria-label="Ver en cuadrícula"
        onClick={() => onCambiar("lista")}
        className={`relative z-10 grid size-9 place-items-center rounded-full transition-colors ${
          vista === "lista" ? "text-base" : "text-texto-suave"
        }`}
      >
        <IconoCuadros className="size-[18px]" />
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={vista === "reels"}
        aria-label="Ver como reels"
        onClick={() => onCambiar("reels")}
        className={`relative z-10 grid size-9 place-items-center rounded-full transition-colors ${
          vista === "reels" ? "text-base" : "text-texto-suave"
        }`}
      >
        <IconoVideo className="size-[18px]" />
      </button>
    </div>
  );
}

function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`shrink-0 rounded-full border px-4 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors ${
        activo
          ? "border-acento bg-acento text-base"
          : "border-borde text-texto-suave hover:border-acento/50 hover:text-acento-alt"
      }`}
    >
      {children}
    </button>
  );
}
