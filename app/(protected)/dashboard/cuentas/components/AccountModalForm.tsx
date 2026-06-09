'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAccount, updateAccount, type CreateAccountInput, type AccountType } from '@/lib/accounts/actions'
import { Button } from '@/components/ui/Button'

interface Account {
  id: string
  name: string
  institution?: string
  type: string
  currency: 'MXN' | 'USD'
  balance: number
  color?: string
  icon?: string
  is_active?: boolean
  created_at?: string
}

interface AccountModalFormProps {
  account?: Account | null
  onClose: () => void
  onSuccess: () => void
}

const ACCOUNT_TYPES: { value: AccountType; label: string; emoji: string }[] = [
  { value: 'checking', label: 'Cuenta de Débito', emoji: '🏦' },
  { value: 'savings', label: 'Cuenta de Ahorros', emoji: '🏦' },
  { value: 'investment_rv', label: 'Inversión (Rendimiento Variable)', emoji: '📈' },
  { value: 'investment_rf', label: 'Inversión (Rendimiento Fijo)', emoji: '📊' },
  { value: 'digital_wallet', label: 'App de Pago / Fintech', emoji: '📱' },
  { value: 'cash', label: 'Efectivo', emoji: '💵' },
  { value: 'other', label: 'Otra', emoji: '❓' },
]

export default function AccountModalForm({ account, onClose, onSuccess }: AccountModalFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: account?.name || '',
    institution: account?.institution || '',
    type: account?.type as AccountType || 'checking',
    currency: (account?.currency || 'MXN') as 'MXN' | 'USD',
    balance: account?.balance || 0,
    color: account?.color || '#0F766E',
    icon: account?.icon || '🏦',
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
      const numBalance = parseFloat(formData.balance as string) || 0
      if (numBalance <= 0) {
        setError('El saldo debe ser mayor a 0')
        setLoading(false)
        return
      }

      const dataToSubmit = {
        ...formData,
        balance: numBalance,
      }

      if (account) {
        // Editar cuenta existente
        const result = await updateAccount({
          id: account.id,
          ...dataToSubmit,
        })
        if (result.error) {
          setError(result.error)
          setLoading(false)
          return
        }
      } else {
        // Crear nueva cuenta
        const result = await createAccount(dataToSubmit as CreateAccountInput)
        if (result.error) {
          setError(result.error)
          setLoading(false)
          return
        }
      }

      // Éxito - cerrar modal y refrescar la página
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
            {account ? 'Editar cuenta' : 'Agregar nueva cuenta'}
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

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de la cuenta *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: Santander Operativa"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
              disabled={loading}
            />
          </div>

          {/* Institución */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Institución
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => handleChange('institution', e.target.value)}
              placeholder="Ej: Santander"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
              disabled={loading}
            />
          </div>

          {/* Tipo de Cuenta */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de cuenta *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value as AccountType)}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
              disabled={loading}
            >
              {ACCOUNT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.emoji} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Moneda */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Moneda *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="currency"
                  value="MXN"
                  checked={formData.currency === 'MXN'}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  disabled={loading}
                />
                <span className="text-gray-700">MXN (Pesos)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="currency"
                  value="USD"
                  checked={formData.currency === 'USD'}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  disabled={loading}
                />
                <span className="text-gray-700">USD (Dólares)</span>
              </label>
            </div>
          </div>

          {/* Saldo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Saldo *
            </label>
            <div className="flex items-center">
              <span className="px-4 py-2 bg-gray-100 rounded-l-lg border-2 border-gray-300 border-r-0">
                $
              </span>
              <input
                type="text"
                value={formData.balance}
                onChange={(e) => {
                  const val = e.target.value
                  // Allow only digits and one decimal point - store as string
                  if (val === '' || /^\d*\.?\d*$/.test(val)) {
                    handleChange('balance', val)
                  }
                }}
                placeholder="0.00"
                className="flex-1 px-4 py-2 rounded-r-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Color (opcional) */}
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
              {loading ? 'Guardando...' : account ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
