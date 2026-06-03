import { getUserAccounts } from '@/lib/accounts/actions'
import CuentasClient from './components/CuentasClient'

/**
 * PÁGINA: MIS CUENTAS (Server Component)
 *
 * Carga las cuentas en el servidor y las pasa al Client Component.
 */

export default async function CuentasPage() {
  // Cargar cuentas desde el servidor
  const accounts = await getUserAccounts()

  return <CuentasClient initialAccounts={accounts || []} />
}
