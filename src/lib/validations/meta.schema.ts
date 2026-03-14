import { z } from 'zod';

export const MetaSchema = z.object({
  nombre: z.string().min(3, 'Nombre mínimo 3 caracteres').max(100),
  descripcion: z.string().max(500).optional(),
  monto_objetivo: z.coerce.number().positive('Monto debe ser mayor a 0'),
  fecha_limite: z.coerce.date().optional(),
  tipo_meta: z.enum(['individual', 'compartida']),
  participantes: z.array(z.string().uuid()).optional().default([]),
  icono: z.string().default('piggy-bank'),
});

export type Meta = z.infer<typeof MetaSchema>;
