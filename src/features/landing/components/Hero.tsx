import Image from "next/image";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { BotonEnlace } from "@/shared/components/ui/Boton";
import { negocio } from "@/shared/config/negocio";
import { IconoCarrito } from "@/shared/components/ui/Iconos";
import { Brasas } from "./Brasas";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-base pt-16">
      {/*
        Fondo negro. El calor entra solo como un resplandor bajo, pegado al
        borde inferior — no como un lavado cafe sobre toda la pantalla.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 30% 120%, rgba(227,81,32,0.28) 0%, rgba(160,16,16,0.12) 40%, transparent 72%)",
        }}
      />
      <Brasas />

      <Contenedor className="relative pb-20 pt-14 sm:pb-28">
        {/* Asimetrico a proposito: el texto pesa a la izquierda. */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-acento" aria-hidden="true" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-acento">
              {negocio.ciudad} · {negocio.provincia}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[3.25rem] font-bold uppercase leading-[0.86] tracking-[-0.02em] text-texto sm:text-8xl lg:text-9xl">
            5ta Avenida
            <span className="block text-acento">Grill</span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-texto-suave sm:text-xl">
            {negocio.tagline}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BotonEnlace href="/menu" tamano="lg">
              <IconoCarrito />
              Ordenar
            </BotonEnlace>
            <BotonEnlace href="/menu" variante="contorno" tamano="lg">
              Ver el menú
            </BotonEnlace>
          </div>
        </div>

        {/* La marca queda como sello, no como logo gigante centrado. */}
        <Image
          src="/marca/logo.jpg"
          alt={`Logo de ${negocio.nombre}, parrilla en ${negocio.ciudad}`}
          width={220}
          height={220}
          priority
          className="pointer-events-none absolute -right-10 bottom-14 hidden w-44 rounded-full opacity-[0.07] grayscale lg:block xl:w-56"
        />
      </Contenedor>
    </section>
  );
}
