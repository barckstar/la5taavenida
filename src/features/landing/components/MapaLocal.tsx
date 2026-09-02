import { negocio } from "@/shared/config/negocio";

/**
 * Mapa del local: embed oficial de Google Maps.
 *
 * Se intento Leaflet para poder meter el logo dentro del pin — el embed de
 * Google no admite marcadores personalizados. No prospero: las teselas oscuras
 * de CartoDB pasaron a exigir llave de API y salian marcadas con
 * "API KEY REQUIRED" sobre todo el mapa.
 *
 * Este embed viene del enlace real que compartio el cliente, asi que cae
 * exactamente sobre su ficha y muestra el marcador propio de Google con el
 * nombre del negocio.
 *
 * Si mas adelante se quiere el pin con el logo, las opciones son: teselas de
 * pago (Mapbox, Stadia, Maptiler) o la Google Maps JavaScript API, y las dos
 * piden llave y facturacion.
 */
const EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6606.286142091869!2d-84.47478940987175!3d10.089150731844265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa04547e1c6e995%3A0xd5cab6e9d05265f0!2s5ta%20Avenida%20Grill!5e0!3m2!1ses!2scr!4v1788326312746!5m2!1ses!2scr";

export function MapaLocal() {
  return (
    <iframe
      title={`Mapa con la ubicación de ${negocio.nombre} en ${negocio.ciudad}, ${negocio.provincia}`}
      src={EMBED}
      loading="lazy"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      className="h-80 w-full border-0 lg:h-full lg:min-h-[26rem]"
    />
  );
}
