/**
 * Brasas del hero. CSS puro: sin JavaScript, sin librerias, sin costo de carga.
 * Solo anima transform y opacity, asi que corre en GPU. El bloque global de
 * prefers-reduced-motion en globals.css la detiene por completo.
 */
const BRASAS = [
  { izq: "8%", retraso: "0s", duracion: "7s", deriva: "18px", tam: 5 },
  { izq: "21%", retraso: "1.6s", duracion: "9s", deriva: "-14px", tam: 3 },
  { izq: "34%", retraso: "3.1s", duracion: "8s", deriva: "22px", tam: 4 },
  { izq: "47%", retraso: "0.8s", duracion: "10s", deriva: "-20px", tam: 3 },
  { izq: "59%", retraso: "4.2s", duracion: "7.5s", deriva: "16px", tam: 5 },
  { izq: "71%", retraso: "2.4s", duracion: "9.5s", deriva: "-11px", tam: 4 },
  { izq: "84%", retraso: "5.1s", duracion: "8.5s", deriva: "20px", tam: 3 },
  { izq: "93%", retraso: "3.7s", duracion: "11s", deriva: "-17px", tam: 4 },
];

export function Brasas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {BRASAS.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-acento-claro"
          style={{
            left: b.izq,
            width: b.tam,
            height: b.tam,
            opacity: 0,
            animation: `brasa-subir ${b.duracion} ease-out ${b.retraso} infinite`,
            ["--deriva" as string]: b.deriva,
          }}
        />
      ))}
    </div>
  );
}
