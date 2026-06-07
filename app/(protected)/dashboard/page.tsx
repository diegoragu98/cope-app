'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
  // Datos de ejemplo (sin consultar BD por ahora)
  const userName = 'Diego'
  const totalPatrimony = 828_861.23
  const liquidCash = 440_000
  const totalTDC = 12_000
  const liquidPercentage = 53

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

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
        <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-cope-primary mb-8 p-8">
          <div className="text-sm text-gray-600 mb-2">Patrimonio Total</div>
          <div className="text-5xl font-bold text-cope-primary mb-2">
            {formatCurrency(totalPatrimony)}
          </div>
          <div className="text-sm text-gray-600">MXN</div>
        </div>

        {/* SECCIÓN 3: KPIs SECUNDARIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* KPI 1: Disponible */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Disponible</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalPatrimony)}
            </div>
            <div className="text-xs text-gray-500 mt-2">Todas las cuentas</div>
          </div>

          {/* KPI 2: Efectivo Líquido */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Efectivo Líquido</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(liquidCash)}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {liquidPercentage}% del patrimonio
            </div>
          </div>

          {/* KPI 3: Total TDC por pagar */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Total TDC por pagar</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalTDC)}
            </div>
            <div className="text-xs text-gray-500 mt-2">Saldos actuales</div>
          </div>

          {/* KPI 4: Pendientes */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Pendientes</div>
            <div className="text-2xl font-bold text-gray-900">$0</div>
            <div className="text-xs text-gray-500 mt-2">Próximamente</div>
          </div>
        </div>

        {/* SECCIÓN 4: ACCIONES RÁPIDAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => alert('💰 Día de Pago - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900 mb-1">Día de Pago</h3>
            <p className="text-sm text-gray-600">Registrar ingresos</p>
          </button>

          <button
            onClick={() => alert('💳 Pagar TDC - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-semibold text-gray-900 mb-1">Pagar TDC</h3>
            <p className="text-sm text-gray-600">Registrar pagos</p>
          </button>

          <button
            onClick={() => alert('📊 Actualizar valores - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-1">Actualizar valores</h3>
            <p className="text-sm text-gray-600">Refrescar saldos</p>
          </button>

          <button
            onClick={() => alert('➕ Nuevo movimiento - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="font-semibold text-gray-900 mb-1">Nuevo movimiento</h3>
            <p className="text-sm text-gray-600">Registrar gasto</p>
          </button>
        </div>

        {/* SECCIÓN 5: MIS CUENTAS */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis Cuentas</h2>
            <Link
              href="/dashboard/cuentas"
              className="text-cope-primary hover:underline text-sm font-semibold"
            >
              Ver todas →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
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
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏦</span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Santander Operativa
                        </div>
                        <div className="text-xs text-gray-500">Débito</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                    $240,000.00
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm text-gray-900">
                    -
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href="/dashboard/cuentas">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Actualizar
                      </Button>
                    </Link>
                  </td>
                </tr>

                {/* Totales */}
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td className="px-6 py-4 font-bold text-gray-900">Totales</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                    $240,000.00
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                    $0.00
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECCIÓN 6: MIS TARJETAS DE CRÉDITO */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Mis Tarjetas de Crédito
            </h2>
            <Link
              href="/dashboard/tarjetas"
              className="text-cope-primary hover:underline text-sm font-semibold"
            >
              Ver todas →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
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
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💳</span>
                      <div>
                        <div className="font-semibold text-gray-900">AMEX</div>
                        <div className="text-xs text-gray-500">
                          American Express
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-semibold text-gray-900">
                    $4,102.78
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">
                    Día 13
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">
                    Día 27
                  </td>
                  <td className="px-6 py-4 text-sm text-cope-primary font-semibold">
                    En 7 días
                  </td>
                  <td className="px-6 py-4 text-center space-x-2 flex justify-center">
                    <Link href="/dashboard/tarjetas">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Actualizar
                      </Button>
                    </Link>
                    <Link href="/dashboard/tarjetas">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Pagar
                      </Button>
                    </Link>
                  </td>
                </tr>

                {/* Totales */}
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td colSpan={2} className="px-6 py-4 font-bold text-gray-900">
                    Total a pagar
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                    $4,102.78
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
