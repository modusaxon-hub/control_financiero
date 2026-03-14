import { z } from 'zod';

export const CreditoSchema = z.object({
  tipo: z.enum(['libre_inversion', 'hipotecario', 'educativo', 'tarjeta']),
  entidad: z.string().min(1, 'Entidad requerida').max(100),
  saldo_capital: z.coerce.number().positive('Saldo debe ser mayor a 0'),
  tasa_ea: z.coerce.number().min(0.01).max(100, 'Tasa entre 0.01 y 100%'),
  plazo_meses: z.coerce.number().int().positive('Plazo debe ser mayor a 0'),
  cuota_mensual: z.coerce.number().positive('Cuota debe ser mayor a 0'),
  fecha_inicio: z.coerce.date(),
});

export type Credito = z.infer<typeof CreditoSchema>;
