'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { CurrencyInput } from '@/components/ui/CurrencyInput'
import { createGoal, updateGoal, type Goal, type GoalType } from '@/lib/goals/actions'

interface GoalModalFormProps {
  type: GoalType // 'meta' (con target) o 'proyecto' (sin target)
  goal?: Goal | null // si viene, es edición
  onClose: () => void
}

const COLORS = ['#0F766E', '#059669', '#0891B2', '#7C3AED', '#DB2777', '#EA580C']
const ICONS_META = ['🎯', '🏠', '✈️', '🎓', '🚨', '💍', '💰']
const ICONS_PROYECTO = ['🚗', '🛠️', '🏡', '🎸', '💻', '🚲', '📦']

export default function GoalModalForm({ type, goal, onClose }: GoalModalFormProps) {
  const router = useRouter()
  const isMeta = type === 'meta'
  const isEditing = !!goal

  const defaultIcon = isMeta ? '🎯' : '🚗'

  const [title, setTitle] = useState(goal?.title || '')
  // CurrencyInput: string en estado durante onChange; parseFloat SOLO en submit.
  const [targetAmount, setTargetAmount] = useState(
    goal?.target_amount != null ? String(goal.target_amount) : ''
  )
  const [description, setDescription] = useState(goal?.description || '')
  const [color, setColor] = useState(goal?.color || COLORS[0])
  const [icon, setIcon] = useState(goal?.icon || defaultIcon)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const iconOptions = isMeta ? ICONS_META : ICONS_PROYECTO

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('El nombre es obligatorio')
      return
    }

    // parseFloat SOLO aquí.
    let parsedTarget: number | undefined = undefined
    if (isMeta) {
      parsedTarget = parseFloat(targetAmount)
      if (!parsedTarget || parsedTarget <= 0) {
        setError('La meta requiere un monto objetivo mayor a 0')
        return
      }
    }

    setLoading(true)

    try {
      let result
      if (isEditing) {
        result = await updateGoal({
          id: goal!.id,
          title: title.trim(),
          // Para meta actualizamos target; para proyecto lo dejamos sin tocar (NULL).
          ...(isMeta ? { targetAmount: parsedTarget } : {}),
          description: description.trim() || null,
          color,
          icon,
        })
      } else {
        result = await createGoal({
          title: title.trim(),
          type,
          targetAmount: parsedTarget,
          description: description.trim() || undefined,
          color,
          icon,
        })
      }

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      onClose()
      router.refresh()
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.')
      setLoading(false)
    }
  }

  const titleLabel = isMeta
    ? isEditing
      ? 'Editar meta'
      : 'Nueva meta'
    : isEditing
      ? 'Editar proyecto'
      : 'Nuevo proyecto'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-cope-text">{titleLabel}</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isMeta ? 'Ej: GNP' : 'Ej: Bochito'}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
              disabled={loading}
              autoFocus
            />
          </div>

          {/* Monto objetivo (solo meta) */}
          {isMeta && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monto objetivo *
              </label>
              <CurrencyInput
                value={targetAmount}
                onChange={setTargetAmount}
                placeholder="Ej. $400,000.00"
              />
            </div>
          )}

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isMeta ? 'Ej: Plan de seguro con aportaciones anuales' : 'Ej: Restauración del coche'}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none resize-none"
              disabled={loading}
            />
          </div>

          {/* Ícono */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ícono (opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              {iconOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setIcon(opt)}
                  className={`w-11 h-11 rounded-lg border-2 text-xl flex items-center justify-center ${
                    icon === opt ? 'border-cope-primary bg-cope-primary/10' : 'border-gray-200'
                  }`}
                  disabled={loading}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Color (opcional)
            </label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    color === c ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: c }}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
