import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { getCurrentUser } from '@/lib/auth/actions'
import { getUserAccounts } from '@/lib/accounts/actions'
import { getUserCreditCards } from '@/lib/credit-cards/actions'

export const dynamic = 'force-dynamic'

/**
 * DASHBOARD PRINCIPAL
 * Versión simplificada sin componentes Client complejos
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

  // Obtener cuentas y tarjetas con seguridad
  let accounts: any[] = []
  let creditCards: any[] = []

  try {
    const accountsData = await getUserAccounts()
    if (accountsData && Array.isArray(accountsData)) {
      accounts = accountsData
    }
  } catch (error) {
    console.error('Error loading accounts:', error)
  }

  try {
    const cardsData = await getUserCreditCards()
    if (cardsData && Array.isArray(cardsData)) {
      creditCards = cardsData
    }
  } catch (error) {
    console.error('Error loading credit cards:', error)
  }

  // Calcular patrimonio total
  const USD_TO_MXN_RATE = 17.5
  const totalPatrimony = accounts.reduce((sum: number, acc: any) => {
    const amount =
      acc.currency === 'MXN' ? acc.balance : acc.balance * USD_TO_MXN_RATE
    return sum + (amount || 0)
  }, 0)

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

  // Total TDC
  const totalTDC = creditCards.reduce((sum: number, card: any) => {
    const amount =
      card.currency === 'MXN'
        ? card.current_balance
        : card.current_balance * USD_TO_MXN_RATE
    return sum + (amount || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            ¡Hola {userName}!
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Patrimonio Total */}
        <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-cope-primary mb-8 p-8">
          <div className="text-sm text-gray-600 mb-2">Patrimonio Total</div>
          <div className="text-5xl font-bold text-cope-primary mb-2">
            ${totalPatrimony.toLocaleString('es-MX', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-sm text-gray-600">MXN</div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Disponible</div>
            <div className="text-2xl font-bold text-gray-900">
              ${totalPatrimony.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Efectivo Líquido</div>
            <div className="text-2xl font-bold text-gray-900">
              ${liquidCash.toLocaleString('es-MX', {
                minimumFractionDigits: 0,
              })}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {liquidPercentage}% del patrimonio
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Total TDC</div>
            <div className="text-2xl font-bold text-gray-900">
              ${totalTDC.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Pendientes</div>
            <div className="text-2xl font-bold text-gray-900">$0</div>
            <div className="text-xs text-gray-500 mt-2">Próximamente</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => alert('Día de Pago - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900 mb-1">Día de Pago</h3>
            <p className="text-sm text-gray-600">Registrar ingresos</p>
          </button>
          <button
            onClick={() => alert('Pagar TDC - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-semibold text-gray-900 mb-1">Pagar TDC</h3>
            <p className="text-sm text-gray-600">Registrar pagos</p>
          </button>
          <button
            onClick={() => alert('Actualizar valores - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-1">Actualizar valores</h3>
            <p className="text-sm text-gray-600">Refrescar saldos</p>
          </button>
          <button
            onClick={() => alert('Nuevo movimiento - Próximamente')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="font-semibold text-gray-900 mb-1">Nuevo movimiento</h3>
            <p className="text-sm text-gray-600">Registrar gasto</p>
          </button>
        </div>

        {/* Mis Cuentas Link */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Mis Cuentas</h2>
            <Link
              href="/dashboard/cuentas"
              className="text-cope-primary hover:underline text-sm font-semibold"
            >
              Ver todas →
            </Link>
          </div>
          {accounts.length > 0 ? (
            <p className="text-gray-600">
              {accounts.length} cuenta{accounts.length !== 1 ? 's' : ''} registrada
              {accounts.length !== 1 ? 's' : ''}
            </p>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">
                Aún no tienes cuentas registradas
              </p>
              <Link href="/dashboard/cuentas">
                <Button>+ Agregar primera cuenta</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mis Tarjetas Link */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Mis Tarjetas de Crédito
            </h2>
            <Link
              href="/dashboard/tarjetas"
              className="text-cope-primary hover:underline text-sm font-semibold"
            >
              Ver todas →
            </Link>
          </div>
          {creditCards.length > 0 ? (
            <p className="text-gray-600">
              {creditCards.length} tarjeta{creditCards.length !== 1 ? 's' : ''} registrada
              {creditCards.length !== 1 ? 's' : ''}
            </p>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">
                Aún no tienes tarjetas registradas
              </p>
              <Link href="/dashboard/tarjetas">
                <Button>+ Agregar primera TDC</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
