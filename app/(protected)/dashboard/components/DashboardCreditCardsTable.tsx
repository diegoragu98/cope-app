'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import UpdateBalanceModal from '@/app/(protected)/dashboard/tarjetas/components/UpdateBalanceModal'
import RegisterPaymentModal from '@/app/(protected)/dashboard/tarjetas/components/RegisterPaymentModal'

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

interface DashboardCreditCardsTableProps {
  creditCards: CreditCard[]
}

/**
 * Calcula cuántos días faltan para el próximo corte
 */
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

export default function DashboardCreditCardsTable({
  creditCards,
}: DashboardCreditCardsTableProps) {
  const [updateBalanceCard, setUpdateBalanceCard] = useState<CreditCard | null>(null)
  const [registerPaymentCard, setRegisterPaymentCard] = useState<CreditCard | null>(null)

  if (creditCards.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <div className="text-5xl mb-4">💳</div>
        <p className="text-gray-600 mb-6">Aún no tienes tarjetas registradas</p>
        <Button onClick={() => window.location.href = '/dashboard/tarjetas'}>
          + Agregar primera TDC
        </Button>
      </div>
    )
  }

  // Calcular total a pagar
  const totalDebt = creditCards.reduce((sum, card) => sum + card.current_balance, 0)

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Tarjeta
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Saldo
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Corte
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Pago
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Próximo corte
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>

          {/* Body */}
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
                  {/* Tarjeta */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{card.icon || '💳'}</span>
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

                  {/* Saldo */}
                  <td className="px-6 py-4 text-right font-mono font-semibold text-gray-900">
                    ${card.current_balance.toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* Corte */}
                  <td className="px-6 py-4 text-center text-sm text-gray-700">
                    Día {card.cutoff_day}
                  </td>

                  {/* Pago */}
                  <td className="px-6 py-4 text-center text-sm text-gray-700">
                    Día {card.payment_day}
                  </td>

                  {/* Próximo corte */}
                  <td className={`px-6 py-4 text-sm ${urgencyColor}`}>
                    {daysUntilCutoff <= 0
                      ? '⚠️ Corte HOY'
                      : `En ${daysUntilCutoff} día${daysUntilCutoff !== 1 ? 's' : ''}`}
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 text-center space-x-2 flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUpdateBalanceCard(card)}
                      className="text-xs"
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRegisterPaymentCard(card)}
                      className="text-xs"
                    >
                      Pagar
                    </Button>
                  </td>
                </tr>
              )
            })}

            {/* Totals Row */}
            <tr className="bg-gray-50 border-t-2 border-gray-300">
              <td colSpan={2} className="px-6 py-4 font-bold text-gray-900">
                Total a pagar
              </td>
              <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                ${totalDebt.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modales */}
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
    </>
  )
}
