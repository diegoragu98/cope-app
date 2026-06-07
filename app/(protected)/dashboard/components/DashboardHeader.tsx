'use client'

/**
 * DASHBOARD HEADER
 * Muestra saludo y fecha actual
 */

export default function DashboardHeader({ userName }: { userName: string }) {
  // Obtener fecha actual formateada
  const today = new Date()
  const dayName = today.toLocaleDateString('es-MX', { weekday: 'long' })
  const dateStr = today.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1)
  const formattedDate = `${capitalizedDay}, ${dateStr}`

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          ¡Hola {userName}!
        </h1>
        <p className="text-gray-600">{formattedDate}</p>
      </div>
    </div>
  )
}
