import { getUserCreditCards } from '@/lib/credit-cards/actions'
import TarjetasClient from './components/TarjetasClient'

/**
 * PÁGINA: MIS TARJETAS (Server Component)
 *
 * Carga las tarjetas en el servidor y las pasa al Client Component.
 */

export const dynamic = 'force-dynamic'

export default async function TarjetasPage() {
  // Cargar tarjetas desde el servidor
  const creditCards = await getUserCreditCards()

  return <TarjetasClient initialCards={creditCards || []} />
}
