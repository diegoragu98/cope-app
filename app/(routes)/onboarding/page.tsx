'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { saveOnboardingData } from '@/lib/onboarding/storage';

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState<{ name?: string; birthDate?: string }>({});

  const handleContinue = () => {
    const newErrors: { name?: string; birthDate?: string } = {};

    // Validar nombre
    if (!name.trim()) {
      newErrors.name = 'Por favor escribe tu nombre';
    }
    if (name.trim().length < 2) {
      newErrors.name = 'Tu nombre debe tener al menos 2 caracteres';
    }

    // Validar fecha
    if (!birthDate) {
      newErrors.birthDate = 'Por favor selecciona tu fecha de nacimiento';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Guardar datos
    saveOnboardingData({
      name: name.trim(),
      birthDate,
    });

    // Navegar a siguiente pantalla
    router.push('/onboarding/bienvenida');
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) setErrors({ ...errors, name: undefined });
  };

  const handleDateChange = (value: string) => {
    setBirthDate(value);
    if (errors.birthDate) setErrors({ ...errors, birthDate: undefined });
  };

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
        input {
          font-size: 16px; /* Previene zoom en iOS */
        }
      `}</style>

      <Container size="sm" className="animate-fade-in-up w-full">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-cope-primary mb-2">Cope</div>
            <p className="text-sm text-gray-600">Tu copiloto financiero</p>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-cope-text mb-3">
              Cuéntame sobre ti
            </h1>
            <p className="text-base text-gray-600">
              Necesito algunos datos básicos para personalizarte la experiencia.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Nombre */}
            <div className="text-left">
              <label htmlFor="name" className="block text-sm font-semibold text-cope-text mb-2">
                ¿Cuál es tu nombre?
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                  errors.name
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-cope-primary focus:outline-none'
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-2">{errors.name}</p>
              )}
            </div>

            {/* Cumpleaños */}
            <div className="text-left">
              <label htmlFor="birthDate" className="block text-sm font-semibold text-cope-text mb-2">
                ¿Cuándo naciste?
              </label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                  errors.birthDate
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-cope-primary focus:outline-none'
                }`}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-600 mt-2">{errors.birthDate}</p>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="mt-10">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!name.trim() || !birthDate}
              className="w-full"
            >
              Continuar
            </Button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-gray-500 mt-6">
            Tus datos son privados y seguros. No los compartimos.
          </p>
        </div>
      </Container>
    </div>
  );
}
