'use client'

import { useState } from 'react'
import { deleteCreditCard } from '@/lib/credit-cards/actions'
import { Button } from '@/components/ui/Button'
import UpdateBalanceModal from './UpdateBalanceModal'
import RegisterPaymentModal from './RegisterPaymentModal'

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

interface CreditCardsListProps {
  cards: CreditCard[]
  onEdit: (card: CreditCard) => void
}

/**
 * Calcula cuántos días faltan para el próximo corte
 */
function getDaysUntilCutoff(cutoffDay: number): number {
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Si el corte ya pasó este mes, contar para el próximo mes
  let cutoffDate = new Date(currentYear, currentMonth, cutoffDay)
  if (today.getDate() >= cutoffDay) {
    cutoffDate = new Date(currentYear, currentMonth + 1, cutoffDay)
  }

  const diffTime = cutoffDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

/**
 * Formatea saldo a moneda
 */
function formatCurrency(amount: number, currency: string): string {
  if (currency === 'MXN') {
    return `$${amount.toLocaleString('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  } else {
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }
}

export default function CreditCardsList({ cards, onEdit }: CreditCardsListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [updateBalanceCard, setUpdateBalanceCard] = useState<CreditCard | null>(null)
  const [registerPaymentCard, setRegisterPaymentCard] = useState<CreditCard | null>(null)

  const handleDelete = async (cardId: string) => {
    setDeletingId(cardId)
    const result = await deleteCreditCard(cardId)
    setDeletingId(null)
    setConfirmDelete(null)

    if (!result.success) {
      alert(`Error: ${result.error}`)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const daysUntilCutoff = getDaysUntilCutoff(card.cutoff_day)

          return (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Header con color */}
              <div
                className="h-3"
                style={{ backgroundColor: card.color || '#0F766E' }}
              />

              {/* Contenido */}
              <div className="p-6">
                {/* Nombre e institución */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl">{card.icon || '💳'}</span>
                      <h3 className="text-xl font-bold text-cope-text">{card.name}</h3>
                    </div>
                    {card.institution && (
                      <p className="text-sm text-gray-500">{card.institution}</p>
                    )}
                  </div>
                </div>

                {/* Saldo actual grande */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Saldo actual</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-cope-primary">
                      {formatCurrency(card.current_balance, card.currency)}
                    </span>
                  </div>
                </div>

                {/* Fechas de corte y pago */}
                <div className="mb-6 pb-6 border-b border-gray-200 space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Corte: </span>
                      <span className="font-semibold text-gray-900">día {card.cutoff_day}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div>
                      <span className="text-gray-600">Pago: </span>
                      <span className="font-semibold text-gray-900">día {card.payment_day}</span>
                    </div>
                  </div>
                  <div className="text-sm text-cope-primary font-semibold">
                    Próximo corte: en {daysUntilCutoff} día{daysUntilCutoff !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUpdateBalanceCard(card)}
                      className="flex-1 text-sm"
                    >
                      Actualizar saldo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRegisterPaymentCard(card)}
                      className="flex-1 text-sm"
                    >
                      Registrar pago
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(card)}
                      className="flex-1"
                    >
                      Editar
                    </Button>
                    {confirmDelete === card.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setConfirmDelete(null)}
                          disabled={deletingId === card.id}
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(card.id)}
                          disabled={deletingId === card.id}
                          className="flex-1 text-red-600 hover:bg-red-50"
                        >
                          {deletingId === card.id ? 'Borrando...' : 'Confirmar'}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setConfirmDelete(card.id)}
                        className="flex-1 text-red-600 hover:bg-red-50"
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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
