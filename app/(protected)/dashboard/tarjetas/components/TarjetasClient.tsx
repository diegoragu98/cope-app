'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import CreditCardModalForm from './CreditCardModalForm'
import CreditCardsList from './CreditCardsList'

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

interface TarjetasClientProps {
  initialCards: CreditCard[]
}

export default function TarjetasClient({ initialCards }: TarjetasClientProps) {
  const [cards, setCards] = useState<CreditCard[]>(initialCards)
  const [showModal, setShowModal] = useState(false)
  const [editingCard, setEditingCard] = useState<CreditCard | null>(null)

  const handleOpenModal = (card?: CreditCard) => {
    if (card) {
      setEditingCard(card)
    } else {
      setEditingCard(null)
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCard(null)
  }

  const handleSuccess = () => {
    handleCloseModal()
    // El router.refresh() en el Server Action refrescará los datos
  }

  // Empty state
  if (cards.length === 0 && !showModal) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-md">
          {/* Emoji grande */}
          <div className="text-8xl mb-6">💳</div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-cope-text mb-3">
            Aún no tienes tarjetas registradas
          </h1>

          {/* Subtítulo */}
          <p className="text-gray-600 mb-8">
            Agrégalas para llevar control de tus saldos y fechas de corte y pago.
          </p>

          {/* Botón CTA */}
          <Button
            onClick={() => handleOpenModal()}
            className="w-full"
            size="lg"
          >
            + Agregar mi primera TDC
          </Button>
        </div>

        {/* Modal */}
        {showModal && (
          <CreditCardModalForm
            card={editingCard}
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    )
  }

  // Vista con tarjetas
  return (
    <div className="p-6">
      {/* Card de "Total a pagar este mes" */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 border-l-4 border-cope-primary">
        <div className="text-sm text-gray-600 mb-2">Total a pagar este mes</div>
        <div className="text-4xl font-bold text-cope-primary">
          ${cards
            .reduce((sum, card) => {
              const amount = card.current_balance || 0
              return sum + (card.currency === 'MXN' ? amount : amount * 17) // Convertir USD a MXN
            }, 0)
            .toLocaleString('es-MX', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {cards.length} tarjeta{cards.length !== 1 ? 's' : ''} registrada{cards.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Botón Agregar */}
      <Button onClick={() => handleOpenModal()} className="mb-6">
        + Agregar tarjeta
      </Button>

      {/* Lista de tarjetas */}
      <CreditCardsList cards={cards} onEdit={handleOpenModal} />

      {/* Modal */}
      {showModal && (
        <CreditCardModalForm
          card={editingCard}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  )
}
