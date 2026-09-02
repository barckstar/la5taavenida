import type { Metadata } from "next";
import { VistaReels } from "@/features/reels/components/VistaReels";
import { negocio } from "@/shared/config/negocio";

export const metadata: Metadata = {
  title: "Menú en reels",
  description: `Recorré los platillos de ${negocio.nombre} uno por uno y arme su pedido sin salir de la pantalla.`,
  alternates: { canonical: "/menu/reels" },
  openGraph: {
    title: `Menú en reels | ${negocio.nombre}`,
    url: "/menu/reels",
    images: [{ url: "/marca/og.jpg", width: 1200, height: 630 }],
  },
};

export default function PaginaReels() {
  return (
    <main className="flex-1">
      <VistaReels />
    </main>
  );
}
