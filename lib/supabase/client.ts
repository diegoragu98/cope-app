import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente de Supabase para Client Components
 *
 * ¿Qué es esto?
 * Cuando una pantalla de React se carga en el navegador del usuario, usa este cliente
 * para hablar con la base de datos. Es lo que usaremos en pantallas interactivas.
 *
 * Ejemplo: cuando haces click en un botón y quieres guardar una nueva meta,
 * este cliente envía los datos a Supabase.
 */

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
