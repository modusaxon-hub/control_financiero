'use server';

import { createClient } from '@/lib/supabase/server';
import { SuscripcionSchema } from '@/lib/validations/suscripcion.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

/**
 * Registrar una nueva suscripción IA/herramienta digital
 */
export async function registrarSuscripcion(
  data: z.infer<typeof SuscripcionSchema>
) {
  const supabase = await createClient();

  // Validar
  const validatedData = SuscripcionSchema.parse(data);

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
    .select('id, familia_id')
    .eq('usuario_id', user.id)
    .single();

  if (miembroError || !miembro) {
    throw new Error('Miembro no encontrado');
  }

  const { data: suscripcion, error } = await supabase
    .from('suscripciones_ia')
    .insert([
      {
        miembro_id: miembro.id,
        familia_id: miembro.familia_id,
        ...validatedData,
        ultima_fecha_uso: validatedData.ultima_fecha_uso || new Date().toISOString().split('T')[0],
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error registrando suscripción: ${error.message}`);
  }

  revalidatePath('/gastos-esporadicos');
  return suscripcion;
}

/**
 * Listar suscripciones activas
 */
export async function listarSuscripciones() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: suscripciones, error } = await supabase
    .from('suscripciones_ia')
    .select('*')
    .eq('activa', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error obteniendo suscripciones: ${error.message}`);
  }

  return suscripciones || [];
}

/**
 * Calcular resumen mensual: suma y normaliza costos anuales a mensual
 */
export async function resumenMensualSuscripciones() {
  const suscripciones = await listarSuscripciones();

  let costoTotal = 0;
  const detalles = suscripciones.map((sub) => {
    const costoMensual = sub.tipo_plan === 'anual' ? Number(sub.monto) / 12 : Number(sub.monto);
    costoTotal += costoMensual;
    return {
      ...sub,
      costo_mensual: Number(costoMensual.toFixed(2)),
    };
  });

  return {
    total_mensual: Number(costoTotal.toFixed(2)),
    detalles,
  };
}

/**
 * Actualizar última fecha de uso (para evitar "zombie subscriptions")
 */
export async function actualizarUltimoUso(suscripcionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('suscripciones_ia')
    .update({
      ultima_fecha_uso: new Date().toISOString().split('T')[0],
    })
    .eq('id', suscripcionId);

  if (error) {
    throw new Error(`Error actualizando uso: ${error.message}`);
  }

  revalidatePath('/gastos-esporadicos');
  return { success: true };
}

/**
 * Detectar suscripciones "zombie" (sin uso >30 días)
 */
export async function detectarZombies() {
  const suscripciones = await listarSuscripciones();

  const hoy = new Date();
  const zombies = suscripciones.filter((sub) => {
    if (!sub.ultima_fecha_uso) return true;

    const ultimoUso = new Date(sub.ultima_fecha_uso);
    const diasSinUso = Math.floor(
      (hoy.getTime() - ultimoUso.getTime()) / (1000 * 60 * 60 * 24)
    );

    return diasSinUso > 30;
  });

  return zombies;
}

/**
 * Toggle: activar/desactivar suscripción
 */
export async function toggleActiva(suscripcionId: string) {
  const supabase = await createClient();

  // Obtener estado actual
  const { data: sub, error: getError } = await supabase
    .from('suscripciones_ia')
    .select('activa')
    .eq('id', suscripcionId)
    .single();

  if (getError || !sub) {
    throw new Error('Suscripción no encontrada');
  }

  // Actualizar
  const { error: updateError } = await supabase
    .from('suscripciones_ia')
    .update({ activa: !sub.activa })
    .eq('id', suscripcionId);

  if (updateError) {
    throw new Error(`Error actualizando suscripción: ${updateError.message}`);
  }

  revalidatePath('/gastos-esporadicos');
  return { success: true, nueva_activa: !sub.activa };
}
