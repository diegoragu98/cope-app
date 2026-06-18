'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface CreateInvestmentMovementInput {
  accountId: string
  amount: number
  type: 'ingreso' | 'retiro'
  movementDate: string
  notes?: string
}

interface InvestmentAccount {
  id: string
  name: string
  type: 'investment_rf' | 'investment_rv'
  balance: number
  currency: 'MXN' | 'USD'
  aportado: number
  ganancia: number
}

interface InvestmentMovement {
  id: string
  account_id: string
  amount: number
  type: 'ingreso' | 'retiro'
  movement_date: string
  notes: string | null
  created_at: string
}

export async function createInvestmentMovement(input: CreateInvestmentMovementInput) {
  const supabase = await createServerClient()

  try {
    // Validar que la cuenta sea de tipo inversión
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('type')
      .eq('id', input.accountId)
      .single()

    if (accountError || !account) {
      return { success: false, data: null, error: 'Cuenta no encontrada' }
    }

    if (account.type !== 'investment_rf' && account.type !== 'investment_rv') {
      return { success: false, data: null, error: 'Esta cuenta no es una cuenta de inversión' }
    }

    // Insertar el movimiento
    const { data, error } = await supabase
      .from('investment_movements')
      .insert({
        account_id: input.accountId,
        amount: input.amount,
        type: input.type,
        movement_date: input.movementDate,
        notes: input.notes || null,
      })
      .select()
      .single()

    if (error) {
      return { success: false, data: null, error: 'Error al registrar el movimiento' }
    }

    revalidatePath('/dashboard/inversiones')
    return { success: true, data, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Error inesperado' }
  }
}

export async function getInvestmentAccounts(): Promise<InvestmentAccount[]> {
  const supabase = await createServerClient()

  try {
    const { data: accounts, error } = await supabase
      .from('accounts')
      .select('id, name, type, balance, currency')
      .in('type', ['investment_rf', 'investment_rv'])
      .eq('is_active', true)
      .order('name')

    if (error || !accounts) {
      return []
    }

    // Para cada cuenta, calcular aportado y ganancia
    const investmentAccounts: InvestmentAccount[] = []

    for (const account of accounts) {
      const { data: movements } = await supabase
        .from('investment_movements')
        .select('amount, type')
        .eq('account_id', account.id)

      let aportado = 0
      if (movements) {
        movements.forEach((mov) => {
          if (mov.type === 'ingreso') {
            aportado += mov.amount
          } else {
            aportado -= mov.amount
          }
        })
      }

      const ganancia = account.balance - aportado

      investmentAccounts.push({
        id: account.id,
        name: account.name,
        type: account.type as 'investment_rf' | 'investment_rv',
        balance: account.balance,
        currency: account.currency,
        aportado,
        ganancia,
      })
    }

    return investmentAccounts
  } catch (err) {
    return []
  }
}

export async function getInvestmentMovements(accountId: string): Promise<InvestmentMovement[]> {
  const supabase = await createServerClient()

  try {
    const { data: movements, error } = await supabase
      .from('investment_movements')
      .select('*')
      .eq('account_id', accountId)
      .order('movement_date', { ascending: false })

    if (error || !movements) {
      return []
    }

    return movements as InvestmentMovement[]
  } catch (err) {
    return []
  }
}

export async function deleteInvestmentMovement(id: string) {
  const supabase = await createServerClient()

  try {
    const { error } = await supabase
      .from('investment_movements')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, error: 'Error al eliminar el movimiento' }
    }

    revalidatePath('/dashboard/inversiones')
    return { success: true, error: null }
  } catch (err) {
    return { success: false, error: 'Error inesperado' }
  }
}

export async function calculateInvestmentTotals() {
  const accounts = await getInvestmentAccounts()

  const totalAportado = accounts.reduce((sum, acc) => sum + acc.aportado, 0)
  const totalValorActual = accounts.reduce((sum, acc) => sum + acc.balance, 0)
  const totalGanancia = totalValorActual - totalAportado

  const totalRF = accounts
    .filter((acc) => acc.type === 'investment_rf')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const totalRV = accounts
    .filter((acc) => acc.type === 'investment_rv')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const distributionRF = totalValorActual > 0 ? (totalRF / totalValorActual) * 100 : 0
  const distributionRV = totalValorActual > 0 ? (totalRV / totalValorActual) * 100 : 0

  return {
    totalAportado,
    totalValorActual,
    totalGanancia,
    distributionRF,
    distributionRV,
  }
}
