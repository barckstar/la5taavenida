import Image from "next/image";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { IconoCheck } from "@/shared/components/ui/IconoCheck";
import { sobreNosotros } from "../data/landing";
import { negocio } from "@/shared/config/negocio";

export function SobreNosotros() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-base-alt py-20 sm:py-28">
      <Contenedor>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Marca dentro de un circulo, como el patron de la referencia. */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-acento/12 ring-1 ring-acento/25"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[12%] rounded-full bg-acento/8"
            />
            <Image
              src="/marca/logo.jpg"
              alt={`Logo de ${negocio.nombre}, parrilla en ${negocio.ciudad}`}
              width={340}
              height={340}
              className="relative w-[62%] rounded-full shadow-2xl"
            />
          </div>

          <div>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-acento">
              {sobreNosotros.antetitulo}
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold uppercase italic leading-[0.92] tracking-tight text-texto sm:text-5xl">
              {sobreNosotros.tituloLinea1}
              <span className="block text-acento">
                {sobreNosotros.tituloLinea2}
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-texto-suave">
              {sobreNosotros.parrafo}
            </p>

            <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {sobreNosotros.puntos.map((punto) => (
                <li key={punto} className="flex items-start gap-3">
                  <IconoCheck className="mt-0.5 size-5" />
                  <span className="text-texto">{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
