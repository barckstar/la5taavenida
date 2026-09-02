"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Direccion = "abajo" | "izquierda" | "derecha" | "escala";

const desplazamientos: Record<Direccion, { x?: number; y?: number; scale?: number }> = {
  abajo: { y: 28 },
  izquierda: { x: -32 },
  derecha: { x: 32 },
  escala: { scale: 0.94 },
};

/**
 * Revela su contenido cuando entra en pantalla.
 *
 * `once: true` es deliberado: si la animacion se repite cada vez que el
 * elemento vuelve a entrar, el sitio se siente inquieto al subir y bajar.
 *
 * Solo anima transform y opacity. Con `prefers-reduced-motion` activo no
 * anima nada y el contenido aparece ya colocado — no basta con acortar la
 * duracion, hay que no moverlo.
 */
export function Revelar({
  children,
  direccion = "abajo",
  retraso = 0,
  className,
}: {
  children: ReactNode;
  direccion?: Direccion;
  /** Segundos. Util para escalonar elementos hermanos. */
  retraso?: number;
  className?: string;
}) {
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...desplazamientos[direccion] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: retraso,
        ease: [0.22, 1, 0.36, 1], // salida rapida, llegada suave
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Igual que Revelar, pero escalona a sus hijos directos.
 * Para grillas de tarjetas: entran una tras otra, no todas de golpe.
 */
export function RevelarCascada({
  children,
  className,
  escalon = 0.09,
}: {
  children: ReactNode;
  className?: string;
  escalon?: number;
}) {
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        visible: { transition: { staggerChildren: escalon } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Hijo de RevelarCascada. */
export function ItemCascada({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        oculto: { opacity: 0, y: 26 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
