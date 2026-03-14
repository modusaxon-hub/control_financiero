import { evaluarNudges } from '@/lib/actions/nudge-actions';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/nudge/evaluate
 * Endpoint protegido para evaluar nudges de todas las familias activas
 * Autenticado con CRON_SECRET
 *
 * Uso: curl -X POST http://localhost:3000/api/nudge/evaluate \
 *        -H "Authorization: Bearer $CRON_SECRET"
 */
export async function POST(request: NextRequest) {
  // Verificar autorización
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || token !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Obtener todas las familias activas
    const { data: familias, error: familiaError } = await supabase
      .from('familias')
      .select('id');

    if (familiaError) {
      throw new Error(`Error obteniendo familias: ${familiaError.message}`);
    }

    let totalProcessed = 0;
    let totalNudgesCreated = 0;

    // Evaluar nudges para cada familia
    for (const familia of familias || []) {
      const nudges = await evaluarNudges(familia.id);
      totalProcessed += 1;
      totalNudgesCreated += nudges.length;
    }

    return NextResponse.json(
      {
        success: true,
        processed: totalProcessed,
        nudges_created: totalNudgesCreated,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Nudge evaluation error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
