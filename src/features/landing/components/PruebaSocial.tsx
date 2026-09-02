import { negocio } from "@/shared/config/negocio";

function Estrellas({ calificacion }: { calificacion: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${calificacion} de 5 estrellas en Google`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`size-4 ${
            i <= Math.round(calificacion) ? "fill-acento-alt" : "fill-borde"
          }`}
        >
          <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Prueba social bajo los botones del hero.
 *
 * Muestra la calificacion de Google SOLO si tenemos el dato real. Mientras
 * `calificacion` y `cantidadResenas` sigan en null, cae a los seguidores de
 * Facebook, que si estan verificados.
 *
 * No se inventan cifras: una calificacion o un conteo de clientes falso en el
 * sitio de un negocio real se desmiente abriendo Google Maps.
 */
export function PruebaSocial() {
  const { calificacion, cantidadResenas, cid } = negocio.google;
  const tieneDatoDeGoogle = calificacion !== null && cantidadResenas !== null;

  if (tieneDatoDeGoogle) {
    return (
      <a
        href={`https://www.google.com/maps?cid=${cid}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-col gap-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acento"
      >
        <div className="flex items-center gap-2.5">
          <Estrellas calificacion={calificacion} />
          <span className="text-sm text-texto-suave">Google Reviews</span>
        </div>
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-texto">
          {calificacion.toFixed(1)} · {cantidadResenas} reseñas
        </p>
      </a>
    );
  }

  return (
    <a
      href={negocio.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-col gap-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acento"
    >
      <span className="font-display text-xs uppercase tracking-[0.24em] text-acento">
        Comunidad
      </span>
      <p className="font-display text-lg font-semibold uppercase tracking-wide text-texto">
        {negocio.seguidoresFacebook.toLocaleString("es-CR")}
        <span className="text-texto-suave"> seguidores en Facebook</span>
      </p>
    </a>
  );
}
