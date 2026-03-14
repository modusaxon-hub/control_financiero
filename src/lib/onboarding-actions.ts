'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function setupFamily(formData: FormData) {
    const familyName = formData.get('familyName') as string;
    const accountType = (formData.get('accountType') as string) || 'individual';
    const supabase = await createClient();

    // 1. Obtener el usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect('/login');
    }

    // 2. Crear la familia
    const { data: familia, error: familyError } = await supabase.from('familias')
        .insert({
            nombre: familyName,
            tipo_cuenta: accountType
        })
        .select()
        .single();

    if (familyError) {
        console.error('Error creating family:', familyError);
        redirect('/onboarding/modo?error=No se pudo crear la familia');
    }

    // 3. Crear miembro_familia (rol: admin)
    const { error: miembroError } = await supabase.from('miembros_familia')
        .insert({
            familia_id: familia.id,
            usuario_id: user.id,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
            rol: 'admin'
        });

    if (miembroError) {
        console.error('Error creating family member:', miembroError);
        redirect('/onboarding/modo?error=No se pudo crear el perfil de miembro');
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}
