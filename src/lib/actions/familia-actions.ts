'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

/**
 * Crear familia y vincular usuario como admin
 */
export async function crearFamilia(
  nombre: string,
  tipo_cuenta: 'individual' | 'familiar'
) {
  const supabase = await createClient();

  // Obtener usuario autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  // 1. Crear familia
  const { data: familia, error: familiaError } = await supabase
    .from('familias')
    .insert([
      {
        nombre,
        tipo_cuenta,
      },
    ])
    .select()
    .single();

  if (familiaError || !familia) {
    throw new Error(`Error creando familia: ${familiaError?.message}`);
  }

  // 2. Crear miembro (rol: admin)
  const { error: miembroError } = await supabase
    .from('miembros_familia')
    .insert([
      {
        familia_id: familia.id,
        usuario_id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
        rol: 'admin',
      },
    ]);

  if (miembroError) {
    throw new Error(`Error creando miembro: ${miembroError.message}`);
  }

  revalidatePath('/dashboard');
  return { success: true, familia_id: familia.id };
}

/**
 * Obtener miembros de la familia del usuario autenticado
 */
export async function getMiembros() {
  const supabase = await createClient();

  // Obtener familia_id del usuario
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: miembros, error } = await supabase
    .from('miembros_familia')
    .select('*, familias(nombre, tipo_cuenta)')
    .eq('usuario_id', user.id);

  if (error) {
    throw new Error(`Error obteniendo miembros: ${error.message}`);
  }

  return miembros || [];
}

/**
 * Actualizar aporte de un miembro
 */
export async function actualizarAporte(
  miembroId: string,
  aporte_tipo: 'porcentaje' | 'monto_fijo',
  aporte_valor: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('miembros_familia')
    .update({
      aporte_tipo,
      aporte_valor,
    })
    .eq('id', miembroId);

  if (error) {
    throw new Error(`Error actualizando aporte: ${error.message}`);
  }

  revalidatePath('/familia');
  return { success: true };
}

/**
 * Generar código de invitación para miembros
 */
export async function generarCodigoInvitacion(familiaId: string) {
  const supabase = await createClient();

  const { data: familia, error } = await supabase
    .from('familias')
    .select('codigo_invite')
    .eq('id', familiaId)
    .single();

  if (error || !familia) {
    throw new Error('Familia no encontrada');
  }

  return {
    codigo: familia.codigo_invite,
    link: `${process.env.NEXT_PUBLIC_APP_URL}/registro?invite=${familia.codigo_invite}`,
  };
}
