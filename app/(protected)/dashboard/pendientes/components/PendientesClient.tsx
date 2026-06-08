'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import PendientesModalForm from './PendientesModalForm'

interface PendingItem {
  id: string
  type: 'incoming' | 'outgoing'
  concept: string
  amount: number
  currency: 'MXN' | 'USD'
  expected_date: string | null
  is_resolved: boolean
  created_at: string
}

interface PendientesClientProps {
  initialIncoming: PendingItem[]
  initialOutgoing: PendingItem[]
  initialBalance: {
    incoming: number
    outgoing: number
    net: number
  }
}

export default function PendientesClient({
  initialIncoming,
  initialOutgoing,
  initialBalance,
}: PendientesClientProps) {
  const [showModal, setShowModal] = useState(false)

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('es-MX')
  }

  // Empty state
  if (initialIncoming.length === 0 && initialOutgoing.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-6">📋</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Aún no tienes pendientes
            </h1>
            <p className="text-gray-600 mb-8">
              Crea tu primer pendiente para proyectar tu patrimonio futuro
            </p>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-cope-primary hover:bg-cope-primary/90"
            >
              + Nuevo pendiente
            </Button>
          </div>
        </div>

        {showModal && (
          <PendientesModalForm onClose={() => setShowModal(false)} />
        )}
      </div>
    )
  }

  // Main view with pending items
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Pendientes</h1>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-cope-primary hover:bg-cope-primary/90"
          >
            + Nuevo pendiente
          </Button>
        </div>

        {/* IMPACT SUMMARY */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="text-sm text-gray-600 mb-2">
            Impacto en tu patrimonio proyectado
          </div>
          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-sm text-gray-600">Entradas: </span>
              <span className="text-2xl font-bold text-green-600">
                +{formatCurrency(initialBalance.incoming)}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Salidas: </span>
              <span className="text-2xl font-bold text-red-600">
                -{formatCurrency(initialBalance.outgoing)}
              </span>
            </div>
            <div className="ml-auto">
              <span className="text-sm text-gray-600">Balance neto: </span>
              <span
                className={`text-2xl font-bold ${
                  initialBalance.net >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {initialBalance.net >= 0 ? '+' : '-'}
                {formatCurrency(Math.abs(initialBalance.net))}
              </span>
            </div>
          </div>
        </div>

        {/* INCOMING SECTION */}
        {initialIncoming.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ✅ Entradas Pendientes (te van a pagar)
            </h2>
            <div className="space-y-3">
              {initialIncoming.map((item) => (
                <PendingItemRow key={item.id} item={item} />
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <div className="text-sm text-green-700">
                Subtotal entradas:{' '}
                <span className="font-bold">
                  +{formatCurrency(initialBalance.incoming)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* OUTGOING SECTION */}
        {initialOutgoing.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              ⬇️ Salidas Pendientes (vas a pagar)
            </h2>
            <div className="space-y-3">
              {initialOutgoing.map((item) => (
                <PendingItemRow key={item.id} item={item} />
              ))}
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <div className="text-sm text-red-700">
                Subtotal salidas:{' '}
                <span className="font-bold">
                  -{formatCurrency(initialBalance.outgoing)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <PendientesModalForm onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

/**
 * Individual pending item row component
 */
function PendingItemRow({ item }: { item: PendingItem }) {
  const { resolvePendingItem } = require('@/lib/pending-items/actions')
  const { useRouter } = require('next/navigation')
  const router = useRouter()

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('es-MX')
  }

  const handleResolve = async () => {
    const result = await resolvePendingItem(item.id)
    if (result.success) {
      router.refresh()
    }
  }

  const isIncoming = item.type === 'incoming'

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border ${
        isIncoming
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex-1">
        <div className="font-semibold text-gray-900">{item.concept}</div>
        <div className="text-sm text-gray-500 mt-1">
          Fecha esperada: {formatDate(item.expected_date)}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <div
            className={`text-lg font-bold ${
              isIncoming ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isIncoming ? '+' : '-'}
            {formatCurrency(item.amount)}
          </div>
          <div className="text-xs text-gray-500">{item.currency}</div>
        </div>

        <Button
          onClick={handleResolve}
          variant="outline"
          size="sm"
          className="text-xs whitespace-nowrap"
        >
          {isIncoming ? 'Marcar recibido' : 'Marcar pagado'}
        </Button>
      </div>
    </div>
  )
}
