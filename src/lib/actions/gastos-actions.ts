'use server';

import { createClient } from '@/lib/supabase/server';
import { GastoSchema } from '@/lib/validations/gasto.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

/**
 * Registrar un nuevo gasto
 */
export async function registrarGasto(data: z.infer<typeof GastoSchema>) {
  const supabase = await createClient();

  // Validar con Zod
  const validatedData = GastoSchema.parse(data);

  // Obtener usuario autenticado y su familia_id
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  // Obtener miembro_id y familia_id
  const { data: miembro, error: miembroError } = await supabase
    .from('miembros_familia')
    .select('id, familia_id')
    .eq('usuario_id', user.id)
    .single();

  if (miembroError || !miembro) {
    throw new Error('Miembro de familia no encontrado');
  }

  // Insertar gasto
  const { data: gasto, error: gastoError } = await supabase
    .from('gastos')
    .insert([
      {
        familia_id: miembro.familia_id,
        miembro_id: miembro.id,
        ...validatedData,
      },
    ])
    .select()
    .single();

  if (gastoError) {
    throw new Error(`Error creando gasto: ${gastoError.message}`);
  }

  revalidatePath('/compromisos-fijos');
  revalidatePath('/gastos-esporadicos');
  revalidatePath('/dashboard');
  return gasto;
}

/**
 * Listar compromisos fijos (gastos recurrentes)
 */
export async function listarCompromisosFijos() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: gastos, error } = await supabase
    .from('gastos')
    .select('*')
    .eq('tipo_gasto', 'recurrente')
    .order('dia_vencimiento', { ascending: true });

  if (error) {
    throw new Error(`Error obteniendo compromisos: ${error.message}`);
  }

  return gastos || [];
}

/**
 * Listar gastos esporádicos
 */
export async function listarGastosEsporadicos() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: gastos, error } = await supabase
    .from('gastos')
    .select('*')
    .eq('tipo_gasto', 'esporadico')
    .order('fecha', { ascending: false });

  if (error) {
    throw new Error(`Error obteniendo gastos: ${error.message}`);
  }

  return gastos || [];
}

/**
 * Marcar gasto como pagado
 */
export async function marcarPagado(gastoId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('gastos')
    .update({ pagado: true })
    .eq('id', gastoId);

  if (error) {
    throw new Error(`Error actualizando gasto: ${error.message}`);
  }

  revalidatePath('/compromisos-fijos');
  revalidatePath('/dashboard');
  return { success: true };
}

/**
 * Obtener resumen del mes (ingresos vs gastos)
 */
export async function resumenMes(year: number, month: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  // Rango de fechas del mes
  const inicio = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const fin = new Date(year, month, 0).toISOString().split('T')[0];

  const { data: gastos, error } = await supabase
    .from('gastos')
    .select('*')
    .gte('fecha', inicio)
    .lte('fecha', fin);

  if (error) {
    throw new Error(`Error obteniendo resumen: ${error.message}`);
  }

  // Agrupar por categoría
  const porCategoria: Record<string, number> = {};
  let total = 0;

  (gastos || []).forEach((gasto) => {
    const cat = gasto.categoria || 'Otros';
    porCategoria[cat] = (porCategoria[cat] || 0) + Number(gasto.monto);
    total += Number(gasto.monto);
  });

  return {
    periodo: `${month}/${year}`,
    total_gastos: total,
    por_categoria: porCategoria,
    numero_gastos: gastos?.length || 0,
  };
}

/**
 * Eliminar un gasto
 */
export async function eliminarGasto(gastoId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('gastos').delete().eq('id', gastoId);

  if (error) {
    throw new Error(`Error eliminando gasto: ${error.message}`);
  }

  revalidatePath('/compromisos-fijos');
  revalidatePath('/gastos-esporadicos');
  revalidatePath('/dashboard');
  return { success: true };
}
