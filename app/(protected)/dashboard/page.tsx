import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/actions'
import { getUserAccounts } from '@/lib/accounts/actions'
import { getUserCreditCards } from '@/lib/credit-cards/actions'
import DashboardClient from './components/DashboardClient'

export const dynamic = 'force-dynamic'

/**
 * DASHBOARD PRINCIPAL - Server Component
 *
 * Carga todos los datos necesarios:
 * - Usuario actual
 * - Todas las cuentas del usuario
 * - Todas las TDC del usuario
 *
 * Luego pasa al Client Component para renderizar y lógica interactiva.
 */

export default async function DashboardPage() {
  // Obtener usuario actual
  const user = await getCurrentUser()

  // Si no hay usuario logueado, redirigir a login
  if (!user) {
    redirect('/login')
  }

  // Obtener datos del usuario
  const userName = user.user_metadata?.full_name || user.email || 'Usuario'
  const userEmail = user.email || ''

  // Obtener cuentas y tarjetas
  const accounts = await getUserAccounts()
  const creditCards = await getUserCreditCards()

  return (
    <DashboardClient
      user={{
        name: userName,
        email: userEmail,
        id: user.id,
      }}
      accounts={accounts || []}
      creditCards={creditCards || []}
    />
  )
}
