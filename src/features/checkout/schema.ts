import { z } from "zod";

export const modalidades = ["retiro", "express"] as const;

export const datosPedidoSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "Escribí tu nombre")
      .max(60, "Nombre demasiado largo"),
    telefono: z
      .string()
      .trim()
      // Costa Rica: 8 digitos, con o sin guion o espacio.
      .regex(/^\d{4}[\s-]?\d{4}$/, "Teléfono de 8 dígitos, ej. 8888-8888"),
    modalidad: z.enum(modalidades),
    direccion: z.string().trim().max(200).optional(),
    hora: z.string().trim().max(20).optional(),
    notas: z.string().trim().max(200).optional(),
  })
  .refine(
    (d) => d.modalidad !== "express" || (d.direccion?.length ?? 0) >= 6,
    {
      // Sin direccion el mensajero no puede salir: es obligatoria en express.
      message: "Para el express necesitamos la dirección",
      path: ["direccion"],
    },
  );

export type DatosPedido = z.infer<typeof datosPedidoSchema>;
