"use client";

import { useEffect, useRef, useState } from "react";
import { useCarrito } from "@/features/carrito/lib/carritoStore";
import { formatoColones } from "@/shared/lib/formatoColones";
import { negocio } from "@/shared/config/negocio";
import { IconoWhatsApp } from "@/shared/components/ui/Iconos";
import { datosPedidoSchema, type DatosPedido } from "../schema";
import {
  construirMensaje,
  enviarPorWhatsApp,
  LIMITE_SEGURO,
} from "../lib/construirMensaje";

type Errores = Partial<Record<keyof DatosPedido, string>>;

export function CheckoutDrawer({
  abierto,
  onCerrar,
}: {
  abierto: boolean;
  onCerrar: () => void;
}) {
  const { lineas, total, vaciar } = useCarrito();
  const panel = useRef<HTMLDivElement>(null);

  const [modalidad, setModalidad] = useState<"retiro" | "express">("retiro");
  const [errores, setErrores] = useState<Errores>({});
  const [avisoLargo, setAvisoLargo] = useState<string | null>(null);

  useEffect(() => {
    if (!abierto) return;
    document.body.style.overflow = "hidden";
    function alPulsar(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar();
    }
    document.addEventListener("keydown", alPulsar);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = "";
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAvisoLargo(null);

    const form = new FormData(e.currentTarget);
    const crudo = {
      nombre: String(form.get("nombre") ?? ""),
      telefono: String(form.get("telefono") ?? ""),
      modalidad,
      direccion: String(form.get("direccion") ?? ""),
      hora: String(form.get("hora") ?? ""),
      notas: String(form.get("notas") ?? ""),
    };

    const validado = datosPedidoSchema.safeParse(crudo);
    if (!validado.success) {
      const nuevos: Errores = {};
      for (const problema of validado.error.issues) {
        const campo = problema.path[0] as keyof DatosPedido;
        if (!nuevos[campo]) nuevos[campo] = problema.message;
      }
      setErrores(nuevos);
      return;
    }
    setErrores({});

    const mensaje = construirMensaje(lineas, validado.data, total);

    // Guarda contra el truncado silencioso de WhatsApp.
    if (mensaje.excedeLimite) {
      setAvisoLargo(
        `El pedido es muy largo para enviarlo en un solo mensaje (${mensaje.largoCodificado} de ${LIMITE_SEGURO} caracteres). Dividilo en dos pedidos o acortá las notas.`,
      );
      return;
    }

    enviarPorWhatsApp(mensaje.texto);
    vaciar();
    onCerrar();
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-base/85 backdrop-blur-sm"
        onClick={onCerrar}
        aria-hidden="true"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-checkout"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-borde bg-base-alt shadow-2xl"
      >
        <header className="flex items-center justify-between gap-4 border-b border-borde px-5 py-4">
          <h2
            id="titulo-checkout"
            className="font-display text-xl font-bold uppercase italic tracking-wide text-texto"
          >
            Finalizar pedido
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="grid size-9 place-items-center rounded-full text-2xl leading-none text-texto-suave transition-colors hover:text-acento focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento"
          >
            ×
          </button>
        </header>

        <form onSubmit={enviar} className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 space-y-5 px-5 py-5">
            <fieldset>
              <legend className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-acento">
                ¿Cómo lo querés?
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(
                  [
                    { valor: "retiro", texto: "Retiro en el local" },
                    { valor: "express", texto: "Express a domicilio" },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.valor}
                    type="button"
                    onClick={() => setModalidad(o.valor)}
                    aria-pressed={modalidad === o.valor}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                      modalidad === o.valor
                        ? "border-acento bg-acento text-base"
                        : "border-borde text-texto-suave hover:border-acento/50"
                    }`}
                  >
                    {o.texto}
                  </button>
                ))}
              </div>
            </fieldset>

            <Campo
              nombre="nombre"
              etiqueta="Tu nombre"
              error={errores.nombre}
              autoComplete="name"
              required
            />
            <Campo
              nombre="telefono"
              etiqueta="Teléfono"
              tipo="tel"
              marcador="8888-8888"
              error={errores.telefono}
              autoComplete="tel"
              required
            />

            {modalidad === "express" && (
              <Campo
                nombre="direccion"
                etiqueta="Dirección"
                marcador="Barrio, señas exactas"
                error={errores.direccion}
                required
              />
            )}

            <Campo
              nombre="hora"
              etiqueta="¿A qué hora lo querés?"
              marcador="7:30 pm"
              error={errores.hora}
            />
            <Campo
              nombre="notas"
              etiqueta="Alguna indicación (opcional)"
              marcador="Tocar el timbre, casa portón negro…"
              error={errores.notas}
            />

            {avisoLargo && (
              <p
                role="alert"
                className="rounded-xl border border-acento/50 bg-acento/10 px-4 py-3 text-sm text-texto"
              >
                {avisoLargo}
              </p>
            )}
          </div>

          <footer className="border-t border-borde p-5">
            <div className="flex items-baseline justify-between">
              <span className="font-display uppercase tracking-wide text-texto-suave">
                Total
              </span>
              <span className="font-display text-3xl font-bold text-acento">
                {formatoColones(total)}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-texto-suave">
              Al enviar se abre WhatsApp con el pedido escrito. El pago y el
              costo del express los coordinás ahí con el restaurante.
            </p>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-acento py-3.5 font-display font-semibold uppercase tracking-wide text-base transition-transform duration-200 hover:bg-acento-alt active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento-alt"
            >
              <IconoWhatsApp className="size-5" />
              Enviar al {negocio.whatsappVisible}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

function Campo({
  nombre,
  etiqueta,
  tipo = "text",
  marcador,
  error,
  required,
  autoComplete,
}: {
  nombre: string;
  etiqueta: string;
  tipo?: string;
  marcador?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const idError = `${nombre}-error`;
  return (
    <div>
      <label
        htmlFor={nombre}
        className="block font-display text-xs font-semibold uppercase tracking-[0.2em] text-acento"
      >
        {etiqueta}
      </label>
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        placeholder={marcador}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? idError : undefined}
        className={`mt-2 w-full rounded-xl border bg-base px-4 py-3 text-texto placeholder:text-texto-suave/50 focus:outline-none ${
          error ? "border-acento" : "border-borde focus:border-acento/70"
        }`}
      />
      {error && (
        <p id={idError} className="mt-1.5 text-xs text-acento">
          {error}
        </p>
      )}
    </div>
  );
}
