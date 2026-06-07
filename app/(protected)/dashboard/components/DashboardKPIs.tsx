'use client'

/**
 * DASHBOARD KPIs
 * 4 cards con métricas secundarias
 */

interface DashboardKPIsProps {
  available: number
  liquid: number
  liquidPercentage: number
  totalTDC: number
}

export default function DashboardKPIs({
  available,
  liquid,
  liquidPercentage,
  totalTDC,
}: DashboardKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* KPI 1: Disponible */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-sm text-gray-600 mb-2">Disponible</div>
        <div className="text-2xl font-bold text-gray-900">
          ${available.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-xs text-gray-500 mt-2">Todas las cuentas</div>
      </div>

      {/* KPI 2: Efectivo Líquido */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-sm text-gray-600 mb-2">Efectivo Líquido</div>
        <div className="text-2xl font-bold text-gray-900">
          ${liquid.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 0,
          })}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {liquidPercentage}% del patrimonio
        </div>
      </div>

      {/* KPI 3: Total TDC por pagar */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-sm text-gray-600 mb-2">Total TDC por pagar</div>
        <div className="text-2xl font-bold text-gray-900">
          ${totalTDC.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-xs text-gray-500 mt-2">Saldos actuales</div>
      </div>

      {/* KPI 4: Pendientes (placeholder) */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-sm text-gray-600 mb-2">Pendientes</div>
        <div className="text-2xl font-bold text-gray-900">$0</div>
        <div className="text-xs text-gray-500 mt-2">Próximamente</div>
      </div>
    </div>
  )
}
