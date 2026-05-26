'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const onboardingSlides = [
  {
    id: 1,
    title: '¿Qué es un presupuesto?',
    description: 'Un presupuesto es un plan donde decides cómo gastar tu dinero. Es como un mapa para tu dinero: sabes de dónde viene, a dónde va, y cuánto te queda.',
    icon: '📊',
    color: 'from-teal-50 to-teal-100',
  },
  {
    id: 2,
    title: 'La regla 50/30/20',
    description: 'Es la fórmula más simple para vivir sin estrés financiero:\n\n• 50% para necesidades (renta, comida, transporte)\n• 30% para gustos (cine, comidas, viajes)\n• 20% para ahorro e inversión (tu futuro)\n\nSi ganas $10,000: $5,000 necesidades, $3,000 gustos, $2,000 ahorro.',
    icon: '🎯',
    color: 'from-yellow-50 to-yellow-100',
  },
  {
    id: 3,
    title: '¿Para qué sirve ahorrar?',
    description: 'Ahorrar no es ser tacaño, es ser listo.\n\nAhorrar te permite:\n• Emergencias sin pánico (si pierdes el trabajo, tienes respaldo)\n• Metas sin estrés (viaje, casa, boda)\n• Invertir y que tu dinero trabaje por ti\n• Llegar a la vejez sin preocupaciones\n\nCope te ayuda a empezar, aunque sea con poco.',
    icon: '💰',
    color: 'from-green-50 to-green-100',
  },
  {
    id: 4,
    title: 'Vamos a crear tu presupuesto',
    description: 'Ya sabes qué es un presupuesto y cómo repartir tu dinero. Ahora es momento de crear el tuyo.\n\nTe vamos a preguntar:\n• ¿Cuánto ganas al mes?\n• ¿Cuáles son tus gastos fijos?\n• ¿Tienes metas?\n\nY listo, Cope te guiará desde ahí.',
    icon: '🎉',
    color: 'from-purple-50 to-purple-100',
  },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = onboardingSlides[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === onboardingSlides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.color} flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        {/* Slide Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          {/* Icon and Title */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{slide.icon}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {slide.title}
            </h2>
          </div>

          {/* Description */}
          <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap mb-8">
            {slide.description}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-teal-600 w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                isFirst
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={20} />
              Anterior
            </button>

            <div className="text-center text-sm text-gray-500">
              {currentSlide + 1} de {onboardingSlides.length}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              {isLast ? 'Empezar' : 'Siguiente'}
              {!isLast && <ChevronRight size={20} />}
            </button>
          </div>
        </div>

        {/* Skip option (only on first 3 slides) */}
        {!isLast && (
          <div className="text-center">
            <button
              onClick={onComplete}
              className="text-gray-600 hover:text-gray-800 text-sm underline"
            >
              Saltar onboarding
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
