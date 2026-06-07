'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

/**
 * ACCIONES DE TARJETAS DE CRÉDITO — Server Actions
 *
 * Funciones para manejar tarjetas de crédito:
 * - Crear tarjeta (AMEX, Santander, etc.)
 * - Editar saldo, fechas de corte/pago
 * - Eliminar tarjeta
 * - Actualizar saldo actual
 * - Registrar pagos (afecta cuenta origen)
 *
 * Todo se valida en el servidor y se guarda en Supabase.
 */

export interface CreateCreditCardInput {
  name: string
  institution?: string
  currency: 'MXN' | 'USD'
  currentBalance: number
  cutoffDay: number
  paymentDay: number
  color?: string
  icon?: string
}

export interface UpdateCreditCardInput {
  id: string
  name?: string
  institution?: string
  currency?: 'MXN' | 'USD'
  currentBalance?: number
  cutoffDay?: number
  paymentDay?: number
  color?: string
  icon?: string
}

export interface RegisterPaymentInput {
  creditCardId: string
  amount: number
  sourceAccountId: string
  paymentDate: string
  notes?: string
}

/**
 * CREAR TARJETA DE CRÉDITO
 */
export async function createCreditCard(input: CreateCreditCardInput) {
  console.log('[createCreditCard] Starting...', { name: input.name })

  // Validaciones básicas
  if (!input.name || !input.currency) {
    return { error: 'Por favor completa los campos requeridos' }
  }

  if (input.currentBalance < 0) {
    return { error: 'El saldo no puede ser negativo' }
  }

  if (input.cutoffDay < 1 || input.cutoffDay > 31) {
    return { error: 'Día de corte debe ser entre 1 y 31' }
  }

  if (input.paymentDay < 1 || input.paymentDay > 31) {
    return { error: 'Día de pago debe ser entre 1 y 31' }
  }

  try {
    console.log('[createCreditCard] Creating Supabase client...')
    const supabase = await createServerClient()

    // Obtener usuario actual
    console.log('[createCreditCard] Getting current user...')
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No estás logueado' }
    }

    console.log('[createCreditCard] User authenticated:', authData.user.id)

    // Crear tarjeta en Supabase
    console.log('[createCreditCard] Inserting credit card...')
    const { data, error } = await supabase
      .from('credit_cards')
      .insert({
        user_id: authData.user.id,
        name: input.name.trim(),
        institution: input.institution?.trim() || null,
        currency: input.currency,
        current_balance: input.currentBalance,
        cutoff_day: input.cutoffDay,
        payment_day: input.paymentDay,
        color: input.color || null,
        icon: input.icon || '💳',
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      console.error('[createCreditCard] Supabase insert error:', error)
      return { error: 'Error al crear la tarjeta. Intenta de nuevo.' }
    }

    console.log('[createCreditCard] Card created successfully:', data?.id)

    // Revalidar
    console.log('[createCreditCard] Revalidating paths...')
    revalidatePath('/dashboard/tarjetas')
    revalidatePath('/dashboard')

    console.log('[createCreditCard] Success!')
    return { success: true }
  } catch (error) {
    console.error('[createCreditCard] Exception:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * ACTUALIZAR TARJETA DE CRÉDITO
 */
export async function updateCreditCard(input: UpdateCreditCardInput) {
  if (!input.id) {
    return { error: 'ID de tarjeta inválido' }
  }

  if (input.currentBalance !== undefined && input.currentBalance < 0) {
    return { error: 'El saldo no puede ser negativo' }
  }

  if (input.cutoffDay !== undefined && (input.cutoffDay < 1 || input.cutoffDay > 31)) {
    return { error: 'Día de corte debe ser entre 1 y 31' }
  }

  if (input.paymentDay !== undefined && (input.paymentDay < 1 || input.paymentDay > 31)) {
    return { error: 'Día de pago debe ser entre 1 y 31' }
  }

  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No estás logueado' }
    }

    // Verificar que la tarjeta pertenece al usuario
    const { data: card } = await supabase
      .from('credit_cards')
      .select('user_id')
      .eq('id', input.id)
      .single()

    if (!card || card.user_id !== authData.user.id) {
      return { error: 'No tienes permiso para editar esta tarjeta' }
    }

    // Preparar datos a actualizar
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (input.name !== undefined) updateData.name = input.name.trim()
    if (input.institution !== undefined) updateData.institution = input.institution?.trim() || null
    if (input.currency !== undefined) updateData.currency = input.currency
    if (input.currentBalance !== undefined) updateData.current_balance = input.currentBalance
    if (input.cutoffDay !== undefined) updateData.cutoff_day = input.cutoffDay
    if (input.paymentDay !== undefined) updateData.payment_day = input.paymentDay
    if (input.color !== undefined) updateData.color = input.color || null
    if (input.icon !== undefined) updateData.icon = input.icon || '💳'

    // Actualizar en Supabase
    const { data, error } = await supabase
      .from('credit_cards')
      .update(updateData)
      .eq('id', input.id)
      .select()
      .single()

    if (error) {
      console.error('[updateCreditCard] Supabase update error:', error)
      return { error: 'Error al actualizar la tarjeta. Intenta de nuevo.' }
    }

    // Revalidar
    revalidatePath('/dashboard/tarjetas')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('[updateCreditCard] Exception:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * ELIMINAR TARJETA DE CRÉDITO
 */
export async function deleteCreditCard(creditCardId: string) {
  if (!creditCardId) {
    return { error: 'ID de tarjeta inválido' }
  }

  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No estás logueado' }
    }

    // Verificar que la tarjeta pertenece al usuario
    const { data: card } = await supabase
      .from('credit_cards')
      .select('user_id')
      .eq('id', creditCardId)
      .single()

    if (!card || card.user_id !== authData.user.id) {
      return { error: 'No tienes permiso para eliminar esta tarjeta' }
    }

    // Eliminar la tarjeta
    const { error } = await supabase.from('credit_cards').delete().eq('id', creditCardId)

    if (error) {
      console.error('[deleteCreditCard] Supabase delete error:', error)
      return { error: 'Error al eliminar la tarjeta. Intenta de nuevo.' }
    }

    // Revalidar
    revalidatePath('/dashboard/tarjetas')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('[deleteCreditCard] Exception:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * OBTENER TODAS LAS TARJETAS DEL USUARIO
 */
export async function getUserCreditCards() {
  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return null
    }

    // Obtener tarjetas
    const { data, error } = await supabase
      .from('credit_cards')
      .select('*')
      .eq('user_id', authData.user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[getUserCreditCards] Error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[getUserCreditCards] Exception:', error)
    return null
  }
}

/**
 * ACTUALIZAR SALDO DE TARJETA
 */
export async function updateCreditCardBalance(creditCardId: string, newBalance: number) {
  if (!creditCardId) {
    return { error: 'ID de tarjeta inválido' }
  }

  if (newBalance < 0) {
    return { error: 'El saldo no puede ser negativo' }
  }

  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No estás logueado' }
    }

    // Verificar que la tarjeta pertenece al usuario
    const { data: card } = await supabase
      .from('credit_cards')
      .select('user_id')
      .eq('id', creditCardId)
      .single()

    if (!card || card.user_id !== authData.user.id) {
      return { error: 'No tienes permiso para actualizar esta tarjeta' }
    }

    // Actualizar saldo
    const { error } = await supabase
      .from('credit_cards')
      .update({
        current_balance: newBalance,
        updated_at: new Date().toISOString(),
      })
      .eq('id', creditCardId)

    if (error) {
      console.error('[updateCreditCardBalance] Error:', error)
      return { error: 'Error al actualizar el saldo. Intenta de nuevo.' }
    }

    // Revalidar
    revalidatePath('/dashboard/tarjetas')
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('[updateCreditCardBalance] Exception:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * REGISTRAR PAGO DE TARJETA
 *
 * Flujo completo:
 * 1. Crea registro en credit_card_payments
 * 2. Crea movimiento en movements
 * 3. Resta monto de cuenta origen
 * 4. Resetea saldo de TDC a $0
 */
export async function registerCreditCardPayment(input: RegisterPaymentInput) {
  if (!input.creditCardId || !input.sourceAccountId) {
    return { error: 'Datos incompletos' }
  }

  if (input.amount <= 0) {
    return { error: 'El monto debe ser mayor a 0' }
  }

  try {
    const supabase = await createServerClient()

    // Obtener usuario actual
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No estás logueado' }
    }

    console.log('[registerCreditCardPayment] Starting payment registration...', {
      cardId: input.creditCardId,
      accountId: input.sourceAccountId,
      amount: input.amount,
    })

    // Verificar que la tarjeta pertenece al usuario
    const { data: card } = await supabase
      .from('credit_cards')
      .select('*')
      .eq('id', input.creditCardId)
      .eq('user_id', authData.user.id)
      .single()

    if (!card) {
      return { error: 'Tarjeta no encontrada' }
    }

    // Verificar que la cuenta pertenece al usuario
    const { data: account } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', input.sourceAccountId)
      .eq('user_id', authData.user.id)
      .single()

    if (!account) {
      return { error: 'Cuenta de origen no encontrada' }
    }

    // Verificar que la cuenta tiene saldo suficiente
    if (account.balance < input.amount) {
      return { error: `Saldo insuficiente. Disponible: ${account.balance}` }
    }

    console.log('[registerCreditCardPayment] Creating payment record...')

    // 1. Crear registro de pago
    const { data: payment, error: paymentError } = await supabase
      .from('credit_card_payments')
      .insert({
        user_id: authData.user.id,
        credit_card_id: input.creditCardId,
        amount: input.amount,
        source_account_id: input.sourceAccountId,
        payment_date: input.paymentDate,
        notes: input.notes || null,
      })
      .select()
      .single()

    if (paymentError) {
      console.error('[registerCreditCardPayment] Payment insert error:', paymentError)
      return { error: 'Error al registrar el pago. Intenta de nuevo.' }
    }

    console.log('[registerCreditCardPayment] Payment created:', payment.id)

    // 2. Crear movimiento en movements
    console.log('[registerCreditCardPayment] Creating movement record...')
    const { error: movementError } = await supabase.from('movements').insert({
      user_id: authData.user.id,
      account_id: input.sourceAccountId,
      type: 'payment',
      amount: input.amount,
      description: `Pago de ${card.name}`,
      date: input.paymentDate,
    })

    if (movementError) {
      console.error('[registerCreditCardPayment] Movement insert error:', movementError)
      // No retornar error aquí para no fallar el flujo completo
    }

    // 3. Restar monto de cuenta origen
    console.log('[registerCreditCardPayment] Updating account balance...')
    const newAccountBalance = account.balance - input.amount
    const { error: accountError } = await supabase
      .from('accounts')
      .update({
        balance: newAccountBalance,
        updated_at: new Date().toISOString(),
      })
      .eq('id', input.sourceAccountId)

    if (accountError) {
      console.error('[registerCreditCardPayment] Account update error:', accountError)
      return { error: 'Error al actualizar la cuenta. Intenta de nuevo.' }
    }

    // 4. Resetear saldo de TDC a $0
    console.log('[registerCreditCardPayment] Resetting card balance...')
    const { error: cardError } = await supabase
      .from('credit_cards')
      .update({
        current_balance: 0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', input.creditCardId)

    if (cardError) {
      console.error('[registerCreditCardPayment] Card update error:', cardError)
      return { error: 'Error al actualizar la tarjeta. Intenta de nuevo.' }
    }

    console.log('[registerCreditCardPayment] Payment registered successfully!')

    // Revalidar
    revalidatePath('/dashboard/tarjetas')
    revalidatePath('/dashboard/cuentas')
    revalidatePath('/dashboard')

    return { success: true, paymentId: payment.id }
  } catch (error) {
    console.error('[registerCreditCardPayment] Exception:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}
