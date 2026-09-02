"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatoColones } from "@/shared/lib/formatoColones";
import { useCarrito } from "@/features/carrito/lib/carritoStore";
import { IconoCarrito } from "@/shared/components/ui/Iconos";
import { BotonCompartir, IconoCompartir } from "@/shared/components/ui/BotonCompartir";
import type { Plato } from "@/features/menu/types";

/**
 * Un plato en formato reel, con la estructura de YouTube Shorts: el medio en
 * proporcion vertical al centro, el riel de acciones pegado a su costado y la
 * informacion abajo a la izquierda.
 *
 * En escritorio el espacio sobrante de los lados deja de desperdiciarse: el
 * riel de acciones se sale del medio y respira aparte, como en Shorts.
 *
 * Control de peso: el video arranca en `preload="none"` y solo se reproduce
 * mientras el plato esta visible. Nunca hay mas de uno corriendo.
 */
export function ReelPlato({ plato }: { plato: Plato }) {
  const seccion = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const { agregar, cambiarCantidad, cantidadDe, abrir } = useCarrito();
  const cantidad = cantidadDe(plato.id);

  useEffect(() => {
    const nodo = seccion.current;
    if (!nodo) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.6 },
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible) {
      v.play().catch(() => {
        // El navegador puede bloquear la reproduccion automatica; queda el
        // poster, asi que no hay nada que reparar.
      });
    } else {
      v.pause();
    }
  }, [visible]);

  return (
    <section
      ref={seccion}
      className="relative flex h-[100dvh] w-full snap-start snap-always items-center justify-center px-3 py-4 sm:px-6"
      aria-label={plato.nombre}
    >
      <div className="flex h-full max-h-[calc(100dvh-2rem)] items-end gap-3 sm:gap-4">
        {/* El medio, en proporcion vertical de reel */}
        <div className="relative h-full overflow-hidden rounded-2xl bg-superficie">
          <div className="relative h-full aspect-9/16 max-w-full">
            {plato.media.tipo === "video" ? (
              <video
                ref={video}
                src={plato.media.src}
                poster={plato.media.poster}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <Image
                src={plato.media.src}
                alt={plato.media.alt}
                fill
                sizes="(min-width: 640px) 48vh, 92vw"
                className="object-cover"
              />
            )}

            {/* Velo para que el texto se lea sobre cualquier foto. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent"
            />

            {/* Informacion abajo a la izquierda, como en Shorts */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="font-display text-2xl font-bold text-acento sm:text-3xl">
                {formatoColones(plato.precio)}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase italic leading-tight text-texto sm:text-2xl">
                {plato.nombre}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-texto-suave">
                {plato.descripcion}
              </p>
              {!plato.disponible && (
                <p className="mt-2 inline-block rounded-full bg-base/80 px-3 py-1 text-xs uppercase tracking-wider text-texto-suave">
                  Agotado por hoy
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Riel de acciones al costado, fuera del medio */}
        <div className="flex shrink-0 flex-col items-center gap-5 pb-4">
          {plato.disponible ? (
            cantidad === 0 ? (
              <AccionRiel
                etiqueta="Agregar"
                onClick={() => agregar(plato)}
                destacada
              >
                <IconoCarrito className="size-6" />
              </AccionRiel>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => cambiarCantidad(plato.id, cantidad + 1)}
                  aria-label={`Agregar otra unidad de ${plato.nombre}`}
                  className="grid size-12 place-items-center rounded-full bg-acento text-xl font-bold text-base transition-transform active:scale-90"
                >
                  +
                </button>
                <span className="font-display text-sm font-bold text-texto">
                  {cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => cambiarCantidad(plato.id, cantidad - 1)}
                  aria-label={`Quitar una unidad de ${plato.nombre}`}
                  className="grid size-9 place-items-center rounded-full border border-borde text-lg text-texto-suave transition-colors hover:text-acento"
                >
                  −
                </button>
              </div>
            )
          ) : null}

          <AccionRiel etiqueta="Pedido" onClick={abrir}>
            <IconoCarrito className="size-5" />
          </AccionRiel>

          <BotonCompartir
            titulo={`${plato.nombre} — 5ta Avenida Grill`}
            texto={plato.descripcion}
            className="flex flex-col items-center gap-1"
          >
            <span className="grid size-11 place-items-center rounded-full bg-superficie text-texto transition-colors hover:text-acento">
              <IconoCompartir className="size-5" />
            </span>
            <span className="text-[11px] text-texto-suave">Compartir</span>
          </BotonCompartir>
        </div>
      </div>
    </section>
  );
}

function AccionRiel({
  etiqueta,
  onClick,
  destacada,
  children,
}: {
  etiqueta: string;
  onClick: () => void;
  destacada?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      <span
        className={`grid place-items-center rounded-full transition-transform active:scale-90 ${
          destacada
            ? "size-14 bg-acento text-base"
            : "size-11 bg-superficie text-texto hover:text-acento"
        }`}
      >
        {children}
      </span>
      <span className="text-[11px] text-texto-suave">{etiqueta}</span>
    </button>
  );
}
