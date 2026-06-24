'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createInvestmentMovement } from '@/lib/investments/actions'
import { Button } from '@/components/ui/Button'

interface InvestmentAccount {
  id: string
  name: string
  type: 'investment_rf' | 'investment_rv'
  balance: number
  currency: 'MXN' | 'USD'
  aportado: number
  ganancia: number
}

interface InvestmentMovementModalProps {
  accounts: InvestmentAccount[]
  preSelectedAccountId?: string
  onClose: () => void
}

export default function InvestmentMovementModal({
  accounts,
  preSelectedAccountId,
  onClose,
}: InvestmentMovementModalProps) {
  const router = useRouter()
  const conceptRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    accountId: preSelectedAccountId || accounts[0]?.id || '',
    type: 'ingreso' as 'ingreso' | 'retiro',
    amount: '' as string | number,
    movementDate: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Auto-focus on concept field
  useEffect(() => {
    setTimeout(() => {
      if (conceptRef.current) {
        conceptRef.current.focus()
      }
    }, 0)
  }, [])

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

    // Validar
    if (!formData.accountId) {
      setError('Selecciona un instrumento')
      setLoading(false)
      return
    }

    const numAmount = parseFloat(String(formData.amount))
    if (!formData.amount || isNaN(numAmount) || numAmount <= 0) {
      setError('El monto debe ser mayor a 0')
      setLoading(false)
      return
    }

    try {
      const result = await createInvestmentMovement({
        accountId: formData.accountId,
        amount: numAmount,
        type: formData.type,
        movementDate: formData.movementDate,
        notes: formData.notes || undefined,
      })

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      // Success - close modal and refresh
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
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Registrar movimiento</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}

          {/* Instrumento */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Instrumento *
            </label>
            {accounts.length === 0 ? (
              <div className="text-sm text-red-600">
                No tienes cuentas de inversión registradas
              </div>
            ) : (
              <select
                value={formData.accountId}
                onChange={(e) => handleChange('accountId', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
                disabled={loading}
              >
                <option value="">Selecciona instrumento...</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tipo Toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tipo de movimiento
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleChange('type', 'ingreso')}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  formData.type === 'ingreso'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
                disabled={loading}
              >
                ✅ Ingreso
              </button>
              <button
                type="button"
                onClick={() => handleChange('type', 'retiro')}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  formData.type === 'retiro'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
                disabled={loading}
              >
                ⬇️ Retiro
              </button>
            </div>
          </div>

          {/* Monto */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto * (ej: 1500.50)
            </label>
            <div className="flex items-center">
              <span className="px-4 py-2 bg-gray-100 rounded-l-lg border-2 border-gray-300 border-r-0 text-sm">
                $
              </span>
              <input
                ref={conceptRef}
                type="text"
                value={formData.amount}
                onChange={(e) => {
                  const val = e.target.value
                  // Allow only digits and one decimal point - store as string
                  if (val === '' || /^\d*\.?\d*$/.test(val)) {
                    handleChange('amount', val)
                  }
                }}
                placeholder="0.00"
                className="flex-1 px-4 py-2 rounded-r-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha *
            </label>
            <input
              type="date"
              value={formData.movementDate}
              onChange={(e) => handleChange('movementDate', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
              disabled={loading}
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="ej: Aporte extra, dividend reinvertido"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
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
              disabled={loading || accounts.length === 0}
              className="flex-1"
            >
              {loading ? 'Guardando...' : 'Registrar movimiento'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
