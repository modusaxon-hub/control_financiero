import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    const url = request.nextUrl.clone()

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // 0. Omitir verificación para estáticos y APIs internas para ganar velocidad
    if (
        url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname.includes('.')
    ) {
        return response
    }

    try {
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

        // 1. Redirección si no hay sesión
        if (!user && !['/login', '/registro'].includes(url.pathname)) {
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }

        // 2. Verificación de Onboarding
        // Solo consultar la base de datos si NO estamos ya en una página de onboarding
        const onboardingPaths = ['/onboarding/modo', '/onboarding/miembros', '/onboarding/presupuesto']
        const authPaths = ['/login', '/registro']

        if (user && !onboardingPaths.includes(url.pathname) && !authPaths.includes(url.pathname)) {
            const { data: miembro } = await supabase
                .from('miembros_familia')
                .select('familia_id')
                .eq('usuario_id', user.id)
                .maybeSingle() // Usar maybeSingle para evitar ruidos de error si no existe

            if (!miembro?.familia_id) {
                url.pathname = '/onboarding/modo'
                return NextResponse.redirect(url)
            }
        }
    } catch (err) {
        console.error(`[Middleware ERROR]:`, err)
    }

    return response
}
