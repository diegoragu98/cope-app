'use client'

import { Button } from '@/components/ui/Button'

/**
 * DASHBOARD QUICK ACTIONS
 * 4 botones grandes para acciones rápidas
 * Por ahora solo muestran "Próximamente"
 */

export default function DashboardQuickActions() {
  const handleComingSoon = (action: string) => {
    alert(`${action} - Próximamente`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Action 1: Día de Pago */}
      <button
        onClick={() => handleComingSoon('💰 Día de Pago')}
        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
      >
        <div className="text-3xl mb-2">💰</div>
        <h3 className="font-semibold text-gray-900 mb-1">Día de Pago</h3>
        <p className="text-sm text-gray-600">Registrar ingresos</p>
      </button>

      {/* Action 2: Pagar TDC */}
      <button
        onClick={() => handleComingSoon('💳 Pagar TDC')}
        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
      >
        <div className="text-3xl mb-2">💳</div>
        <h3 className="font-semibold text-gray-900 mb-1">Pagar TDC</h3>
        <p className="text-sm text-gray-600">Registrar pagos</p>
      </button>

      {/* Action 3: Actualizar valores */}
      <button
        onClick={() => handleComingSoon('📊 Actualizar valores')}
        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
      >
        <div className="text-3xl mb-2">📊</div>
        <h3 className="font-semibold text-gray-900 mb-1">Actualizar valores</h3>
        <p className="text-sm text-gray-600">Refrescar saldos</p>
      </button>

      {/* Action 4: Nuevo movimiento */}
      <button
        onClick={() => handleComingSoon('➕ Nuevo movimiento')}
        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
      >
        <div className="text-3xl mb-2">➕</div>
        <h3 className="font-semibold text-gray-900 mb-1">Nuevo movimiento</h3>
        <p className="text-sm text-gray-600">Registrar gasto</p>
      </button>
    </div>
  )
}
