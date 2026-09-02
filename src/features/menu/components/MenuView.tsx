"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { leerCrudo, escribirCrudo, suscribir } from "@/shared/lib/almacenLocal";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { TarjetaPlato } from "./TarjetaPlato";
import { ReelPlato } from "./ReelPlato";
import { menu } from "../data/menu";
import { categorias } from "../data/categorias";
import type { CategoriaId } from "../types";

const CLAVE_VISTA = "5ta-avenida-vista-menu";
type Vista = "lista" | "reels";

/**
 * Orquesta las dos vistas del menu.
 *
 * El alternador es EXCLUSIVO DE MOVIL. En escritorio siempre se muestra la
 * lista en grilla: un reel a pantalla completa en un monitor horizontal no
 * aporta nada y arrastraria el peso de los videos sin beneficio.
 */
export function MenuView() {
  const [categoria, setCategoria] = useState<CategoriaId | "todas">("todas");

  // La preferencia se lee del almacen externo, no con setState en un efecto.
  const guardada = useSyncExternalStore(
    useCallback((f) => suscribir(CLAVE_VISTA, f), []),
    () => leerCrudo(CLAVE_VISTA),
    () => null, // en el servidor siempre lista
  );
  const vista: Vista = guardada === "reels" ? "reels" : "lista";

  function cambiarVista(nueva: Vista) {
    escribirCrudo(CLAVE_VISTA, nueva);
  }

  const platos =
    categoria === "todas" ? menu : menu.filter((p) => p.categoria === categoria);

  const categoriasConPlatos = categorias.filter((c) =>
    menu.some((p) => p.categoria === c.id),
  );

  return (
    <>
      {/* Alternador de vista: solo movil */}
      <div className="md:hidden">
        <Contenedor className="pb-4">
          <div
            role="group"
            aria-label="Forma de ver el menú"
            className="inline-flex rounded-full border border-borde bg-superficie p-1"
          >
            {(["lista", "reels"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => cambiarVista(v)}
                aria-pressed={vista === v}
                className={`rounded-full px-5 py-2 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                  vista === v
                    ? "bg-acento text-base"
                    : "text-texto-suave hover:text-acento-alt"
                }`}
              >
                {v === "lista" ? "Lista" : "Reels"}
              </button>
            ))}
          </div>
        </Contenedor>
      </div>

      {/* Vista Reels: solo movil y solo si esta elegida */}
      {vista === "reels" && (
        <div className="md:hidden">
          <div className="h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-contain">
            {platos.map((p) => (
              <ReelPlato key={p.id} plato={p} />
            ))}
          </div>
        </div>
      )}

      {/* Vista Lista: siempre en escritorio; en movil solo si esta elegida */}
      <div className={vista === "reels" ? "hidden md:block" : ""}>
        <Contenedor>
          <div
            role="group"
            aria-label="Filtrar por categoría"
            className="sticky top-16 z-30 -mx-1 flex gap-2 overflow-x-auto bg-base/90 px-1 py-3 backdrop-blur-sm"
          >
            <BotonCategoria
              activo={categoria === "todas"}
              onClick={() => setCategoria("todas")}
            >
              Todo
            </BotonCategoria>
            {categoriasConPlatos.map((c) => (
              <BotonCategoria
                key={c.id}
                activo={categoria === c.id}
                onClick={() => setCategoria(c.id)}
              >
                {c.nombre}
              </BotonCategoria>
            ))}
          </div>

          <div className="grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {platos.map((p) => (
              <TarjetaPlato key={p.id} plato={p} />
            ))}
          </div>
        </Contenedor>
      </div>
    </>
  );
}

function BotonCategoria({
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
