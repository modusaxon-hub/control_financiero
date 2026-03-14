import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Callback route para OAuth (Google, GitHub, etc.)
 * Supabase redirige aquí después de la autenticación exitosa
 * URL: /auth/callback?code=xxx&state=xxx
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();

    // Intercambiar el código de autorización por una sesión
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Obtener usuario para decidir dónde redirigir
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Verificar si el usuario tiene familia asignada
        const { data: miembro } = await supabase
          .from('miembros_familia')
          .select('familia_id')
          .eq('usuario_id', user.id)
          .single();

        // Redirigir al dashboard o al onboarding según corresponda
        const redirectUrl = miembro?.familia_id ? '/dashboard' : '/onboarding/modo';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }

      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Si hay error, redirigir al login con mensaje de error
  return NextResponse.redirect(
    new URL('/login?error=Authentication failed', request.url)
  );
}
