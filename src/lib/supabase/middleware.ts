import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const url = request.nextUrl.clone()

    // 1. Redirección si no hay sesión
    if (!user && !['/login', '/registro'].includes(url.pathname)) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // 2. Verificación de Onboarding (Si el usuario existe pero no tiene familia)
    if (user && !['/onboarding/modo', '/onboarding/miembros', '/onboarding/presupuesto', '/login', '/registro'].includes(url.pathname)) {
        const { data: miembro } = await supabase
            .from('miembros_familia')
            .select('familia_id')
            .eq('usuario_id', user.id)
            .single()

        if (!miembro?.familia_id) {
            url.pathname = '/onboarding/modo'
            return NextResponse.redirect(url)
        }
    }

    return response
}
