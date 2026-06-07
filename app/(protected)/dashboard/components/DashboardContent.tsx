'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import UpdateBalanceModal from '@/app/(protected)/dashboard/tarjetas/components/UpdateBalanceModal'
import RegisterPaymentModal from '@/app/(protected)/dashboard/tarjetas/components/RegisterPaymentModal'

interface Account {
  id: string
  name: string
  institution?: string
  type: string
  currency: 'MXN' | 'USD'
  balance: number
  icon?: string
  created_at: string
  is_active: boolean
}

interface CreditCard {
  id: string
  name: string
  institution?: string
  currency: 'MXN' | 'USD'
  current_balance: number
  cutoff_day: number
  payment_day: number
  icon?: string
  created_at: string
  is_active: boolean
}

interface DashboardContentProps {
  userName: string
  totalPatrimony: number
  liquidCash: number
  liquidPercentage: number
  totalTDC: number
  accounts: Account[]
  creditCards: CreditCard[]
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

function getDaysUntilCutoff(cutoffDay: number): number {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  let cutoffDate = new Date(currentYear, currentMonth, cutoffDay)
  if (today.getDate() >= cutoffDay) {
    cutoffDate = new Date(currentYear, currentMonth + 1, cutoffDay)
  }

  const diffTime = cutoffDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export default function DashboardContent({
  userName,
  totalPatrimony,
  liquidCash,
  liquidPercentage,
  totalTDC,
  accounts,
  creditCards,
}: DashboardContentProps) {
  // Estado para modales de cuentas
  const [updateBalanceAccount, setUpdateBalanceAccount] = useState<Account | null>(null)

  // Estado para modales de tarjetas
  const [updateBalanceCard, setUpdateBalanceCard] = useState<CreditCard | null>(null)
  const [registerPaymentCard, setRegisterPaymentCard] = useState<CreditCard | null>(null)

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const totalAccountsMXN = accounts
    .filter((a) => a.currency === 'MXN')
    .reduce((sum, a) => sum + a.balance, 0)

  const totalAccountsUSD = accounts
    .filter((a) => a.currency === 'USD')
    .reduce((sum, a) => sum + a.balance, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SECCIÓN 1: HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            ¡Hola {userName}!
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* SECCIÓN 2: PATRIMONIO TOTAL */}
        <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-cope-primary mb-4 p-4">
          <div className="text-xs text-gray-600 mb-1">Patrimonio Total</div>
          <div className="text-4xl font-bold text-cope-primary mb-1">
            {formatCurrency(totalPatrimony)}
          </div>
          <div className="text-xs text-gray-600">MXN</div>
        </div>

        {/* SECCIÓN 3: KPIs SECUNDARIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* KPI 1: Disponible */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-xs text-gray-600 mb-1">Disponible</div>
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(totalPatrimony)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Todas las cuentas</div>
          </div>

          {/* KPI 2: Efectivo Líquido */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-xs text-gray-600 mb-1">Efectivo Líquido</div>
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(liquidCash)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {liquidPercentage}% del patrimonio
            </div>
          </div>

          {/* KPI 3: Total TDC por pagar */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-xs text-gray-600 mb-1">Total TDC por pagar</div>
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(totalTDC)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Saldos actuales</div>
          </div>

          {/* KPI 4: Pendientes */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-xs text-gray-600 mb-1">Pendientes</div>
            <div className="text-xl font-bold text-gray-900">$0</div>
            <div className="text-xs text-gray-500 mt-1">Próximamente</div>
          </div>
        </div>

        {/* SECCIÓN 4: ACCIONES RÁPIDAS */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button
            onClick={() => alert('💰 Día de Pago - Próximamente')}
            className="bg-white rounded-lg shadow px-4 py-3 hover:shadow-md transition-shadow text-center text-sm font-semibold text-gray-900"
          >
            💰 Día de Pago
          </button>

          <button
            onClick={() => alert('💳 Pagar TDC - Próximamente')}
            className="bg-white rounded-lg shadow px-4 py-3 hover:shadow-md transition-shadow text-center text-sm font-semibold text-gray-900"
          >
            💳 Pagar TDC
          </button>

          <button
            onClick={() => alert('📊 Actualizar valores - Próximamente')}
            className="bg-white rounded-lg shadow px-4 py-3 hover:shadow-md transition-shadow text-center text-sm font-semibold text-gray-900"
          >
            📊 Actualizar
          </button>

          <button
            onClick={() => alert('➕ Nuevo movimiento - Próximamente')}
            className="bg-white rounded-lg shadow px-4 py-3 hover:shadow-md transition-shadow text-center text-sm font-semibold text-gray-900"
          >
            ➕ Nuevo
          </button>
        </div>

        {/* SECCIÓN 5: MIS CUENTAS */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-900">Mis Cuentas</h2>
            <Link
              href="/dashboard/cuentas"
              className="text-cope-primary hover:underline text-sm font-semibold"
            >
              Ver todas →
            </Link>
          </div>

          {accounts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-5xl mb-4">💰</div>
              <p className="text-gray-600 mb-6">
                Aún no tienes cuentas registradas
              </p>
              <Link href="/dashboard/cuentas">
                <Button>+ Agregar primera cuenta</Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Cuenta
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      MXN
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      USD
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr
                      key={account.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{account.icon || '🏦'}</span>
                          <div>
                            <div className="font-semibold text-gray-900 text-xs">
                              {account.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {ACCOUNT_TYPES[account.type] || account.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right font-mono text-xs text-gray-900">
                        {account.currency === 'MXN'
                          ? formatCurrency(account.balance)
                          : '-'}
                      </td>
                      <td className="px-4 py-2 text-right font-mono text-xs text-gray-900">
                        {account.currency === 'USD'
                          ? formatCurrency(account.balance)
                          : '-'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => setUpdateBalanceAccount(account)}
                        >
                          Actualizar
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {/* Totales */}
                  <tr className="bg-gray-50 border-t-2 border-gray-300">
                    <td className="px-4 py-2 font-bold text-gray-900 text-xs">
                      Totales
                    </td>
                    <td className="px-4 py-2 text-right font-mono font-bold text-gray-900 text-xs">
                      {formatCurrency(totalAccountsMXN)}
                    </td>
                    <td className="px-4 py-2 text-right font-mono font-bold text-gray-900 text-xs">
                      {formatCurrency(totalAccountsUSD)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SECCIÓN 6: MIS TARJETAS DE CRÉDITO */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-900">
              Mis Tarjetas de Crédito
            </h2>
            <Link
              href="/dashboard/tarjetas"
              className="text-cope-primary hover:underline text-sm font-semibold"
            >
              Ver todas →
            </Link>
          </div>

          {creditCards.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-5xl mb-4">💳</div>
              <p className="text-gray-600 mb-6">
                Aún no tienes tarjetas registradas
              </p>
              <Link href="/dashboard/tarjetas">
                <Button>+ Agregar primera TDC</Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Tarjeta
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Saldo
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Corte
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Pago
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Próximo corte
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {creditCards.map((card) => {
                    const daysUntilCutoff = getDaysUntilCutoff(card.cutoff_day)
                    const urgencyColor =
                      daysUntilCutoff <= 0
                        ? 'text-red-600 font-semibold'
                        : daysUntilCutoff <= 3
                          ? 'text-amber-500 font-semibold'
                          : 'text-cope-primary'

                    return (
                      <tr
                        key={card.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">
                              {card.icon || '💳'}
                            </span>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {card.name}
                              </div>
                              {card.institution && (
                                <div className="text-xs text-gray-500">
                                  {card.institution}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-right font-mono font-semibold text-gray-900 text-xs">
                          {formatCurrency(card.current_balance)}
                        </td>
                        <td className="px-4 py-2 text-center text-xs text-gray-700">
                          Día {card.cutoff_day}
                        </td>
                        <td className="px-4 py-2 text-center text-xs text-gray-700">
                          Día {card.payment_day}
                        </td>
                        <td className={`px-4 py-2 text-xs ${urgencyColor}`}>
                          {daysUntilCutoff <= 0
                            ? '⚠️ Corte HOY'
                            : `En ${daysUntilCutoff} día${daysUntilCutoff !== 1 ? 's' : ''}`}
                        </td>
                        <td className="px-4 py-2 text-center space-x-1 flex justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => setUpdateBalanceCard(card)}
                          >
                            Actualizar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => setRegisterPaymentCard(card)}
                          >
                            Pagar
                          </Button>
                        </td>
                      </tr>
                    )
                  })}

                  {/* Totales */}
                  <tr className="bg-gray-50 border-t-2 border-gray-300">
                    <td colSpan={2} className="px-4 py-2 font-bold text-gray-900 text-xs">
                      Total a pagar
                    </td>
                    <td className="px-4 py-2 text-right font-mono font-bold text-gray-900 text-xs">
                      {formatCurrency(totalTDC)}
                    </td>
                    <td colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODALES */}
      {updateBalanceAccount && (
        <UpdateBalanceModalAccount
          account={updateBalanceAccount}
          onClose={() => setUpdateBalanceAccount(null)}
        />
      )}

      {updateBalanceCard && (
        <UpdateBalanceModal
          card={updateBalanceCard}
          onClose={() => setUpdateBalanceCard(null)}
        />
      )}

      {registerPaymentCard && (
        <RegisterPaymentModal
          card={registerPaymentCard}
          onClose={() => setRegisterPaymentCard(null)}
        />
      )}
    </div>
  )
}

/**
 * Modal para actualizar saldo de cuenta (embebido en dashboard)
 */
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updateAccount } from '@/lib/accounts/actions'

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

          {/* Saldo anterior */}
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

          {/* Fecha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {new Date().toLocaleDateString('es-MX')}
            </div>
          </div>

          {/* Botones */}
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
