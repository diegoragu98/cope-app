'use client'

import Link from 'next/link'
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
  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="text-5xl mb-4">💰</div>
        <p className="text-gray-600 mb-6">Aún no tienes cuentas registradas</p>
        <Link href="/dashboard/cuentas">
          <Button>+ Agregar primera cuenta</Button>
        </Link>
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
          {accounts.map((account) => (
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
                <Link href="/dashboard/cuentas">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Actualizar
                  </Button>
                </Link>
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
  )
}
