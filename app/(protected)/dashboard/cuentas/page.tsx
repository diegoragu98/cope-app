import { getUserAccounts } from '@/lib/accounts/actions'
import CuentasClient from './components/CuentasClient'

/**
 * PÁGINA: MIS CUENTAS (Server Component)
 *
 * Carga las cuentas en el servidor y las pasa al Client Component.
 *
 * Nota: Esta página es dinámica porque accede a cookies para la sesión de Supabase.
 */

export const dynamic = 'force-dynamic'

export default async function CuentasPage() {
  // Cargar cuentas desde el servidor
  const accounts = await getUserAccounts()

  return <CuentasClient initialAccounts={accounts || []} />
}
