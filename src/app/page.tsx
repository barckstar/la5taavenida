import { Hero } from "@/features/landing/components/Hero";
import { Ofertas } from "@/features/ofertas/components/Ofertas";
import { SobreNosotros } from "@/features/landing/components/SobreNosotros";
import { Destacados } from "@/features/landing/components/Destacados";
import { PorQue } from "@/features/landing/components/PorQue";
import { Resenas } from "@/features/landing/components/Resenas";
import { Ubicacion } from "@/features/landing/components/Ubicacion";

/**
 * Inicio. Lleva TODA la informacion del negocio como secciones ancladas: se
 * recorre con scroll, sin recargas, con sensacion de SPA. La unica otra ruta
 * del sitio es /menu.
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      {/* Las ofertas van arriba: son el gancho comercial. */}
      <Ofertas />
      <SobreNosotros />
      <Destacados />
      <PorQue />
      <Resenas />
      <Ubicacion />
    </main>
  );
}
