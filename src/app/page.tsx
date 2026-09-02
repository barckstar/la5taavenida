import { negocio } from "@/shared/config/negocio";

/**
 * Placeholder de la Tarea 1: sirve para verificar que los tokens 70/30/10
 * y las fuentes cargan. Se reemplaza por la landing real en la Tarea 12.
 */
export default function Home() {
  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-5xl font-bold uppercase tracking-wide text-texto">
          {negocio.nombre}
        </h1>
        <p className="mt-3 text-lg text-texto-suave">{negocio.tagline}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-base-alt p-6">
            <p className="text-sm text-texto-suave">70% dominante</p>
            <p className="font-display text-xl text-texto">base / base-alt</p>
          </div>
          <div className="rounded-lg bg-superficie p-6">
            <p className="text-sm text-texto-suave">30% secundario</p>
            <p className="font-display text-xl text-texto">superficie</p>
          </div>
          <div className="rounded-lg bg-base p-6 ring-1 ring-superficie">
            <p className="text-sm text-texto-suave">10% acento</p>
            <p className="font-display text-xl text-acento">₡17.000</p>
          </div>
        </div>

        <p className="mt-10 text-sm text-texto-suave">
          {negocio.direccion} · WhatsApp {negocio.whatsappVisible}
        </p>
      </div>
    </main>
  );
}
