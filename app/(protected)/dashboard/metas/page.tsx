import { getGoals } from '@/lib/goals/actions'
import MetasClient from './components/MetasClient'

export const dynamic = 'force-dynamic'

export default async function MetasPage() {
  const goals = await getGoals()

  return <MetasClient initialGoals={goals} />
}
