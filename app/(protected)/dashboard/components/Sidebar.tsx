'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { logOutAction } from '@/lib/auth/actions'
import { Button } from '@/components/ui/Button'

interface SidebarProps {
  userName: string
}

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { icon: '🏠', label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: '💰', label: 'Mis Cuentas', href: '/dashboard/cuentas', active: pathname === '/dashboard/cuentas' },
    { icon: '💳', label: 'Mis Tarjetas', href: '/dashboard/tarjetas', active: pathname === '/dashboard/tarjetas' },
    { icon: '📊', label: 'Movimientos', href: null, active: false, disabled: true },
    { icon: '🎯', label: 'Mis Metas', href: null, active: false, disabled: true },
    { icon: '📈', label: 'Análisis', href: null, active: false, disabled: true },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <Link href="/dashboard" className="p-6 border-b border-gray-200 hover:bg-gray-50">
        <h1 className="text-2xl font-bold text-cope-primary">Cope</h1>
        <p className="text-xs text-gray-500">Tu copiloto financiero</p>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.disabled ? (
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed opacity-50">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ) : (
              <Link
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-cope-primary text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="px-4 py-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Sesión como:</p>
          <p className="text-sm font-semibold text-gray-800 truncate">{userName}</p>
        </div>
        <form action={logOutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-center text-red-600 hover:bg-red-50"
            size="sm"
          >
            Cerrar Sesión
          </Button>
        </form>
      </div>
    </aside>
  )
}
