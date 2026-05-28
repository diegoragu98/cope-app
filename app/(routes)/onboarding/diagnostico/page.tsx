'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getUserName, getOnboardingData, saveOnboardingData } from '@/lib/onboarding/storage';

export default function DiagnosticoPage() {
  const router = useRouter();
  const fullName = getUserName();
  const firstName = fullName ? fullName.split(' ')[0] : 'amiga';

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    salary: '',
    hasDebts: '',
    debtAmount: '',
    savings: '',
    spendingType: '',
    savingsPercentage: 50,
    hasCreditCard: '',
  });

  useEffect(() => {
    // Cargar respuestas guardadas si existen
    const data = getOnboardingData();
    if (data.diagnostic) {
      setAnswers(data.diagnostic);
    }
  }, []);

  const questions = [
    {
      id: 'salary',
      question: '¿Cuál es tu sueldo mensual aproximado?',
      type: 'currency',
      placeholder: '$15,000',
    },
    {
      id: 'hasDebts',
      question: '¿Tienes deudas activas? (tarjeta de crédito, préstamo, etc.)',
      type: 'yesno',
    },
    {
      id: 'debtAmount',
      question: '¿Cuánto deber aproximadamente?',
      type: 'currency',
      placeholder: '$5,000',
      condition: answers.hasDebts === 'yes',
    },
    {
      id: 'savings',
      question: '¿Cuánto tienes ahorrado actualmente?',
      type: 'currency',
      placeholder: '$2,000',
    },
    {
      id: 'spendingType',
      question: '¿Cómo es tu forma de gastar?',
      type: 'select',
      options: [
        { value: 'impulsive', label: 'Impulsivo (gasto sin pensar)' },
        { value: 'disciplined', label: 'Disciplinado (planeo mis gastos)' },
        { value: 'mixed', label: 'Mixto (a veces uno, a veces otro)' },
      ],
    },
    {
      id: 'savingsPercentage',
      question: 'De tu sueldo, ¿qué % intentas ahorrar?',
      type: 'slider',
      min: 0,
      max: 100,
    },
    {
      id: 'hasCreditCard',
      question: '¿Tienes tarjeta de crédito?',
      type: 'yesno',
    },
  ];

  // Filtrar preguntas según condiciones
  const visibleQuestions = questions.filter(
    (q) => q.condition !== false
  );

  const currentQ = visibleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / visibleQuestions.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers({
      ...answers,
      [currentQ.id]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < visibleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Guardar respuestas y navegar a siguiente pantalla
      saveOnboardingData({
        diagnostic: answers,
      });
      router.push('/onboarding/resultado');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      router.push('/onboarding/bienvenida');
    }
  };

  const isAnswered = () => {
    const value = answers[currentQ.id as keyof typeof answers];
    if (currentQ.type === 'slider') return true;
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="text-cope-primary hover:text-cope-primary-dark transition"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="text-sm font-semibold text-gray-600">
            Paso {currentQuestion + 1} de {visibleQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-1 mb-8">
          <div
            className="bg-cope-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-cope-text mb-8">
            {currentQ.question}
          </h2>

          {/* Input basado en tipo */}
          <div className="space-y-6">
            {currentQ.type === 'currency' && (
              <div>
                <input
                  type="number"
                  placeholder={currentQ.placeholder}
                  value={answers[currentQ.id as keyof typeof answers] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cope-primary focus:outline-none text-lg"
                />
                <p className="text-xs text-gray-500 mt-2">Es aproximado, no necesita ser exacto</p>
              </div>
            )}

            {currentQ.type === 'yesno' && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleAnswer('yes')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    answers[currentQ.id as keyof typeof answers] === 'yes'
                      ? 'bg-cope-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => handleAnswer('no')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    answers[currentQ.id as keyof typeof answers] === 'no'
                      ? 'bg-cope-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  No
                </button>
              </div>
            )}

            {currentQ.type === 'select' && (
              <div className="space-y-3">
                {currentQ.options?.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full p-4 rounded-lg text-left font-semibold transition ${
                      answers[currentQ.id as keyof typeof answers] === opt.value
                        ? 'bg-cope-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === 'slider' && (
              <div>
                <input
                  type="range"
                  min={currentQ.min}
                  max={currentQ.max}
                  value={answers.savingsPercentage}
                  onChange={(e) => handleAnswer(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold text-cope-primary">
                    {answers.savingsPercentage}%
                  </span>
                </div>
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
            {currentQuestion === visibleQuestions.length - 1 ? 'Ver resultado' : 'Siguiente'}
          </Button>
        </div>
      </Container>
    </div>
  );
}
