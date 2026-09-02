import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import { negocio } from "@/shared/config/negocio";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { BarraSocial } from "@/shared/components/layout/BarraSocial";
import { CarritoProvider } from "@/features/carrito/lib/carritoStore";
import { CarritoUI } from "@/shared/components/layout/CarritoUI";
import { menu } from "@/features/menu/data/menu";
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

export const metadata: Metadata = {
  title: {
    default: `${negocio.nombre} | Parrilla en ${negocio.ciudad}`,
    template: `%s | ${negocio.nombre}`,
  },
  description: `${negocio.tagline} Hamburguesas, costillas y alitas a la parrilla en ${negocio.ciudad}, ${negocio.provincia}. Pedí por WhatsApp al ${negocio.whatsappVisible}.`,
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: negocio.nombre,
    title: `${negocio.nombre} | Parrilla en ${negocio.ciudad}`,
    description: negocio.tagline,
  },
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
        <CarritoProvider idsDelMenu={menu.map((p) => p.id)}>
          <Navbar />
          <BarraSocial />
          {children}
          <Footer />
          <CarritoUI />
        </CarritoProvider>
      </body>
    </html>
  );
}
