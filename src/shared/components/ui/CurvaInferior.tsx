/**
 * Divisor curvo para el borde inferior de una seccion, al estilo de la
 * referencia del cliente. Se pinta con el color de la seccion QUE SIGUE,
 * de modo que parezca que la de abajo sube y muerde a la de arriba.
 *
 * `aria-hidden` porque es puramente decorativo.
 */
export function CurvaInferior({
  className = "text-base-alt",
}: {
  /** Usar una clase de color de texto: el path hereda con currentColor. */
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 leading-[0] ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[90px]"
      >
        <path
          fill="currentColor"
          d="M0,120 L0,64 C240,112 480,120 720,96 C960,72 1200,16 1440,40 L1440,120 Z"
        />
        {/* Filo tenue de acento: define la curva sin gritar. */}
        <path
          fill="none"
          stroke="#E35120"
          strokeOpacity="0.5"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          d="M0,64 C240,112 480,120 720,96 C960,72 1200,16 1440,40"
        />
      </svg>
    </div>
  );
}
