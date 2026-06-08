import { getCurrentUser } from '@/lib/auth/actions'
import { getUserAccounts } from '@/lib/accounts/actions'
import { getUserCreditCards } from '@/lib/credit-cards/actions'
import { calculatePendingBalance } from '@/lib/pending-items/actions'
import DashboardContent from './components/DashboardContent'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // Obtener usuario
  const user = await getCurrentUser()
  const userName = user?.user_metadata?.full_name || user?.email || 'Usuario'

  // Obtener cuentas (con error handling)
  let accounts: any[] = []
  try {
    const data = await getUserAccounts()
    if (data && Array.isArray(data)) {
      accounts = data
    }
  } catch (error) {
    console.error('Error loading accounts:', error)
  }

  // Obtener tarjetas (con error handling)
  let creditCards: any[] = []
  try {
    const data = await getUserCreditCards()
    if (data && Array.isArray(data)) {
      creditCards = data
    }
  } catch (error) {
    console.error('Error loading credit cards:', error)
  }

  // Obtener balance de pendientes (con error handling)
  let pendingBalance = { incoming: 0, outgoing: 0, net: 0 }
  try {
    const data = await calculatePendingBalance()
    if (data) {
      pendingBalance = data
    }
  } catch (error) {
    console.error('Error loading pending balance:', error)
  }

  // Calcular patrimonio total (real)
  const USD_TO_MXN_RATE = 17.5
  const totalPatrimony = accounts.reduce((sum: number, acc: any) => {
    const amount =
      acc.currency === 'MXN' ? acc.balance : acc.balance * USD_TO_MXN_RATE
    return sum + (amount || 0)
  }, 0)

  // Calcular patrimonio proyectado (real + pendientes)
  const projectedPatrimony = totalPatrimony + pendingBalance.net

  // Calcular efectivo líquido
  const liquidTypes = ['checking', 'savings', 'cash', 'digital_wallet']
  const liquidCash = accounts
    .filter((acc: any) => liquidTypes.includes(acc.type))
    .reduce((sum: number, acc: any) => {
      const amount =
        acc.currency === 'MXN' ? acc.balance : acc.balance * USD_TO_MXN_RATE
      return sum + (amount || 0)
    }, 0)

  const liquidPercentage =
    totalPatrimony > 0 ? Math.round((liquidCash / totalPatrimony) * 100) : 0

  // Calcular total TDC
  const totalTDC = creditCards.reduce((sum: number, card: any) => {
    const amount =
      card.currency === 'MXN'
        ? card.current_balance
        : card.current_balance * USD_TO_MXN_RATE
    return sum + (amount || 0)
  }, 0)

  return (
    <DashboardContent
      userName={userName}
      totalPatrimony={totalPatrimony}
      projectedPatrimony={projectedPatrimony}
      liquidCash={liquidCash}
      liquidPercentage={liquidPercentage}
      totalTDC={totalTDC}
      pendingBalance={pendingBalance.net}
      accounts={accounts}
      creditCards={creditCards}
    />
  )
}
