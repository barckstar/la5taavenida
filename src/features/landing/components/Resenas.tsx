import { Seccion } from "@/shared/components/ui/Seccion";
import { BotonEnlace } from "@/shared/components/ui/Boton";
import { negocio } from "@/shared/config/negocio";
import { resenasEjemplo, enlaceResena, enlaceFichaGoogle } from "../data/resenas";
import {
  Revelar,
  RevelarCascada,
  ItemCascada,
} from "@/shared/components/ui/Revelar";

function Estrellas({
  cantidad,
  className = "size-4",
}: {
  cantidad: number;
  className?: string;
}) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${cantidad} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`${className} ${
            i <= Math.round(cantidad) ? "fill-acento-alt" : "fill-borde"
          }`}
        >
          <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

function EtiquetaGoogle() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-texto-suave">
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.86c2.26-2.09 3.57-5.17 3.57-8.87Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.87-3a7.2 7.2 0 0 1-10.72-3.78h-4v3.09A12 12 0 0 0 12 24Z"
        />
        <path
          fill="#FBBC05"
          d="M5.35 14.3a7.1 7.1 0 0 1 0-4.6V6.61h-4a12 12 0 0 0 0 10.78l4-3.09Z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.35 6.61l4 3.09A7.15 7.15 0 0 1 12 4.75Z"
        />
      </svg>
      Google
    </span>
  );
}

/**
 * Insignia resumen, al estilo de la de mascontractorsllc.
 *
 * Solo se dibuja con la calificacion REAL de la ficha de Google. Mientras no
 * la tengamos, se invita a dejar la primera resena — honesto y util — en vez
 * de mostrar un promedio inventado.
 */
function ResumenCalificacion() {
  const { calificacion, cantidadResenas } = negocio.google;

  if (calificacion === null || cantidadResenas === null) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl bg-superficie px-8 py-6 text-center ring-1 ring-borde">
        <Estrellas cantidad={5} className="size-5" />
        <p className="text-texto-suave">
          Ya somos {negocio.seguidoresFacebook.toLocaleString("es-CR")} en
          Facebook. Contanos cómo te fue en tu última visita.
        </p>
        <BotonEnlace href={enlaceResena()} tamano="md">
          Dejar la primera reseña
        </BotonEnlace>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-x-7 gap-y-4 rounded-2xl bg-superficie px-8 py-5 ring-1 ring-borde">
      <div className="text-center">
        <p className="font-display text-4xl font-bold leading-none text-texto">
          {calificacion.toFixed(1)}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-texto-suave">
          de 5
        </p>
      </div>
      <div className="border-borde sm:border-l sm:pl-7">
        <Estrellas cantidad={calificacion} />
        <p className="mt-1.5 text-sm text-texto-suave">
          Basado en {cantidadResenas} reseñas
        </p>
      </div>
      <div className="border-borde sm:border-l sm:pl-7">
        <EtiquetaGoogle />
      </div>
    </div>
  );
}

export function Resenas() {
  return (
    <Seccion
      id="resenas"
      antetitulo="Reseñas verificadas"
      titulo="Lo que dice la gente de San Ramón"
    >
      <Revelar>
        <ResumenCalificacion />
      </Revelar>

      <RevelarCascada className="mt-12 grid gap-5 md:grid-cols-3">
        {resenasEjemplo.map((r, i) => (
          <ItemCascada key={i} className="h-full">
            <article className="flex h-full flex-col rounded-2xl bg-superficie p-6 ring-1 ring-borde">
              <div className="flex items-center justify-between gap-3">
                <Estrellas cantidad={r.estrellas} />
                <EtiquetaGoogle />
              </div>

              <div className="mt-4 flex flex-1 gap-2">
                <span
                  aria-hidden="true"
                  className="font-display text-3xl leading-none text-acento/50"
                >
                  &ldquo;
                </span>
                <p className="leading-relaxed text-texto-suave">{r.texto}</p>
              </div>

              <div className="mt-6 flex items-end justify-between gap-3 border-t border-borde pt-4">
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-texto">
                  {r.autor}
                </p>
                <p className="text-xs text-texto-suave">{r.fecha}</p>
              </div>
            </article>
          </ItemCascada>
        ))}
      </RevelarCascada>

      <Revelar retraso={0.1}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <BotonEnlace href={enlaceResena()} tamano="lg">
            Dejar una reseña en Google
          </BotonEnlace>
          <BotonEnlace
            href={enlaceFichaGoogle()}
            variante="contorno"
            tamano="lg"
          >
            Ver todas en Maps
          </BotonEnlace>
        </div>
      </Revelar>
    </Seccion>
  );
}
