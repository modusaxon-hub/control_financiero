'use server';

import { createClient } from '@/lib/supabase/server';
import { MetaSchema } from '@/lib/validations/meta.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

/**
 * Crear una meta de ahorro (individual o compartida)
 */
export async function crearMeta(data: z.infer<typeof MetaSchema>) {
  const supabase = await createClient();

  // Validar
  const validatedData = MetaSchema.parse(data);

  // Obtener familia_id
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: miembro, error: miembroError } = await supabase
    .from('miembros_familia')
    .select('familia_id')
    .eq('usuario_id', user.id)
    .single();

  if (miembroError || !miembro) {
    throw new Error('Miembro no encontrado');
  }

  const { data: meta, error } = await supabase
    .from('metas')
    .insert([
      {
        familia_id: miembro.familia_id,
        ...validatedData,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creando meta: ${error.message}`);
  }

  revalidatePath('/reserva');
  return meta;
}

/**
 * Abonar a una meta y actualizar progreso
 */
export async function abonarMeta(
  metaId: string,
  monto: number,
  nota?: string
) {
  const supabase = await createClient();

  if (monto <= 0) {
    throw new Error('Monto debe ser mayor a 0');
  }

  // Obtener miembro_id
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: miembro, error: miembroError } = await supabase
    .from('miembros_familia')
    .select('id')
    .eq('usuario_id', user.id)
    .single();

  if (miembroError || !miembro) {
    throw new Error('Miembro no encontrado');
  }

  // 1. Insertar abono
  const { error: abonoError } = await supabase
    .from('abonos_meta')
    .insert([
      {
        meta_id: metaId,
        miembro_id: miembro.id,
        monto,
        nota: nota || null,
        fecha: new Date().toISOString().split('T')[0],
      },
    ]);

  if (abonoError) {
    throw new Error(`Error insertando abono: ${abonoError.message}`);
  }

  // 2. Actualizar progreso en meta
  const { data: meta } = await supabase
    .from('metas')
    .select('progreso_actual')
    .eq('id', metaId)
    .single();

  if (meta) {
    const nuevo_progreso = (Number(meta.progreso_actual) || 0) + monto;

    const { error: updateError } = await supabase
      .from('metas')
      .update({ progreso_actual: nuevo_progreso })
      .eq('id', metaId);

    if (updateError) {
      throw new Error(`Error actualizando progreso: ${updateError.message}`);
    }
  }

  revalidatePath('/reserva');
  return { success: true };
}

/**
 * Listar metas del usuario/familia
 */
export async function listarMetas() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: metas, error } = await supabase
    .from('metas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error obteniendo metas: ${error.message}`);
  }

  // Calcular porcentaje de progreso
  return (metas || []).map((meta) => ({
    ...meta,
    porcentaje: Math.min(
      100,
      ((Number(meta.progreso_actual) || 0) / Number(meta.monto_objetivo)) * 100
    ),
  }));
}

/**
 * Calcular aporte mensual requerido para alcanzar la meta
 */
export function calcularAporteMensual(
  monto_objetivo: number,
  progreso_actual: number,
  fecha_limite: Date
): number {
  if (!fecha_limite) return 0;

  const hoy = new Date();
  const meses_restantes = Math.max(
    1,
    (fecha_limite.getFullYear() - hoy.getFullYear()) * 12 +
      (fecha_limite.getMonth() - hoy.getMonth())
  );

  const pendiente = monto_objetivo - progreso_actual;
  return pendiente / meses_restantes;
}

/**
 * Eliminar una meta
 */
export async function eliminarMeta(metaId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('metas').delete().eq('id', metaId);

  if (error) {
    throw new Error(`Error eliminando meta: ${error.message}`);
  }

  revalidatePath('/reserva');
  return { success: true };
}
