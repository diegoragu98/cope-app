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
}

interface AccountsListProps {
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

export default function AccountsList({ accounts, onEdit, onDelete }: AccountsListProps) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {accounts.map((account) => (
        <div
          key={account.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Header con color */}
          <div
            className="h-3"
            style={{ backgroundColor: account.color || '#0F766E' }}
          />

          {/* Contenido */}
          <div className="p-6">
            {/* Encabezado: nombre e ícono */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl">{ACCOUNT_TYPE_EMOJI[account.type] || '🏦'}</span>
                  <h3 className="text-xl font-bold text-cope-text">{account.name}</h3>
                </div>
                {account.institution && (
                  <p className="text-sm text-gray-500">{account.institution}</p>
                )}
              </div>
            </div>

            {/* Tipo de cuenta */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                {ACCOUNT_TYPE_LABELS[account.type] || account.type}
              </span>
            </div>

            {/* Saldo grande */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Saldo</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-cope-primary">
                  ${account.balance.toLocaleString('es-MX', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-lg font-semibold text-gray-500">
                  {account.currency}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2">
              {confirmDelete === account.id ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfirmDelete(null)}
                    disabled={deletingId === account.id}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(account.id)}
                    disabled={deletingId === account.id}
                    className="flex-1 text-red-600 hover:bg-red-50"
                  >
                    {deletingId === account.id ? 'Borrando...' : 'Confirmar'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(account)}
                    className="flex-1"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfirmDelete(account.id)}
                    className="flex-1 text-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
