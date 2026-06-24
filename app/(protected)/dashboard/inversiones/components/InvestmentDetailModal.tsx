'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getInvestmentMovements, deleteInvestmentMovement } from '@/lib/investments/actions'
import { Button } from '@/components/ui/Button'

interface InvestmentAccount {
  id: string
  name: string
  type: 'investment_rf' | 'investment_rv'
  balance: number
  currency: 'MXN' | 'USD'
  aportado: number
  ganancia: number
}

interface InvestmentMovement {
  id: string
  account_id: string
  amount: number
  type: 'ingreso' | 'retiro'
  movement_date: string
  notes: string | null
  created_at: string
}

interface InvestmentDetailModalProps {
  account: InvestmentAccount
  onClose: () => void
}

export default function InvestmentDetailModal({
  account,
  onClose,
}: InvestmentDetailModalProps) {
  const router = useRouter()
  const [movements, setMovements] = useState<InvestmentMovement[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Cargar movimientos al abrir
  useEffect(() => {
    const loadMovements = async () => {
      try {
        const data = await getInvestmentMovements(account.id)
        setMovements(data || [])
      } catch (error) {
        console.error('Error loading movements:', error)
        setMovements([])
      } finally {
        setLoading(false)
      }
    }

    loadMovements()
  }, [account.id])

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX')
  }

  const handleDelete = async (movementId: string) => {
    if (!confirm('¿Seguro que quieres eliminar este movimiento?')) {
      return
    }

    setDeleting(movementId)
    try {
      const result = await deleteInvestmentMovement(movementId)
      if (result.success) {
        // Actualizar lista localmente
        setMovements((prev) => prev.filter((m) => m.id !== movementId))
        // Refresco global para actualizar totales en el padre
        router.refresh()
      }
    } catch (error) {
      console.error('Error deleting movement:', error)
      alert('Error al eliminar el movimiento')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{account.name}</h2>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                account.type === 'investment_rf'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {account.type === 'investment_rf' ? 'Renta Fija' : 'Renta Variable'}
            </span>
          </div>

          {/* Totales */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600 mb-1">Aportado</div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(account.aportado)}
              </div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Valor Actual</div>
              <div className="text-lg font-bold text-gray-900">
                {formatCurrency(account.balance)}
              </div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Ganancia</div>
              <div
                className={`text-lg font-bold ${
                  account.ganancia >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {account.ganancia >= 0 ? '+' : '-'}
                {formatCurrency(Math.abs(account.ganancia))}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {loading ? (
            <div className="text-center text-gray-600">Cargando movimientos...</div>
          ) : movements.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-3">📭</div>
              <p className="text-gray-600">Aún no tienes movimientos registrados</p>
              <p className="text-sm text-gray-500 mt-2">Los movimientos aparecerán aquí</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Fecha</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Tipo</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Monto</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Notas</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {movements.map((movement) => (
                    <tr key={movement.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3 text-gray-900">
                        {formatDate(movement.movement_date)}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            movement.type === 'ingreso'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {movement.type === 'ingreso' ? 'Ingreso' : 'Retiro'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-gray-900">
                        {movement.type === 'ingreso' ? '+' : '-'}
                        {formatCurrency(movement.amount)}
                      </td>
                      <td className="py-3 px-3 text-gray-600 text-xs">
                        {movement.notes || '—'}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleDelete(movement.id)}
                          disabled={deleting === movement.id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold"
                        >
                          {deleting === movement.id ? 'Eliminando...' : 'Eliminar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}
