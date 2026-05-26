'use client';

import { useState } from 'react';
import LandingPage from '@/components/features/LandingPage';
import OnboardingFlow from '@/components/features/OnboardingFlow';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'onboarding' | 'dashboard'>('landing');

  const handleStartOnboarding = () => {
    setCurrentPage('onboarding');
  };

  const handleCompleteOnboarding = () => {
    setCurrentPage('dashboard');
  };

  return (
    <>
      {currentPage === 'landing' && <LandingPage onStart={handleStartOnboarding} />}
      {currentPage === 'onboarding' && <OnboardingFlow onComplete={handleCompleteOnboarding} />}
      {currentPage === 'dashboard' && (
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Bienvenido a Cope! 🎉</h1>
            <p className="text-gray-600 text-lg mb-8">
              Completaste el onboarding. En la próxima fase vamos a crear tu presupuesto.
            </p>
            <button
              onClick={() => setCurrentPage('landing')}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </>
  );
}
