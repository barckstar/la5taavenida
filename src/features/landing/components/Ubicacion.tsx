import { Seccion } from "@/shared/components/ui/Seccion";
import { BotonEnlace } from "@/shared/components/ui/Boton";
import { IconoWhatsApp } from "@/shared/components/ui/Iconos";
import { negocio, enlaceWhatsApp } from "@/shared/config/negocio";

export function Ubicacion() {
  return (
    <Seccion
      id="ubicacion"
      antetitulo="Dónde estamos"
      titulo="Pasá por el local o pedí a domicilio"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-acento">
              Dirección
            </h3>
            <address className="mt-3 not-italic text-lg leading-relaxed text-texto">
              {negocio.direccion}
            </address>
            <p className="mt-1 text-texto-suave">
              {negocio.ciudad}, {negocio.provincia}
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-acento">
              Horario
            </h3>
            <ul className="mt-3 space-y-2">
              {negocio.horarios.map((h) => (
                <li
                  key={h.dias}
                  className="flex items-baseline justify-between gap-6 border-b border-borde pb-2 text-sm"
                >
                  <span className="text-texto-suave">{h.dias}</span>
                  <span className="font-display tracking-wide text-texto">
                    {h.apertura && h.cierre
                      ? `${h.apertura} – ${h.cierre}`
                      : "Cerrado"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <BotonEnlace href={enlaceWhatsApp(`Hola ${negocio.nombre}, tengo una consulta.`)}>
            <IconoWhatsApp className="size-4" />
            Escribir al {negocio.whatsappVisible}
          </BotonEnlace>
        </div>

        <div className="overflow-hidden rounded-2xl ring-1 ring-borde">
          <iframe
            title={`Mapa de ${negocio.nombre} en ${negocio.ciudad}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${negocio.direccion}, ${negocio.ciudad}, Costa Rica`,
            )}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0 lg:h-full lg:min-h-[26rem]"
          />
        </div>
      </div>
    </Seccion>
  );
}
