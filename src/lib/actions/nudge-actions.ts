'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

interface NudgeGenerado {
  familia_id: string;
  miembro_id: string | null;
  tipo_nudge: 'ahorro' | 'precio' | 'limpieza' | 'pago' | 'celebracion';
  mensaje: string;
}

/**
 * Evaluar condiciones y generar nudges para una familia
 * Llamado por cron job externo
 */
export async function evaluarNudges(familiaId: string): Promise<NudgeGenerado[]> {
  const supabase = await createAdminClient();
  const nudgesToCreate: NudgeGenerado[] = [];

  // 1. NUDGE DE PAGO: gastos con vencimiento <= 5 días y no pagados
  const { data: gastosProximos } = await supabase
    .from('gastos')
    .select('*, miembros_familia(id)')
    .eq('familia_id', familiaId)
    .eq('pagado', false)
    .eq('tipo_gasto', 'recurrente');

  if (gastosProximos) {
    const hoy = new Date();
    const diaActual = hoy.getDate();

    gastosProximos.forEach((gasto) => {
      if (gasto.dia_vencimiento && gasto.dia_vencimiento - diaActual <= 5 && gasto.dia_vencimiento - diaActual > 0) {
        nudgesToCreate.push({
          familia_id: familiaId,
          miembro_id: gasto.miembro_id,
          tipo_nudge: 'pago',
          mensaje: `📅 Recordatorio: ${gasto.descripcion} vence en ${gasto.dia_vencimiento - diaActual} días ($ ${gasto.monto})`,
        });
      }
    });
  }

  // 2. NUDGE DE LIMPIEZA: suscripciones sin uso > 30 días
  const { data: suscripciones } = await supabase
    .from('suscripciones_ia')
    .select('*, miembros_familia(id)')
    .eq('familia_id', familiaId)
    .eq('activa', true);

  if (suscripciones) {
    const hoy = new Date();

    suscripciones.forEach((sub) => {
      let diasSinUso = 0;

      if (!sub.ultima_fecha_uso) {
        diasSinUso = Math.floor(
          (hoy.getTime() - new Date(sub.created_at || new Date()).getTime()) / (1000 * 60 * 60 * 24)
        );
      } else {
        diasSinUso = Math.floor(
          (hoy.getTime() - new Date(sub.ultima_fecha_uso).getTime()) / (1000 * 60 * 60 * 24)
        );
      }

      if (diasSinUso > 30) {
        nudgesToCreate.push({
          familia_id: familiaId,
          miembro_id: sub.miembro_id,
          tipo_nudge: 'limpieza',
          mensaje: `🧹 Suscripción inactiva: ${sub.nombre_plan} (${sub.proveedor}) hace ${diasSinUso} días.`,
        });
      }
    });
  }

  // 3. NUDGE DE CELEBRACIÓN: metas completadas al 100%
  const { data: metas } = await supabase
    .from('metas')
    .select('*')
    .eq('familia_id', familiaId);

  if (metas) {
    metas.forEach((meta) => {
      const porcentaje = (Number(meta.progreso_actual) / Number(meta.monto_objetivo)) * 100;
      if (porcentaje >= 100) {
        nudgesToCreate.push({
          familia_id: familiaId,
          miembro_id: null,
          tipo_nudge: 'celebracion',
          mensaje: `🎉 ¡Meta alcanzada! Completaron "${meta.nombre}" 🏆`,
        });
      }
    });
  }

  // Aplicar anti-spam: máx 2 nudges/día, cooldown 5 días por tipo
  const filteredNudges = await aplicarAntiSpam(supabase, familiaId, nudgesToCreate);

  // Insertar nudges filtrados
  if (filteredNudges.length > 0) {
    const { error } = await supabase.from('nudge_log').insert(filteredNudges);

    if (error) {
      console.error('Error insertando nudges:', error);
    }
  }

  return filteredNudges;
}

/**
 * Aplicar políticas anti-spam
 */
async function aplicarAntiSpam(
  adminClient: ReturnType<typeof createAdminClient>,
  familiaId: string,
  nudges: NudgeGenerado[]
): Promise<NudgeGenerado[]> {
  // Obtener últimos nudges de los últimos 5 días
  const hace5dias = new Date();
  hace5dias.setDate(hace5dias.getDate() - 5);

  const { data: recentNudges } = await adminClient
    .from('nudge_log')
    .select('tipo_nudge')
    .eq('familia_id', familiaId)
    .gte('enviado_at', hace5dias.toISOString());

  // Contar por tipo
  const tipoCounts = (recentNudges || []).reduce(
    (acc, n) => {
      acc[n.tipo_nudge] = (acc[n.tipo_nudge] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Filtrar: máx 2 nudges del mismo tipo en 5 días
  const filtered = nudges.filter((nudge) => (tipoCounts[nudge.tipo_nudge] || 0) < 2);

  // Limitar a 2 nudges totales por familia por día
  return filtered.slice(0, 2);
}

/**
 * Registrar respuesta del usuario a un nudge
 */
export async function responderNudge(nudgeId: string, aceptado: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('nudge_log')
    .update({ aceptado })
    .eq('id', nudgeId);

  if (error) {
    throw new Error(`Error respondiendo nudge: ${error.message}`);
  }

  revalidatePath('/dashboard');
  return { success: true };
}

/**
 * Obtener nudges pendientes de respuesta para un usuario
 */
export async function getNudgesPendientes() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  // Obtener familia_id del usuario
  const { data: miembro } = await supabase
    .from('miembros_familia')
    .select('familia_id')
    .eq('usuario_id', user.id)
    .single();

  if (!miembro) {
    return [];
  }

  const { data: nudges, error } = await supabase
    .from('nudge_log')
    .select('*')
    .eq('familia_id', miembro.familia_id)
    .is('aceptado', null)
    .order('enviado_at', { ascending: false });

  if (error) {
    throw new Error(`Error obteniendo nudges: ${error.message}`);
  }

  return nudges || [];
}
