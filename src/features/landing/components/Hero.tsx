import Image from "next/image";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { BotonEnlace } from "@/shared/components/ui/Boton";
import { negocio } from "@/shared/config/negocio";
import { IconoCarrito } from "@/shared/components/ui/Iconos";
import { CurvaInferior } from "@/shared/components/ui/CurvaInferior";
import { Brasas } from "./Brasas";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-base pb-24 pt-16 sm:pb-28">
      {/* Fondo negro. El calor entra como resplandor bajo, no como lavado cafe. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 30% 120%, rgba(227,81,32,0.26) 0%, rgba(160,16,16,0.10) 42%, transparent 74%)",
        }}
      />
      <Brasas />

      <Contenedor className="relative py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          {/* Columna de texto */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-acento" aria-hidden="true" />
              <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-acento">
                {negocio.ciudad} · {negocio.provincia}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[3.25rem] font-bold uppercase italic leading-[0.86] tracking-[-0.02em] text-texto sm:text-7xl lg:text-8xl">
              5ta Avenida
              <span className="block text-acento">Grill</span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-texto-suave sm:text-xl">
              {negocio.tagline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotonEnlace href="/menu" tamano="lg">
                <IconoCarrito />
                Ordenar
              </BotonEnlace>
              <BotonEnlace href="/menu" variante="contorno" tamano="lg">
                Ver el menú
              </BotonEnlace>
            </div>
          </div>

          {/*
            Producto recortado sobre circulo de color, el patron de la
            referencia. El circulo va detras y el plato lo desborda.
          */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              aria-hidden="true"
              className="absolute aspect-square w-[78%] max-w-sm rounded-full bg-acento/85 blur-[2px]"
            />
            <div
              aria-hidden="true"
              className="absolute aspect-square w-[92%] max-w-md rounded-full bg-acento/10"
            />
            <Image
              src="/platos/hamburguesa-5ta.png"
              alt="Hamburguesa La 5ta Avenida con carne mechada y camarones en 5ta Avenida Grill, San Ramón"
              width={488}
              height={337}
              priority
              className="relative w-full max-w-lg drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </Contenedor>

      {/* La seccion de abajo sube y muerde el hero, como en la referencia. */}
      <CurvaInferior className="text-base-alt" />
    </section>
  );
}
