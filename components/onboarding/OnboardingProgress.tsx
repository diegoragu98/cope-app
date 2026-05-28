'use client';

import { ChevronLeft } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  onBack,
}: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Header con botón atrás */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-cope-primary hover:text-cope-primary-dark transition p-2 -ml-2"
          aria-label="Atrás"
        >
          <ChevronLeft size={28} />
        </button>
        <div className="text-sm font-semibold text-gray-600">
          Paso {currentStep} de {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-1.5 mb-12">
        <div
          className="bg-cope-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
