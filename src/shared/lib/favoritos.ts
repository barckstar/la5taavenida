import { leerCrudo, escribirCrudo } from "@/shared/lib/almacenLocal";

/**
 * Favoritos guardados en el propio dispositivo.
 *
 * Viven en `shared` porque los usan el menu y los reels, y una feature no
 * importa de otra. Nacieron dentro de reels, que fue donde se pidieron
 * primero.
 *
 * ============================================================================
 * POR QUE NO ES UN CONTADOR PUBLICO DE "ME GUSTA"
 * ============================================================================
 * Un contador compartido —"432 personas marcaron este plato"— necesita estado
 * que sobreviva entre visitantes, y eso es una base de datos: alguien tiene que
 * guardar el numero en algun lado y servirlo a todos. `localStorage` no sirve
 * para eso, porque vive solo en el telefono de cada quien.
 *
 * Hay caminos gratuitos (el plan libre de Vercel KV o de Upstash Redis), pero
 * dejan de ser gratis si el sitio crece y hay que mantenerlos. Como el proyecto
 * tiene la restriccion explicita de no gastar en servicios, se implementa lo
 * que SI se puede sin costo y sin servidor: favoritos por dispositivo.
 *
 * Ademas resuelve un problema real del cliente que un contador no resuelve:
 * volver a pedir lo de siempre sin buscarlo entre 35 platos.
 *
 * Y evita el atajo deshonesto de mostrar un numero inventado, que en el sitio
 * de un negocio real es un dato falso.
 * ============================================================================
 */

export const CLAVE_FAVORITOS = "5ta-avenida-favoritos";

export function leerFavoritos(): string[] {
  const crudo = leerCrudo(CLAVE_FAVORITOS);
  if (!crudo) return [];
  try {
    const dato = JSON.parse(crudo);
    return Array.isArray(dato) ? dato.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function alternarFavorito(id: string): void {
  const actuales = leerFavoritos();
  const siguiente = actuales.includes(id)
    ? actuales.filter((x) => x !== id)
    : [...actuales, id];
  escribirCrudo(CLAVE_FAVORITOS, JSON.stringify(siguiente));
}
