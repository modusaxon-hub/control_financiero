import { z } from 'zod';

export const SuscripcionSchema = z.object({
  nombre_plan: z.string().min(1, 'Nombre requerido').max(100),
  proveedor: z.string().min(1, 'Proveedor requerido').max(100),
  tipo_plan: z.enum(['mensual', 'anual']),
  monto: z.coerce.number().positive('Monto debe ser mayor a 0'),
  fecha_facturacion: z.coerce.date().optional(),
  ultima_fecha_uso: z.coerce.date().optional(),
});

export type Suscripcion = z.infer<typeof SuscripcionSchema>;
