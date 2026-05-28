'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { saveOnboardingData } from '@/lib/onboarding/storage';
import { getFirstName } from '@/lib/utils';

interface DiagnosticState {
  name: string;
  firstName: string;
  lifeStage: string;
  incomeSource: string;
  spendingStyle: string;
  creditCard: string;
  investmentExperience: string;
  compoundInterestKnowledge: string;
}

const TOTAL_STEPS = 7;

export default function DiagnosticoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<DiagnosticState>({
    name: '',
    firstName: '',
    lifeStage: '',
    incomeSource: '',
    spendingStyle: '',
    creditCard: '',
    investmentExperience: '',
    compoundInterestKnowledge: '',
  });

  const questions = [
    {
      step: 1,
      id: 'name',
      question: '¿Cómo te llamas?',
      type: 'text',
      placeholder: 'Tu nombre',
    },
    {
      step: 2,
      id: 'lifeStage',
      question: (name: string) => `${getFirstName(name)}, ¿en qué etapa de la vida estás?`,
      type: 'select',
      options: [
        { value: 'student', label: '🎓 Estudiante' },
        { value: 'recent_grad', label: '💼 Recién egresado' },
        { value: 'professional', label: '🚀 Profesionista con experiencia' },
        { value: 'couple', label: '💑 En pareja / pensando en casarme' },
        { value: 'family', label: '👨‍👩‍👧 Familia formada' },
      ],
    },
    {
      step: 3,
      id: 'incomeSource',
      question: (name: string) => `¿De dónde viene principalmente tu dinero?`,
      type: 'select',
      options: [
        { value: 'salary', label: '💼 Trabajo de planta (sueldo fijo)' },
        { value: 'freelance', label: '💻 Freelance / proyectos' },
        { value: 'family', label: '👨‍👩‍👧 Apoyo de familia' },
        { value: 'mixed', label: '🔀 Combinación de varios' },
      ],
    },
    {
      step: 4,
      id: 'spendingStyle',
      question: (name: string) => `${getFirstName(name)}, ¿cómo es tu forma de gastar?`,
      type: 'select',
      options: [
        { value: 'impulsive', label: '⚡ Más impulsivo (gasto cuando se me antoja)' },
        { value: 'planned', label: '📋 Más planeado (me gusta saber a dónde va mi dinero)' },
        { value: 'mixed', label: '🔀 Mixto (a veces uno, a veces otro)' },
      ],
    },
    {
      step: 5,
      id: 'creditCard',
      question: (name: string) => `¿Tienes tarjeta de crédito?`,
      type: 'select',
      options: [
        { value: 'use_well', label: '💳 Sí, la uso bien' },
        { value: 'afraid', label: '😰 Sí, pero me da miedo' },
        { value: 'no', label: '❌ No tengo' },
      ],
    },
    {
      step: 6,
      id: 'investmentExperience',
      question: (name: string) => `¿Has invertido tu dinero alguna vez?`,
      type: 'select',
      options: [
        { value: 'experienced', label: '📈 Sí, ya sé cómo' },
        { value: 'basic', label: '🌱 Sí, algo básico' },
        { value: 'never', label: '❌ Nunca he invertido' },
      ],
    },
    {
      step: 7,
      id: 'compoundInterestKnowledge',
      question: (name: string) => `Una última pregunta: ¿qué es mejor para tu futuro?`,
      type: 'select',
      options: [
        { value: 'option_a', label: '💰 Ahorrar $1,000 al mes desde los 35 años' },
        { value: 'option_b', label: '⏰ Ahorrar $500 al mes desde los 25 años' },
        { value: 'unsure', label: '🤷 No estoy seguro' },
      ],
    },
  ];

  const currentQ = questions.find((q) => q.step === currentStep);
  const questionText =
    typeof currentQ?.question === 'function'
      ? currentQ.question(answers.name)
      : currentQ?.question;

  const handleAnswer = (value: any) => {
    if (!currentQ) return;
    const newAnswers = {
      ...answers,
      [currentQ.id]: value,
    };
    // When name is updated, also update firstName
    if (currentQ.id === 'name') {
      newAnswers.firstName = getFirstName(value);
    }
    setAnswers(newAnswers);
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
