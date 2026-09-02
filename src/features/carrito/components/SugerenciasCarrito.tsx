"use client";

import Image from "next/image";
import { formatoColones } from "@/shared/lib/formatoColones";
import { useCarrito } from "../lib/carritoStore";
import type { Plato } from "@/features/menu/types";

/**
 * Complementos sugeridos dentro del carrito, al estilo de "Ofertas para ti"
 * de las apps de delivery: un carril horizontal de productos que pegan con el
 * pedido, cada uno con su boton de agregar.
 *
 * Los platos llegan por prop desde el layout y NO se importan del menu aqui:
 * una feature no importa de otra.
 *
 * Solo se ofrecen productos que ya estan en el pedido... no: se ofrecen los que
 * NO estan. Si el cliente ya agrego las papas, no tiene sentido volver a
 * ofrecerselas, asi que la seccion se oculta cuando no queda nada por sugerir.
 */
export function SugerenciasCarrito({ candidatos }: { candidatos: Plato[] }) {
  const { agregar, lineas } = useCarrito();

  const enCarrito = new Set(lineas.map((l) => l.plato.id));
  const sugerencias = candidatos.filter(
    (p) => p.disponible && !enCarrito.has(p.id),
  );

  if (sugerencias.length === 0) return null;

  return (
    <section className="border-t border-borde px-5 py-4">
      <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-acento">
        ¿Le agregás algo más?
      </h3>

      <ul className="-mx-1 mt-3 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sugerencias.map((p) => (
          <li key={p.id} className="w-32 shrink-0">
            <div className="relative overflow-hidden rounded-xl bg-superficie">
              <div className="relative aspect-4/3">
                <Image
                  src={p.media.src}
                  alt={p.media.alt}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => agregar(p)}
                aria-label={`Agregar ${p.nombre} al pedido`}
                className="absolute bottom-1.5 right-1.5 grid size-8 place-items-center rounded-full bg-base/90 text-lg leading-none text-texto shadow-md backdrop-blur-sm transition-colors hover:bg-acento hover:text-base"
              >
                <span aria-hidden="true" className="-mt-0.5">
                  +
                </span>
              </button>
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs leading-tight text-texto">
              {p.nombre}
            </p>
            <p className="font-display text-sm font-bold text-acento">
              {formatoColones(p.precio)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
