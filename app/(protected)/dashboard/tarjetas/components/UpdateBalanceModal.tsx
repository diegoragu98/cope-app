'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updateCreditCardBalance } from '@/lib/credit-cards/actions'
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

interface UpdateBalanceModalProps {
  card: CreditCard
  onClose: () => void
}

export default function UpdateBalanceModal({ card, onClose }: UpdateBalanceModalProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [newBalance, setNewBalance] = useState(card.current_balance)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Auto-focus y seleccionar input al abrir el modal
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, 0)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await updateCreditCardBalance(card.id, newBalance)

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
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
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-cope-text">
            Actualizar saldo: {card.name}
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

          {/* Saldo anterior (informativo) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Saldo anterior
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              ${card.current_balance.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              {card.currency}
            </div>
          </div>

          {/* Nuevo saldo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nuevo saldo *
            </label>
            <div className="flex items-center">
              <span className="px-4 py-2 bg-gray-100 rounded-l-lg border-2 border-gray-300 border-r-0 text-sm">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={newBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^\d.]/g, '')
                  // Ensure only one decimal point
                  const parts = numericValue.split('.')
                  const cleanValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue
                  setNewBalance(parseFloat(cleanValue) || 0)
                }}
                placeholder="0"
                className="flex-1 px-4 py-2 rounded-r-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Fecha (informativa) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {new Date().toLocaleDateString('es-MX')}
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
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
