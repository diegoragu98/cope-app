'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getOnboardingData, getUserName } from '@/lib/onboarding/storage';
import { getFirstName } from '@/lib/utils';

interface DiagnosticData {
  name: string;
  salary: string;
  incomeSource: string;
  currentMoney: string;
  spendingType: string;
  savingHabit: string;
  hasCreditCard: string;
}

interface CopeScore {
  score: number;
  message: string;
  messageSubtitle: string;
}

interface MetricCard {
  title: string;
  level: 'alto' | 'medio' | 'bajo';
  value: string;
  icon: string;
  color: string;
}

export default function ResultadoPage() {
  const router = useRouter();
  const [copeScore, setCopeScore] = useState<CopeScore | null>(null);
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getOnboardingData();
    if (!data?.diagnostic) {
      router.push('/onboarding');
      return;
    }

    const diagnostic = data.diagnostic as DiagnosticData;

    // Calculate Cope Score with new formula
    let rawScore = 0;
    const salary = parseInt(diagnostic.salary) || 0;
    const currentMoney = parseInt(diagnostic.currentMoney) || 0;
    const monthsOfSavings = salary > 0 ? currentMoney / salary : 0;

    // Criterio 1: Saving Habit (5-35 points)
    switch (diagnostic.savingHabit) {
      case 'all_spent':
        rawScore += 5;
        break;
      case 'sometimes_left':
        rawScore += 15;
        break;
      case 'always_save':
        rawScore += 25;
        break;
      case 'have_system':
        rawScore += 35;
        break;
    }

    // Criterio 2: Current Money vs Salary (5-35 points)
    if (monthsOfSavings < 0.5) {
      rawScore += 5;
    } else if (monthsOfSavings < 1) {
      rawScore += 15;
    } else if (monthsOfSavings < 3) {
      rawScore += 25;
    } else {
      rawScore += 35;
    }

    // Criterio 3: Credit Card Usage (5-25 points)
    // For now, we'll use a simplified version since the question is yes/no
    // We can enhance this in Pantalla 4 if needed
    if (diagnostic.hasCreditCard === 'yes') {
      rawScore += 15; // Default to middle value for yes
    } else {
      rawScore += 5;
    }

    // Criterio 4: Spending Type (5-15 points)
    switch (diagnostic.spendingType) {
      case 'impulsive':
        rawScore += 5;
        break;
      case 'mixed':
        rawScore += 10;
        break;
      case 'disciplined':
        rawScore += 15;
        break;
    }

    // Normalize from 20-110 range to 1-100
    // Min raw: 5+5+5+5 = 20, Max raw: 35+35+25+15 = 110
    const minScore = 20;
    const maxScore = 110;
    const score = Math.round(((rawScore - minScore) / (maxScore - minScore)) * 99) + 1;

    // Determine message based on score
    let message = '';
    let messageSubtitle = '';

    if (score <= 30) {
      message = 'Estás empezando';
      messageSubtitle = 'Es normal. Vamos a construir juntos.';
    } else if (score <= 60) {
      message = 'Vas bien encaminado';
      messageSubtitle = 'Hay cosas que podemos mejorar.';
    } else if (score <= 80) {
      message = 'Tienes buenos hábitos';
      messageSubtitle = 'Vamos a optimizar.';
    } else {
      message = 'Vas muy bien';
      messageSubtitle = 'Cope te ayuda a ir al siguiente nivel.';
    }

    // Calculate metric levels based on new data
    const moneyLevel = monthsOfSavings < 0.5 ? 'bajo' : monthsOfSavings < 1 ? 'medio' : 'alto';

    const savingHabitLabel =
      diagnostic.savingHabit === 'all_spent' ? 'Se me va todo' :
      diagnostic.savingHabit === 'sometimes_left' ? 'Me sobra a veces' :
      diagnostic.savingHabit === 'always_save' ? 'Guardo siempre' :
      'Tengo sistema';

    const savingHabitLevel =
      diagnostic.savingHabit === 'all_spent' ? 'bajo' :
      diagnostic.savingHabit === 'sometimes_left' ? 'medio' :
      diagnostic.savingHabit === 'always_save' ? 'medio' :
      'alto';

    const incomeSourceLabel =
      diagnostic.incomeSource === 'salary' ? 'Trabajo fijo' :
      diagnostic.incomeSource === 'freelance' ? 'Freelance' :
      diagnostic.incomeSource === 'family' ? 'Familia' :
      'Mixto';

    const creditCardLevel = diagnostic.hasCreditCard === 'yes' ? 'medio' : 'bajo';
    const creditCardLabel = diagnostic.hasCreditCard === 'yes' ? 'Tengo TDC' : 'Sin TDC';

    const metricCards: MetricCard[] = [
      {
        title: 'Tu Dinero',
        level: moneyLevel,
        value: currentMoney ? `$${currentMoney.toLocaleString()}` : 'Sin datos',
        icon: '💰',
        color: moneyLevel === 'alto' ? '#10b981' : moneyLevel === 'medio' ? '#f59e0b' : '#ef4444',
      },
      {
        title: 'Hábito de Ahorro',
        level: savingHabitLevel,
        value: savingHabitLabel,
        icon: '📈',
        color: savingHabitLevel === 'alto' ? '#10b981' : savingHabitLevel === 'medio' ? '#f59e0b' : '#ef4444',
      },
      {
        title: 'Origen del Dinero',
        level: 'medio',
        value: incomeSourceLabel,
        icon: '💼',
        color: '#06b6d4',
      },
      {
        title: 'Tarjeta de Crédito',
        level: creditCardLevel,
        value: creditCardLabel,
        icon: '💳',
        color: creditCardLevel === 'alto' ? '#10b981' : '#f59e0b',
      },
    ];

    setCopeScore({ score, message, messageSubtitle });
    setMetrics(metricCards);
    setLoading(false);
  }, [router]);

  const firstName = getUserName() ? getFirstName(getUserName()) : 'amiga';

  if (loading) {
    return (
      <div className="bg-cope-bg min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-600">Cargando tu diagnóstico...</p>
      </div>
    );
  }

  if (!copeScore) return null;

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
        @keyframes scoreAppear {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-score-appear {
          animation: scoreAppear 0.6s ease-out 0.2s both;
        }
      `}</style>

      <Container size="sm" className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-cope-text mb-2">
            Tu Diagnóstico Cope 📊
          </h1>
          <p className="text-gray-600">
            Aquí está lo que encontramos, {firstName}
          </p>
        </div>

        {/* Cope Score Display */}
        <div className="mb-12 text-center animate-score-appear">
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-4 border-cope-primary bg-white shadow-lg mx-auto mb-6">
            <div>
              <div className="text-6xl font-bold text-cope-primary">
                {copeScore.score}
              </div>
              <div className="text-sm font-semibold text-gray-600">
                Cope Score
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-cope-text mb-2">
            {copeScore.message}
          </h2>
          <p className="text-lg text-gray-700">
            {copeScore.messageSubtitle}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {metrics.map((metric, index) => (
            <div
              key={metric.title}
              className="p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {metric.title}
              </div>
              <div
                className="text-lg font-bold mb-2"
                style={{ color: metric.color }}
              >
                {metric.value}
              </div>
              <div
                className="text-xs font-semibold px-2 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: `${metric.color}20`,
                  color: metric.color,
                }}
              >
                {metric.level === 'alto'
                  ? '↗ Alto'
                  : metric.level === 'medio'
                  ? '→ Medio'
                  : '↘ Bajo'}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <Button
            onClick={() => router.push('/dashboard')}
            size="lg"
            className="w-full"
          >
            Siguiente
          </Button>
        </div>
      </Container>
    </div>
  );
}
