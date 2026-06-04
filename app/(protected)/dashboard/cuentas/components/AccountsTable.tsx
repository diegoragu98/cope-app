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
  checking: 'Cuenta de Cheques',
  savings: 'Cuenta de Ahorros',
  investment_rv: 'Inversión Variable',
  investment_rf: 'Inversión Fija',
  digital_wallet: 'Billetera Digital',
  cash: 'Efectivo',
  other: 'Otro',
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cuenta</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tipo</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Institución</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Saldo MXN</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Saldo USD</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {accounts.map((account, index) => (
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

              {/* Tipo */}
              <td className="px-6 py-4">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                  {ACCOUNT_TYPE_LABELS[account.type] || account.type}
                </span>
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

        {/* Footer con totales */}
        {accounts.length > 0 && (
          <tfoot>
            <tr className="bg-cope-primary bg-opacity-10 border-t-2 border-cope-primary font-semibold">
              <td colSpan={3} className="px-6 py-4 text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 text-right font-mono text-gray-900">
                {formatCurrency(totalMXN, 'MXN')}
              </td>
              <td className="px-6 py-4 text-right font-mono text-gray-900">
                {formatCurrency(totalUSD, 'USD')}
              </td>
              <td className="px-6 py-4"></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
