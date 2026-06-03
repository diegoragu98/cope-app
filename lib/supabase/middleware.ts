import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * MIDDLEWARE DE SUPABASE
 *
 * ¿Qué hace?
 * Valida la sesión del usuario y redirige según su estado de autenticación:
 * - Si estás logueado y vas a /login o /signup → redirige a /dashboard
 * - Si NO estás logueado y vas a /dashboard → redirige a /login
 * - Si estás en / (landing) → permite entrar siempre
 */

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
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Obtener usuario actual (si existe sesión activa)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // REGLAS DE REDIRECCIÓN
  // ========================

  // 1. Si estás logueado y vas a /login o /signup → redirige a /dashboard
  if (user && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 2. Si NO estás logueado y vas a /dashboard → redirige a /login
  if (!user && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. Todo lo demás → permite acceder normalmente
  return response
}
