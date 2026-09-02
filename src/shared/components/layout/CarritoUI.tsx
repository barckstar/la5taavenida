"use client";

import { useState } from "react";
import { CarritoBoton } from "@/features/carrito/components/CarritoBoton";
import { CarritoDrawer } from "@/features/carrito/components/CarritoDrawer";
import { CheckoutDrawer } from "@/features/checkout/components/CheckoutDrawer";
import { useCarrito } from "@/features/carrito/lib/carritoStore";

/**
 * Une el boton flotante, el carrito y el checkout. Vive en el layout para que
 * el pedido sobreviva al navegar entre el inicio y el menu.
 */
export function CarritoUI() {
  const { cerrar } = useCarrito();
  const [checkoutAbierto, setCheckoutAbierto] = useState(false);

  return (
    <>
      <CarritoBoton />
      <CarritoDrawer
        onIrAlCheckout={() => {
          cerrar();
          setCheckoutAbierto(true);
        }}
      />
      <CheckoutDrawer
        abierto={checkoutAbierto}
        onCerrar={() => setCheckoutAbierto(false)}
      />
    </>
  );
}
