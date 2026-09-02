"use client";

import { useEffect, useRef } from "react";
import { IconoVideo, IconoCuadros } from "@/shared/components/ui/Iconos";
import { useNavbarOculto } from "@/shared/lib/useNavbarOculto";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import type { Categoria, CategoriaId } from "../types";

type Vista = "lista" | "reels";

/**
 * Barra fija del menu: alternador de vista y filtro de categorias.
 *
 * Va a ANCHO COMPLETO, fuera del Contenedor, con fondo opaco y borde inferior.
 * Antes vivia dentro del Contenedor y su fondo solo cubria el ancho de la
 * columna: las tarjetas se veian pasar por los costados.
 *
 * SIGUE AL NAVBAR: cuando el navbar se esconde al bajar, esta barra sube a
 * ocupar su lugar (top-0). Si se quedara fija en top-16 quedaria una franja
 * de 64px por la que se verian pasar las tarjetas.
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
  const navbarOculto = useNavbarOculto();
  const carril = useRef<HTMLDivElement>(null);

  /*
    Convierte la rueda vertical del mouse en desplazamiento horizontal.

    El carril siempre fue desplazable — 560px de chips en 241 visibles — pero
    con un mouse no habia forma de moverlo: la rueda vertical no desplaza
    contenedores horizontales, y hace falta Shift o un trackpad. Se sentia
    trabado. En movil el gesto tactil ya funcionaba solo.

    El listener se registra a mano y NO como onWheel de React porque necesita
    `passive: false` para poder llamar a preventDefault.
  */
  useEffect(() => {
    const nodo = carril.current;
    if (!nodo) return;

    function alGirarRueda(e: WheelEvent) {
      const n = carril.current;
      if (!n) return;
      // Si el gesto ya es horizontal (trackpad), se deja pasar tal cual.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (n.scrollWidth <= n.clientWidth) return;
      e.preventDefault();
      // scroll-behavior smooth aqui rompia el desplazamiento por rueda: la
      // asignacion se encolaba como animacion y nunca llegaba a aplicarse.
      n.scrollLeft += e.deltaY;
    }

    nodo.addEventListener("wheel", alGirarRueda, { passive: false });
    return () => nodo.removeEventListener("wheel", alGirarRueda);
  }, []);

  return (
    <div
      className={`sticky z-30 border-b border-borde bg-base/95 backdrop-blur-md transition-[top] duration-300 ${
        navbarOculto ? "top-0" : "top-16"
      }`}
    >
      <Contenedor className="flex items-center gap-3 py-3">
        {/* Alternador vista: solo movil, la vista Reels no existe en escritorio */}
        <div className="md:hidden">
          <SwitchVista vista={vista} onCambiar={onCambiarVista} />
        </div>

        <div className="relative min-w-0 flex-1">
          <div
            ref={carril}
            role="group"
            aria-label="Filtrar por categoría"
            className="-mb-2 flex gap-2 overflow-x-auto pb-2 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

          {/*
            Degradado en el borde derecho: es el unico aviso de que hay mas
            categorias. Sin el, los chips se ven simplemente cortados y nadie
            adivina que el carril se desliza.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-base to-transparent"
          />
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
