'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { logInAction } from '@/lib/auth/actions'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null) // Limpiar error al escribir
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Llamar al server action de login
    const result = await logInAction(formData.email, formData.password)

    // Si hay error, mostrarlo
    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    // Si es exitoso, redirigir a dashboard
    if (result?.success) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-cope-bg flex items-center justify-center px-4 py-8">
      <Container size="sm">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cope-text mb-2">
              Bienvenido a Cope
            </h1>
            <p className="text-gray-600">
              Inicia sesión para acceder a tu Estudio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                ❌ {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Tu contraseña"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
            </div>

            {/* Forgot password link (placeholder) */}
            <div className="text-right">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setError('Funcionalidad próximamente disponible')
                }}
                className="text-sm text-cope-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          {/* Footer link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link href="/signup" className="text-cope-primary font-semibold hover:underline">
                Crear una ahora
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
