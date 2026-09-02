"use client";

import { useCarrito } from "@/features/carrito/lib/carritoStore";
import { IconoCarrito } from "@/shared/components/ui/Iconos";
import type { Plato } from "@/shared/types/menu";

/**
 * Boton de agregar que se convierte en control de cantidad una vez que el
 * plato esta en el carrito. Es el mismo componente en las dos vistas: asi el
 * comportamiento no se duplica ni se desincroniza.
 */
export function BotonAgregar({
  plato,
  tamano = "md",
}: {
  plato: Plato;
  tamano?: "md" | "lg";
}) {
  const { agregar, cambiarCantidad, cantidadDe } = useCarrito();
  const cantidad = cantidadDe(plato.id);

  const alto = tamano === "lg" ? "h-13 text-base" : "h-11 text-sm";

  if (!plato.disponible) {
    return (
      <span
        className={`inline-flex ${alto} items-center rounded-full border border-borde px-5 font-display uppercase tracking-wide text-texto-suave`}
      >
        Agotado
      </span>
    );
  }

  if (cantidad === 0) {
    return (
      <button
        type="button"
        onClick={() => agregar(plato)}
        aria-label={`Agregar ${plato.nombre} al carrito`}
        className={`inline-flex ${alto} items-center justify-center gap-2 rounded-full bg-acento px-5 font-display font-semibold uppercase tracking-wide text-base transition-transform duration-200 hover:bg-acento-alt active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-alt`}
      >
        <IconoCarrito className="size-4" />
        Agregar
      </button>
    );
  }

  return (
    <div
      className={`inline-flex ${alto} items-center gap-1 rounded-full bg-acento px-1.5 text-base`}
    >
      <button
        type="button"
        onClick={() => cambiarCantidad(plato.id, cantidad - 1)}
        aria-label={`Quitar una unidad de ${plato.nombre}`}
        className="grid size-8 place-items-center rounded-full text-lg font-bold transition-colors hover:bg-base/15 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-base"
      >
        −
      </button>
      <span
        className="min-w-6 text-center font-display font-bold"
        aria-live="polite"
        aria-label={`${cantidad} en el carrito`}
      >
        {cantidad}
      </span>
      <button
        type="button"
        onClick={() => cambiarCantidad(plato.id, cantidad + 1)}
        aria-label={`Agregar una unidad de ${plato.nombre}`}
        className="grid size-8 place-items-center rounded-full text-lg font-bold transition-colors hover:bg-base/15 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-base"
      >
        +
      </button>
    </div>
  );
}
