'use server';

import { createClient } from '@/lib/supabase/server';
import { CreditoSchema } from '@/lib/validations/credito.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

interface AmortizacionRow {
  mes: number;
  saldo_anterior: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo_final: number;
}

/**
 * Registrar un nuevo crédito
 */
export async function registrarCredito(data: z.infer<typeof CreditoSchema>) {
  const supabase = await createClient();

  // Validar
  const validatedData = CreditoSchema.parse(data);

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

  // Calcular fecha_fin
  const fechaFin = new Date(validatedData.fecha_inicio);
  fechaFin.setMonth(fechaFin.getMonth() + validatedData.plazo_meses);

  const { data: credito, error } = await supabase
    .from('creditos')
    .insert([
      {
        familia_id: miembro.familia_id,
        ...validatedData,
        fecha_fin: fechaFin.toISOString().split('T')[0],
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creando crédito: ${error.message}`);
  }

  revalidatePath('/deudas');
  return credito;
}

/**
 * Calcular tabla de amortización
 */
export async function getAmortizacion(creditoId: string): Promise<AmortizacionRow[]> {
  const supabase = await createClient();

  const { data: credito, error } = await supabase
    .from('creditos')
    .select('*')
    .eq('id', creditoId)
    .single();

  if (error || !credito) {
    throw new Error('Crédito no encontrado');
  }

  const amortizacion: AmortizacionRow[] = [];
  const tasaMensual = Math.pow(1 + credito.tasa_ea / 100, 1 / 12) - 1;

  let saldo_anterior = credito.saldo_capital;

  for (let mes = 1; mes <= credito.plazo_meses; mes++) {
    const interes = saldo_anterior * tasaMensual;
    const capital = credito.cuota_mensual - interes;
    const saldo_final = Math.max(saldo_anterior - capital, 0);

    amortizacion.push({
      mes,
      saldo_anterior: Number(saldo_anterior.toFixed(2)),
      cuota: Number(credito.cuota_mensual.toFixed(2)),
      interes: Number(interes.toFixed(2)),
      capital: Number(capital.toFixed(2)),
      saldo_final: Number(saldo_final.toFixed(2)),
    });

    saldo_anterior = saldo_final;
  }

  return amortizacion;
}

/**
 * Simular pago extra y calcular nuevo plazo
 */
export async function simularPagoExtra(
  creditoId: string,
  montoExtra: number
): Promise<{
  meses_ahorrados: number;
  interes_ahorrado: number;
  nueva_fecha_fin: string;
}> {
  const amortizacion = await getAmortizacion(creditoId);

  const supabase = await createClient();
  const { data: credito } = await supabase
    .from('creditos')
    .select('*')
    .eq('id', creditoId)
    .single();

  if (!credito) throw new Error('Crédito no encontrado');

  const tasaMensual = Math.pow(1 + credito.tasa_ea / 100, 1 / 12) - 1;
  let saldo = credito.saldo_capital;
  let mes_liquidacion = 0;
  let interes_total = 0;

  for (let mes = 1; mes <= credito.plazo_meses; mes++) {
    const interes = saldo * tasaMensual;
    const cuota_total = credito.cuota_mensual + (mes === 1 ? montoExtra : 0);
    const capital = cuota_total - interes;

    interes_total += interes;
    saldo -= capital;

    if (saldo <= 0) {
      mes_liquidacion = mes;
      break;
    }
  }

  const interes_original = amortizacion.reduce((sum, row) => sum + row.interes, 0);
  const meses_ahorrados = credito.plazo_meses - mes_liquidacion;

  const nuevaFecha = new Date(credito.fecha_inicio);
  nuevaFecha.setMonth(nuevaFecha.getMonth() + mes_liquidacion);

  return {
    meses_ahorrados,
    interes_ahorrado: Math.max(interes_original - interes_total, 0),
    nueva_fecha_fin: nuevaFecha.toISOString().split('T')[0],
  };
}

/**
 * Listar créditos activos
 */
export async function listarCreditos() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('No autenticado');
  }

  const { data: creditos, error } = await supabase
    .from('creditos')
    .select('*')
    .eq('activo', true)
    .order('fecha_inicio', { ascending: false });

  if (error) {
    throw new Error(`Error obteniendo créditos: ${error.message}`);
  }

  return creditos || [];
}

/**
 * Cerrar un crédito
 */
export async function cerrarCredito(creditoId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('creditos')
    .update({ activo: false })
    .eq('id', creditoId);

  if (error) {
    throw new Error(`Error cerrando crédito: ${error.message}`);
  }

  revalidatePath('/deudas');
  return { success: true };
}
