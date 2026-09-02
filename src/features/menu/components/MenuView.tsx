"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { leerCrudo, escribirCrudo, suscribir } from "@/shared/lib/almacenLocal";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { BarraMenu } from "./BarraMenu";
import { TarjetaPlato } from "./TarjetaPlato";
import { DetallePlato } from "./DetallePlato";
import { ReelPlato } from "./ReelPlato";
import { menu } from "../data/menu";
import { categorias } from "../data/categorias";
import type { CategoriaId, Plato } from "../types";

const CLAVE_VISTA = "5ta-avenida-vista-menu";
type Vista = "lista" | "reels";

/**
 * Orquesta las dos vistas del menu.
 *
 * Las dos vistas estan disponibles en TODOS los tamanos.
 *
 * En escritorio los reels NO van a pantalla completa — un video vertical
 * estirado en un monitor horizontal se ve mal. Van en una columna centrada con
 * proporcion de telefono, que es como lo resuelven TikTok e Instagram web.
 */
export function MenuView() {
  const [categoria, setCategoria] = useState<CategoriaId | "todas">("todas");
  const [detalle, setDetalle] = useState<Plato | null>(null);

  // La preferencia se lee del almacen externo, no con setState en un efecto.
  const guardada = useSyncExternalStore(
    useCallback((f) => suscribir(CLAVE_VISTA, f), []),
    () => leerCrudo(CLAVE_VISTA),
    () => null, // en el servidor siempre cuadricula
  );
  const vista: Vista = guardada === "reels" ? "reels" : "lista";

  const platos =
    categoria === "todas" ? menu : menu.filter((p) => p.categoria === categoria);

  const categoriasConPlatos = categorias.filter((c) =>
    menu.some((p) => p.categoria === c.id),
  );

  return (
    <>
      <BarraMenu
        vista={vista}
        onCambiarVista={(v) => escribirCrudo(CLAVE_VISTA, v)}
        categoria={categoria}
        onCambiarCategoria={setCategoria}
        categorias={categoriasConPlatos}
      />

      {vista === "reels" && (
        <div className="flex justify-center bg-base md:py-6">
          <div className="h-[calc(100dvh-4rem)] w-full snap-y snap-mandatory overflow-y-auto overscroll-contain md:h-[calc(100dvh-8rem)] md:max-w-sm md:rounded-3xl md:border md:border-borde md:shadow-2xl">
            {platos.map((p) => (
              <ReelPlato key={p.id} plato={p} />
            ))}
          </div>
        </div>
      )}

      {vista === "lista" && (
        <Contenedor>
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 py-6 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {platos.map((p) => (
              <TarjetaPlato key={p.id} plato={p} onAbrir={setDetalle} />
            ))}
          </div>
        </Contenedor>
      )}

      <DetallePlato plato={detalle} onCerrar={() => setDetalle(null)} />
    </>
  );
}
