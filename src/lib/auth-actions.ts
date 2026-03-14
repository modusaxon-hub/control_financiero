'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
        // Log para ver si el usuario fue creado correctamente
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
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${appUrl}/auth/callback`,
        },
    });

    if (error || !data.url) {
        redirect('/login?error=Google sign-in failed');
    }

    redirect(data.url);
}

export async function signUpWithGoogle() {
    const supabase = await createClient();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${appUrl}/auth/callback`,
        },
    });

    if (error || !data.url) {
        redirect('/registro?error=Google sign-up failed');
    }

    redirect(data.url);
}
