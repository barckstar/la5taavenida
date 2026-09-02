import { formatoColones } from "@/shared/lib/formatoColones";
import { negocio } from "@/shared/config/negocio";
import type { LineaCarrito } from "@/features/carrito/types";
import type { DatosPedido } from "../schema";
import { enlaceUbicacion } from "./direccionesGuardadas";

/**
 * Margen seguro para el texto YA CODIFICADO que viaja dentro de la URL de
 * wa.me. Los navegadores aceptan mas, pero WhatsApp en iOS trunca antes y lo
 * hace en silencio: el pedido llega incompleto y nadie se entera.
 */
export const LIMITE_SEGURO = 1500;

export type MensajePedido = {
  texto: string;
  largoCodificado: number;
  excedeLimite: boolean;
};

export function construirMensaje(
  lineas: LineaCarrito[],
  datos: DatosPedido,
  totalPedido: number,
): MensajePedido {
  const partes: string[] = [`*PEDIDO — ${negocio.nombre}*`, ""];

  for (const l of lineas) {
    partes.push(
      `${l.cantidad}x ${l.plato.nombre}  ${formatoColones(l.plato.precio * l.cantidad)}`,
    );
    if (l.nota) partes.push(`   ${l.nota}`);
  }

  partes.push("", `*TOTAL: ${formatoColones(totalPedido)}*`, "");

  const modalidad = datos.modalidad === "express" ? "Express" : "Retiro";
  partes.push(`${modalidad} · ${datos.nombre} · ${datos.telefono}`);

  if (datos.modalidad === "express" && datos.direccion) {
    partes.push(datos.direccion);
    /*
      El enlace de Maps con las coordenadas exactas.

      WhatsApp no permite adjuntar un pin de ubicacion desde un enlace wa.me,
      asi que se manda el enlace: el mensajero lo toca y le abre la ruta. En
      la practica resuelve lo mismo y no cuesta nada — las coordenadas salen
      de navigator.geolocation, que es del navegador y no pide llave.
    */
    if (typeof datos.lat === "number" && typeof datos.lng === "number") {
      partes.push(`Ubicación: ${enlaceUbicacion(datos.lat, datos.lng)}`);
    }
  }

  if (datos.notas) partes.push(`Nota: ${datos.notas}`);

  partes.push("Pago y envío: a coordinar");

  const texto = partes.join("\n");
  const largoCodificado = encodeURIComponent(texto).length;

  return {
    texto,
    largoCodificado,
    excedeLimite: largoCodificado > LIMITE_SEGURO,
  };
}

/** Abre WhatsApp con el pedido ya escrito. */
export function enviarPorWhatsApp(texto: string): void {
  const url = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
