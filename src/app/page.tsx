import { Hero } from "@/features/landing/components/Hero";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { Tarjeta } from "@/shared/components/ui/Tarjeta";
import { negocio } from "@/shared/config/negocio";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      {/*
        Secciones provisionales de la Tarea 12. Existen ahora para dar altura
        de scroll y poder verificar el navbar que se esconde.
      */}
      <section id="ubicacion" className="py-24">
        <Contenedor>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-texto sm:text-4xl">
            Dónde encontrarnos
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Tarjeta className="p-7">
              <h3 className="font-display text-lg uppercase tracking-wide text-acento-alt">
                Dirección
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-texto-suave">
                {negocio.direccion}
              </p>
            </Tarjeta>
            <Tarjeta className="p-7">
              <h3 className="font-display text-lg uppercase tracking-wide text-acento-alt">
                Pedidos
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-texto-suave">
                WhatsApp {negocio.whatsappVisible}. Retiro en el local o servicio
                express.
              </p>
            </Tarjeta>
            <Tarjeta className="p-7">
              <h3 className="font-display text-lg uppercase tracking-wide text-acento-alt">
                Horario
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-texto-suave">
                Martes a jueves de 11:00 a 22:00. Viernes y sábado hasta
                medianoche.
              </p>
            </Tarjeta>
          </div>
        </Contenedor>
      </section>
    </main>
  );
}
