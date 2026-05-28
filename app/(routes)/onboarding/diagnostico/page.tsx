'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { saveOnboardingData } from '@/lib/onboarding/storage';
import { getFirstName } from '@/lib/utils';

interface DiagnosticState {
  name: string;
  salary: string;
  incomeSource: string;
  currentMoney: string;
  spendingType: string;
  savingHabit: string;
  hasCreditCard: string;
}

const TOTAL_STEPS = 7;

export default function DiagnosticoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<DiagnosticState>({
    name: '',
    salary: '',
    incomeSource: '',
    currentMoney: '',
    spendingType: '',
    savingHabit: '',
    hasCreditCard: '',
  });

  const questions = [
    {
      step: 1,
      id: 'name',
      question: '¡Hola! Antes de empezar, ¿cómo te llamas?',
      type: 'text',
      placeholder: 'Tu nombre',
    },
    {
      step: 2,
      id: 'salary',
      question: (name: string) => `Perfecto ${getFirstName(name)}, ahora cuéntame: ¿cuál es tu sueldo mensual aproximado?`,
      type: 'currency',
      placeholder: 'Ej. $12,000',
    },
    {
      step: 3,
      id: 'incomeSource',
      question: (name: string) => `${getFirstName(name)}, ¿de dónde viene principalmente tu dinero?`,
      type: 'select',
      options: [
        { value: 'salary', label: '💼 Trabajo de planta (sueldo fijo)' },
        { value: 'freelance', label: '💻 Freelance / proyectos' },
        { value: 'family', label: '👨‍👩‍👧 Apoyo de familia' },
        { value: 'mixed', label: '🎨 Combinación de varios' },
      ],
    },
    {
      step: 4,
      id: 'currentMoney',
      question: (name: string) => `Si abrieras tu app de banco ahora, ¿cuánto verías?`,
      type: 'currency',
      placeholder: 'Ej. $5,000',
      hint: 'Aunque sea aproximado. Solo para saber dónde empiezas.',
    },
    {
      step: 5,
      id: 'spendingType',
      question: (name: string) => `${getFirstName(name)}, ¿cómo es tu forma de gastar?`,
      type: 'select',
      options: [
        { value: 'impulsive', label: 'Más impulsivo (gasto cuando se me antoja)' },
        { value: 'disciplined', label: 'Más planeado (me gusta saber a dónde va mi dinero)' },
        { value: 'mixed', label: 'Mixto (a veces uno, a veces otro)' },
      ],
    },
    {
      step: 6,
      id: 'savingHabit',
      question: (name: string) => `${getFirstName(name)}, cuando termina el mes, ¿qué pasa con tu sueldo?`,
      type: 'select',
      options: [
        { value: 'all_spent', label: '💸 Se me va todo (o casi todo)' },
        { value: 'sometimes_left', label: '😅 Me sobra un poquito a veces' },
        { value: 'always_save', label: '💰 Trato de guardar siempre algo' },
        { value: 'have_system', label: '🎯 Ya tengo un sistema para ahorrar' },
      ],
    },
    {
      step: 7,
      id: 'hasCreditCard',
      question: (name: string) => `Última pregunta, ${getFirstName(name)}: ¿tienes tarjeta de crédito?`,
      type: 'yesno',
    },
  ];

  const currentQ = questions.find((q) => q.step === currentStep);
  const questionText =
    typeof currentQ?.question === 'function'
      ? currentQ.question(answers.name)
      : currentQ?.question;

  const handleAnswer = (value: any) => {
    if (!currentQ) return;
    setAnswers({
      ...answers,
      [currentQ.id]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Guardar respuestas y navegar a siguiente pantalla
      saveOnboardingData({
        name: answers.name,
        diagnostic: answers,
      });
      router.push('/onboarding/resultado');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/onboarding');
    }
  };

  const isAnswered = () => {
    if (!currentQ) return false;
    const value = answers[currentQ.id as keyof DiagnosticState];
    return value !== '';
  };

  return (
    <div className="bg-cope-bg min-h-screen flex flex-col px-4 py-8">
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
          animation: fadeInUp 0.4s ease-out;
        }
        input[type="number"], input[type="text"] {
          font-size: 16px;
        }
        input[type="range"] {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb;
          outline: none;
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0f766e;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0f766e;
          cursor: pointer;
          border: none;
        }
      `}</style>

      <Container size="sm" className="flex-1 flex flex-col">
        {/* Progress */}
        <OnboardingProgress
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onBack={handleBack}
        />

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-cope-text mb-8">
            {questionText}
          </h2>

          {/* Input basado en tipo */}
          <div className="space-y-6">
            {currentQ?.type === 'text' && (
              <input
                type="text"
                placeholder={currentQ.placeholder}
                value={answers.name}
                onChange={(e) => handleAnswer(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-lg"
              />
            )}

            {currentQ?.type === 'currency' && (
              <CurrencyInput
                value={answers[currentQ.id as keyof DiagnosticState] || ''}
                onChange={(value) => handleAnswer(value)}
                placeholder={currentQ.placeholder}
                hint={(currentQ as any).hint || 'Es aproximado, no necesita ser exacto'}
                autoFocus
              />
            )}

            {currentQ?.type === 'yesno' && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleAnswer('yes')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    answers[currentQ.id as keyof DiagnosticState] === 'yes'
                      ? 'bg-cope-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => handleAnswer('no')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    answers[currentQ.id as keyof DiagnosticState] === 'no'
                      ? 'bg-cope-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  No
                </button>
              </div>
            )}

            {currentQ?.type === 'select' && (
              <div className="space-y-3">
                {currentQ.options?.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full p-4 rounded-lg text-left font-semibold transition ${
                      answers[currentQ.id as keyof DiagnosticState] === opt.value
                        ? 'bg-cope-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Atrás
          </button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="flex-1"
            size="lg"
          >
            {currentStep === TOTAL_STEPS ? 'Ver resultado' : 'Siguiente'}
          </Button>
        </div>
      </Container>
    </div>
  );
}
