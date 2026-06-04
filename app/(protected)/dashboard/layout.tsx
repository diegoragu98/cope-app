import { getCurrentUser } from '@/lib/auth/actions'
import { redirect } from 'next/navigation'
import Sidebar from './components/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Validar que el usuario está logueado
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const userName = user.user_metadata?.full_name || user.email

  return (
    <div className="flex h-screen bg-cope-bg">
      {/* Sidebar */}
      <Sidebar userName={userName} />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
