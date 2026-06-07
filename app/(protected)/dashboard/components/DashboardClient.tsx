'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import DashboardHeader from './DashboardHeader'
import DashboardKPIs from './DashboardKPIs'
import DashboardQuickActions from './DashboardQuickActions'
import DashboardAccountsTable from './DashboardAccountsTable'
import DashboardCreditCardsTable from './DashboardCreditCardsTable'

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

interface DashboardClientProps {
  user: {
    name: string
    email: string
    id: string
  }
  accounts: Account[]
  creditCards: CreditCard[]
}

export default function DashboardClient({
  user,
  accounts,
  creditCards,
}: DashboardClientProps) {
  // Calcular patrimonio total (MXN + USD convertidos)
  const USD_TO_MXN_RATE = 17.5
  const totalPatrimony = accounts.reduce((sum, account) => {
    const amountInMXN =
      account.currency === 'MXN'
        ? account.balance
        : account.balance * USD_TO_MXN_RATE
    return sum + amountInMXN
  }, 0)

  // Calcular efectivo líquido (checking, savings, cash, digital_wallet)
  const liquidTypes = ['checking', 'savings', 'cash', 'digital_wallet']
  const liquidCash = accounts
    .filter((acc) => liquidTypes.includes(acc.type))
    .reduce((sum, account) => {
      const amountInMXN =
        account.currency === 'MXN'
          ? account.balance
          : account.balance * USD_TO_MXN_RATE
      return sum + amountInMXN
    }, 0)

  const liquidPercentage =
    totalPatrimony > 0 ? Math.round((liquidCash / totalPatrimony) * 100) : 0

  // Calcular total TDC por pagar
  const totalCreditCardDebt = creditCards.reduce((sum, card) => {
    const amountInMXN =
      card.currency === 'MXN'
        ? card.current_balance
        : card.current_balance * USD_TO_MXN_RATE
    return sum + amountInMXN
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userName={user.name} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* SECCIÓN 1: Patrimonio Total */}
        <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-cope-primary mb-8">
          <div className="p-8">
            <div className="text-sm text-gray-600 mb-2">Patrimonio Total</div>
            <div className="text-5xl font-bold text-cope-primary mb-2">
              ${totalPatrimony.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-sm text-gray-600">MXN</div>
          </div>
        </div>

        {/* SECCIÓN 2: KPIs Secundarios */}
        <DashboardKPIs
          available={totalPatrimony}
          liquid={liquidCash}
          liquidPercentage={liquidPercentage}
          totalTDC={totalCreditCardDebt}
        />

        {/* SECCIÓN 3: Acciones Rápidas */}
        <DashboardQuickActions />

        {/* SECCIÓN 4: Mis Cuentas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis Cuentas</h2>
            <Link href="/dashboard/cuentas" className="text-cope-primary hover:underline text-sm font-semibold">
              Ver todas →
            </Link>
          </div>
          <DashboardAccountsTable accounts={accounts} />
        </div>

        {/* SECCIÓN 5: Mis Tarjetas de Crédito */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis Tarjetas de Crédito</h2>
            <Link href="/dashboard/tarjetas" className="text-cope-primary hover:underline text-sm font-semibold">
              Ver todas →
            </Link>
          </div>
          <DashboardCreditCardsTable creditCards={creditCards} />
        </div>
      </div>
    </div>
  )
}
