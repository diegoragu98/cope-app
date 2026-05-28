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
  hasDebts: string;
  debtAmount: string;
  savings: string;
  spendingType: string;
  savingsPercentage: number;
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

    // Calculate Cope Score
    let score = 0;
    const salary = parseInt(diagnostic.salary) || 0;
    const savings = parseInt(diagnostic.savings) || 0;
    const debtAmount = parseInt(diagnostic.debtAmount) || 0;
    const savingsPercentage = diagnostic.savingsPercentage || 0;

    // Criterio 1: Savings > 1 month salary (25 points)
    if (savings > salary) score += 25;

    // Criterio 2: Savings percentage >= 20% (25 points)
    if (savingsPercentage >= 20) score += 25;

    // Criterio 3: No debts OR debts < 30% of salary (25 points)
    if (diagnostic.hasDebts === 'no' || (debtAmount / salary < 0.3)) {
      score += 25;
    }

    // Criterio 4: Has credit card (25 points)
    if (diagnostic.hasCreditCard === 'yes') score += 25;

    // Ensure min 10, max 100
    score = Math.max(10, Math.min(100, score));

    // Determine message based on score
    let message = '';
    let messageSubtitle = '';

    if (score < 30) {
      message = 'Es normal estar aquí';
      messageSubtitle = 'Vamos a mejorar tu situación financiera juntos';
    } else if (score < 50) {
      message = 'Vas muy bien';
      messageSubtitle = 'Tenemos oportunidades para mejorar';
    } else if (score < 75) {
      message = 'Excelente progreso';
      messageSubtitle = 'Estás en el camino correcto';
    } else {
      message = 'Eres un maestro del dinero';
      messageSubtitle = 'Ahora vamos a optimizar aún más';
    }

    // Calculate metric levels
    const savingsLevel = savings > salary ? 'alto' : savings > salary * 0.5 ? 'medio' : 'bajo';
    const debtLevel = diagnostic.hasDebts === 'no' ? 'bajo' : debtAmount / salary < 0.3 ? 'medio' : 'alto';
    const savingsRateLevel = savingsPercentage >= 20 ? 'alto' : savingsPercentage >= 10 ? 'medio' : 'bajo';
    const creditLevel = diagnostic.hasCreditCard === 'yes' ? 'alto' : 'bajo';

    const metricCards: MetricCard[] = [
      {
        title: 'Patrimonio',
        level: savingsLevel,
        value: savings ? `$${savings.toLocaleString()}` : 'Sin datos',
        icon: '💰',
        color: savingsLevel === 'alto' ? '#10b981' : savingsLevel === 'medio' ? '#f59e0b' : '#ef4444',
      },
      {
        title: 'Deuda',
        level: debtLevel,
        value: diagnostic.hasDebts === 'no' ? 'Sin deuda' : `$${debtAmount.toLocaleString() || '0'}`,
        icon: '💳',
        color: debtLevel === 'bajo' ? '#10b981' : debtLevel === 'medio' ? '#f59e0b' : '#ef4444',
      },
      {
        title: 'Ahorro',
        level: savingsRateLevel,
        value: `${savingsPercentage}%`,
        icon: '📈',
        color: savingsRateLevel === 'alto' ? '#10b981' : savingsRateLevel === 'medio' ? '#f59e0b' : '#ef4444',
      },
      {
        title: 'Educación',
        level: 'medio',
        value: 'En progreso',
        icon: '🎓',
        color: '#06b6d4',
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
