'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { signUpAction } from '@/lib/auth/actions'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
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

    // Llamar al server action de signup
    const result = await signUpAction(
      formData.email,
      formData.password,
      formData.fullName
    )

    // Si hay error, mostrarlo
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // Si no hay error, el server action redirige automáticamente a /dashboard
  }

  return (
    <div className="min-h-screen bg-cope-bg flex items-center justify-center px-4 py-8">
      <Container size="sm">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cope-text mb-2">
              Crear cuenta en Cope
            </h1>
            <p className="text-gray-600">
              Comienza tu viaje financiero hoy
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

            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Diego Ramirez"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
            </div>

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
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 8 caracteres para tu seguridad
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>

          {/* Footer link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-cope-primary font-semibold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
