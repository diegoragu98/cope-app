'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { createPendingItem } from '@/lib/pending-items/actions'

interface PendientesModalFormProps {
  onClose: () => void
}

export default function PendientesModalForm({
  onClose,
}: PendientesModalFormProps) {
  const router = useRouter()
  const [type, setType] = useState<'incoming' | 'outgoing'>('incoming')
  const [concept, setConcept] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState<'MXN' | 'USD'>('MXN')
  const [expectedDate, setExpectedDate] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const conceptRef = useRef<HTMLInputElement>(null)

  // Auto-focus on concept field
  useEffect(() => {
    setTimeout(() => {
      if (conceptRef.current) {
        conceptRef.current.focus()
      }
    }, 0)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate
    if (!concept.trim()) {
      setError('El concepto es requerido')
      setLoading(false)
      return
    }

    const numAmount = parseFloat(amount.replace(/,/g, ''))
    if (!amount || numAmount <= 0) {
      setError('El monto debe ser mayor a 0')
      setLoading(false)
      return
    }

    try {
      const result = await createPendingItem({
        type,
        concept: concept.trim(),
        amount: numAmount,
        currency,
        expected_date: expectedDate || undefined,
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
          <h2 className="text-2xl font-bold text-gray-900">Nuevo pendiente</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}

          {/* Type Toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tipo de pendiente
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('incoming')}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  type === 'incoming'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                ✅ Me van a pagar
              </button>
              <button
                type="button"
                onClick={() => setType('outgoing')}
                className={`p-3 rounded-lg border-2 font-semibold transition ${
                  type === 'outgoing'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                ⬇️ Voy a pagar
              </button>
            </div>
          </div>

          {/* Concept */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Concepto *
            </label>
            <input
              ref={conceptRef}
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="ej: Pago cliente ABC"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
              disabled={loading}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto *
            </label>
            <div className="flex items-center">
              <span className="px-4 py-2 bg-gray-100 rounded-l-lg border-2 border-gray-300 border-r-0 text-sm">
                $
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, '')
                  setAmount(numericValue)
                }}
                placeholder="0"
                className="flex-1 px-4 py-2 rounded-r-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Moneda
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'MXN' | 'USD')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
              disabled={loading}
            >
              <option value="MXN">MXN - Pesos Mexicanos</option>
              <option value="USD">USD - Dólares</option>
            </select>
          </div>

          {/* Expected Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha esperada (opcional)
            </label>
            <input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
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
              disabled={loading}
              className="flex-1 bg-cope-primary hover:bg-cope-primary/90"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
