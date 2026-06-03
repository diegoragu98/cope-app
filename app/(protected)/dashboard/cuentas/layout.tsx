import { getUserAccounts } from '@/lib/accounts/actions'
import CuentasPage from './page'

export default async function CuentasLayout() {
  // Cargar las cuentas en el servidor (Server Component)
  const accounts = await getUserAccounts()

  // Pasar las cuentas al page como prop
  return <CuentasPage initialAccounts={accounts || []} />
}
