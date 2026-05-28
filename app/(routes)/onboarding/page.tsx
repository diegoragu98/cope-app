'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function OnboardingWelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/diagnostico');
  };

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
      `}</style>

      <Container size="sm" className="animate-fade-in-up">
        <div className="text-center">
          {/* Logo Cope */}
          <div className="mb-12">
            <div className="text-7xl md:text-8xl font-bold text-cope-primary mb-2">Cope</div>
            <p className="text-sm text-gray-600">Tu copiloto financiero</p>
          </div>

          {/* Main Message */}
          <div className="mb-16 space-y-4">
            <p className="text-6xl md:text-7xl font-bold text-cope-text">
              Hola 👋
            </p>
            <p className="text-2xl md:text-3xl text-gray-700">
              Vamos a entender tu dinero en 7 pasos
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleStart}
            className="w-full md:w-auto px-16 py-4 text-lg font-semibold"
          >
            Empezar
          </Button>
        </div>
      </Container>
    </div>
  );
}
