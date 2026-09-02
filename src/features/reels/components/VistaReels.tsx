"use client";

import { useState } from "react";
import { Brasas } from "@/shared/components/ui/Brasas";
import { ReelPlato } from "./ReelPlato";
import { FiltroCategorias } from "./FiltroCategorias";
import { menu } from "@/features/menu/data/menu";
import type { CategoriaId } from "@/features/menu/types";

/**
 * Recorrido de reels a pantalla completa.
 *
 * Es su propia ruta y no un modo del menu: asi puede tomarse el viewport
 * entero, y la cuadricula no carga este JavaScript ni al reves.
 *
 * Sin bordes, sin barra de desplazamiento visible y con los extremos
 * difuminados, para que el carril se sienta parte del fondo y no una ventana
 * pegada encima.
 */
export function VistaReels() {
  const [categoria, setCategoria] = useState<CategoriaId | "todas">("todas");

  const disponibles = menu.filter((p) => p.disponible);
  const platos =
    categoria === "todas"
      ? disponibles
      : disponibles.filter((p) => p.categoria === categoria);

  return (
    <div className="relative isolate bg-base">
      <Brasas densidad={0.5} className="z-20" />

      <FiltroCategorias
        platos={disponibles}
        activa={categoria}
        onCambiar={setCategoria}
      />

      <div
        className="h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-contain pt-24 [scrollbar-width:none] lg:pl-28 lg:pt-0 [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 4%, #000 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 4%, #000 96%, transparent 100%)",
        }}
      >
        {platos.map((p) => (
          <ReelPlato key={p.id} plato={p} />
        ))}
      </div>
    </div>
  );
}
