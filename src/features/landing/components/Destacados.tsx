import Image from "next/image";
import Link from "next/link";
import { Seccion } from "@/shared/components/ui/Seccion";
import { BotonEnlace } from "@/shared/components/ui/Boton";
import { formatoColones } from "@/shared/lib/formatoColones";
import { platosDestacados } from "@/features/menu/data/menu";
import { RevelarCascada, ItemCascada } from "@/shared/components/ui/Revelar";

export function Destacados() {
  return (
    <Seccion
      id="destacados"
      antetitulo="Lo más pedido"
      titulo="Los que no fallan"
      className="bg-base-alt"
    >
      <RevelarCascada className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {platosDestacados.map((plato) => (
          <ItemCascada key={plato.id} className="h-full">
          <Link
            href="/menu"
            className="group overflow-hidden rounded-2xl bg-superficie ring-1 ring-borde transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src={plato.media.src}
                alt={plato.media.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-texto">
                {plato.nombre}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-texto-suave">
                {plato.descripcion}
              </p>
              <p className="mt-4 font-display text-2xl font-bold text-acento">
                {formatoColones(plato.precio)}
              </p>
            </div>
          </Link>
          </ItemCascada>
        ))}
      </RevelarCascada>

      <div className="mt-10">
        <BotonEnlace href="/menu" variante="contorno" tamano="lg">
          Ver el menú completo
        </BotonEnlace>
      </div>
    </Seccion>
  );
}
