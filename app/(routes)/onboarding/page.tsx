'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { createClient } from '@/lib/supabase/client'

/**
 * PÁGINA DE LANDING / BIENVENIDA
 *
 * ¿Qué hace?
 * Muestra un mensaje de bienvenida a Cope.
 * Tiene botones diferentes según si estés logueado o no:
 * - Si NO estás logueado: "Iniciar sesión" y "Crear cuenta"
 * - Si estás logueado: "Ir a mi Dashboard"
 */

export default function OnboardingWelcomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Verificar si hay usuario logueado
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user || null)
      setLoading(false)
    }
    checkUser()
  }, [])

  const handleStart = () => {
    if (user) {
      // Si estás logueado, ve al dashboard
      router.push('/dashboard')
    } else {
      // Si no, comienza el onboarding (diagnóstico)
      router.push('/onboarding/diagnostico')
    }
  }

  return (
    <div className="bg-cope-bg min-h-screen flex flex-col items-center justify-center px-4">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 0.6s ease-in-out;
          display: inline-block;
          transform-origin: 70% 70%;
        }
        .animate-wave:hover {
          animation: wave 0.6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(15, 118, 110, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(15, 118, 110, 0); }
        }
        .animate-pulse-subtle {
          animation: pulse 2s infinite;
        }
      `}</style>

      <Container size="sm" className="animate-fade-in-up flex-1 flex flex-col justify-center">
        <div className="text-center">
          {/* Logo Cope */}
          <div className="mb-8">
            <div className="text-3xl font-bold text-cope-primary">Cope</div>
          </div>

          {/* Main Message */}
          <div className="mb-16 space-y-6">
            <p className="text-6xl md:text-7xl font-bold text-cope-text leading-tight">
              Hola, soy Cope <span className="animate-wave inline-block">👋</span>
            </p>
            <p className="text-2xl md:text-3xl text-gray-700">
              Vamos a entender tu dinero en 7 pasos
            </p>
          </div>

          {/* CTA Buttons - Cambian según si estés logueado o no */}
          {!loading && (
            <div className="space-y-3 w-full">
              {user ? (
                // Usuario logueado: botón para ir al dashboard
                <>
                  <Button
                    size="lg"
                    onClick={() => router.push('/dashboard')}
                    className="w-full md:w-auto px-16 py-4 text-lg font-semibold animate-pulse-subtle"
                  >
                    Ir a mi Dashboard
                  </Button>
                  <p className="text-gray-600 text-sm">
                    Bienvenido de nuevo, {user.email}
                  </p>
                </>
              ) : (
                // Usuario NO logueado: botones de login y signup
                <>
                  <Button
                    size="lg"
                    onClick={handleStart}
                    className="w-full md:w-auto px-16 py-4 text-lg font-semibold animate-pulse-subtle"
                  >
                    Empezar
                  </Button>
                  <div className="flex flex-col md:flex-row gap-3 justify-center mt-6">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => router.push('/login')}
                      className="px-8"
                    >
                      Iniciar sesión
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => router.push('/signup')}
                      className="px-8"
                    >
                      Crear cuenta
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
