"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { formatoColones } from "@/shared/lib/formatoColones";
import { useCarrito } from "@/features/carrito/lib/carritoStore";
import { IconoCarrito } from "@/shared/components/ui/Iconos";
import { BotonCompartir, IconoCompartir } from "@/shared/components/ui/BotonCompartir";
import { suscribir, leerCrudo } from "@/shared/lib/almacenLocal";
import { CLAVE_FAVORITOS, alternarFavorito, leerFavoritos } from "../lib/favoritos";
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

  // Favoritos del dispositivo. Se leen del almacen externo, igual que el
  // carrito, para no hidratar con setState dentro de un efecto.
  useSyncExternalStore(
    useCallback((f) => suscribir(CLAVE_FAVORITOS, f), []),
    () => leerCrudo(CLAVE_FAVORITOS),
    () => null,
  );
  const esFavorito =
    typeof window !== "undefined" && leerFavoritos().includes(plato.id);

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
      <div className="flex h-full max-h-[calc(100dvh-2rem)] w-full items-end justify-center gap-3 sm:gap-4">
        {/* El medio, en proporcion vertical de reel */}
        <div
          className="relative aspect-9/16 max-h-full overflow-hidden rounded-2xl bg-superficie"
          /*
            `min()` decide quien manda: el alto disponible o el ancho de la
            pantalla. Con solo `h-full` el 9:16 calculaba un ancho mayor que el
            viewport en pantallas angostas y el reel se salia por la izquierda.
            Se resta el riel de acciones para que nunca lo empuje fuera.
          */
          style={{
            width: "min(100% - 4.5rem, calc((100dvh - 3rem) * 9 / 16))",
          }}
        >
          <div className="relative size-full">
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
            {/*
              `pb-24` deja libre la franja inferior donde flota el boton de
              "Ver pedido": antes se montaba encima del precio y la descripcion.
            */}
            <div className="absolute inset-x-0 bottom-0 p-4 pb-24 sm:p-5 sm:pb-24">
              <p className="precio-contorneado font-display text-3xl font-bold text-acento sm:text-4xl">
                {formatoColones(plato.precio)}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase italic leading-tight text-texto drop-shadow-[0_2px_6px_rgba(5,5,5,0.85)] sm:text-2xl">
                {plato.nombre}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-texto-suave drop-shadow-[0_1px_4px_rgba(5,5,5,0.9)]">
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
                {/* Un "+" se entiende mas rapido que un carrito: la accion es
                    sumar al pedido, no ir al carrito. */}
                <span aria-hidden="true" className="text-3xl leading-none">
                  +
                </span>
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

          <AccionRiel
            etiqueta={esFavorito ? "Guardado" : "Guardar"}
            onClick={() => alternarFavorito(plato.id)}
            activa={esFavorito}
          >
            <IconoCorazon lleno={esFavorito} className="size-5" />
          </AccionRiel>

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

function IconoCorazon({
  lleno,
  className = "size-5",
}: {
  lleno: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={lleno ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 21.5l8.8-8.5a5.2 5.2 0 0 0 0-7.4Z" />
    </svg>
  );
}

function AccionRiel({
  etiqueta,
  onClick,
  destacada,
  activa,
  children,
}: {
  etiqueta: string;
  onClick: () => void;
  destacada?: boolean;
  activa?: boolean;
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
            : activa
              ? "size-11 bg-superficie text-acento"
              : "size-11 bg-superficie text-texto hover:text-acento"
        }`}
      >
        {children}
      </span>
      <span className="text-[11px] text-texto-suave">{etiqueta}</span>
    </button>
  );
}
