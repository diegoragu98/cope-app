import { getInvestmentAccounts, calculateInvestmentTotals } from '@/lib/investments/actions'
import InvestmentsClient from './components/InvestmentsClient'

export const dynamic = 'force-dynamic'

export default async function InvestmentesPage() {
  const accounts = await getInvestmentAccounts()
  const totals = await calculateInvestmentTotals()

  return (
    <InvestmentsClient
      initialAccounts={accounts}
      initialTotals={totals}
    />
  )
}
