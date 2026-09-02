"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { suscribir, leerCrudo } from "@/shared/lib/almacenLocal";
import { CLAVE_FAVORITOS, leerFavoritos } from "../lib/favoritos";
import { Brasas } from "@/shared/components/ui/Brasas";
import { ReelPlato } from "./ReelPlato";
import { FiltroCategorias, type FiltroReel } from "./FiltroCategorias";
import { menu } from "@/features/menu/data/menu";

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
  const [filtro, setFiltro] = useState<FiltroReel>("todas");

  useSyncExternalStore(
    useCallback((f) => suscribir(CLAVE_FAVORITOS, f), []),
    () => leerCrudo(CLAVE_FAVORITOS),
    () => null,
  );
  const favoritos = typeof window === "undefined" ? [] : leerFavoritos();

  const disponibles = menu.filter((p) => p.disponible);
  const platos =
    filtro === "todas"
      ? disponibles
      : filtro === "favoritos"
        ? disponibles.filter((p) => favoritos.includes(p.id))
        : disponibles.filter((p) => p.categoria === filtro);

  return (
    <div className="relative isolate bg-base">
      <Brasas densidad={0.5} className="z-20" />

      <FiltroCategorias
        platos={disponibles}
        activa={filtro}
        onCambiar={setFiltro}
        cantidadFavoritos={favoritos.length}
      />

      <div
        /*
          SIN `pt-24` AQUI. El relleno iba en el contenedor de scroll mientras
          cada reel medía 100dvh: el primero arrancaba 96px abajo y se salía por
          el fondo esos mismos 96px, así que el `snap` nunca cuadraba y quedaba
          una franja negra entre los filtros y la tarjeta. El espacio del carril
          ahora lo pone cada reel por dentro (`ESPACIO_CARRIL`), y así todos
          siguen midiendo exactamente una pantalla.
        */
        className="h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-contain [scrollbar-width:none] lg:pl-28 [&::-webkit-scrollbar]:hidden"
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
