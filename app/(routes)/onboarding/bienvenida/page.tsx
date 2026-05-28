'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getUserName } from '@/lib/onboarding/storage';

export default function OnboardingWelcomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Leer nombre desde localStorage
    const fullName = getUserName();
    if (!fullName) {
      // Si no hay nombre, redirigir a la Pantalla 0
      router.push('/onboarding');
      return;
    }
    // Extraer solo el primer nombre
    const firstName = fullName.split(' ')[0];
    setUserName(firstName);
    setIsLoading(false);
  }, [router]);

  const handleStart = () => {
    router.push('/onboarding/diagnostico');
  };

  if (isLoading) {
    return (
      <div className="bg-cope-bg min-h-screen flex items-center justify-center">
        <div className="text-cope-primary">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="bg-cope-bg min-h-screen flex flex-col items-center justify-center px-4 py-8">
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
      `}</style>

      <Container size="sm" className="animate-fade-in-up">
        <div className="text-center">
          {/* Logo Cope */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-cope-primary mb-2">Cope</div>
            <p className="text-sm text-gray-600">Tu copiloto financiero</p>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <p className="text-5xl md:text-6xl font-bold text-cope-text mb-6 leading-tight">
              Hola {userName} 👋
            </p>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              Vamos a entender tu dinero en 7 pasos
            </p>
            <p className="text-base text-gray-600 max-w-sm mx-auto">
              Esto te toma menos de 10 minutos y no necesitas documentos. Solo vamos a conversar.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleStart}
            className="w-full md:w-auto px-12 py-4 text-lg font-semibold"
          >
            Empezar
          </Button>

          {/* Trust Builder */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-xs text-gray-500 mb-4">Lo que haremos juntas:</p>
            <div className="flex justify-around text-xs text-gray-600">
              <div>✨ Entender tu situación</div>
              <div>🎯 Encontrar tu meta</div>
              <div>📊 Crear tu plan</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
