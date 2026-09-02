import { Seccion } from "@/shared/components/ui/Seccion";
import { Tarjeta } from "@/shared/components/ui/Tarjeta";
import { BotonEnlace } from "@/shared/components/ui/Boton";
import { negocio } from "@/shared/config/negocio";
import { resenasEjemplo, enlaceResena } from "../data/resenas";

function Estrellas({ cantidad }: { cantidad: number }) {
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
          className={`size-4 ${i <= cantidad ? "fill-acento-alt" : "fill-borde"}`}
        >
          <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

export function Resenas() {
  const consulta = `${negocio.nombre} ${negocio.ciudad} ${negocio.provincia} Costa Rica`;

  return (
    <Seccion
      id="resenas"
      antetitulo="Reseñas de Google"
      titulo="Lo que dice la gente"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {resenasEjemplo.map((r, i) => (
          <Tarjeta key={i} className="flex flex-col p-6">
            <Estrellas cantidad={r.estrellas} />
            <p className="mt-4 flex-1 leading-relaxed text-texto-suave">
              “{r.texto}”
            </p>
            <div className="mt-5 border-t border-borde pt-4">
              <p className="font-display text-sm uppercase tracking-wide text-texto">
                {r.autor}
              </p>
              <p className="text-xs text-texto-suave">{r.fecha}</p>
            </div>
          </Tarjeta>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <BotonEnlace href={enlaceResena(consulta)} tamano="lg">
          Dejar una reseña en Google
        </BotonEnlace>
        <BotonEnlace
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`}
          variante="contorno"
          tamano="lg"
        >
          Ver todas en Maps
        </BotonEnlace>
      </div>
    </Seccion>
  );
}
