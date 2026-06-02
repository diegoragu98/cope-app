import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cliente de Supabase para Server Components y Server Actions
 *
 * ¿Qué es esto?
 * Cuando necesitas datos del servidor ANTES de que la página cargue en el navegador,
 * o cuando haces operaciones "por detrás" sin que el usuario lo vea, usas este cliente.
 *
 * Es más seguro porque las credenciales viven en el servidor, no en el navegador.
 *
 * Ejemplo: cuando cargas la página de Dashboard, el servidor obtiene
 * todas tus cuentas de Supabase ANTES de mostrarte nada.
 */

export async function createServerClient() {
  const cookieStore = await cookies()

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware handling cookie updates.
          }
        },
      },
    }
  )
}
