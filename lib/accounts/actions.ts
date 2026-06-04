'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

/**
 * ACCIONES DE CUENTAS — Server Actions
 *
 * ¿Qué son?
 * Funciones que corren en el SERVIDOR para manejar tus cuentas:
 * - Crear cuenta (Santander, Nu, CETES, etc.)
 * - Editar saldo, nombre, institución
 * - Eliminar una cuenta
 * - Obtener todas tus cuentas
 *
 * Todo se valida en el servidor y se guarda en Supabase.
 */

export type AccountType = 'checking' | 'savings' | 'investment_rv' | 'investment_rf' | 'digital_wallet' | 'cash' | 'other'

export interface CreateAccountInput {
  name: string
  institution?: string
  type: AccountType
  currency: 'MXN' | 'USD'
  balance: number
  color?: string
  icon?: string
}

export interface UpdateAccountInput {
  id: string
  name?: string
  institution?: string
  type?: AccountType
  currency?: 'MXN' | 'USD'
  balance?: number
  color?: string
  icon?: string
}

/**
 * CREAR CUENTA
 * Agrega una nueva cuenta a tu portafolio
 */
export async function createAccount(input: CreateAccountInput) {
  console.log('[createAccount] Starting...', { name: input.name })

  // Validaciones básicas
  if (!input.name || !input.type || !input.currency) {
    return { error: 'Por favor completa los campos requeridos' }
  }

  if (input.balance < 0) {
    return { error: 'El saldo no puede ser negativo' }
  }

  try {
    console.log('[createAccount] Creating Supabase client...')
    const supabase = await createServerClient()

    // Obtener usuario actual (para validar que es tu cuenta)
    console.log('[createAccount] Getting current user...')
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      console.log('[createAccount] No user logged in')
      return { error: 'No estás logueado' }
    }

    console.log('[createAccount] User authenticated:', authData.user.id)

    // Crear la cuenta en Supabase
    console.log('[createAccount] Inserting account into Supabase...')
    const { data, error } = await supabase
      .from('accounts')
      .insert({
        user_id: authData.user.id,
        name: input.name.trim(),
        institution: input.institution?.trim() || null,
        type: input.type,
        currency: input.currency,
        balance: input.balance,
        color: input.color || null,
        icon: input.icon || null,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      console.error('[createAccount] Supabase insert error:', error)
      return { error: 'Error al crear la cuenta. Intenta de nuevo.' }
    }

    console.log('[createAccount] Account created successfully:', data?.id)

    // Revalidar la página para que se vea la cuenta nueva
    console.log('[createAccount] Revalidating paths...')
    revalidatePath('/dashboard/cuentas')
    revalidatePath('/dashboard')

    console.log('[createAccount] Success!')
    return { success: true }
  } catch (error) {
    console.error('[createAccount] Exception:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * ACTUALIZAR CUENTA
 * Edita el saldo, nombre, o cualquier campo de una cuenta
 */
export async function updateAccount(input: UpdateAccountInput) {
  if (!input.id) {
    return { error: 'ID de cuenta inválido' }
  }

  if (input.balance !== undefined && input.balance < 0) {
    return { error: 'El saldo no puede ser negativo' }
  }

  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No estás logueado' }
    }

    // Primero verificar que la cuenta pertenece al usuario (RLS lo hace, pero validamos)
    const { data: account } = await supabase
      .from('accounts')
      .select('user_id')
      .eq('id', input.id)
      .single()

    if (!account || account.user_id !== authData.user.id) {
      return { error: 'No tienes permiso para editar esta cuenta' }
    }

    // Preparar los datos a actualizar
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (input.name !== undefined) updateData.name = input.name.trim()
    if (input.institution !== undefined) updateData.institution = input.institution?.trim() || null
    if (input.type !== undefined) updateData.type = input.type
    if (input.currency !== undefined) updateData.currency = input.currency
    if (input.balance !== undefined) updateData.balance = input.balance
    if (input.color !== undefined) updateData.color = input.color || null
    if (input.icon !== undefined) updateData.icon = input.icon || null

    // Actualizar en Supabase
    const { data, error } = await supabase
      .from('accounts')
      .update(updateData)
      .eq('id', input.id)
      .select()
      .single()

    if (error) {
      console.error('Error al actualizar cuenta:', error)
      return { error: 'Error al actualizar la cuenta. Intenta de nuevo.' }
    }

    // Revalidar la página
    revalidatePath('/dashboard/cuentas')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Exception al actualizar cuenta:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * ELIMINAR CUENTA
 * Borra una cuenta del portafolio
 */
export async function deleteAccount(accountId: string) {
  if (!accountId) {
    return { error: 'ID de cuenta inválido' }
  }

  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No estás logueado' }
    }

    // Verificar que la cuenta pertenece al usuario
    const { data: account } = await supabase
      .from('accounts')
      .select('user_id')
      .eq('id', accountId)
      .single()

    if (!account || account.user_id !== authData.user.id) {
      return { error: 'No tienes permiso para eliminar esta cuenta' }
    }

    // Eliminar la cuenta
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', accountId)

    if (error) {
      console.error('Error al eliminar cuenta:', error)
      return { error: 'Error al eliminar la cuenta. Intenta de nuevo.' }
    }

    // Revalidar la página
    revalidatePath('/dashboard/cuentas')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Exception al eliminar cuenta:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * OBTENER TODAS LAS CUENTAS DEL USUARIO
 * Se usa en Server Components para mostrar la lista de cuentas
 */
export async function getUserAccounts() {
  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return null
    }

    // Obtener las cuentas del usuario, ordenadas por fecha de creación
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', authData.user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener cuentas:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Exception al obtener cuentas:', error)
    return null
  }
}

/**
 * CALCULAR PATRIMONIO TOTAL
 * Suma de todas tus cuentas en MXN (convierte USD a MXN)
 */
export async function getTotalPatrimony(exchangeRate: number = 17) {
  const accounts = await getUserAccounts()
  if (!accounts || accounts.length === 0) {
    return 0
  }

  return accounts.reduce((total, account) => {
    const balanceInMXN = account.currency === 'USD'
      ? account.balance * exchangeRate
      : account.balance
    return total + balanceInMXN
  }, 0)
}
