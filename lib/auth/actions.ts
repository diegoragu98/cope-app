'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

/**
 * ACCIONES DE AUTENTICACIÓN — Server Actions
 *
 * ¿Qué son?
 * Son funciones que corren en el SERVIDOR (no en tu navegador).
 * Cuando haces signup/login, el servidor:
 * 1. Valida que el email/password sean válidos
 * 2. Habla con Supabase Auth
 * 3. Crea la sesión (cookies seguras)
 * 4. Te redirige a /dashboard
 *
 * Ventaja: Tu password NUNCA viaja por el navegador, es 100% seguro
 */

export async function signUpAction(email: string, password: string, fullName: string) {
  // Validaciones básicas
  if (!email || !password || !fullName) {
    return { error: 'Por favor completa todos los campos' }
  }

  if (password.length < 8) {
    return { error: 'La contraseña debe tener mínimo 8 caracteres' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Por favor ingresa un email válido' }
  }

  try {
    const supabase = await createServerClient()

    // Intentar crear cuenta en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Guardamos el nombre en metadata
        },
      },
    })

    if (error) {
      // Errores comunes de Supabase
      if (error.message.includes('already registered')) {
        return { error: 'Este email ya está registrado. Intenta con login.' }
      }
      return { error: error.message || 'Error al crear cuenta' }
    }

    // Éxito: Revalidar caché y retornar success (el cliente maneja la redirección)
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error) {
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

export async function logInAction(email: string, password: string) {
  // Validaciones básicas
  if (!email || !password) {
    return { error: 'Por favor completa email y contraseña' }
  }

  try {
    const supabase = await createServerClient()

    // Intentar login con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Error genérico por seguridad (no decimos cuál campo es incorrecto)
      return { error: 'Email o contraseña incorrectos' }
    }

    // Éxito: Revalidar caché y retornar success (el cliente maneja la redirección)
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (error) {
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

export async function logOutAction() {
  try {
    const supabase = await createServerClient()

    // Cerrar sesión
    await supabase.auth.signOut()

    // Limpiar caché y redirigir a login
    revalidatePath('/', 'layout')
    redirect('/login')
  } catch (error) {
    // Si hay error, redirigir igualmente a login
    redirect('/login')
  }
}

/**
 * FUNCIÓN AUXILIAR: Obtener usuario actual
 *
 * ¿Qué hace?
 * Pregunta a Supabase: "¿Quién soy yo?" (obtiene el usuario logueado)
 * Se usa para mostrar el nombre/email en el dashboard
 * O para proteger rutas (si no hay usuario, no debería ver el dashboard)
 */
export async function getCurrentUser() {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      return null
    }

    return data.user
  } catch (error) {
    return null
  }
}
