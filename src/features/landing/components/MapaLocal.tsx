"use client";

import { useEffect, useRef } from "react";
import { negocio } from "@/shared/config/negocio";

/**
 * Mapa del local con un pin propio que lleva el logo adentro.
 *
 * Se usa Leaflet y no el iframe de Google Maps por una razon concreta: el
 * embed de Google NO admite marcadores personalizados, asi que con el era
 * imposible meter el logo en el pin. Leaflet ademas es gratis y no pide
 * llave de API.
 *
 * Las teselas son las oscuras de CartoDB: el mapa estandar de OSM es blanco
 * y quedaria como un bloque brillante en medio de un sitio negro.
 */
export function MapaLocal() {
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    let mapa: import("leaflet").Map | undefined;
    let cancelado = false;

    // Import dinamico: Leaflet toca `window` y no puede correr en el servidor.
    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelado || !nodo) return;

      const { lat, lng } = negocio.coordenadas;

      mapa = L.map(nodo, {
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false, // no secuestrar el scroll de la pagina
        attributionControl: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(mapa);

      // Pin de marca: gota naranja con el logo circular adentro.
      const pin = L.divIcon({
        className: "pin-5ta",
        iconSize: [64, 78],
        iconAnchor: [32, 78], // la punta toca el punto exacto
        popupAnchor: [0, -70],
        html: `
          <div class="pin-5ta__cuerpo">
            <svg viewBox="0 0 64 78" class="pin-5ta__gota" aria-hidden="true">
              <path d="M32 77C32 77 60 46.5 60 29A28 28 0 1 0 4 29C4 46.5 32 77 32 77Z"
                    fill="#E35120" stroke="#050505" stroke-width="3"/>
            </svg>
            <img src="/marca/logo.jpg"
                 alt=""
                 class="pin-5ta__logo" />
          </div>
        `,
      });

      L.marker([lat, lng], {
        icon: pin,
        title: `${negocio.nombre} — ${negocio.direccion}`,
        alt: `Ubicación de ${negocio.nombre} en ${negocio.ciudad}`,
        keyboard: true,
      })
        .addTo(mapa)
        .bindPopup(
          `<strong>${negocio.nombre}</strong><br>${negocio.direccion}`,
        );
    })();

    return () => {
      cancelado = true;
      mapa?.remove();
    };
  }, []);

  return (
    <div
      ref={contenedor}
      role="application"
      aria-label={`Mapa con la ubicación de ${negocio.nombre} en ${negocio.ciudad}, ${negocio.provincia}`}
      className="h-80 w-full lg:h-full lg:min-h-[26rem]"
    />
  );
}
