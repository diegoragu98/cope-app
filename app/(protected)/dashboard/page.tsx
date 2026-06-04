import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getCurrentUser, logOutAction } from '@/lib/auth/actions'

/**
 * PÁGINA DE DASHBOARD
 *
 * ¿Qué es?
 * Tu "Estudio Desktop" — el corazón de Cope donde Diego va a ver y gestionar:
 * - Sus cuentas bancarias
 * - Sus movimientos de dinero
 * - Sus metas financieras
 *
 * Por ahora es un placeholder que:
 * 1. Verifica que estés logueado (el middleware también lo hace)
 * 2. Muestra tu nombre y email
 * 3. Tiene botón para cerrar sesión
 *
 * SEGURIDAD: Esta página SOLO es accesible para usuarios logueados
 * (el middleware de Next.js lo valida antes de que cargue)
 */

export default async function DashboardPage() {
  // Obtener usuario actual (Server Component)
  const user = await getCurrentUser()

  // Si no hay usuario logueado, redirigir a login
  // (Nota: El middleware ya hace esto, pero es una doble validación segura)
  if (!user) {
    redirect('/login')
  }

  const userName = user.user_metadata?.full_name || user.email
  const userEmail = user.email

  return (
    <div className="min-h-screen bg-cope-bg py-8">
      <Container size="lg">
        {/* Header con logout */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-cope-text mb-2">
              ¡Bienvenido, {userName}!
            </h1>
            <p className="text-gray-600">
              Aquí va tu Estudio Desktop — tu centro de control financiero
            </p>
          </div>

          {/* Botón de logout */}
          <form action={logOutAction}>
            <Button variant="ghost" type="submit">
              Cerrar sesión
            </Button>
          </form>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-cope-text mb-6">
            Tu información
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-800">{userEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ID de usuario</p>
              <p className="text-lg font-mono text-gray-800">{user.id}</p>
            </div>
          </div>
        </div>

        {/* Placeholder Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Accounts */}
          <Link href="/dashboard/cuentas">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow cursor-pointer h-full">
              <h3 className="text-2xl font-bold text-cope-text mb-4">
                💰 Mis Cuentas
              </h3>
              <p className="text-gray-600 mb-6">
                Gestiona tus cuentas bancarias e inversiones
              </p>
              <Button>Ir a Cuentas</Button>
            </div>
          </Link>

          {/* Movements Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-cope-text mb-4">
              📊 Movimientos
            </h3>
            <p className="text-gray-600 mb-6">
              Aquí irán tus ingresos, gastos e inversiones
            </p>
            <Button disabled>Próximamente</Button>
          </div>

          {/* Goals Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-cope-text mb-4">
              🎯 Mis Metas
            </h3>
            <p className="text-gray-600 mb-6">
              Aquí irán tus metas financieras y su progreso
            </p>
            <Button disabled>Próximamente</Button>
          </div>

          {/* Analytics Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-cope-text mb-4">
              📈 Análisis
            </h3>
            <p className="text-gray-600 mb-6">
              Aquí irán gráficas y análisis de tu salud financiera
            </p>
            <Button disabled>Próximamente</Button>
          </div>
        </div>

        {/* Status */}
        <div className="mt-12 bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <p className="text-green-800">
            ✅ <strong>Autenticación funcionando correctamente.</strong> Las tablas de Supabase están creadas y protegidas con RLS. Próxima sesión: conectar el dashboard con tus cuentas reales.
          </p>
        </div>
      </Container>
    </div>
  )
}
