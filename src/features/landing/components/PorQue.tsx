import Image from "next/image";
import { Seccion } from "@/shared/components/ui/Seccion";
import { porQue } from "../data/landing";
import { RevelarCascada, ItemCascada } from "@/shared/components/ui/Revelar";

export function PorQue() {
  return (
    <Seccion id="porque" antetitulo={porQue.antetitulo} titulo={porQue.titulo}>
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Barras apiladas con borde de acento a la izquierda. */}
        <RevelarCascada className="space-y-4">
          {porQue.razones.map((r) => (
            <ItemCascada key={r.titulo}>
              <div className="border-l-4 border-acento bg-superficie px-6 py-5 transition-transform duration-300 hover:translate-x-1">
              <h3 className="font-display text-lg font-semibold uppercase italic tracking-wide text-texto">
                {r.titulo}
              </h3>
              <p className="mt-2 leading-relaxed text-texto-suave">{r.texto}</p>
              </div>
            </ItemCascada>
          ))}
        </RevelarCascada>

        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-[6%] rounded-full bg-acento/85"
          />
          <Image
            src="/platos/hamburguesa-5ta.webp"
            alt="Hamburguesa a la parrilla de 5ta Avenida Grill, San Ramón"
            width={1672}
            height={941}
            className="relative w-[115%] max-w-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </Seccion>
  );
}
