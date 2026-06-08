'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * CREATE PENDING ITEM
 * Adds a new incoming or outgoing pending item
 */
export async function createPendingItem({
  type,
  concept,
  amount,
  currency = 'MXN',
  expected_date,
}: {
  type: 'incoming' | 'outgoing'
  concept: string
  amount: number
  currency?: 'MXN' | 'USD'
  expected_date?: string
}) {
  try {
    const supabase = await createServerClient()

    // Get current user
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No autorizado' }
    }

    // Validate inputs
    if (!concept || concept.trim().length === 0) {
      return { error: 'El concepto es requerido' }
    }
    if (amount <= 0) {
      return { error: 'El monto debe ser mayor a 0' }
    }
    if (!['incoming', 'outgoing'].includes(type)) {
      return { error: 'Tipo inválido' }
    }

    // Insert pending item
    const { data, error } = await supabase
      .from('pending_items')
      .insert([
        {
          user_id: authData.user.id,
          type,
          concept: concept.trim(),
          amount,
          currency,
          expected_date: expected_date || null,
        },
      ])
      .select()

    if (error) {
      console.error('Error creating pending item:', error)
      return { error: 'Error al crear pendiente' }
    }

    // Revalidate both dashboard and pendientes pages
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/pendientes')

    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Exception creating pending item:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * GET USER PENDING ITEMS
 * Fetches only active pending items (is_resolved = false), separated by type
 */
export async function getUserPendingItems() {
  try {
    const supabase = await createServerClient()

    // Get current user
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return null
    }

    // Get active pending items
    const { data, error } = await supabase
      .from('pending_items')
      .select('*')
      .eq('user_id', authData.user.id)
      .eq('is_resolved', false)
      .order('expected_date', { ascending: true, nullsFirst: false })

    if (error) {
      console.error('Error fetching pending items:', error)
      return null
    }

    // Separate by type
    const incoming = data.filter((item) => item.type === 'incoming')
    const outgoing = data.filter((item) => item.type === 'outgoing')

    return { incoming, outgoing }
  } catch (error) {
    console.error('Exception fetching pending items:', error)
    return null
  }
}

/**
 * RESOLVE PENDING ITEM
 * Soft delete: marks as resolved instead of hard delete
 * User must manually update account balance (Sprint 5 orchestrated flow)
 */
export async function resolvePendingItem(id: string) {
  try {
    const supabase = await createServerClient()

    // Get current user
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No autorizado' }
    }

    // Check ownership
    const { data: item } = await supabase
      .from('pending_items')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!item || item.user_id !== authData.user.id) {
      return { error: 'No tienes acceso a este pendiente' }
    }

    // Soft delete: mark as resolved
    const { error } = await supabase
      .from('pending_items')
      .update({
        is_resolved: true,
        resolved_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('Error resolving pending item:', error)
      return { error: 'Error al marcar como concretado' }
    }

    // Revalidate
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/pendientes')

    return { success: true }
  } catch (error) {
    console.error('Exception resolving pending item:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * DELETE PENDING ITEM
 * Hard delete - only for correcting data entry mistakes
 */
export async function deletePendingItem(id: string) {
  try {
    const supabase = await createServerClient()

    // Get current user
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { error: 'No autorizado' }
    }

    // Check ownership
    const { data: item } = await supabase
      .from('pending_items')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!item || item.user_id !== authData.user.id) {
      return { error: 'No tienes acceso a este pendiente' }
    }

    // Hard delete
    const { error } = await supabase.from('pending_items').delete().eq('id', id)

    if (error) {
      console.error('Error deleting pending item:', error)
      return { error: 'Error al eliminar pendiente' }
    }

    // Revalidate
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/pendientes')

    return { success: true }
  } catch (error) {
    console.error('Exception deleting pending item:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}

/**
 * CALCULATE PENDING BALANCE
 * Returns net balance: incoming - outgoing (only active items)
 */
export async function calculatePendingBalance() {
  try {
    const pendingData = await getUserPendingItems()
    if (!pendingData) {
      return { incoming: 0, outgoing: 0, net: 0 }
    }

    const incomingTotal = pendingData.incoming.reduce(
      (sum, item) => sum + item.amount,
      0
    )
    const outgoingTotal = pendingData.outgoing.reduce(
      (sum, item) => sum + item.amount,
      0
    )

    return {
      incoming: incomingTotal,
      outgoing: outgoingTotal,
      net: incomingTotal - outgoingTotal,
    }
  } catch (error) {
    console.error('Exception calculating pending balance:', error)
    return { incoming: 0, outgoing: 0, net: 0 }
  }
}
