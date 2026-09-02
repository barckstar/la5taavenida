import Image from "next/image";
import { formatoColones } from "@/shared/lib/formatoColones";
import { BotonAgregar } from "./BotonAgregar";
import type { Plato } from "../types";

export function TarjetaPlato({ plato }: { plato: Plato }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-borde bg-superficie transition-colors duration-300 hover:border-acento/45 ${
        plato.disponible ? "" : "opacity-60"
      }`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-base-alt">
        <Image
          src={plato.media.src}
          alt={plato.media.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!plato.disponible && (
          <span className="absolute left-3 top-3 rounded-full bg-base/85 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-texto-suave">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold uppercase italic tracking-wide text-texto">
          {plato.nombre}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-texto-suave">
          {plato.descripcion}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display text-2xl font-bold text-acento">
            {formatoColones(plato.precio)}
          </p>
          <BotonAgregar plato={plato} />
        </div>
      </div>
    </article>
  );
}
