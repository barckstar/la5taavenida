import type { ReactNode } from "react";

/**
 * Etiqueta corta. `tono` acento para destacar, `apagado` para estados
 * neutros como "Agotado".
 */
export function Badge({
  children,
  tono = "acento",
  className,
}: {
  children: ReactNode;
  tono?: "acento" | "apagado";
  className?: string;
}) {
  const tonos = {
    acento: "bg-acento text-base",
    apagado: "bg-base-alt text-texto-suave ring-1 ring-superficie",
  } as const;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider",
        tonos[tono],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
