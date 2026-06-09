'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCreditCard, updateCreditCard } from '@/lib/credit-cards/actions'
import { Button } from '@/components/ui/Button'

interface CreditCard {
  id: string
  name: string
  institution?: string
  currency: 'MXN' | 'USD'
  current_balance: number
  cutoff_day: number
  payment_day: number
  color?: string
  icon?: string
  is_active: boolean
  created_at: string
}

interface CreditCardModalFormProps {
  card?: CreditCard | null
  onClose: () => void
  onSuccess: () => void
}

export default function CreditCardModalForm({ card, onClose, onSuccess }: CreditCardModalFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: card?.name || '',
    institution: card?.institution || '',
    currency: (card?.currency || 'MXN') as 'MXN' | 'USD',
    currentBalance: card?.current_balance || 0,
    cutoffDay: card?.cutoff_day || 1,
    paymentDay: card?.payment_day || 1,
    color: card?.color || '#0F766E',
    icon: card?.icon || '💳',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (card) {
        // Editar tarjeta existente
        const result = await updateCreditCard({
          id: card.id,
          ...formData,
        })
        if (result.error) {
          setError(result.error)
          setLoading(false)
          return
        }
      } else {
        // Crear nueva tarjeta
        const result = await createCreditCard(formData)
        if (result.error) {
          setError(result.error)
          setLoading(false)
          return
        }
      }

      // Éxito - cerrar modal y refrescar
      onClose()
      router.refresh()
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-cope-text">
            {card ? 'Editar tarjeta' : 'Agregar nueva TDC'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}

          {/* FILA 1: Nombre completo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: AMEX"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
              disabled={loading}
            />
          </div>

          {/* FILA 2: Institución completa */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Institución (opcional)
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => handleChange('institution', e.target.value)}
              placeholder="Ej: American Express"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
              disabled={loading}
            />
          </div>

          {/* FILA 3: Moneda | Saldo actual */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Moneda *
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              >
                <option value="MXN">MXN (Pesos)</option>
                <option value="USD">USD (Dólares)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Saldo actual *
              </label>
              <div className="flex items-center">
                <span className="px-4 py-2 bg-gray-100 rounded-l-lg border-2 border-gray-300 border-r-0 text-sm">
                  $
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={
                    (() => {
                      const str = formData.currentBalance.toString()
                      const parts = str.split('.')
                      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      return parts[1] ? `${integerPart}.${parts[1]}` : integerPart
                    })()
                  }
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^\d.]/g, '')
                    const parts = numericValue.split('.')
                    const cleanValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue
                    handleChange('currentBalance', parseFloat(cleanValue) || 0)
                  }}
                  placeholder="0"
                  className="flex-1 px-4 py-2 rounded-r-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* FILA 4: Día de corte | Día de pago */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Día de corte (1-31) *
              </label>
              <input
                type="number"
                value={formData.cutoffDay}
                onChange={(e) => handleChange('cutoffDay', parseInt(e.target.value) || 1)}
                min="1"
                max="31"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Día de pago (1-31) *
              </label>
              <input
                type="number"
                value={formData.paymentDay}
                onChange={(e) => handleChange('paymentDay', parseInt(e.target.value) || 1)}
                min="1"
                max="31"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* FILA 5: Color selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Color (opcional)
            </label>
            <div className="flex gap-2">
              {['#0F766E', '#059669', '#0891B2', '#7C3AED', '#DB2777'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange('color', color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    formData.color === color ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          {/* Botones de acción */}
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
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Guardando...' : card ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
