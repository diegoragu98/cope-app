'use client'

import { useState } from 'react'
import { deleteAccount } from '@/lib/accounts/actions'
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
  is_active: boolean
  created_at: string
}

interface AccountsTableProps {
  accounts: Account[]
  onEdit: (account: Account) => void
  onDelete: () => void
}

const ACCOUNT_TYPE_LABELS: Record<string, string> = {
  checking: 'Cuenta de Débito',
  savings: 'Cuenta de Ahorros',
  investment_rv: 'Inversión (Rendimiento Variable)',
  investment_rf: 'Inversión (Rendimiento Fijo)',
  digital_wallet: 'App de Pago / Fintech',
  cash: 'Efectivo',
  other: 'Otra',
}

const ACCOUNT_TYPE_EMOJI: Record<string, string> = {
  checking: '🏦',
  savings: '🏦',
  investment_rv: '📈',
  investment_rf: '📊',
  digital_wallet: '📱',
  cash: '💵',
  other: '❓',
}

export default function AccountsTable({ accounts, onEdit, onDelete }: AccountsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleDelete = async (accountId: string) => {
    setDeletingId(accountId)
    const result = await deleteAccount(accountId)
    setDeletingId(null)
    setConfirmDelete(null)

    if (result.success) {
      onDelete()
    }
  }

  // Calcular totales
  const totalMXN = accounts
    .filter((a) => a.currency === 'MXN')
    .reduce((sum, a) => sum + a.balance, 0)

  const totalUSD = accounts
    .filter((a) => a.currency === 'USD')
    .reduce((sum, a) => sum + a.balance, 0)

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'MXN') {
      return `$${amount.toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    } else {
      return `$${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    }
  }

  // Agrupar cuentas por tipo
  const accountsByType = accounts.reduce(
    (acc, account) => {
      if (!acc[account.type]) {
        acc[account.type] = []
      }
      acc[account.type].push(account)
      return acc
    },
    {} as Record<string, Account[]>
  )

  // Orden de tipos para mostrar
  const typeOrder = ['checking', 'savings', 'investment_rf', 'investment_rv', 'digital_wallet', 'cash', 'other']
  const sortedTypes = typeOrder.filter((type) => accountsByType[type])

  return (
    <div className="overflow-x-auto space-y-6">
      {sortedTypes.map((type) => {
        const typeAccounts = accountsByType[type]
        const typeTotalMXN = typeAccounts
          .filter((a) => a.currency === 'MXN')
          .reduce((sum, a) => sum + a.balance, 0)
        const typeTotalUSD = typeAccounts
          .filter((a) => a.currency === 'USD')
          .reduce((sum, a) => sum + a.balance, 0)

        return (
          <div key={type}>
            {/* Header de sección */}
            <div className="bg-gray-100 px-6 py-3 border-l-4 border-cope-primary">
              <h3 className="text-sm font-bold text-gray-800">
                {ACCOUNT_TYPE_EMOJI[type]} {ACCOUNT_TYPE_LABELS[type]}
              </h3>
            </div>

            {/* Tabla del grupo */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Cuenta</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Institución</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">Saldo MXN</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600">Saldo USD</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {typeAccounts.map((account, index) => (
                  <tr
                    key={account.id}
                    className={`border-b border-gray-200 cursor-pointer transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100`}
                    onClick={() => onEdit(account)}
                  >
                    {/* Cuenta */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{ACCOUNT_TYPE_EMOJI[account.type] || '🏦'}</span>
                        <span className="font-medium text-gray-900">{account.name}</span>
                      </div>
                    </td>

                    {/* Institución */}
                    <td className="px-6 py-4 text-gray-600">
                      {account.institution || '—'}
                    </td>

                    {/* Saldo MXN */}
                    <td className="px-6 py-4 text-right font-mono text-gray-900">
                      {account.currency === 'MXN' ? formatCurrency(account.balance, 'MXN') : '—'}
                    </td>

                    {/* Saldo USD */}
                    <td className="px-6 py-4 text-right font-mono text-gray-900">
                      {account.currency === 'USD' ? formatCurrency(account.balance, 'USD') : '—'}
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {confirmDelete === account.id ? (
                          <>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              disabled={deletingId === account.id}
                              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                              title="Cancelar"
                            >
                              ✕
                            </button>
                            <button
                              onClick={() => handleDelete(account.id)}
                              disabled={deletingId === account.id}
                              className="p-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                              title="Confirmar eliminación"
                            >
                              🗑️
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => onEdit(account)}
                              className="p-2 text-gray-600 hover:text-cope-primary"
                              title="Editar"
                            >
                              ✎️
                            </button>
                            <button
                              onClick={() => setConfirmDelete(account.id)}
                              className="p-2 text-gray-600 hover:text-red-600"
                              title="Eliminar"
                            >
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Subtotal del grupo */}
              <tfoot>
                <tr className="bg-gray-50 border-t border-gray-200 font-semibold text-sm">
                  <td colSpan={2} className="px-6 py-3 text-gray-700">
                    Subtotal
                  </td>
                  <td className="px-6 py-3 text-right font-mono text-gray-900">
                    {formatCurrency(typeTotalMXN, 'MXN')}
                  </td>
                  <td className="px-6 py-3 text-right font-mono text-gray-900">
                    {formatCurrency(typeTotalUSD, 'USD')}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )
      })}

      {/* Total General */}
      {accounts.length > 0 && (
        <div className="bg-cope-primary bg-opacity-10 border-t-2 border-cope-primary px-6 py-4">
          <div className="flex justify-between items-center font-semibold">
            <span className="text-gray-900">Total General</span>
            <div className="flex gap-8">
              <div className="text-right">
                <div className="text-xs text-gray-600">MXN</div>
                <div className="font-mono text-gray-900">{formatCurrency(totalMXN, 'MXN')}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600">USD</div>
                <div className="font-mono text-gray-900">{formatCurrency(totalUSD, 'USD')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
