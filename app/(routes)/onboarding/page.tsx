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

      <Container size="sm" className="animate-fade-in-up">
        <div className="text-center">
          {/* Logo Cope - Discreto arriba */}
          <div className="mb-8">
            <div className="text-3xl font-bold text-cope-primary">Cope</div>
          </div>

          {/* Main Message - El héroe */}
          <div className="mb-16 space-y-6">
            <p className="text-6xl md:text-7xl font-bold text-cope-text leading-tight">
              Hola, soy Cope <span className="animate-wave inline-block">👋</span>
            </p>
            <p className="text-2xl md:text-3xl text-gray-700">
              Vamos a entender tu dinero en 7 pasos
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleStart}
            className="w-full md:w-auto px-16 py-4 text-lg font-semibold animate-pulse-subtle"
          >
            Empezar
          </Button>
        </div>
      </Container>
    </div>
  );
}
