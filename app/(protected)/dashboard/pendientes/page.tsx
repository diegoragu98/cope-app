import { getUserPendingItems, calculatePendingBalance } from '@/lib/pending-items/actions'
import PendientesClient from './components/PendientesClient'

export const dynamic = 'force-dynamic'

export default async function PendientesPage() {
  // Load pending items and calculate balance
  const pendingData = await getUserPendingItems()
  const balance = await calculatePendingBalance()

  return (
    <PendientesClient
      initialIncoming={pendingData?.incoming || []}
      initialOutgoing={pendingData?.outgoing || []}
      initialBalance={balance}
    />
  )
}
