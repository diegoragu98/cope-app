'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerCreditCardPayment } from '@/lib/credit-cards/actions'
import { getUserAccounts } from '@/lib/accounts/actions'
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

interface Account {
  id: string
  name: string
  currency: 'MXN' | 'USD'
  balance: number
}

interface RegisterPaymentModalProps {
  card: CreditCard
  onClose: () => void
}

export default function RegisterPaymentModal({ card, onClose }: RegisterPaymentModalProps) {
  const router = useRouter()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [formData, setFormData] = useState({
    amount: card.current_balance,
    sourceAccountId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingAccounts, setLoadingAccounts] = useState(true)

  // Cargar cuentas disponibles
  useEffect(() => {
    const loadAccounts = async () => {
      const data = await getUserAccounts()
      if (data) {
        setAccounts(data as Account[])
        // Sugerir primera cuenta como default (de preferencia Santander o similar)
        if (data.length > 0) {
          const defaultAccount = data[0]
          setFormData((prev) => ({
            ...prev,
            sourceAccountId: defaultAccount.id,
          }))
        }
      }
      setLoadingAccounts(false)
    }

    loadAccounts()
  }, [])

  const selectedAccount = accounts.find((a) => a.id === formData.sourceAccountId)

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

    if (!formData.sourceAccountId) {
      setError('Por favor selecciona una cuenta de origen')
      setLoading(false)
      return
    }

    try {
      const result = await registerCreditCardPayment({
        creditCardId: card.id,
        amount: formData.amount,
        sourceAccountId: formData.sourceAccountId,
        paymentDate: formData.paymentDate,
        notes: formData.notes || undefined,
      })

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      // Éxito - mostrar confirmación y cerrar
      alert(`✅ Pago de $${formData.amount.toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} registrado. ${card.name} actualizada.`)

      router.refresh()
      setTimeout(onClose, 300)
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.')
      setLoading(false)
    }
  }

  if (loadingAccounts) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="text-center">
            <div className="text-gray-600">Cargando cuentas...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-cope-text">
            Registrar pago: {card.name}
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

          {/* Monto a pagar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto a pagar *
            </label>
            <div className="flex items-center">
              <span className="px-4 py-2 bg-gray-100 rounded-l-lg border-2 border-gray-300 border-r-0">
                $
              </span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                step="0.01"
                className="flex-1 px-4 py-2 rounded-r-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Saldo actual: ${card.current_balance.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Desde qué cuenta */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Desde qué cuenta *
            </label>
            {accounts.length === 0 ? (
              <div className="px-4 py-3 bg-red-50 rounded-lg border border-red-200 text-red-700 text-sm">
                No tienes cuentas activas para hacer pagos
              </div>
            ) : (
              <select
                value={formData.sourceAccountId}
                onChange={(e) => handleChange('sourceAccountId', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              >
                <option value="">Selecciona una cuenta...</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.currency}) - Disponible: ${account.balance.toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </option>
                ))}
              </select>
            )}

            {selectedAccount && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-800">
                ✓ Saldo disponible: ${selectedAccount.balance.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} {selectedAccount.currency}
              </div>
            )}
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha *
            </label>
            <input
              type="date"
              value={formData.paymentDate}
              onChange={(e) => handleChange('paymentDate', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
              disabled={loading}
            />
          </div>

          {/* Notas (opcional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Ej: Pago en línea, referencia..."
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-sm"
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Resumen */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm font-semibold text-green-900 mb-2">Resumen del pago:</div>
            <div className="text-sm text-green-800 space-y-1">
              <div>• Se pagará: ${formData.amount.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</div>
              {selectedAccount && (
                <>
                  <div>• De: {selectedAccount.name}</div>
                  <div>• Nuevo saldo de {selectedAccount.name}: ${(selectedAccount.balance - formData.amount).toLocaleString('es-MX', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</div>
                </>
              )}
              <div>• {card.name} se reseteará a $0</div>
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
              disabled={loading || accounts.length === 0}
              className="flex-1"
            >
              {loading ? 'Registrando...' : 'Confirmar pago'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
