'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface InvestmentAccount {
  id: string
  name: string
  type: 'investment_rf' | 'investment_rv'
  balance: number
  currency: 'MXN' | 'USD'
  aportado: number
  ganancia: number
}

interface InvestmentTotals {
  totalAportado: number
  totalValorActual: number
  totalGanancia: number
  distributionRF: number
  distributionRV: number
}

interface InvestmentsClientProps {
  initialAccounts: InvestmentAccount[]
  initialTotals: InvestmentTotals
}

export default function InvestmentsClient({
  initialAccounts,
  initialTotals,
}: InvestmentsClientProps) {
  const [showModal, setShowModal] = useState(false)

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  // Empty state
  if (initialAccounts.length === 0) {
    return (
      <div className="min-h-screen bg-cope-bg py-8">
        <Container size="lg">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center max-w-sm">
              <div className="text-7xl mb-6">📊</div>
              <h2 className="text-2xl font-bold text-cope-text mb-3">
                Aún no tienes inversiones registradas
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Empieza marcando una de tus cuentas como inversión (renta fija o variable) para llevar control de tus ganancias.
              </p>
              <Button
                onClick={() => setShowModal(true)}
                size="lg"
                className="w-full"
              >
                + Agregar instrumento
              </Button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  // Main view with investments
  return (
    <div className="min-h-screen bg-cope-bg py-8">
      <Container size="lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-cope-text">Mis Inversiones</h1>
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2"
          >
            <span>+</span>
            <span>Registrar movimiento</span>
          </Button>
        </div>

        {/* TOTALES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Aportado */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Total Aportado</p>
            <p className="text-3xl font-bold text-cope-text">
              {formatCurrency(initialTotals.totalAportado)}
            </p>
          </div>

          {/* Valor Actual Total */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Valor Actual Total</p>
            <p className="text-3xl font-bold text-cope-text">
              {formatCurrency(initialTotals.totalValorActual)}
            </p>
          </div>

          {/* Ganancia Total */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Ganancia Total</p>
            <p
              className={`text-3xl font-bold ${
                initialTotals.totalGanancia >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {initialTotals.totalGanancia >= 0 ? '+' : '-'}
              {formatCurrency(Math.abs(initialTotals.totalGanancia))}
            </p>
          </div>

          {/* Distribución */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-3">Distribución</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Renta Fija:</span>
                <span className="font-semibold">
                  {initialTotals.distributionRF.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Renta Variable:</span>
                <span className="font-semibold">
                  {initialTotals.distributionRV.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TABLA DE INSTRUMENTOS */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Instrumento
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Tipo
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  Aportado
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  Valor Actual
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  Ganancia/Pérdida
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {initialAccounts.map((account, idx) => (
                <tr
                  key={account.id}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {/* Instrumento */}
                  <td className="px-6 py-4 text-sm font-medium text-cope-text">
                    {account.name}
                  </td>

                  {/* Tipo (Badge) */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        account.type === 'investment_rf'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {account.type === 'investment_rf' ? 'Renta Fija' : 'Renta Variable'}
                    </span>
                  </td>

                  {/* Aportado */}
                  <td className="px-6 py-4 text-sm text-right text-gray-700">
                    {formatCurrency(account.aportado)}
                  </td>

                  {/* Valor Actual */}
                  <td className="px-6 py-4 text-sm text-right font-semibold text-cope-text">
                    {formatCurrency(account.balance)}
                  </td>

                  {/* Ganancia/Pérdida */}
                  <td
                    className={`px-6 py-4 text-sm text-right font-bold ${
                      account.ganancia >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {account.ganancia >= 0 ? '+' : '-'}
                    {formatCurrency(Math.abs(account.ganancia))}
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 text-center text-sm space-x-2">
                    <button
                      disabled
                      className="text-cope-primary hover:text-cope-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Próximamente"
                    >
                      Registrar
                    </button>
                    <button
                      disabled
                      className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Próximamente"
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}
