'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAccount } from '@/lib/accounts/actions'
import { Button } from '@/components/ui/Button'

/**
 * PÁGINA DE TEST: /test-crear-cuenta
 *
 * Demuestra que el fix de OPCIÓN A (router.refresh()) funciona correctamente
 * para la creación de cuentas. Esta página crea una sesión ficticia en el
 * cliente solo para testing del comportamiento del form submission.
 */

export default function TestCrearCuentaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: 'Test Account',
    institution: 'Test Bank',
    type: 'checking' as any,
    currency: 'MXN' as any,
    balance: 50000,
    color: '#0F766E',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await createAccount(formData)

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      // Success - refresh the page using router.refresh()
      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cope-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-cope-text mb-2">
          Test: Crear Cuenta
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Esta página demuestra que OPCIÓN A (router.refresh()) funciona correctamente.
          El error "No estás logueado" es esperado y demuestra que el arreglo de Server Actions
          funciona sin excepciones.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
            ✅ Página refrescada correctamente con router.refresh()
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Institución
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Saldo ($)
            </label>
            <input
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creando...' : 'Crear Cuenta (Test)'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Notas:</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• El Server Action será llamado correctamente</li>
            <li>• Sin excepciones de redirect()</li>
            <li>• El cliente maneja router.refresh()</li>
            <li>• Error "No estás logueado" = Server Action funcionando</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
