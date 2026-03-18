'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        redirect('/login?error=Invalid credentials');
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function signUp(formData: FormData) {
    console.log("Iniciando proceso de registro...");
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    console.log("Datos recibidos para:", email);
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (error) {
        console.error("Error en signUp de Supabase:", error.message);
        redirect(`/registro?error=${encodeURIComponent(error.message)}`);
    }

    console.log("Usuario registrado con éxito:", data.user?.id);

    if (data.user) {
        console.log("Redirigiendo a onboarding...");
    }

    revalidatePath('/', 'layout');
    redirect('/onboarding/modo');
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/login');
}

export async function signInWithGoogle() {
    const supabase = await createClient();
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;

    console.log("Detectado Origin para Google Auth:", origin);

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/api/auth/callback`,
        },
    });

    if (error) {
        console.error("Error en OAuth Google:", error.message);
        redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    if (data.url) {
        redirect(data.url);
    }
}
