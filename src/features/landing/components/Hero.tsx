import Image from "next/image";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { BotonEnlace } from "@/shared/components/ui/Boton";
import { negocio } from "@/shared/config/negocio";
import { IconoCarrito } from "@/shared/components/ui/Iconos";
import { CurvaInferior } from "@/shared/components/ui/CurvaInferior";
import { Brasas } from "./Brasas";
import { PruebaSocial } from "./PruebaSocial";
import { Revelar } from "@/shared/components/ui/Revelar";

/*
  Orden en el eje Z, de atras hacia adelante:
    -z-20  resplandor de fondo
    -z-10  la hamburguesa, a pantalla completa y muy atenuada
     z-0   las brasas, que asi parecen subir SOBRE el plato
     z-10  el texto y los botones, siempre por encima de todo
*/
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-base pb-24 pt-16 sm:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-20 h-2/3"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 30% 120%, rgba(227,81,32,0.26) 0%, rgba(160,16,16,0.10) 42%, transparent 74%)",
        }}
      />

      {/*
        Fondo de producto. Va detras de todo y muy transparente para que el
        texto siga siendo lo que manda. El recorte original tiene un borde
        recto donde la tabla toca el limite del lienzo, asi que se desvanece
        con una mascara en los cuatro lados.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.17]"
        style={{
          // Caida larga y gradual. Con un corte tardio se veia el borde recto
          // del recorte justo donde termina la tabla de madera.
          maskImage:
            "radial-gradient(ellipse 95% 62% at 50% 42%, #000 0%, rgba(0,0,0,0.9) 28%, rgba(0,0,0,0.45) 55%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 62% at 50% 42%, #000 0%, rgba(0,0,0,0.9) 28%, rgba(0,0,0,0.45) 55%, transparent 80%)",
        }}
      >
        <Image
          src="/platos/hamburguesa-5ta.webp"
          alt=""
          width={1672}
          height={941}
          priority
          className="h-auto w-[185%] max-w-none object-contain sm:w-full"
        />
      </div>

      {/*
        Disuelve el borde recto donde la tabla toca el limite del recorte.
        Va despues de la imagen y al mismo nivel de z, asi que la cubre.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-base via-base/75 to-transparent sm:h-2/5"
      />

      <Brasas />

      <Contenedor className="relative z-10 py-16 sm:py-20">
        <div className="max-w-2xl">
          <Revelar direccion="izquierda" unaVez>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-acento" aria-hidden="true" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-acento">
              {negocio.ciudad} · {negocio.provincia}
            </span>
          </div>
          </Revelar>

          <Revelar retraso={0.1} unaVez>
          <h1 className="mt-6 font-display text-[3.25rem] font-bold uppercase italic leading-[0.86] tracking-[-0.02em] text-texto sm:text-7xl lg:text-8xl">
            5ta Avenida
            <span className="block text-acento">Grill</span>
          </h1>
          </Revelar>

          <Revelar retraso={0.2} unaVez>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-texto-suave sm:text-xl">
              {negocio.tagline}
            </p>
          </Revelar>

          <Revelar retraso={0.3} unaVez>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BotonEnlace href="/menu" tamano="lg">
              <IconoCarrito />
              Ordenar
            </BotonEnlace>
            <BotonEnlace href="/menu" variante="contorno" tamano="lg">
              Ver el menú
            </BotonEnlace>
          </div>
          </Revelar>

          <Revelar retraso={0.4} unaVez className="mt-8">
            <PruebaSocial />
          </Revelar>
        </div>
      </Contenedor>

      <CurvaInferior className="text-base-alt" />
    </section>
  );
}
