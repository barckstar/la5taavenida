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
 * Por defecto anima al ENTRAR y al SALIR: el elemento vuelve a su estado
 * inicial cuando abandona la pantalla, asi que reaparece al volver a subir.
 * Con `unaVez` se puede fijar para que solo entre una vez.
 *
 * Solo anima transform y opacity. Con `prefers-reduced-motion` activo no
 * anima nada y el contenido aparece ya colocado — no basta con acortar la
 * duracion, hay que no moverlo.
 */
export function Revelar({
  children,
  direccion = "abajo",
  retraso = 0,
  unaVez = false,
  className,
}: {
  children: ReactNode;
  direccion?: Direccion;
  /** Segundos. Util para escalonar elementos hermanos. */
  retraso?: number;
  /** true = no vuelve a animar al salir de pantalla. */
  unaVez?: boolean;
  className?: string;
}) {
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...desplazamientos[direccion] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: unaVez, amount: 0.2 }}
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
  unaVez = false,
}: {
  children: ReactNode;
  className?: string;
  escalon?: number;
  unaVez?: boolean;
}) {
  const sinMovimiento = useReducedMotion();

  if (sinMovimiento) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: unaVez, amount: 0.15 }}
      exit="oculto"
      variants={{
        oculto: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
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
