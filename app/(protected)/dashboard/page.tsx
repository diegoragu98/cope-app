import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { getCurrentUser } from '@/lib/auth/actions'

export const dynamic = 'force-dynamic'

/**
 * DASHBOARD PRINCIPAL
 * Dashboard minimalista que evita problemas de carga de datos
 */

export default async function DashboardPage() {
  try {
    // Obtener usuario actual
    const user = await getCurrentUser()

    // Si no hay usuario logueado, redirigir a login
    if (!user) {
      redirect('/login')
    }

    // Obtener datos del usuario
    const userName = user.user_metadata?.full_name || user.email || 'Usuario'

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
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
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Mis Cuentas */}
            <Link href="/dashboard/cuentas">
              <div className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-4xl mb-4">💰</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Mis Cuentas
                </h2>
                <p className="text-gray-600">
                  Gestiona tus cuentas bancarias e inversiones
                </p>
                <div className="mt-4">
                  <Button className="w-full">Ir a Cuentas</Button>
                </div>
              </div>
            </Link>

            {/* Mis Tarjetas */}
            <Link href="/dashboard/tarjetas">
              <div className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-4xl mb-4">💳</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Mis Tarjetas de Crédito
                </h2>
                <p className="text-gray-600">
                  Controla tus saldos y fechas de pago
                </p>
                <div className="mt-4">
                  <Button className="w-full">Ir a Tarjetas</Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => alert('Próximamente')}
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-cope-primary hover:bg-gray-50 transition"
              >
                <div className="text-3xl mb-2">💰</div>
                <p className="font-semibold text-gray-900 text-sm">
                  Día de Pago
                </p>
              </button>
              <button
                onClick={() => alert('Próximamente')}
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-cope-primary hover:bg-gray-50 transition"
              >
                <div className="text-3xl mb-2">💳</div>
                <p className="font-semibold text-gray-900 text-sm">Pagar TDC</p>
              </button>
              <button
                onClick={() => alert('Próximamente')}
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-cope-primary hover:bg-gray-50 transition"
              >
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold text-gray-900 text-sm">
                  Actualizar
                </p>
              </button>
              <button
                onClick={() => alert('Próximamente')}
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-cope-primary hover:bg-gray-50 transition"
              >
                <div className="text-3xl mb-2">➕</div>
                <p className="font-semibold text-gray-900 text-sm">
                  Movimiento
                </p>
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-800">
              ✅ <strong>Dashboard funcionando.</strong> Accede a Mis Cuentas y
              Mis Tarjetas para ver y gestionar tus datos.
            </p>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Dashboard error:', error)
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-900 mb-4">
            Error en el Dashboard
          </h1>
          <p className="text-red-700 mb-6">
            Hubo un problema cargando la página. Por favor, recarga o intenta de
            nuevo.
          </p>
          <Link href="/dashboard">
            <Button>Recargar</Button>
          </Link>
        </div>
      </div>
    )
  }
}
