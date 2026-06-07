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
      <div className="space-y-4">
        {cards.map((card) => {
          const daysUntilCutoff = getDaysUntilCutoff(card.cutoff_day)

          return (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header con color */}
              <div
                className="h-3"
                style={{ backgroundColor: card.color || '#0F766E' }}
              />

              {/* Contenido - Layout compacto en filas */}
              <div className="p-4 space-y-3">
                {/* FILA 1: Nombre e institución + Próximo corte */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{card.icon || '💳'}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{card.name}</h3>
                      {card.institution && (
                        <p className="text-xs text-gray-500">{card.institution}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`text-right text-sm font-semibold ${
                      daysUntilCutoff <= 0
                        ? 'text-red-600'
                        : daysUntilCutoff <= 3
                          ? 'text-amber-500'
                          : 'text-cope-primary'
                    }`}
                  >
                    {daysUntilCutoff <= 0 ? '⚠️ Corte HOY' : `Próx corte: ${daysUntilCutoff}d`}
                  </div>
                </div>

                {/* FILA 2: Saldo + Fechas */}
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Saldo: </span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(card.current_balance, card.currency)}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    <span>Corte: {card.cutoff_day}</span>
                    <span className="mx-2">|</span>
                    <span>Pago: {card.payment_day}</span>
                  </div>
                </div>

                {/* FILA 3: Botones de acción */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUpdateBalanceCard(card)}
                    className="flex-1 text-xs py-1"
                  >
                    Actualizar saldo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRegisterPaymentCard(card)}
                    className="flex-1 text-xs py-1"
                  >
                    Registrar pago
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(card)}
                    className="flex-1 text-xs py-1"
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
                        className="flex-1 text-xs py-1"
                      >
                        ✕
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(card.id)}
                        disabled={deletingId === card.id}
                        className="flex-1 text-xs py-1 text-red-600 hover:bg-red-50"
                      >
                        {deletingId === card.id ? '...' : '🗑️'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmDelete(card.id)}
                      className="flex-1 text-xs py-1 text-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </Button>
                  )}
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
