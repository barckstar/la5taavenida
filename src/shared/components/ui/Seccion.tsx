import type { ReactNode } from "react";
import { Contenedor } from "./Contenedor";

/**
 * Seccion anclada del inicio. El `id` es el destino de las anclas del navbar.
 * `scroll-mt-20` compensa el navbar fijo para que el titulo no quede tapado.
 */
export function Seccion({
  id,
  titulo,
  antetitulo,
  children,
  className,
}: {
  id: string;
  titulo: string;
  antetitulo?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={["scroll-mt-20 py-20 sm:py-28", className].filter(Boolean).join(" ")}
    >
      <Contenedor>
        {antetitulo && (
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-acento" aria-hidden="true" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-acento">
              {antetitulo}
            </span>
          </div>
        )}
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-texto sm:text-5xl">
          {titulo}
        </h2>
        <div className="mt-10">{children}</div>
      </Contenedor>
    </section>
  );
}
