'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import AccountModalForm from './AccountModalForm'
import AccountsList from './AccountsList'

/**
 * COMPONENTE CLIENT: MIS CUENTAS
 *
 * Aquí ves todas tus cuentas bancarias/inversiones y su saldo total.
 *
 * Estados:
 * 1. Sin cuentas → Empty state amigable
 * 2. Con cuentas → Lista de cuentas + patrimonio total
 */

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

interface CuentasClientProps {
  initialAccounts: Account[]
}

export default function CuentasClient({ initialAccounts }: CuentasClientProps) {
  const router = useRouter()
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [showModal, setShowModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)

  const handleAccountCreated = useCallback(() => {
    setShowModal(false)
    setEditingAccount(null)
    // Recargar la página para obtener los datos actualizados
    router.refresh()
  }, [router])

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingAccount(null)
  }

  return (
    <div className="min-h-screen bg-cope-bg py-8">
      <Container size="lg">
        {/* Header con título y botón de agregar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-cope-text">Mis Cuentas</h1>
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2"
          >
            <span>+</span>
            <span>Agregar cuenta</span>
          </Button>
        </div>

        {/* EMPTY STATE - Cuando no hay cuentas */}
        {accounts.length === 0 ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center max-w-sm">
              {/* Emoji grande */}
              <div className="text-7xl mb-6">💰</div>

              {/* Título */}
              <h2 className="text-2xl font-bold text-cope-text mb-3">
                Aún no tienes cuentas registradas
              </h2>

              {/* Subtítulo */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                Empieza agregando tus cuentas bancarias e inversiones para llevar
                el control de tu patrimonio.
              </p>

              {/* Botón CTA */}
              <Button
                onClick={() => setShowModal(true)}
                size="lg"
                className="w-full"
              >
                + Agregar mi primera cuenta
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Patrimonio Total */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <p className="text-gray-600 text-sm mb-2">Patrimonio Total</p>
              <div className="flex items-baseline gap-4">
                <h2 className="text-4xl font-bold text-cope-text">
                  ${accounts.reduce((sum, acc) => {
                    const balanceInMXN = acc.currency === 'USD' ? acc.balance * 17 : acc.balance
                    return sum + balanceInMXN
                  }, 0).toLocaleString('es-MX', { maximumFractionDigits: 2 })}
                </h2>
                <span className="text-gray-500">MXN</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                {accounts.length} {accounts.length === 1 ? 'cuenta' : 'cuentas'}
              </p>
            </div>

            {/* Lista de Cuentas */}
            <AccountsList
              accounts={accounts}
              onEdit={handleEditAccount}
              onDelete={handleAccountCreated}
            />
          </>
        )}

        {/* Modal para agregar/editar cuenta */}
        {showModal && (
          <AccountModalForm
            account={editingAccount}
            onClose={handleCloseModal}
            onSuccess={handleAccountCreated}
          />
        )}
      </Container>
    </div>
  )
}
