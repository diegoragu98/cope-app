'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// =====================================================
// TIPOS
// =====================================================
// Una "meta" tiene target_amount y barra de progreso (aportado / target).
// Un "proyecto" NO tiene target, solo acumula registros de gasto.
// Ambos viven en la tabla `goals` (discriminados por `type`); el nombre vive en
// la columna `title` y el activo/inactivo en `status='active'`.
// Las aportaciones/registros viven en `goal_contributions` (se construyen en el
// Paso 3); aquí solo se LEEN para calcular `aportado`.

export type GoalType = 'meta' | 'proyecto'

interface CreateGoalInput {
  title: string
  type: GoalType
  targetAmount?: number // requerido para meta, ignorado (NULL) para proyecto
  description?: string
  color?: string
  icon?: string
}

interface UpdateGoalInput {
  id: string
  title?: string
  targetAmount?: number | null
  description?: string | null
  color?: string | null
  icon?: string | null
}

export interface Goal {
  id: string
  title: string
  type: GoalType
  target_amount: number | null
  description: string | null
  color: string | null
  icon: string | null
  created_at: string
  // Calculados
  aportado: number // SUM(goal_contributions.amount)
  progreso: number | null // aportado / target_amount (solo metas; null en proyectos)
}

// =====================================================
// CRUD GOALS
// =====================================================

export async function createGoal(input: CreateGoalInput) {
  const supabase = await createServerClient()

  try {
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { success: false, data: null, error: 'No estás logueado' }
    }

    if (!input.title?.trim()) {
      return { success: false, data: null, error: 'El nombre es obligatorio' }
    }

    if (input.type !== 'meta' && input.type !== 'proyecto') {
      return { success: false, data: null, error: 'Tipo inválido' }
    }

    // Las metas requieren target; los proyectos NUNCA llevan target (forzar NULL).
    let targetAmount: number | null = null
    if (input.type === 'meta') {
      if (!input.targetAmount || input.targetAmount <= 0) {
        return { success: false, data: null, error: 'La meta requiere un monto objetivo' }
      }
      targetAmount = input.targetAmount
    }

    const { data, error } = await supabase
      .from('goals')
      .insert({
        user_id: authData.user.id, // RLS lo exige (fue el bug de Inversiones)
        title: input.title.trim(),
        type: input.type,
        target_amount: targetAmount,
        description: input.description?.trim() || null,
        color: input.color || null,
        icon: input.icon || null,
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      // TODO: REVERTIR - debug temporal, NO dejar en prod.
      // Propaga el error completo de Supabase a la UI para leer la causa real.
      console.error('[createGoal] Supabase error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      })
      return {
        success: false,
        data: null,
        error: `DEBUG createGoal → message: ${error.message} | code: ${error.code} | details: ${error.details} | hint: ${error.hint}`,
      }
    }

    revalidatePath('/dashboard/metas')
    return { success: true, data, error: null }
  } catch (err) {
    // TODO: REVERTIR - debug temporal, NO dejar en prod.
    console.error('[createGoal] Unexpected error:', err)
    return {
      success: false,
      data: null,
      error: `DEBUG createGoal (catch) → ${err instanceof Error ? err.message : String(err)}`,
    }
  }
}

export async function updateGoal(input: UpdateGoalInput) {
  const supabase = await createServerClient()

  try {
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { success: false, data: null, error: 'No estás logueado' }
    }

    // Solo actualizar los campos presentes (no pisar con undefined).
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }

    if (input.title !== undefined) {
      if (!input.title.trim()) {
        return { success: false, data: null, error: 'El nombre no puede estar vacío' }
      }
      updates.title = input.title.trim()
    }
    if (input.targetAmount !== undefined) updates.target_amount = input.targetAmount
    if (input.description !== undefined) updates.description = input.description
    if (input.color !== undefined) updates.color = input.color
    if (input.icon !== undefined) updates.icon = input.icon

    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', input.id)
      .eq('user_id', authData.user.id)
      .select()
      .single()

    if (error) {
      return { success: false, data: null, error: 'Error al actualizar' }
    }

    revalidatePath('/dashboard/metas')
    return { success: true, data, error: null }
  } catch (err) {
    return { success: false, data: null, error: 'Error inesperado' }
  }
}

export async function deleteGoal(id: string) {
  const supabase = await createServerClient()

  try {
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      return { success: false, error: 'No estás logueado' }
    }

    // ON DELETE CASCADE borra también sus goal_contributions.
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
      .eq('user_id', authData.user.id)

    if (error) {
      return { success: false, error: 'Error al eliminar' }
    }

    revalidatePath('/dashboard/metas')
    return { success: true, error: null }
  } catch (err) {
    return { success: false, error: 'Error inesperado' }
  }
}

export async function getGoals(): Promise<Goal[]> {
  const supabase = await createServerClient()

  try {
    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) return []

    const { data: goals, error } = await supabase
      .from('goals')
      .select('id, title, type, target_amount, description, color, icon, created_at')
      .eq('status', 'active')
      .order('created_at', { ascending: true })

    if (error || !goals) return []

    const result: Goal[] = []

    for (const g of goals) {
      const { data: contributions } = await supabase
        .from('goal_contributions')
        .select('amount')
        .eq('goal_id', g.id)

      let aportado = 0
      if (contributions) {
        for (const c of contributions) {
          aportado += Number(c.amount)
        }
      }

      const target = g.target_amount !== null ? Number(g.target_amount) : null

      const progreso =
        g.type === 'meta' && target && target > 0 ? aportado / target : null

      result.push({
        id: g.id,
        title: g.title,
        type: g.type as GoalType,
        target_amount: target,
        description: g.description,
        color: g.color,
        icon: g.icon,
        created_at: g.created_at,
        aportado,
        progreso,
      })
    }

    return result
  } catch (err) {
    return []
  }
}
