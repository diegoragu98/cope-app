'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { updateAccount } from '@/lib/accounts/actions'

interface Account {
  id: string
  name: string
  institution?: string
  type: string
  currency: 'MXN' | 'USD'
  balance: number
  color?: string
  icon?: string
  is_active: boolean
  created_at: string
}

interface DashboardAccountsTableProps {
  accounts: Account[]
}

const ACCOUNT_TYPES: Record<string, string> = {
  checking: 'Débito',
  savings: 'Ahorros',
  investment_rv: 'Inversión RV',
  investment_rf: 'Inversión RF',
  digital_wallet: 'App de Pago',
  cash: 'Efectivo',
  other: 'Otra',
}

export default function DashboardAccountsTable({ accounts }: DashboardAccountsTableProps) {
  const [updateBalanceAccount, setUpdateBalanceAccount] = useState<Account | null>(null)

  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="text-5xl mb-4">💰</div>
        <p className="text-gray-600 mb-6">Aún no tienes cuentas registradas</p>
        <Button onClick={() => window.location.href = '/dashboard/cuentas'}>
          + Agregar primera cuenta
        </Button>
      </div>
    )
  }

  // Calcular totales
  const totalMXN = accounts
    .filter((a) => a.currency === 'MXN')
    .reduce((sum, a) => sum + a.balance, 0)

  const totalUSD = accounts
    .filter((a) => a.currency === 'USD')
    .reduce((sum, a) => sum + a.balance, 0)

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Cuenta
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                MXN
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                USD
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Acción
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {accounts.map((account, index) => (
              <tr
                key={account.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Cuenta */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{account.icon || '🏦'}</span>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {account.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {ACCOUNT_TYPES[account.type] || account.type}
                      </div>
                    </div>
                  </div>
                </td>

                {/* MXN */}
                <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                  {account.currency === 'MXN' ? (
                    `$${account.balance.toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  ) : (
                    '-'
                  )}
                </td>

                {/* USD */}
                <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                  {account.currency === 'USD' ? (
                    `$${account.balance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  ) : (
                    '-'
                  )}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUpdateBalanceAccount(account)}
                    className="text-xs"
                  >
                    Actualizar
                  </Button>
                </td>
              </tr>
            ))}

            {/* Totals Row */}
            <tr className="bg-gray-50 border-t-2 border-gray-300">
              <td className="px-6 py-4 font-bold text-gray-900">Totales</td>
              <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                ${totalMXN.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                ${totalUSD.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal para actualizar saldo */}
      {updateBalanceAccount && (
        <UpdateBalanceModalAccount
          account={updateBalanceAccount}
          onClose={() => setUpdateBalanceAccount(null)}
        />
      )}
    </>
  )
}

/**
 * Modal para actualizar saldo de cuenta
 * (Adaptado del componente de tarjetas)
 */

interface UpdateBalanceModalAccountProps {
  account: Account
  onClose: () => void
}

function UpdateBalanceModalAccount({
  account,
  onClose,
}: UpdateBalanceModalAccountProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [newBalance, setNewBalance] = useState(account.balance)
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
      const result = await updateAccount({
        id: account.id,
        balance: newBalance,
      })

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
            Actualizar saldo: {account.name}
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
              ${account.balance.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              {account.currency}
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
                inputMode="numeric"
                value={newBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, '')
                  setNewBalance(parseFloat(numericValue) || 0)
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
