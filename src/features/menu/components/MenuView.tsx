"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { BarraMenu } from "./BarraMenu";
import { TarjetaPlato } from "./TarjetaPlato";
import { menu } from "../data/menu";
import { ofertasVigentes, ofertaComoPlato } from "@/features/ofertas/data/ofertas";
import { categorias } from "../data/categorias";
import { suscribir, leerCrudo } from "@/shared/lib/almacenLocal";
import { CLAVE_FAVORITOS, leerFavoritos } from "@/shared/lib/favoritos";
import type { FiltroCatalogo } from "@/shared/types/menu";

/**
 * Cuadricula del menu.
 *
 * Los reels viven en su propia ruta (/menu/reels) con su propio componente: no
 * son un modo de esta vista. Asi cada experiencia carga solo su JavaScript y
 * la de reels puede tomarse la pantalla completa sin pelear con esta.
 *
 * La hoja de detalle ya no se monta aqui: vive en el layout, para que tambien
 * la abran los destacados y las ofertas del inicio.
 */
export function MenuView() {
  const [filtro, setFiltro] = useState<FiltroCatalogo>("todas");

  // Los favoritos se leen del almacen externo, igual que el carrito: hidratar
  // con `setState` dentro de un efecto esta prohibido por React 19.
  useSyncExternalStore(
    useCallback((f) => suscribir(CLAVE_FAVORITOS, f), []),
    () => leerCrudo(CLAVE_FAVORITOS),
    () => null,
  );
  const favoritos = typeof window === "undefined" ? [] : leerFavoritos();

  /*
    Las ofertas entran al menu como una categoria mas, convertidas a la forma
    de plato. Asi el filtro, la tarjeta y el carrito las tratan igual que
    cualquier otro producto, sin logica aparte.
  */
  const catalogo = [...ofertasVigentes().map(ofertaComoPlato), ...menu];
  const platos =
    filtro === "todas"
      ? catalogo
      : filtro === "favoritos"
        ? catalogo.filter((p) => favoritos.includes(p.id))
        : catalogo.filter((p) => p.categoria === filtro);

  const categoriasConPlatos = categorias.filter((c) =>
    catalogo.some((p) => p.categoria === c.id),
  );

  return (
    <>
      <BarraMenu
        filtro={filtro}
        onCambiarFiltro={setFiltro}
        categorias={categoriasConPlatos}
        cantidadFavoritos={favoritos.length}
      />

      <Contenedor>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 py-6 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {platos.map((p) => (
            <TarjetaPlato key={p.id} plato={p} />
          ))}
        </div>

        {/*
          El filtro de favoritos es el unico que puede quedar vacio: las
          categorias solo se dibujan si tienen platos. Sin este aviso la
          pantalla se veria simplemente rota.
        */}
        {platos.length === 0 && (
          <p className="py-16 text-center text-texto-suave">
            Todavía no ha guardado ningún plato. Toque el corazón de los que
            quiera tener a mano.
          </p>
        )}
      </Contenedor>
    </>
  );
}
