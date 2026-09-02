"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatoColones } from "@/shared/lib/formatoColones";
import { BotonAgregar } from "./BotonAgregar";
import type { Plato } from "../types";

/**
 * Un plato a pantalla completa dentro del scroll tipo reel.
 *
 * El medio es una union discriminada: hoy funciona con foto y acepta video en
 * cuanto el cliente los grabe, sin tocar este componente.
 *
 * Control de peso: el video arranca con `preload="none"` y solo se reproduce
 * mientras el plato esta visible. Al salir de pantalla se pausa. Asi nunca hay
 * mas de un video corriendo, tenga el menu 10 platos o 60.
 */
export function ReelPlato({ plato }: { plato: Plato }) {
  const seccion = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [ingredientesAbiertos, setIngredientesAbiertos] = useState(false);

  useEffect(() => {
    const nodo = seccion.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { threshold: 0.6 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible) {
      v.play().catch(() => {
        // El navegador puede bloquear la reproduccion automatica; el poster
        // sigue visible, asi que no hay nada que arreglar.
      });
    } else {
      v.pause();
    }
  }, [visible]);

  return (
    <section
      ref={seccion}
      className="relative h-full w-full snap-start snap-always overflow-hidden bg-base"
      aria-label={plato.nombre}
    >
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
          sizes="(min-width: 768px) 24rem, 100vw"
          className="object-cover"
        />
      )}

      {/* Velo para que el texto se lea sobre cualquier foto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-base via-base/75 to-base/10"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 pb-24 sm:p-8 sm:pb-24">
        <div className="mx-auto max-w-lg">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-3xl font-bold uppercase italic leading-tight text-texto sm:text-4xl">
              {plato.nombre}
            </h2>
            <p className="shrink-0 font-display text-3xl font-bold text-acento">
              {formatoColones(plato.precio)}
            </p>
          </div>

          <p className="mt-3 leading-relaxed text-texto-suave">
            {plato.descripcion}
          </p>

          {plato.ingredientes.length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setIngredientesAbiertos((v) => !v)}
                aria-expanded={ingredientesAbiertos}
                className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-acento-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
              >
                Ingredientes
                <span
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${ingredientesAbiertos ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>

              <ul
                className={`grid gap-1 overflow-hidden text-sm text-texto-suave transition-all duration-300 ${
                  ingredientesAbiertos ? "mt-3 max-h-60" : "max-h-0"
                }`}
              >
                {plato.ingredientes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-acento" aria-hidden="true">
                      ·
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <BotonAgregar plato={plato} tamano="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
