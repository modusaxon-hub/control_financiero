import { z } from 'zod';

export const GastoSchema = z.object({
  descripcion: z.string().min(3, 'Descripción mínimo 3 caracteres').max(200),
  categoria: z.string().min(1, 'Categoría requerida'),
  monto: z.coerce.number().positive('Monto debe ser mayor a 0'),
  fecha: z.coerce.date(),
  tipo_gasto: z.enum(['recurrente', 'esporadico', 'credito']),
  ambito: z.enum(['individual', 'familiar']).optional(),
  frecuencia: z.enum(['semanal', 'quincenal', 'mensual', 'bimestral', 'anual']).optional(),
  dia_vencimiento: z.coerce.number().int().min(1).max(31).optional(),
  es_cuota: z.boolean().default(false),
  num_cuotas: z.coerce.number().int().positive().optional(),
  valor_cuota: z.coerce.number().positive().optional(),
  valor_contado: z.coerce.number().positive().optional(),
});

export type Gasto = z.infer<typeof GastoSchema>;
