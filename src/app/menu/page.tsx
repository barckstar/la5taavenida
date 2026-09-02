import type { Metadata } from "next";
import { Contenedor } from "@/shared/components/ui/Contenedor";
import { MenuView } from "@/features/menu/components/MenuView";
import { negocio } from "@/shared/config/negocio";

export const metadata: Metadata = {
  title: "Menú",
  description: `Hamburguesas, costillas y alitas a la parrilla en ${negocio.ciudad}. Pedí en línea y coordinamos por WhatsApp ${negocio.whatsappVisible}.`,
};

export default function PaginaMenu() {
  return (
    <main className="flex-1 pt-16">
      <Contenedor className="pb-2 pt-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-acento" aria-hidden="true" />
          <span className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-acento">
            Menú
          </span>
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold uppercase italic leading-[0.9] tracking-tight text-texto sm:text-6xl">
          Todo pasa por
          <span className="block text-acento">la parrilla</span>
        </h1>
        <p className="mt-4 max-w-lg text-texto-suave">
          Armá tu pedido y lo terminamos por WhatsApp. Precios finales, sin
          sorpresas.
        </p>
      </Contenedor>

      <MenuView />
    </main>
  );
}
