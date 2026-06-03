import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * MIDDLEWARE DE AUTENTICACIÓN
 *
 * ¿Qué es?
 * Suena complicado, pero es simple: ANTES de que cualquier página cargue,
 * este código se ejecuta y decide si te deja verla o no.
 *
 * ¿Cómo funciona?
 * 1. El usuario intenta ir a /dashboard
 * 2. Middleware corre PRIMERO y pregunta: "¿Estás logueado?"
 * 3. Si NO → redirige a /login (nunca ve el dashboard)
 * 4. Si SÍ → permite que vea /dashboard
 *
 * RUTAS PROTEGIDAS (solo usuarios logueados):
 * - /dashboard
 *
 * RUTAS PÚBLICAS (todos pueden verlas):
 * - / (landing)
 * - /login
 * - /signup
 * - /onboarding
 */

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Aplicar middleware a estas rutas
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
