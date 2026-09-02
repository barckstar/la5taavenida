"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Plato } from "@/features/menu/types";
import type { AccionCarrito, LineaCarrito } from "../types";
import { leerCrudo, escribirCrudo, suscribir } from "@/shared/lib/almacenLocal";

const CLAVE = "5ta-avenida-carrito";

/**
 * Reducer puro, exportado aparte para probarlo sin React.
 * Nunca muta: siempre devuelve un arreglo nuevo.
 */
export function carritoReducer(
  estado: LineaCarrito[],
  accion: AccionCarrito,
): LineaCarrito[] {
  switch (accion.tipo) {
    case "agregar": {
      // Un plato agotado no entra al carrito, aunque se fuerce la accion.
      if (!accion.plato.disponible) return estado;

      const existe = estado.find((l) => l.plato.id === accion.plato.id);
      if (existe) {
        return estado.map((l) =>
          l.plato.id === accion.plato.id ? { ...l, cantidad: l.cantidad + 1 } : l,
        );
      }
      return [...estado, { plato: accion.plato, cantidad: 1 }];
    }

    case "cambiarCantidad": {
      // Cero o menos elimina la linea: evita cantidades negativas.
      if (accion.cantidad <= 0) {
        return estado.filter((l) => l.plato.id !== accion.id);
      }
      return estado.map((l) =>
        l.plato.id === accion.id ? { ...l, cantidad: accion.cantidad } : l,
      );
    }

    case "quitar":
      return estado.filter((l) => l.plato.id !== accion.id);

    case "ponerNota":
      return estado.map((l) =>
        l.plato.id === accion.id
          ? { ...l, nota: accion.nota.trim() || undefined }
          : l,
      );

    case "vaciar":
      return [];

    case "hidratar":
      return accion.lineas;
  }
}

export function total(lineas: LineaCarrito[]): number {
  return lineas.reduce((suma, l) => suma + l.plato.precio * l.cantidad, 0);
}

export function conteo(lineas: LineaCarrito[]): number {
  return lineas.reduce((suma, l) => suma + l.cantidad, 0);
}

const VACIO: LineaCarrito[] = [];

function parsear(crudo: string | null): LineaCarrito[] {
  if (!crudo) return VACIO;
  try {
    const dato = JSON.parse(crudo);
    return Array.isArray(dato) ? (dato as LineaCarrito[]) : VACIO;
  } catch {
    return VACIO;
  }
}

type ValorCarrito = {
  lineas: LineaCarrito[];
  agregar: (plato: Plato) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  quitar: (id: string) => void;
  ponerNota: (id: string, nota: string) => void;
  vaciar: () => void;
  cantidadDe: (id: string) => number;
  total: number;
  conteo: number;
  abierto: boolean;
  abrir: () => void;
  cerrar: () => void;
};

const CarritoContexto = createContext<ValorCarrito | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);

  /*
    localStorage es el almacen real y se lee con useSyncExternalStore. Asi no
    hace falta hidratar con un setState dentro de un efecto (patron que React 19
    marca por provocar renders en cascada) y el desajuste servidor/cliente lo
    resuelve React: en el servidor devuelve el snapshot vacio y en el cliente el
    guardado.
  */
  const crudo = useSyncExternalStore(
    useCallback((f) => suscribir(CLAVE, f), []),
    () => leerCrudo(CLAVE),
    () => null, // snapshot del servidor: carrito vacio
  );

  const lineas = useMemo(() => parsear(crudo), [crudo]);

  const despachar = useCallback(
    (accion: AccionCarrito) => {
      const siguiente = carritoReducer(parsear(leerCrudo(CLAVE)), accion);
      escribirCrudo(CLAVE, JSON.stringify(siguiente));
    },
    [],
  );

  const valor = useMemo<ValorCarrito>(
    () => ({
      lineas,
      agregar: (plato) => despachar({ tipo: "agregar", plato }),
      cambiarCantidad: (id, cantidad) =>
        despachar({ tipo: "cambiarCantidad", id, cantidad }),
      quitar: (id) => despachar({ tipo: "quitar", id }),
      ponerNota: (id, nota) => despachar({ tipo: "ponerNota", id, nota }),
      vaciar: () => despachar({ tipo: "vaciar" }),
      cantidadDe: (id) => lineas.find((l) => l.plato.id === id)?.cantidad ?? 0,
      total: total(lineas),
      conteo: conteo(lineas),
      abierto,
      abrir: () => setAbierto(true),
      cerrar: () => setAbierto(false),
    }),
    [lineas, despachar, abierto],
  );

  return (
    <CarritoContexto.Provider value={valor}>{children}</CarritoContexto.Provider>
  );
}

export function useCarrito(): ValorCarrito {
  const ctx = useContext(CarritoContexto);
  if (!ctx) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  }
  return ctx;
}
