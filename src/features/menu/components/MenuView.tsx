"use client";

import { useState } from "react";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { BarraMenu } from "./BarraMenu";
import { TarjetaPlato } from "./TarjetaPlato";
import { DetallePlato } from "./DetallePlato";
import { menu } from "../data/menu";
import { categorias } from "../data/categorias";
import type { CategoriaId, Plato } from "../types";

/**
 * Cuadricula del menu.
 *
 * Los reels viven en su propia ruta (/menu/reels) con su propio componente: no
 * son un modo de esta vista. Asi cada experiencia carga solo su JavaScript y
 * la de reels puede tomarse la pantalla completa sin pelear con esta.
 */
export function MenuView() {
  const [categoria, setCategoria] = useState<CategoriaId | "todas">("todas");
  const [detalle, setDetalle] = useState<Plato | null>(null);

  const platos =
    categoria === "todas" ? menu : menu.filter((p) => p.categoria === categoria);

  const categoriasConPlatos = categorias.filter((c) =>
    menu.some((p) => p.categoria === c.id),
  );

  return (
    <>
      <BarraMenu
        categoria={categoria}
        onCambiarCategoria={setCategoria}
        categorias={categoriasConPlatos}
      />

      <Contenedor>
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 py-6 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {platos.map((p) => (
              <TarjetaPlato key={p.id} plato={p} onAbrir={setDetalle} />
            ))}
          </div>
        </Contenedor>

      <DetallePlato plato={detalle} onCerrar={() => setDetalle(null)} />
    </>
  );
}
