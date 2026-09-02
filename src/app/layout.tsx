import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import { negocio } from "@/shared/config/negocio";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { BarraSocial } from "@/shared/components/layout/BarraSocial";
import { CarritoProvider } from "@/features/carrito/lib/carritoStore";
import { CarritoUI } from "@/shared/components/layout/CarritoUI";
import { DetallePlatoProvider } from "@/shared/lib/detallePlato";
import { menu } from "@/features/menu/data/menu";
import { ofertasVigentes, ofertaComoPlato } from "@/features/ofertas/data/ofertas";
import { EtiquetaJsonLd, jsonLdRestaurante } from "@/shared/lib/jsonLd";
import "./globals.css";

const display = Oswald({
  variable: "--fuente-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--fuente-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITIO =
  process.env.NEXT_PUBLIC_SITIO_URL ?? "https://la5taavenida.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: `${negocio.nombre} | Parrilla en ${negocio.ciudad}`,
    template: `%s | ${negocio.nombre}`,
  },
  description: `${negocio.tagline} Hamburguesas, costillas y alitas a la parrilla en ${negocio.ciudad}, ${negocio.provincia}. Pedí por WhatsApp al ${negocio.whatsappVisible}.`,
  keywords: [
    "restaurante San Ramón",
    "hamburguesas San Ramón",
    "parrilla Alajuela",
    "comida a domicilio San Ramón",
    "5ta Avenida Grill",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: negocio.nombre,
    title: `${negocio.nombre} | Parrilla en ${negocio.ciudad}`,
    description: `${negocio.tagline} Hamburguesas, costillas y parrilla en ${negocio.ciudad}. Pida en línea y coordinamos por WhatsApp.`,
    url: "/",
    /*
      1200x630 es el formato que piden Facebook, WhatsApp y X. El logo cuadrado
      que habia antes se recortaba mal en la vista previa de todos ellos.

      Instagram NO lee Open Graph: no genera vista previa de enlaces en
      publicaciones ni en historias. Para IG la imagen sirve igual, pero como
      material que se sube a mano.
    */
    images: [
      {
        url: "/marca/og.jpg",
        width: 1200,
        height: 630,
        alt: `${negocio.nombre}, parrilla en ${negocio.ciudad}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${negocio.nombre} | Parrilla en ${negocio.ciudad}`,
    description: `${negocio.tagline} Pida en línea y coordinamos por WhatsApp.`,
    images: ["/marca/og.jpg"],
  },
  /*
    El logo completo lleva "AVENIDA Grill" en letra chica, ilegible a 16px. Los
    iconos usan un recorte al 72% central —la llama con el "5ta"— que es lo
    unico que se reconoce a tamano de pestana, con mascara circular para que no
    salga un cuadrado.
  */
  icons: {
    icon: [
      { url: "/marca/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/marca/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/marca/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/marca/apple-icon.png", sizes: "180x180" }],
  },
  applicationName: negocio.nombre,
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#220b08",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CR"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Structured data del negocio. Todos los datos son reales. */}
        <EtiquetaJsonLd datos={jsonLdRestaurante()} />
        <CarritoProvider
          idsDelMenu={[
            ...menu.map((p) => p.id),
            // Las ofertas tambien son lineas validas del carrito.
            ...ofertasVigentes().map((o) => ofertaComoPlato(o).id),
          ]}
        >
          {/*
            La hoja de detalle se monta aqui, una sola vez, para que cualquier
            tarjeta del sitio —el menu, los destacados del inicio y las
            ofertas— abra la misma. Va por dentro del carrito porque la usa.
          */}
          <DetallePlatoProvider>
            <Navbar />
            <BarraSocial />
            {children}
            <Footer />
            <CarritoUI
              sugerencias={menu.filter((p) => p.categoria === "adicionales")}
            />
          </DetallePlatoProvider>
        </CarritoProvider>
      </body>
    </html>
  );
}
